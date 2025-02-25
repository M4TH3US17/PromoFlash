import { CreateEstablishmentRequestDTO, UpdateEstablishmentRequestDTO } from "@modules/establishment/others/dto/request-establishment.dto";
import { EstablishmentEntity } from "src/modules/establishment/establishment.entity";
import { IBaseRepositoryContract } from "src/shared/bases/Ibase.repository-contract";

export interface IEstablishmentRepositoryContract
    extends IBaseRepositoryContract<
        UpdateEstablishmentRequestDTO,
        CreateEstablishmentRequestDTO,
        EstablishmentEntity
    > {

    getByCNPJAsync(cnpj: string): Promise<EstablishmentEntity>;
   // isAffiliatedToMainStoreAsync(cnpjAffiliated: string, cnpjMainStore: string): Promise<boolean>;

};