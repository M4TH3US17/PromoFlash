import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IEstablishmentRepositoryContract } from "src/infrastructure/repository_contracts/Iestablishment.repository-contract";
import { UseCaseResponseDTO } from "src/shared/bases/usecase-response.dto";
import { EstablishmentPaginationDTO } from "../dto/pagination-establishment.dto";
import { EstablishmentEntity } from "../establishment.entity";


@Injectable()
export class GetAllEstablishmentsUseCase {

    constructor(
        @Inject("ESTABLISHMENT_REPOSITORY")
        private readonly establishmentRepository: IEstablishmentRepositoryContract,
    ) { }

    async executeAsync(pagination: EstablishmentPaginationDTO): Promise<UseCaseResponseDTO> {
        try {
            const establishments: EstablishmentEntity[] = await this.establishmentRepository.getAllAsync(pagination);

            return {
                statusCode: HttpStatus.OK,
                message: "",
                data: []
            };
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new HttpException("Desculpe, houve um erro interno no servidor. Por favor, catatar o suporte.", HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

};