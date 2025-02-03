import { CreateEstablishmentRequestDTO } from "src/modules/establishment/dto/create-establishment.dto";
import { UpdateEstablishmentRequestDTO } from "src/modules/establishment/dto/update-establishment.dto";
import { EstablishmentEntity } from "src/modules/establishment/establishment.entity";
import { IBaseRepositoryContract } from "src/shared/bases/Ibase.repository-contract";

export interface IEstablishmentRepositoryContract
    extends IBaseRepositoryContract<
        UpdateEstablishmentRequestDTO,
        CreateEstablishmentRequestDTO,
        EstablishmentEntity
    > {
        
};