import { AddressEntity } from "src/modules/address/address.entity";
import { CreateAddressRequestDTO } from "src/modules/address/dto/create-address.dto";
import { UpdateAddressRequestDTO } from "src/modules/address/dto/update-address.dto";
import { IBaseRepositoryContract } from "src/shared/bases/Ibase.repository-contract";

export interface IAddressRepositoryContract
    extends IBaseRepositoryContract<
        UpdateAddressRequestDTO,
        CreateAddressRequestDTO,
        AddressEntity
    > {
        
};