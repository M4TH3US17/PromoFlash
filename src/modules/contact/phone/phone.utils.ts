import { keepOnlyNumbers } from "@shared/utils/global.utils";
import { mapContactVerificationEntityToDTO } from "../contact.utils";
import { ResponseContactVerificationDTO } from "../verification/dto/response-contact-verification.dto";
import { ContactVerificationEntity } from "../verification/verification.entity";
import { ResponsePhoneDTO } from "./dto/response-phone.dto";
import { PhoneEntity } from "./phone.entity";
import { CreatePhoneRequestDTO } from "./dto/create-phone.dto";


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