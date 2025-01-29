import { CreateEstablishmentDTO, UpdateEstablishmentDTO } from "src/modules/establishment/dto/establishment.dto";
import { EstablishmentEntity } from "src/modules/establishment/establishment.entity";
import { IBaseRepositoryContract } from "src/shared/bases/Ibase.repository-contract";

export interface IEstablishmentRepositoryContract
    extends IBaseRepositoryContract<
        EstablishmentEntity,
        UpdateEstablishmentDTO,
        CreateEstablishmentDTO
    > {
        
};