import { CreatePhoneRequestDTO } from "@modules/contact/phone/dto/create-phone.dto";
import { HttpException, HttpStatus } from "@nestjs/common";

export function formatPhoneNumberToSendSMS(contact: CreatePhoneRequestDTO): string {
    let phone = `${contact.countryCode} ${contact.ddd} ${contact.number}`;
    const numericOnly = phone.replace(/\D/g, '');

    if(numericOnly.length <= 9) 
        throw new HttpException(`Contato informado contém menos de 10 números`, HttpStatus.BAD_REQUEST);

    return `+${numericOnly}`
};