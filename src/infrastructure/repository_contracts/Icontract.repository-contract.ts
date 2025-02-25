import { CreateContactRequestDTO, UpdateContactRequestDTO } from "@modules/contact/others/dto/request-contact.dto";
import { ContactEntity } from "src/modules/contact/contact.entity";
import { IBaseRepositoryContract } from "src/shared/bases/Ibase.repository-contract";


export interface IContactRepositoryContract
    extends IBaseRepositoryContract<
        UpdateContactRequestDTO,
        CreateContactRequestDTO,
        ContactEntity
    > {
        
};