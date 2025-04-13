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
import { hashPassword } from "@modules/authentication/authentication.utils";
import { TwilioWhatsappService } from "@infrastructure/external_services/twilio/whatsapp/whatsapp.service";
import { VenomWhatsappService } from "@infrastructure/external_services/venom/venom.service";
import { PhoneEntity } from "@modules/contact/phone/phone.entity";
import { EmailEntity } from "@modules/contact/email/email.entity";
import { ContactVerificationEntity } from "@modules/contact/verification/verification.entity";
import { PhoneService } from "@modules/contact/phone/phone.service";
import { EmailService } from "@modules/contact/email/email.service";

@Injectable()
export class UserService {

    constructor(
        private readonly dataSource: DataSource,
        // private readonly SMSService: TwilioSMSService,
        // private readonly twilioWhatsappService: TwilioWhatsappService,
        // private readonly venomWhatsappService: VenomWhatsappService,

        private readonly phoneService:  PhoneService,
        private readonly emailService:  EmailService,

        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>,
        // @InjectRepository(AddressEntity)
        // private readonly addressRepository: Repository<AddressEntity>,
        // @InjectRepository(PhoneEntity)
        // private readonly phoneRepository: Repository<PhoneEntity>,
        // @InjectRepository(EmailEntity)
        // private readonly emailRepository: Repository<EmailEntity>,
        // @InjectRepository(ContactVerificationEntity)
        // private readonly contactVerificationRepository: Repository<ContactVerificationEntity>,
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
        return await this.dataSource.transaction(async manager => {
            const userAlreadyExists: boolean = await this.existsByUsername(request.username);

            if (userAlreadyExists)
                throw new HttpException(`Usuário de username ${request.username} já existe na base de dados!`, HttpStatus.CONFLICT);

            let userToBeCreated: UserEntity = mapUserRequestToEntity(request);
            userToBeCreated.password = await hashPassword(userToBeCreated.password);

            const userCreated: UserEntity = await manager.save(UserEntity, userToBeCreated);

            const [phoneVerificationsResult, emailVerificationsResult] = await Promise.all([
                this.phoneService.createPhones(userCreated.phones, userCreated, manager),
                this.emailService.createEmails(userCreated.emails, userCreated, manager)
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

};