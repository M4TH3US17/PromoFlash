import { AddressEntity } from "src/modules/address/address.entity";
import { CreateAddressDTO, UpdateAddressDTO } from "src/modules/address/dto/address.dto";
import { IBaseRepositoryContract } from "src/shared/bases/Ibase.repository-contract";

export interface IAddressRepositoryContract
    extends IBaseRepositoryContract<
        AddressEntity,
        UpdateAddressDTO,
        CreateAddressDTO
    > {
        
};