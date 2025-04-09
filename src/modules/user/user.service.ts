import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Raw, Repository } from "typeorm";
import { CreateUserRequestDTO } from "./others/dto/create-user.dto";
import { ResponseUserDTO } from "./others/dto/response-user.dto";
import { mapUserEntityToDTO, mapUserRequestToEntity } from "./others";
import { UserPaginationDTO } from "./others/dto/pagination-user.dto";
import { AddressEntity } from "@modules/address/address.entity";
import { TwilioSMSService } from "@infrastructure/external_services/twilio/sms/sms.service";
import { PhoneEntity } from "@modules/contact_verification/contact_methods";
import { generateRandomCode, mapPhoneRequestToEntity } from "@modules/contact_verification/others";
import { hashPassword } from "@modules/authentication/authentication.utils";
import { ContactVerificationEntity } from "@modules/contact_verification/contact-verification.entity";
import { OwnerType } from "@modules/contact_verification/others/enums/owner-type.enum";
import { TokenType } from "@modules/contact_verification/others/enums/token-type.enum";
import { ContactType } from "@modules/contact_verification/others/enums/contact-type.enum";
import { formatPhoneNumberToSendSMS } from "@infrastructure/external_services/twilio/sms/sms.utils";
import moment from 'moment';

@Injectable()
export class UserService {

    constructor(
        private readonly SMSService: TwilioSMSService,

        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>,
        @InjectRepository(AddressEntity)
        private readonly addressRepository: Repository<AddressEntity>,
        @InjectRepository(PhoneEntity)
        private readonly phoneRepository: Repository<PhoneEntity>,
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
        const userAlreadyExists: boolean = await this.existsByUsername(request.username);

        if (userAlreadyExists)
            throw new HttpException(`Usuário de username ${request.username} já existe na base de dados!`, HttpStatus.CONFLICT);

        let userToBeCreated: UserEntity = mapUserRequestToEntity(request);
        userToBeCreated.password = await hashPassword(userToBeCreated.password);

        const userCreated: UserEntity = await this.repository.save(userToBeCreated);
        userToBeCreated.phones.forEach(async (phone: PhoneEntity, index: number) => {
            if (index <= 1) {
                let verificationCode: number = generateRandomCode();
                let message: string = `[USUÁRIO] Olá, seu código de verificação PromoFlash é: ${verificationCode}`;

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
                    await this.phoneRepository.save(mapPhoneRequestToEntity(phone));

                await this.contactVerificationRepository.save({
                    used_at: null,
                    user: userCreated,
                    token: verificationCode,
                    owner_type: OwnerType.USER,
                    token_type: TokenType.CONFIRMATION,
                    contact_type: ContactType.SMS,
                    expired_at: moment().add(5, 'minutes').toDate()
                });

                // this.SMSService.sendSMS(formatPhoneNumberToSendSMS(phone), message);
            }
        });

        return mapUserEntityToDTO(userCreated);
    };

    public async existsByUsername(username: string): Promise<boolean> {
        const userFound: UserEntity = await this.repository.findOne({
            where: { username: Raw(alias => `REPLACE(LOWER(${alias}), ' ', '') = REPLACE(LOWER(:username), ' ', '')`, { username }) }
        });

        return userFound ? true : false;
    };

};