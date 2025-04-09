export class ResponsePhoneDTO {
    id: number;
    ddd: string;
    countryCode: string;
    number: string;
    receiveWhatsappNotifications: boolean;
    receiveSmsNotifications: boolean;
    receiveTelegramNotifications: boolean;
}