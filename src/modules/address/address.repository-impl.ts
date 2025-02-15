import { Injectable, Logger } from "@nestjs/common";
import { AddressEntity } from "./address.entity";
import { IAddressRepositoryContract } from "src/infrastructure/repository_contracts/Iaddress.repository-contract";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AddressPaginationDTO } from "./dto/pagination-address.dto";
import { CreateAddressRequestDTO, UpdateAddressRequestDTO } from "./dto/request-address.dto";
import { IGetListArgs, PaginatedList } from "src/shared/types/pagination.types";

@Injectable()
export class AddressRepositoryImpl implements IAddressRepositoryContract {
    private logger: Logger = new Logger(AddressRepositoryImpl.name);

    constructor(
        @InjectRepository(AddressEntity)
        private readonly addressRepository: Repository<AddressEntity>,
    ) { }

    async getAllAsync(pagination: AddressPaginationDTO): Promise<PaginatedList<AddressEntity>> {
        this.logger.log(`[AddressRepositoryImpl] Iniciando busca paginada na base de dados...`);
        const { filterBy, key, limit, offset, orderBy, sort }: IGetListArgs<AddressEntity> = pagination;
        const queryBuilder = await this.addressRepository.createQueryBuilder('address');
    
        if (filterBy && key) {
            await queryBuilder.where(`address.${filterBy} LIKE :key`, { key: `%${key}%` });
        };
    
        if (orderBy) {
            await queryBuilder.orderBy(`address.${orderBy}`, sort?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');
        }

        await queryBuilder.skip(offset).take(limit);
        const [data, total] = await queryBuilder.getManyAndCount();

        return { data, total };
    };

    async getByIdAsync(id: number): Promise<AddressEntity> {
        throw new Error("Method not implemented.");
    };

    async createAsync(entityToCreate: CreateAddressRequestDTO): Promise<AddressEntity> {
        throw new Error("Method not implemented.");
    };

    async updateAsync(id: number, entityToUpdate: UpdateAddressRequestDTO): Promise<AddressEntity> {
        throw new Error("Method not implemented.");
    };

    async deleteAsync(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    };

}