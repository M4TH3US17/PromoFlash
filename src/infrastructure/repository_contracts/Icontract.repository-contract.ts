import { ContactEntity } from "src/modules/contact/contact.entity";
import { CreateContactDTO, UpdateContactDTO } from "src/modules/contact/dto/contact.dto";
import { IBaseRepositoryContract } from "src/shared/bases/Ibase.repository-contract";


export interface IContactRepositoryContract
    extends IBaseRepositoryContract<
        ContactEntity,
        UpdateContactDTO,
        CreateContactDTO
    > {
        
};