import { IAddressRepositoryContract } from "src/infrastructure/repository_contracts/Iaddress.repository-contract";
import { AddressEntity } from "./address.entity";
import { CreateAddressDTO, UpdateAddressDTO } from "./dto/address.dto";


class AddressRepositoryImpl implements IAddressRepositoryContract {

    getAll(): Promise<AddressEntity[]> {
        throw new Error("Method not implemented.");
    };

    getById(id: number): Promise<AddressEntity> {
        throw new Error("Method not implemented.");
    };
    
    create(entityToCreate: CreateAddressDTO): Promise<AddressEntity> {
        throw new Error("Method not implemented.");
    };
    
    update(id: number, entityToUpdate: UpdateAddressDTO): Promise<AddressEntity> {
        throw new Error("Method not implemented.");
    };
    
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}