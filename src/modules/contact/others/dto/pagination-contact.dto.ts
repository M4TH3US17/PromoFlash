import { ContactEntity } from "@modules/contact/contact.entity";
import { BasePaginationDTO } from "src/shared/bases/base-pagination.dto";

export class ContactPaginationDTO extends BasePaginationDTO<ContactEntity> { };