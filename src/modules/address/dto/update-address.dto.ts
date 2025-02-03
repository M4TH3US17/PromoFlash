import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressRequestDTO } from './create-address.dto';

export class UpdateAddressRequestDTO extends PartialType(CreateAddressRequestDTO) { };