import { IEstablishmentRepositoryContract } from "src/infrastructure/repository_contracts/Iestablishment.repository-contract";
import { CreateEstablishmentDTO, UpdateEstablishmentDTO } from "./dto/establishment.dto";
import { EstablishmentEntity } from "./establishment.entity";

class EstablishmentRepositoryImpl implements IEstablishmentRepositoryContract {

    getAll(): Promise<EstablishmentEntity[]> {
        throw new Error("Method not implemented.");
    };

    getById(id: number): Promise<EstablishmentEntity> {
        throw new Error("Method not implemented.");
    };

    create(entityToCreate: CreateEstablishmentDTO): Promise<EstablishmentEntity> {
        throw new Error("Method not implemented.");
    };

    update(id: number, entityToUpdate: UpdateEstablishmentDTO): Promise<EstablishmentEntity> {
        throw new Error("Method not implemented.");
    };

    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    };

};