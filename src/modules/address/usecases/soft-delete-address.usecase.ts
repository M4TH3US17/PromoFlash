import { HttpStatus, Inject, Logger } from "@nestjs/common";
import { IAddressRepositoryContract } from "src/infrastructure/repository_contracts/Iaddress.repository-contract";
import { UseCaseResponseDTO } from "src/shared/bases/usecase-response.dto";


export class SoftDeleteAddressUseCase {
    private logger: Logger = new Logger(SoftDeleteAddressUseCase.name);

    constructor(
        @Inject("ADDRESS_REPOSITORY")
        private readonly addressRepository: IAddressRepositoryContract,
    ) {}

    public async executeAsync(id: number): Promise<UseCaseResponseDTO> {
        return {
            statusCode: HttpStatus.NO_CONTENT,
            message: ``,
            data: null
        }
    };

};