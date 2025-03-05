import { HttpException, HttpStatus } from "@nestjs/common";

export function formatPhoneNumberToSendSMS(contact: string): string {
    const numericOnly = contact.replace(/\D/g, '');

    if(numericOnly.length <= 9) 
        throw new HttpException(`Contato informado contém menos de 10 números`, HttpStatus.BAD_REQUEST);

    return `+${numericOnly}`
};