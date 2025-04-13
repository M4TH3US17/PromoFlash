import { HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { UseCaseResponseDTO } from "src/shared/bases/usecase-response.dto";
import { EstablishmentEntity } from "../establishment.entity";
import { EstablishmentType } from "../others/enums/establishment-type.enum";
import { CreateEstablishmentRequestDTO } from "../others/dto/create-establishment.dto";
import { TwilioSMSService } from "@infrastructure/external_services/twilio/sms/sms.service";
import { formatPhoneNumberToSendSMS } from "@infrastructure/external_services/twilio/sms/sms.utils";
import { BrazilFederalRevenueService } from "@infrastructure/external_services/cnpj_service/brazil_federal_revenue/brazil-federal-revenue.service";

@Injectable()
export class CreateEstablishmentsUseCase {
    private readonly logger: Logger = new Logger(CreateEstablishmentsUseCase.name);

    constructor(
        // @Inject("ESTABLISHMENT_REPOSITORY")
        // private readonly establishmentRepository: IEstablishmentRepositoryContract,

        // External Services
        private readonly brazilFederalRevenueService: BrazilFederalRevenueService,
        private readonly SMSService: TwilioSMSService,
    ) { }

    // async executeAsync(request: CreateEstablishmentRequestDTO): Promise<UseCaseResponseDTO> {
    //     try {
    //         this.logger.log(`Iniciando cadastro de um estabelecimento de CNPJ=${request.cnpj} e nome=${request.name}`);

    //         const brazilianFederalRevenue: EstablishmentDTO = await this.brazilFederalRevenueService.findEstablishmentByCNPJ(request.cnpj);
    //         //const establishment: EstablishmentEntity = await this.establishmentRepository.getByCNPJAsync(request.cnpj);

    //         //if (establishment)
    //         //    throw new HttpException('Já há um estabelecimento cadastrado com este CNPJ.', HttpStatus.CONFLICT);

    //         const formattedPhone: string = formatPhoneNumberToSendSMS(request.firstPhone);

    //         const verificationCode1: number = generateRandomCode();
    //         const verificationCode2: number = generateRandomCode();
            
    //         await this.SMSService.sendSMS(formattedPhone, `Teste 1: ${verificationCode1}`); // Enviar um SMS de verificacao para o contato informado
    //        // await this.SMSService.sendSMS(firstContactFormatted, `Teste 2: ${verificationCode2}`); // Enviar um SMS para o contato da loja matriz para verificar se o estabelecimento realmente é valido/filial

    //         const isBranchOrFranchise: boolean = (brazilianFederalRevenue.descricao_identificador_matriz_filial === "FILIAL") || (request.establishmentType === EstablishmentType.BRANCH);
    //         if (isBranchOrFranchise) {
    //             this.logger.log(`Estabelecimento informado é uma filial`);

    //             return {
    //                 statusCode: HttpStatus.CREATED,
    //                 message: "Estabelecimento filiado/franqueado cadastrado com sucesso!",
    //                 data: brazilianFederalRevenue
    //             };
    //         };

    //         this.logger.log(`Estabelecimento informado é uma loja matriz`);
    //         // Problemas ao persistir uma nova matriz:
    //         // - Existem matrizes regionais (como lidar com várias lojas matriz e suas filiais ao mesmo tempo?)
    //         // - Algumas filiais usam o mesmo cnpj da matriz (quem é quem? quem é filial/matriz?)

    //         //const establishments: EstablishmentEntity = await this.establishmentRepository.createAsync();

    //         return {
    //             statusCode: HttpStatus.CREATED,
    //             message: "Estabelecimento matriz cadastrado com sucesso!",
    //             data: brazilianFederalRevenue
    //         };
    //     } catch (error) {
    //         if (error instanceof HttpException) throw error;
    //         throw new HttpException("Desculpe, houve um erro interno no servidor. Por favor, contatar o suporte.", HttpStatus.INTERNAL_SERVER_ERROR);
    //     };
    // };

};