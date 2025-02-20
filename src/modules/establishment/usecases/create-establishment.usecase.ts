import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IEstablishmentRepositoryContract } from "src/infrastructure/repository_contracts/Iestablishment.repository-contract";
import { UseCaseResponseDTO } from "src/shared/bases/usecase-response.dto";
import { EstablishmentEntity } from "../establishment.entity";
import { PaginatedList } from "src/shared/types/pagination.types";
import { FindEstablishmentByCNPJUseCase } from "src/infrastructure/external_services/br_federal_revenue_service/usecases/find-establishment-by-cnpj.usecase";
import { CreateEstablishmentRequestDTO } from "../dto/request-establishment.dto";
import { EstablishmentDTO } from "src/infrastructure/external_services/br_federal_revenue_service/dto/response-cnpj-searched.dto";


@Injectable()
export class CreateEstablishmentsUseCase {

    constructor(
        @Inject("ESTABLISHMENT_REPOSITORY")
        private readonly establishmentRepository: IEstablishmentRepositoryContract,
        private readonly findEstablishmentByCNPJUseCase: FindEstablishmentByCNPJUseCase,
    ) { }

    async executeAsync(request: CreateEstablishmentRequestDTO): Promise<UseCaseResponseDTO> {
        try {
            const cnpjFormatted: string = request.cnpj;
            const establishment: EstablishmentDTO = await this.findEstablishmentByCNPJUseCase.executeAsync(cnpjFormatted);

            if(establishment.descricao_situacao_cadastral !== "ATIVA") 
                throw new HttpException(`O CNPJ informado não está ativo na Receita Federal e não pode ser cadastrado.`, HttpStatus.BAD_REQUEST);
            
            if (!establishment.razao_social) 
                throw new HttpException("O CNPJ informado não é válido ou não está registrado na Receita Federal.", HttpStatus.BAD_REQUEST);

            if((establishment.descricao_identificador_matriz_filial === "FILIAL") || request.main_fk) {
                // verificar se ja existe um cnpj cadastrado
                // enviar um SMS de verificacao para os contatos em `establishment`
                console.log("é filial")    
            };

            /* verificar se ja existe na base de dados um cnpj de main_fk igual a null. Se sim, disparar erro informando que
               já há uma matriz cadastrada
            */
            const isMainStore: boolean = await this.establishmentRepository.isMainStoreAsync(cnpjFormatted, request.main_fk);

            console.log("é matriz");
            
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