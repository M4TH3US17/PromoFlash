import { ResponseAddressDTO } from "@modules/address/others/dto/response-address.dto";
import { UserEntity } from "../user.entity";
import { CreateUserRequestDTO } from "./dto/create-user.dto";
import { ResponseUserDTO } from "./dto/response-user.dto";
import { AddressEntity } from "@modules/address/address.entity";
import { mapAddressEntityToDTO, mapAddressRequestToEntity } from "@modules/address/others/addresses.utils";
import { ResponseEstablishmentDTO } from "@modules/establishment/others/dto/response-establishment.dto";
import { EstablishmentEntity } from "@modules/establishment/establishment.entity";
import { mapEstablishmentEntityToDTO } from "@modules/establishment/others";
import { UserRole } from "./enums/user-role.enum";
import { AccountStatus } from "../../../shared/enums/account-status.enum";
import { ContactVerificationEntity } from "@modules/contact/verification/verification.entity";
import { ResponsePhoneDTO } from "@modules/contact/phone/dto/response-phone.dto";
import { PhoneEntity } from "@modules/contact/phone/phone.entity";
import { EmailEntity } from "@modules/contact/email/email.entity";
import { ResponseEmailDTO } from "@modules/contact/email/dto/response-email.dto";
import { mapEmailEntityToDTO, mapEmailRequestToEntity } from "@modules/contact/email/email.utils";
import { mapPhoneEntityToDTO, mapPhoneRequestToEntity } from "@modules/contact/phone/phone.utils";

export function mapUserRequestToEntity(request: CreateUserRequestDTO): UserEntity {
    // const addresses: AddressEntity[] = request.addresses ? request.addresses.map((dto: CreateAddressRequestDTO) => mapAddressRequestToEntity(dto)) : [];
    // const emails: EmailEntity[] = request.emails ? request.emails.map((dto: CreateEmailRequestDTO) => mapEmailRequestToEntity(dto)) : [];
    // const phones: PhoneEntity[] = request.phones ? request.phones.map((dto: CreatePhoneRequestDTO) => mapPhoneRequestToEntity(dto)) : [];

    return {
        username: request.username,
        password: request.password,
        role: UserRole.USER,
        accountStatus: AccountStatus.PENDING,
        emails: (request.email) ? [mapEmailRequestToEntity({ email: request.email })] : [],
        phones: (request.phone) ? [mapPhoneRequestToEntity(request.phone)] : [],
        addresses: (request.address) ? [mapAddressRequestToEntity(request.address)] : [],
    }
};

export function mapUserEntityToDTO(
    entity: UserEntity,
    phoneVerifications: ContactVerificationEntity[],
    emailVerifications: ContactVerificationEntity[],
): ResponseUserDTO {
    const addressesDTO: ResponseAddressDTO[] = entity.addresses ? entity.addresses.map((entity: AddressEntity) => mapAddressEntityToDTO(entity)) : [];
    const establishmentsDTO: ResponseEstablishmentDTO[] = entity.followingEstablishments ? entity.followingEstablishments.map((entity: EstablishmentEntity) => mapEstablishmentEntityToDTO(entity)) : [];
    
    const phonesDTO: ResponsePhoneDTO[] = entity.phones ? entity.phones.map((entity: PhoneEntity) => mapPhoneEntityToDTO(entity, phoneVerifications)) : [];
    const emailsDTO: ResponseEmailDTO[] = entity.emails ? entity.emails.map((entity: EmailEntity) => mapEmailEntityToDTO(entity, emailVerifications)) : [];

    return {
        id: entity.id,
        username: entity.username,
        accountStatus: entity.accountStatus,
        addresses: addressesDTO,
        phones: phonesDTO,
        emails: emailsDTO,
        followingEstablishments: establishmentsDTO,
    }
};