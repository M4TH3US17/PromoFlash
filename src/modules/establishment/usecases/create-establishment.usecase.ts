import { HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { IEstablishmentRepositoryContract } from "src/infrastructure/repository_contracts/Iestablishment.repository-contract";
import { UseCaseResponseDTO } from "src/shared/bases/usecase-response.dto";
import { FindEstablishmentByCNPJUseCase } from "src/infrastructure/external_services/br_federal_revenue_service/usecases/find-establishment-by-cnpj.usecase";
import { EstablishmentDTO } from "src/infrastructure/external_services/br_federal_revenue_service/dto/response-cnpj-searched.dto";
import { EstablishmentEntity } from "../establishment.entity";
import { EstablishmentType } from "../others/enums/establishment-type.enum";
import { CreateEstablishmentRequestDTO } from "../others/dto/request-establishment.dto";

@Injectable()
export class CreateEstablishmentsUseCase {
    private readonly logger: Logger = new Logger(CreateEstablishmentsUseCase.name);

    constructor(
        @Inject("ESTABLISHMENT_REPOSITORY")
        private readonly establishmentRepository: IEstablishmentRepositoryContract,
        private readonly findEstablishmentByCNPJUseCase: FindEstablishmentByCNPJUseCase,
    ) { }

    async executeAsync(request: CreateEstablishmentRequestDTO): Promise<UseCaseResponseDTO> {
        try {
            this.logger.log(`Iniciando cadastro de um estabelecimento de CNPJ=${request.cnpj} e nome=${request.name}`);
            const brazilianFederalRevenue: EstablishmentDTO = await this.findEstablishmentByCNPJUseCase.executeAsync(request.cnpj); // busca na cnpj na receita federal
            const establishment: EstablishmentEntity = await this.establishmentRepository.getByCNPJAsync(request.cnpj);

            if (establishment)
                throw new HttpException('Já há um estabelecimento cadastrado com este CNPJ.', HttpStatus.CONFLICT);

            if ((brazilianFederalRevenue.descricao_identificador_matriz_filial === "FILIAL") ||
                (request.establishmentType === EstablishmentType.BRANCH)) {
                this.logger.log(`Estabelecimento informado é uma filial`);
                // enviar um SMS de verificacao para o contato do dono do CNPJ
                // depois, enviar um SMS ou email para o contato da loja matriz para verificar se o CNPJ realmente é valido

                return {
                    statusCode: HttpStatus.CREATED,
                    message: "",
                    data: brazilianFederalRevenue
                };
            };

            this.logger.log(`Estabelecimento informado é uma loja matriz`);
            // Problemas ao persistir uma nova matriz:
            // - Existem matrizes regionais (como lidar com várias lojas matriz e suas filiais ao mesmo tempo?)
            // - Algumas filiais usam o mesmo cnpj da matriz (quem é quem? quem é filial/matriz?)

            //const establishments: EstablishmentEntity = await this.establishmentRepository.createAsync();

            return {
                statusCode: HttpStatus.CREATED,
                message: "",
                data: brazilianFederalRevenue
            };
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new HttpException("Desculpe, houve um erro interno no servidor. Por favor, catatar o suporte.", HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

};