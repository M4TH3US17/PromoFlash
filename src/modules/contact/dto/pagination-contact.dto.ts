import { BasePaginationDTO } from "src/shared/bases/base-pagination.dto";
import { ContactEntity } from "../contact.entity";

export class ContactPaginationDTO extends BasePaginationDTO<ContactEntity> { };