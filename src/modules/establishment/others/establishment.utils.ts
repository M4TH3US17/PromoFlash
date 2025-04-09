import { EstablishmentEntity } from "../establishment.entity";
import { ResponseEstablishmentDTO } from "./dto/response-establishment.dto";
import { mapAddressEntityToDTO, mapAddressRequestToEntity } from "@modules/address/others/addresses.utils";
import { ResponsePhoneDTO } from "@modules/contact_verification/others/dto/response-phone.dto";
import { ResponseEmailDTO } from "@modules/contact_verification/others/dto/response-email.dto";
import { EmailEntity, PhoneEntity } from "@modules/contact_verification/contact_methods";
import { mapEmailEntityToDTO, mapEmailRequestToEntity, mapPhoneEntityToDTO, mapPhoneRequestToEntity } from "@modules/contact_verification/others";
import { ResponsePromotionDTO } from "@modules/promotion/others/dto/response-promotion.dto";
import { PromotionEntity } from "@modules/promotion/promotion.entity";
import { mapPromotionEntityToDTO } from "@modules/promotion/others/promotion.utils";
import { CreateEstablishmentRequestDTO } from "./dto/create-establishment.dto";
import { CreateEmailRequestDTO } from "@modules/contact_verification/others/dto/create-email.dto";
import { CreatePhoneRequestDTO } from "@modules/contact_verification/others/dto/create-phone.dto";
import { capitalize } from "@shared/utils/global.utils";
import { HttpException, HttpStatus } from "@nestjs/common";
import { AccountStatus } from "@shared/enums/account-status.enum";


export function mapEstablishmentEntityToDTO(entity: EstablishmentEntity): ResponseEstablishmentDTO {
    const phonesDTO: ResponsePhoneDTO[] = entity.phones ? entity.phones.map((entity: PhoneEntity) => mapPhoneEntityToDTO(entity)) : [];
    const emailsDTO: ResponseEmailDTO[] = entity.emails ? entity.emails.map((entity: EmailEntity) => mapEmailEntityToDTO(entity)) : [];
    const promotionsDTO: ResponsePromotionDTO[] = entity.promotions ? entity.promotions.map((entity: PromotionEntity) => mapPromotionEntityToDTO(entity)) : [];

    return {
        id: entity.id,
        cnpj: entity.cnpj,
        name: entity.name,
        businessName: entity.businessName,
        emails: emailsDTO,
        phones: phonesDTO,
        stars: entity.stars,
        description: entity.description,
        establishmentType: entity.establishmentType,
        promotions: promotionsDTO,
        address: mapAddressEntityToDTO(entity.address),
    }
};

export function mapEstablishmentRequestToEntity(dto: CreateEstablishmentRequestDTO): EstablishmentEntity {
    const emails: EmailEntity[] = dto.emails ? dto.emails.map((dto: CreateEmailRequestDTO) => mapEmailRequestToEntity(dto)) : [];
    const phones: PhoneEntity[] = dto.phones ? dto.phones.map((dto: CreatePhoneRequestDTO) => mapPhoneRequestToEntity(dto)) : [];

    return {
        cnpj: formatCNPJ(dto.cnpj),
        name: capitalize(dto.name),
        businessName: capitalize(dto.businessName),
        description: dto.description,
        stars: 0,
        phones: phones,
        emails: emails,
        establishmentStatus: AccountStatus.PENDING,
        address: dto.address ? mapAddressRequestToEntity(dto.address) : null,
        establishmentType: dto.establishmentType,
    } 
};

export function formatCNPJ(cnpj: string): string {
    const cleanedCNPJ = cnpj.replace(/\D/g, '');

    if (cleanedCNPJ.length !== 14) 
        throw new HttpException('CNPJ deve ter 14 dígitos.', HttpStatus.BAD_REQUEST);

    return cleanedCNPJ
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
};