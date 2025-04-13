import { keepOnlyNumbers } from "@shared/utils/global.utils";
import { CreatePhoneRequestDTO } from "./phone/dto/create-phone.dto";
import { PhoneEntity } from "./phone/phone.entity";
import { CreateEmailRequestDTO } from "./email/dto/create-email.dto";
import { EmailEntity } from "./email/email.entity";
import { ContactVerificationEntity } from "./verification/verification.entity";
import { ResponseContactVerificationDTO } from "./verification/dto/response-contact-verification.dto";
import { ResponseEmailDTO } from "./email/dto/response-email.dto";
import { ResponsePhoneDTO } from "./phone/dto/response-phone.dto";

/**
 * Gera um código numérico aleatório de 6 dígitos.
 * 
 * Esta função retorna um número inteiro aleatório entre 100000 e 999999, 
 * garantindo que o código gerado tenha exatamente 6 dígitos.
 * 
 * @returns {number} Um número aleatório de 6 dígitos.
 */
export function generateRandomCode(): number {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function mapPhoneRequestToEntity(request: CreatePhoneRequestDTO): PhoneEntity {
    const countryCodeFormatted = `+${keepOnlyNumbers(request.countryCode)}`;

    return {
        ddd: keepOnlyNumbers(request.ddd),
        countryCode: countryCodeFormatted,
        number: keepOnlyNumbers(request.number),
        confirmed: false,
        receiveSmsNotifications: false,
        receiveTelegramNotifications: false,
        receiveWhatsappNotifications: false,
    }
};

export function mapEmailRequestToEntity(request: CreateEmailRequestDTO): EmailEntity {
    return {
        email: request.email,
        confirmed: false,
        receiveEmailNotifications: false
    }
};

export function mapContactVerificationEntityToDTO(entity: ContactVerificationEntity): ResponseContactVerificationDTO {
    return {
        id: entity.id,
        contactType: entity.contact_type,
        tokenType: entity.token_type
    }
};

export function mapEmailEntityToDTO(entity: EmailEntity, verifications: ContactVerificationEntity[]): ResponseEmailDTO {
    const verificationsDTO: ResponseContactVerificationDTO[] = verifications.map((entity) => mapContactVerificationEntityToDTO(entity));

    return {
        id: entity.id,
        email: entity.email,
        confirmed: entity.confirmed,
        receiveEmailNotifications: entity.receiveEmailNotifications,
        pendingVerifications: verificationsDTO,
    }
};

export function mapPhoneEntityToDTO(entity: PhoneEntity, verifications: ContactVerificationEntity[]): ResponsePhoneDTO {
    const verificationsDTO: ResponseContactVerificationDTO[] = verifications.map((entity) => mapContactVerificationEntityToDTO(entity));

    return {
        id: entity.id,
        ddd: entity.ddd,
        countryCode: entity.countryCode,
        number: entity.number,
        confirmed: entity.confirmed,
        receiveSmsNotifications: entity.receiveSmsNotifications,
        receiveTelegramNotifications: entity.receiveTelegramNotifications,
        receiveWhatsappNotifications: entity.receiveWhatsappNotifications,
        pendingVerifications: verificationsDTO,
    }
}; 