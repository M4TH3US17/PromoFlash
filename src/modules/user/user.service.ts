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

@Injectable()
export class UserService {

    constructor(
        private readonly dataSource: DataSource, 
        private readonly SMSService: TwilioSMSService,
        private readonly whatsappService: TwilioWhatsappService,

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
            return users.map(user => mapUserEntityToDTO(user));
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new HttpException("Desculpe, houve um erro interno no servidor. Por favor, catatar o suporte.", HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    public async create(request: CreateUserRequestDTO): Promise<ResponseUserDTO> {
        return await this.dataSource.transaction(async transactional => {
            const userAlreadyExists: boolean = await this.existsByUsername(request.username);

            if (userAlreadyExists)
                throw new HttpException(`Usuário de username ${request.username} já existe na base de dados!`, HttpStatus.CONFLICT);

            let userToBeCreated: UserEntity = mapUserRequestToEntity(request);
            userToBeCreated.password = await hashPassword(userToBeCreated.password);

            const userCreated: UserEntity = await transactional.save(UserEntity, userToBeCreated);
            this.createUserPhones(userCreated.phones, userCreated, transactional);
            this.createUserEmails(userCreated.emails, userCreated, transactional);

            // await this.whatsappService.sendMessage(
            //     '+559286067356', 
            //     'Mensagem Recebida com sucesso ! (PromoFlash)'
            // );

            return mapUserEntityToDTO(userCreated);
        });
    };

    public async existsByUsername(username: string): Promise<boolean> {
        const userFound: UserEntity = await this.repository.findOne({
            where: { username: Raw(alias => `REPLACE(LOWER(${alias}), ' ', '') = REPLACE(LOWER(:username), ' ', '')`, { username }) }
        });

        return userFound ? true : false;
    };

    // MÉTODOS AUXILIARES
    private async createUserPhones(phones: PhoneEntity[], userOwner: UserEntity, transactional: EntityManager) {
        phones.forEach(async (phone: PhoneEntity, index: number) => {
            if (index <= 1) {
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

                await transactional.save(ContactVerificationEntity, {
                    used_at: null,
                    user: userOwner,
                    token: verificationCode,
                    owner_type: OwnerType.USER,
                    token_type: TokenType.CONFIRMATION,
                    contact_type: ContactType.SMS,
                    contactId: phoneAlreadyInUse ? phoneAlreadyInUse.id : phoneCreated.id,
                    expired_at: new Date(Date.now() + 5 * 60 * 1000)// moment().add(5, 'minutes').toDate()
                });

                // this.SMSService.sendSMS(formatPhoneNumberToSendSMS(phone), message);
            }
        });
    };

    private async createUserEmails(emails: EmailEntity[], userOwner: UserEntity, transactional: EntityManager) {
        emails.forEach(async (email: EmailEntity, index: number) => {
            if (index <= 1) {
                let verificationCode: number = generateRandomCode();
                let message: string = `[USUÁRIO] Olá, seu código de verificação PromoFlash é: ${verificationCode}`;
                let emailCreated = null;

                let emailAlreadyInUse = await this.emailRepository.findOne({ where: { email: email.email } });

                if (emailAlreadyInUse) // tentativa de cadastro com um contato existente. Não criar um novo contato, apenas reutilizar.
                    message = `[USUÁRIO] Olá, verificamos que houve uma tentativa de cadastro no nosso aplicativo PromoFlash
                    utilizando seu email. Se foi você, confirme no app este código: ${verificationCode}`;
                else {
                    emailCreated = await transactional.save(EmailEntity, mapEmailRequestToEntity(email));
                }
                
                await transactional.save(ContactVerificationEntity, {
                    used_at: null,
                    user: userOwner,
                    token: verificationCode,
                    owner_type: OwnerType.USER,
                    token_type: TokenType.CONFIRMATION,
                    contact_type: ContactType.EMAIL,
                    contactId: emailAlreadyInUse ? emailAlreadyInUse.id : emailCreated.id,
                    expired_at: new Date(Date.now() + 5 * 60 * 1000)// moment().add(5, 'minutes').toDate()
                });


                // this.SMSService.sendSMS(formatPhoneNumberToSendSMS(phone), message);
            }
        });
    }


};