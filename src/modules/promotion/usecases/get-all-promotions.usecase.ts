import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IPromotionRepositoryContract } from "src/infrastructure/repository_contracts/Ipromotion.repository-contract";
import { UseCaseResponseDTO } from "src/shared/bases/usecase-response.dto";
import { PromotionEntity } from "../promotion.entity";
import { PaginatedList } from "src/shared/types/pagination.types";
import { PromotionPaginationDTO } from "../others/dto/pagination-promotion.dto";

@Injectable()
export class GetAllPromotionsUseCase {

    constructor(
        @Inject("PROMOTION_REPOSITORY")
        private readonly promotionRepository: IPromotionRepositoryContract,
    ) { }

    async executeAsync(pagination: PromotionPaginationDTO): Promise<UseCaseResponseDTO> {
        try {
            const promotions: PaginatedList<PromotionEntity> = await this.promotionRepository.getAllAsync(pagination);

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