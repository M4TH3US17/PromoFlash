import { PartialType } from '@nestjs/mapped-types';
import { CreateEstablishmentRequestDTO } from './create-establishment.dto';

export class UpdateEstablishmentRequestDTO extends PartialType(CreateEstablishmentRequestDTO) { };