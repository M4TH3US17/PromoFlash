import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { UseCaseResponseDTO } from "src/shared/bases/usecase-response.dto";
import { EstablishmentEntity } from "../establishment.entity";
import { PaginatedList } from "src/shared/types/pagination.types";
import { EstablishmentPaginationDTO } from "../others/dto/pagination-establishment.dto";

@Injectable()
export class GetAllEstablishmentsUseCase {

    constructor(
        // @Inject("ESTABLISHMENT_REPOSITORY")
        // private readonly establishmentRepository: IEstablishmentRepositoryContract,
    ) { }

    // async executeAsync(pagination: EstablishmentPaginationDTO): Promise<UseCaseResponseDTO> {
    //     try {
    //         const establishments: PaginatedList<EstablishmentEntity> = await this.establishmentRepository.getAllAsync(pagination);

    //         return {
    //             statusCode: HttpStatus.OK,
    //             message: "",
    //             data: []
    //         };
    //     } catch (error) {
    //         if (error instanceof HttpException) throw error;
    //         throw new HttpException("Desculpe, houve um erro interno no servidor. Por favor, contatar o suporte.", HttpStatus.INTERNAL_SERVER_ERROR);
    //     };
    // };

};