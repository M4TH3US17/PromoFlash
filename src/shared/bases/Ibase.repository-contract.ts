import { BasePaginationDTO } from "./base-pagination.dto";
import { BaseEntity } from "./base.entity";

export interface IBaseRepositoryContract<
    UpdateEntity,
    CreateEntity,
    Entity extends BaseEntity
> {
    
    getByIdAsync(id: number): Promise<Entity | null>;
    getAllAsync(pagination: BasePaginationDTO<Entity>): Promise<Entity[]>; 

    createAsync(entityToCreate: CreateEntity): Promise<Entity>;
    updateAsync(id: number, entityToUpdate: UpdateEntity): Promise<Entity>;
    deleteAsync(id: number): Promise<void>;
};