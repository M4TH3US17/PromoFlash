import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IEstablishmentRepositoryContract } from "src/infrastructure/repository_contracts/Iestablishment.repository-contract";
import { UseCaseResponseDTO } from "src/shared/bases/usecase-response.dto";
import { EstablishmentEntity } from "../establishment.entity";
import { PaginatedList } from "src/shared/types/pagination.types";
import { FindEstablishmentByCNPJUseCase } from "src/infrastructure/external_services/br_federal_revenue_service/usecases/find-establishment-by-cnpj.usecase";
import { CreateEstablishmentRequestDTO } from "../dto/request-establishment.dto";


@Injectable()
export class CreateEstablishmentsUseCase {

    constructor(
        @Inject("ESTABLISHMENT_REPOSITORY")
        private readonly establishmentRepository: IEstablishmentRepositoryContract,
        private readonly findEstablishmentByCNPJUseCase: FindEstablishmentByCNPJUseCase,
    ) { }

    async executeAsync(request: CreateEstablishmentRequestDTO): Promise<UseCaseResponseDTO> {
        try {
            const establishment = await this.findEstablishmentByCNPJUseCase.executeAsync(request.cnpj);
            //const establishments: PaginatedList<EstablishmentEntity> = await this.establishmentRepository.createAsync();

            return {
                statusCode: HttpStatus.CREATED,
                message: "",
                data: establishment
            };
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new HttpException("Desculpe, houve um erro interno no servidor. Por favor, catatar o suporte.", HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

};