import { ResponseContactVerificationDTO } from "./response-contact-verification.dto";

export class ResponseEmailDTO {
    id: number;
    email: string;
    confirmed: boolean;
    receiveEmailNotifications: boolean;
    pendingVerifications: ResponseContactVerificationDTO[];
}