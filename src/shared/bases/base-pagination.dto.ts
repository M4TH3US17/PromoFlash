import { BaseEntity } from "./base.entity";

export class BasePaginationDTO<Entity extends BaseEntity> {
    //@ApiProperty({ description: 'Número de página (offset)', required: false, example: 0 })
    offset?: number;
  
    //@ApiProperty({ description: 'Limite de itens por página', required: false, example: 10 })
    limit?: number;
  
    //@ApiProperty({ description: 'Campo para filtrar', required: false })
    filterBy?: keyof Entity;
  
    //@ApiProperty({ description: 'Valor da chave para filtrar', required: false })
    key?: string;
  
    //@ApiProperty({ description: 'Campo para ordenar', required: false })
    orderBy?: keyof Entity;
  
    //@ApiProperty({ description: 'Direção da ordenação', enum: ['ASC', 'DESC'], required: false, example: 'ASC' })
    sort?: 'ASC' | 'DESC';
  };