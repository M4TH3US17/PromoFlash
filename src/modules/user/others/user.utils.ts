import { ResponseAddressDTO } from "@modules/address/others/dto/response-address.dto";
import { UserEntity } from "../user.entity";
import { CreateUserRequestDTO } from "./dto/create-user.dto";
import { ResponseUserDTO } from "./dto/response-user.dto";
import { AddressEntity } from "@modules/address/address.entity";
import { mapAddressEntityToDTO, mapAddressRequestToEntity } from "@modules/address/others/addresses.utils";
import { ResponsePhoneDTO } from "@modules/contact_verification/others/dto/response-phone.dto";
import { ResponseEmailDTO } from "@modules/contact_verification/others/dto/response-email.dto";
import { EmailEntity, PhoneEntity } from "@modules/contact_verification/contact_methods";
import { mapEmailEntityToDTO, mapEmailRequestToEntity, mapPhoneEntityToDTO, mapPhoneRequestToEntity } from "@modules/contact_verification/others";
import { ResponseEstablishmentDTO } from "@modules/establishment/others/dto/response-establishment.dto";
import { EstablishmentEntity } from "@modules/establishment/establishment.entity";
import { mapEstablishmentEntityToDTO } from "@modules/establishment/others";
import { UserRole } from "./enums/user-role.enum";
import { CreateAddressRequestDTO } from "@modules/address/others/dto/create-address.dto";
import { CreateEmailRequestDTO } from "@modules/contact_verification/others/dto/create-email.dto";
import { CreatePhoneRequestDTO } from "@modules/contact_verification/others/dto/create-phone.dto";
import { AccountStatus } from "../../../shared/enums/account-status.enum";

export function mapUserRequestToEntity(request: CreateUserRequestDTO): UserEntity {
    const addresses: AddressEntity[] = request.addresses ? request.addresses.map((dto: CreateAddressRequestDTO) => mapAddressRequestToEntity(dto)) : [];
    const emails: EmailEntity[] = request.emails ? request.emails.map((dto: CreateEmailRequestDTO) => mapEmailRequestToEntity(dto)) : [];
    const phones: PhoneEntity[] = request.phones ? request.phones.map((dto: CreatePhoneRequestDTO) => mapPhoneRequestToEntity(dto)) : [];

    return {
         username: request.username,
         password: request.password,
         emails: emails,
         phones: phones,
         addresses: addresses,
         role: UserRole.USER,
         accountStatus: AccountStatus.PENDING,
    } 
};

export function mapUserEntityToDTO(entity: UserEntity): ResponseUserDTO {
    const addressesDTO: ResponseAddressDTO[] = entity.addresses ? entity.addresses.map((entity: AddressEntity) => mapAddressEntityToDTO(entity)) : [];
    const phonesDTO: ResponsePhoneDTO[] = entity.phones ? entity.phones.map((entity: PhoneEntity) => mapPhoneEntityToDTO(entity)) : [];
    const emailsDTO: ResponseEmailDTO[] = entity.emails ? entity.emails.map((entity: EmailEntity) => mapEmailEntityToDTO(entity)) : [];
    const establishmentsDTO: ResponseEstablishmentDTO[] = entity.followingEstablishments ? entity.followingEstablishments.map((entity: EstablishmentEntity) => mapEstablishmentEntityToDTO(entity)) : [];

    return {
        id: entity.id,
        username: entity.username,
        addresses: addressesDTO,
        phones: phonesDTO,
        emails: emailsDTO,
        followingEstablishments: establishmentsDTO,
    } 
};