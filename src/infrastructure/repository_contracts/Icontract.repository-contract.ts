import { ContactEntity } from "src/modules/contact/contact.entity";
import { CreateContactRequestDTO, UpdateContactRequestDTO } from "src/modules/contact/dto/request-contact.dto";
import { IBaseRepositoryContract } from "src/shared/bases/Ibase.repository-contract";


export interface IContactRepositoryContract
    extends IBaseRepositoryContract<
        UpdateContactRequestDTO,
        CreateContactRequestDTO,
        ContactEntity
    > {
        
};