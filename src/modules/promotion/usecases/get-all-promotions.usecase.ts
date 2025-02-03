import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IPromotionRepositoryContract } from "src/infrastructure/repository_contracts/Ipromotion.repository-contract";
import { UseCaseResponseDTO } from "src/shared/bases/usecase-response.dto";


@Injectable()
export class GetAllPromotionsUseCase {

    constructor(
        @Inject("PROMOTION_REPOSITORY")
        private readonly promotionRepository: IPromotionRepositoryContract,
    ) { }

    async executeAsync(): Promise<UseCaseResponseDTO> {
        try {

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