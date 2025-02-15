import { HttpStatus, Inject, Logger } from "@nestjs/common";
import { IAddressRepositoryContract } from "src/infrastructure/repository_contracts/Iaddress.repository-contract";
import { UseCaseResponseDTO } from "src/shared/bases/usecase-response.dto";

export class GetAddressByIdUseCase {
    private logger: Logger = new Logger(GetAddressByIdUseCase.name);

    constructor(
        @Inject("ADDRESS_REPOSITORY")
        private readonly addressRepository: IAddressRepositoryContract,
    ) {}

    public async executeAsync(id: number): Promise<UseCaseResponseDTO> {
        return {
            statusCode: HttpStatus.OK,
            message: ``,
            data: null
        }
    };

};