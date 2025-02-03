import { PartialType } from "@nestjs/mapped-types";
import { LocationEntity } from "./location.entity";

export class CurrentLocationRequestDTO extends PartialType(LocationEntity) { };