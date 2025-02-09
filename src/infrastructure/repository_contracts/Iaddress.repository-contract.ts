import { AddressEntity } from "src/modules/address/address.entity";
import { CreateAddressRequestDTO, UpdateAddressRequestDTO } from "src/modules/address/dto/request-address.dto";
import { IBaseRepositoryContract } from "src/shared/bases/Ibase.repository-contract";

export interface IAddressRepositoryContract
    extends IBaseRepositoryContract<
        UpdateAddressRequestDTO,
        CreateAddressRequestDTO,
        AddressEntity
    > {
        
};