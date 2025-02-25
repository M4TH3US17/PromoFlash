import { AddressEntity } from '@modules/address/address.entity';
import { OmitType } from '@nestjs/swagger';

export class AddressResponseDTO extends OmitType(AddressEntity, 
    ["location", "users", "establishment", "createdAt", "updatedAt", "deletedAt"] as const) {}