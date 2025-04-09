export class ResponsePhoneDTO {
    id: number;
    ddd: string;
    countryCode: string;
    number: string;
    confirmed: boolean;
    receiveWhatsappNotifications: boolean;
    receiveSmsNotifications: boolean;
    receiveTelegramNotifications: boolean;
}