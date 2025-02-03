import { EstablishmentEntity } from "./establishment.entity";
import { CreateEstablishmentRequestDTO } from "./dto/create-establishment.dto";
import { UpdateEstablishmentRequestDTO } from "./dto/update-establishment.dto";
import { IEstablishmentRepositoryContract } from "src/infrastructure/repository_contracts/Iestablishment.repository-contract";

class EstablishmentRepositoryImpl implements IEstablishmentRepositoryContract {

    getAllAsync(): Promise<EstablishmentEntity[]> {
        throw new Error("Method not implemented.");
    };

    getByIdAsync(id: number): Promise<EstablishmentEntity> {
        throw new Error("Method not implemented.");
    };

    createAsync(entityToCreate: CreateEstablishmentRequestDTO): Promise<EstablishmentEntity> {
        throw new Error("Method not implemented.");
    };

    updateAsync(id: number, entityToUpdate: UpdateEstablishmentRequestDTO): Promise<EstablishmentEntity> {
        throw new Error("Method not implemented.");
    };

    deleteAsync(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    };

};