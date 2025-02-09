import { Injectable } from "@nestjs/common";
import { AddressEntity } from "./address.entity";
import { CreateAddressRequestDTO } from "./dto/create-address.dto";
import { UpdateAddressRequestDTO } from "./dto/update-address.dto";
import { IAddressRepositoryContract } from "src/infrastructure/repository_contracts/Iaddress.repository-contract";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AddressPaginationDTO } from "./dto/pagination-address.dto";

@Injectable()
export class AddressRepositoryImpl implements IAddressRepositoryContract {

    constructor(
        @InjectRepository(AddressEntity)
        private readonly addressRepository: Repository<AddressEntity>,
    ) {}

    getAllAsync(pagination: AddressPaginationDTO): Promise<AddressEntity[]> {
        throw new Error("Method not implemented.");
    };

    getByIdAsync(id: number): Promise<AddressEntity> {
        throw new Error("Method not implemented.");
    };
    
    createAsync(entityToCreate: CreateAddressRequestDTO): Promise<AddressEntity> {
        throw new Error("Method not implemented.");
    };
    
    updateAsync(id: number, entityToUpdate: UpdateAddressRequestDTO): Promise<AddressEntity> {
        throw new Error("Method not implemented.");
    };
    
    deleteAsync(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    };

}