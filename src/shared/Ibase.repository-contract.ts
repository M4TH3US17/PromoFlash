

export interface IBaseRepositoryContract<
    Entity,
    UpdateEntity,
> {
    
    getAll(): Promise<Entity[]>; 
    getById(id: number): Promise<Entity | null>;

    create(entity: Entity): Promise<Entity>;
    update(id: number, entityToUpdate: UpdateEntity): Promise<Entity>;
    delete(id: number): Promise<void>;
}