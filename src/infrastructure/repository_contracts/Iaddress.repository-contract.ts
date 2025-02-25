import { CreateAddressRequestDTO, UpdateAddressRequestDTO } from "@modules/address/others/dto/request-address.dto";
import { AddressEntity } from "src/modules/address/address.entity";
import { IBaseRepositoryContract } from "src/shared/bases/Ibase.repository-contract";

export interface IAddressRepositoryContract
    extends IBaseRepositoryContract<
        UpdateAddressRequestDTO,
        CreateAddressRequestDTO,
        AddressEntity
    > {
        
};