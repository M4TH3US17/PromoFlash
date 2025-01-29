

export interface IBaseRepositoryContract<
    Entity,
    UpdateEntity,
    CreateEntity
> {
    
    getAll(): Promise<Entity[]>; 
    getById(id: number): Promise<Entity | null>;

    create(entityToCreate: CreateEntity): Promise<Entity>;
    update(id: number, entityToUpdate: UpdateEntity): Promise<Entity>;
    delete(id: number): Promise<void>;
}