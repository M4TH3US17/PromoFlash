import { HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { IAddressRepositoryContract } from "src/infrastructure/repository_contracts/Iaddress.repository-contract";
import { UseCaseResponseDTO } from "src/shared/bases/usecase-response.dto";
import { AddressPaginationDTO } from "../dto/pagination-address.dto";
import { AddressEntity } from "../address.entity";
import { PaginatedList } from "src/shared/types/pagination.types";
import { parseAddressEntityToResponse } from "../others/addresses.utils";
import { AddressResponseDTO } from "../dto/response-address.dto";

@Injectable()
export class GetAllAddressesUseCase {
    private logger: Logger = new Logger(GetAllAddressesUseCase.name);

    constructor(
        @Inject("ADDRESS_REPOSITORY")
        private readonly addressRepository: IAddressRepositoryContract,
    ) { }

    public async executeAsync(pagination: AddressPaginationDTO): Promise<UseCaseResponseDTO> {
        this.logger.log(`[GetAllAddressesUseCase] Repassando parametros da URI para o repository. Dados: `, pagination);
        const addresses: PaginatedList<AddressEntity> = await this.addressRepository.getAllAsync(pagination);

        this.logger.log(`[GetAllAddressesUseCase] Convertendo listagem de entidades em DTO...`);
        const addressesDTO: AddressResponseDTO[] = addresses.data.map((item: AddressEntity) => parseAddressEntityToResponse(item));

        this.logger.log(`[GetAllAddressesUseCase] Retornando dados para o frontend...`);
        const message: string = (addressesDTO.length < 1) ? "Nenhum endereço localizado" : "Segue a listagem de endereços";
        const data: object = { data: addressesDTO, total: addresses.total };
        
        return {
            statusCode: HttpStatus.OK,
            message: message,
            data: data
        };
    };

};