import { ContactEntity } from "src/modules/contact/contact.entity";
import { CreateContactRequestDTO } from "src/modules/contact/dto/create-contact.dto";
import { UpdateContactRequestDTO } from "src/modules/contact/dto/update-contact.dto";
import { IBaseRepositoryContract } from "src/shared/bases/Ibase.repository-contract";


export interface IContactRepositoryContract
    extends IBaseRepositoryContract<
        UpdateContactRequestDTO,
        CreateContactRequestDTO,
        ContactEntity
    > {
        
};