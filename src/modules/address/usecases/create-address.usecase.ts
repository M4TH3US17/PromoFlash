import { HttpStatus, Inject, Logger } from "@nestjs/common";
import { IAddressRepositoryContract } from "src/infrastructure/repository_contracts/Iaddress.repository-contract";
import { UseCaseResponseDTO } from "src/shared/bases/usecase-response.dto";
import { CreateAddressRequestDTO } from "../dto/request-address.dto";

export class CreateAddressUseCase {
    private logger: Logger = new Logger(CreateAddressUseCase.name);

    constructor(
        @Inject("ADDRESS_REPOSITORY")
        private readonly addressRepository: IAddressRepositoryContract,
    ) {}

    public async executeAsync(request: CreateAddressRequestDTO): Promise<UseCaseResponseDTO> {
        return {
            statusCode: HttpStatus.CREATED,
            message: ``,
            data: null
        }
    };

};