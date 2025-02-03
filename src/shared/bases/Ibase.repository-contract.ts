

export interface IBaseRepositoryContract<
    UpdateEntity,
    CreateEntity,
    Entity
> {
    
    getAllAsync(): Promise<Entity[]>; 
    getByIdAsync(id: number): Promise<Entity | null>;

    createAsync(entityToCreate: CreateEntity): Promise<Entity>;
    updateAsync(id: number, entityToUpdate: UpdateEntity): Promise<Entity>;
    deleteAsync(id: number): Promise<void>;
}