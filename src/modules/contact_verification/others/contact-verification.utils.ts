import { keepOnlyNumbers } from "@shared/utils/global.utils";
import { EmailEntity, PhoneEntity } from "../contact_methods";
import { CreateEmailRequestDTO } from "./dto/create-email.dto";
import { CreatePhoneRequestDTO } from "./dto/create-phone.dto";
import { ResponseEmailDTO } from "./dto/response-email.dto";
import { ResponsePhoneDTO } from "./dto/response-phone.dto";

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


export function mapEmailEntityToDTO(entity: EmailEntity): ResponseEmailDTO {
    return {
        id: entity.id,
        email: entity.email,
        receiveEmailNotifications: entity.receiveEmailNotifications
    }
}; 

export function mapPhoneEntityToDTO(entity: PhoneEntity): ResponsePhoneDTO {
    return {
        id: entity.id,
        ddd: entity.ddd,
        countryCode: entity.countryCode,
        number: entity.number,
        receiveSmsNotifications: entity.receiveSmsNotifications,
        receiveTelegramNotifications: entity.receiveTelegramNotifications,
        receiveWhatsappNotifications: entity.receiveWhatsappNotifications
    }
}; 