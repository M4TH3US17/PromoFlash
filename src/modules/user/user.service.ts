import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { DataSource, EntityManager, Raw, Repository } from "typeorm";
import { CreateUserRequestDTO } from "./others/dto/create-user.dto";
import { ResponseUserDTO } from "./others/dto/response-user.dto";
import { mapUserEntityToDTO, mapUserRequestToEntity } from "./others";
import { UserPaginationDTO } from "./others/dto/pagination-user.dto";
import { AddressEntity } from "@modules/address/address.entity";
import { TwilioSMSService } from "@infrastructure/external_services/twilio/sms/sms.service";
import { EmailEntity, PhoneEntity } from "@modules/contact_verification/contact_methods";
import { generateRandomCode, mapEmailRequestToEntity, mapPhoneRequestToEntity } from "@modules/contact_verification/others";
import { hashPassword } from "@modules/authentication/authentication.utils";
import { ContactVerificationEntity } from "@modules/contact_verification/contact-verification.entity";
import { OwnerType } from "@modules/contact_verification/others/enums/owner-type.enum";
import { TokenType } from "@modules/contact_verification/others/enums/token-type.enum";
import { ContactType } from "@modules/contact_verification/others/enums/contact-type.enum";
import { TwilioWhatsappService } from "@infrastructure/external_services/twilio/whatsapp/whatsapp.service";
import { VenomWhatsappService } from "@infrastructure/external_services/venom/venom.service";
import { formatPhoneNumberToSendSMS } from "@infrastructure/external_services/twilio/sms/sms.utils";

@Injectable()
export class UserService {

    constructor(
        private readonly dataSource: DataSource,
        private readonly SMSService: TwilioSMSService,
        private readonly twilioWhatsappService: TwilioWhatsappService,
        private readonly venomWhatsappService: VenomWhatsappService,

        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>,
        @InjectRepository(AddressEntity)
        private readonly addressRepository: Repository<AddressEntity>,
        @InjectRepository(PhoneEntity)
        private readonly phoneRepository: Repository<PhoneEntity>,
        @InjectRepository(EmailEntity)
        private readonly emailRepository: Repository<EmailEntity>,
        @InjectRepository(ContactVerificationEntity)
        private readonly contactVerificationRepository: Repository<ContactVerificationEntity>,
    ) { }

    public async getAll(pagination: UserPaginationDTO): Promise<ResponseUserDTO[]> {
        try {
            const users: UserEntity[] = await this.repository.find({
                relations: [
                    "addresses",
                    "phones",
                    "emails",
                    "followingEstablishments",
                ]
            });
            //const users: PaginatedList<UserEntity> = await this.repository.getAllAsync(pagination);
            return users.map(user => mapUserEntityToDTO(user, [], []));
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new HttpException("Desculpe, houve um erro interno no servidor. Por favor, catatar o suporte.", HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    public async create(request: CreateUserRequestDTO): Promise<ResponseUserDTO> {
        // await this.twilioWhatsappService.sendMessage(
        //     '+559286067356', 
        //     'Mensagem Recebida com sucesso ! (PromoFlash)'
        // );
        return await this.dataSource.transaction(async manager => {
            const userAlreadyExists: boolean = await this.existsByUsername(request.username);

            if (userAlreadyExists)
                throw new HttpException(`Usuário de username ${request.username} já existe na base de dados!`, HttpStatus.CONFLICT);

            let userToBeCreated: UserEntity = mapUserRequestToEntity(request);
            userToBeCreated.password = await hashPassword(userToBeCreated.password);

            const userCreated: UserEntity = await manager.save(UserEntity, userToBeCreated);

            const [phoneVerificationsResult, emailVerificationsResult] = await Promise.all([
                this.createUserPhones(userCreated.phones, userCreated, manager),
                this.createUserEmails(userCreated.emails, userCreated, manager)
            ]);

            return mapUserEntityToDTO(userCreated, phoneVerificationsResult, emailVerificationsResult);
        });
    };

    public async existsByUsername(username: string): Promise<boolean> {
        const userFound: UserEntity = await this.repository.findOne({
            where: { username: Raw(alias => `REPLACE(LOWER(${alias}), ' ', '') = REPLACE(LOWER(:username), ' ', '')`, { username }) }
        });

        return userFound ? true : false;
    };

    // MÉTODOS AUXILIARES
    private async createUserPhones(phones: PhoneEntity[], userOwner: UserEntity, transactional: EntityManager): Promise<ContactVerificationEntity[]> {
        if (!phones?.length) return;

        const phonesToProcess = phones.slice(0, 2);
        const verifications: ContactVerificationEntity[] = [];

        await Promise.all(phonesToProcess.map(async (phone: PhoneEntity, index: number) => {
            let verificationCode: number = generateRandomCode();
            let message: string = `[USUÁRIO] Olá, seu código de verificação PromoFlash é: ${verificationCode}`;
            let phoneCreated = null;

            let phoneAlreadyInUse = await this.phoneRepository.findOne({
                where: {
                    ddd: phone.ddd,
                    countryCode: phone.countryCode,
                    number: phone.number
                }
            });

            if (phoneAlreadyInUse) // tentativa de cadastro com um contato existente. Não criar um novo contato, apenas reutilizar.
                message = `[USUÁRIO] Olá, verificamos que houve uma tentativa de cadastro no nosso aplicativo PromoFlash
                    utilizando seu contato. Se foi você, confirme no app este código: ${verificationCode}`;
            else
                phoneCreated = await transactional.save(PhoneEntity, mapPhoneRequestToEntity(phone));

            let verification = await transactional.save(ContactVerificationEntity, {
                used_at: null,
                user: userOwner,
                token: verificationCode,
                owner_type: OwnerType.USER,
                token_type: TokenType.CONFIRMATION,
                contact_type: ContactType.SMS,
                contactId: phoneAlreadyInUse ? phoneAlreadyInUse.id : phoneCreated.id,
                expired_at: new Date(Date.now() + 5 * 60 * 1000)
            });

            verifications.push(verification)
            await this.venomWhatsappService.sendMessage(`${phone.countryCode}${phone.ddd}${phone.number}`, `[MENSAGEM DE TESTE - SMS] Código de Verificação de telefone: (${verificationCode})`);
            // this.SMSService.sendSMS(formatPhoneNumberToSendSMS(phone), message);
        }
        ));

        return verifications
    };

    private async createUserEmails(emails: EmailEntity[], userOwner: UserEntity, transactional: EntityManager): Promise<ContactVerificationEntity[]> {
        if (!emails?.length) return;

        const emailsToProcess = emails.slice(0, 2);
        const verifications: ContactVerificationEntity[] = [];

        await Promise.all(emailsToProcess.map(async (email: EmailEntity) => {
            let verificationCode: number = generateRandomCode();
            let message: string = `[USUÁRIO] Olá, seu código de verificação PromoFlash é: ${verificationCode}`;
            let emailCreated: EmailEntity = null;

            let emailAlreadyInUse = await this.emailRepository.findOne({ where: { email: email.email } });

            if (emailAlreadyInUse) // tentativa de cadastro com um contato existente. Não criar um novo contato, apenas reutilizar.
                message = `[USUÁRIO] Olá, verificamos que houve uma tentativa de cadastro no nosso aplicativo PromoFlash
                    utilizando seu email. Se foi você, confirme no app este código: ${verificationCode}`;
            else {
                emailCreated = await transactional.save(EmailEntity, mapEmailRequestToEntity(email));
            }

            let verification = await transactional.save(ContactVerificationEntity, {
                used_at: null,
                user: userOwner,
                token: verificationCode,
                owner_type: OwnerType.USER,
                token_type: TokenType.CONFIRMATION,
                contact_type: ContactType.EMAIL,
                contactId: emailAlreadyInUse ? emailAlreadyInUse.id : emailCreated.id,
                expired_at: new Date(Date.now() + 5 * 60 * 1000)// moment().add(5, 'minutes').toDate()
            });

            verifications.push(verification);
            await this.venomWhatsappService.sendMessage(`+5592986067356`, `[MENSAGEM DE TESTE - EMAIL] Código de Verificação de email: (${verificationCode}) ${emailAlreadyInUse ? JSON.stringify(emailAlreadyInUse.email) : email}`);
            // this.SMSService.sendSMS(formatPhoneNumberToSendSMS(phone), message);
        }));

        return verifications;

    };

};