import { ApiProperty } from "@nestjs/swagger";
import { SORT_DIRECTIONS, TSortDirection } from "../types/pagination.types";
import { BaseEntity } from "./base.entity";

export class BasePaginationDTO<Entity extends BaseEntity> {

    /** Número de página (offset)
     * @example 0 
     * **/
    offset?: number;
  
    /** Limite de itens por página
     * @example 10
     * **/
    limit?: number;

    /** Campo para filtrar **/
    filterBy?: keyof Entity;
  
    /** Valor da chave para filtrar **/
    key?: string;
  
    /** Campo para ordenar **/
    orderBy?: keyof Entity;
  
    @ApiProperty({
      description: 'Direção da ordenação',
      enum: SORT_DIRECTIONS,
      required: false,
      example: 'ASC',
      enumName: "SELECT [sort pagination]",
    })
    sort?: TSortDirection;
  };