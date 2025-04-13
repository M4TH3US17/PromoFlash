import { ResponseContactVerificationDTO } from "@modules/contact/verification/dto/response-contact-verification.dto";


export class ResponseEmailDTO {
    id: number;
    email: string;
    confirmed: boolean;
    receiveEmailNotifications: boolean;
    pendingVerifications: ResponseContactVerificationDTO[];
}