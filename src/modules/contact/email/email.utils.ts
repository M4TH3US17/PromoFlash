import { mapContactVerificationEntityToDTO } from "../contact.utils";
import { ResponseContactVerificationDTO } from "../verification/dto/response-contact-verification.dto";
import { ContactVerificationEntity } from "../verification/verification.entity";
import { CreateEmailRequestDTO } from "./dto/create-email.dto";
import { ResponseEmailDTO } from "./dto/response-email.dto";
import { EmailEntity } from "./email.entity";

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

export function mapEmailRequestToEntity(request: CreateEmailRequestDTO): EmailEntity {
    return {
        email: request.email,
        confirmed: false,
        receiveEmailNotifications: false
    }
};
