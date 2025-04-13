import { ResponseContactVerificationDTO } from "@modules/contact/verification/dto/response-contact-verification.dto";


export class ResponsePhoneDTO {
    id: number;
    ddd: string;
    countryCode: string;
    number: string;
    confirmed: boolean;
    receiveWhatsappNotifications: boolean;
    receiveSmsNotifications: boolean;
    receiveTelegramNotifications: boolean;
    pendingVerifications: ResponseContactVerificationDTO[];
}