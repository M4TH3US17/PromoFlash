import { ContactVerificationEntity } from "@modules/contact_verification/contact-verification.entity";
import { CreateContactVerificationDTO, UpdateContactVerificationDTO } from "@modules/contact_verification/others/dto/request-contact-verification.dto";
import { IBaseRepositoryContract } from "@shared/bases/Ibase.repository-contract";

export interface IContactVerificationRepositoryContract
    extends IBaseRepositoryContract<
    UpdateContactVerificationDTO,
    CreateContactVerificationDTO,
    ContactVerificationEntity
    > {
        
};