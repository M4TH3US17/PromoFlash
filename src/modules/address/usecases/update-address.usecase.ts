import { HttpStatus, Inject, Logger } from "@nestjs/common";
import { IAddressRepositoryContract } from "src/infrastructure/repository_contracts/Iaddress.repository-contract";
import { UseCaseResponseDTO } from "src/shared/bases/usecase-response.dto";
import { UpdateAddressRequestDTO } from "../others/dto/request-address.dto";

export class UpdateAddressUseCase {
    private logger: Logger = new Logger(UpdateAddressUseCase.name);

    constructor(
        @Inject("ADDRESS_REPOSITORY")
        private readonly addressRepository: IAddressRepositoryContract,
    ) {}

    public async executeAsync(id: number, request: UpdateAddressRequestDTO): Promise<UseCaseResponseDTO> {
        return {
            statusCode: HttpStatus.OK,
            message: ``,
            data: null
        }
    };

};