import { EstablishmentEntity } from "src/modules/establishment/establishment.entity";
import { CreateEstablishmentRequestDTO, UpdateEstablishmentRequestDTO } from "src/modules/establishment/dto/request-establishment.dto";
import { IBaseRepositoryContract } from "src/shared/bases/Ibase.repository-contract";

export interface IEstablishmentRepositoryContract
    extends IBaseRepositoryContract<
        UpdateEstablishmentRequestDTO,
        CreateEstablishmentRequestDTO,
        EstablishmentEntity
    > {
        
};