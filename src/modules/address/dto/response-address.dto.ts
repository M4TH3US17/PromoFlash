import { OmitType } from '@nestjs/swagger';
import { AddressEntity } from "../address.entity";

export class AddressResponseDTO extends OmitType(AddressEntity, 
    ["location", "users", "establishment", "createdAt", "updatedAt", "deletedAt"] as const) {}