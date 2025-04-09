import { PartialType } from "@nestjs/swagger";
import { LocationEntity } from "./location.entity";

export class CurrentLocationRequestDTO extends PartialType(LocationEntity) { };