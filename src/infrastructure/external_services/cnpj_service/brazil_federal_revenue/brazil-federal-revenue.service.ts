import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import axios from "axios";
import { ResponseBrazilianFederalRevenueDTO } from "./dto/response-cnpj-searched.dto";

@Injectable()
export class BrazilFederalRevenueService {

    public async findEstablishmentByCNPJ(cnpj: string): Promise<ResponseBrazilianFederalRevenueDTO> {
        try {
            const response = await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);

            if (response.status !== 200)
                throw new HttpException(`Falha ao consultar o CNPJ ${cnpj}.`, HttpStatus.INTERNAL_SERVER_ERROR);

            if(response.data.descricao_situacao_cadastral !== "ATIVA") 
                throw new HttpException(`CNPJ informado não está ativo na Receita Federal.`, HttpStatus.BAD_REQUEST);
            
            return Object.assign(new ResponseBrazilianFederalRevenueDTO(), response.data);

        } catch (error) {
            if (axios.isAxiosError(error))
                throw new HttpException(`Erro ao consultar a API para o CNPJ ${cnpj}: ${error.message}`, HttpStatus.BAD_GATEWAY);
            else 
                throw new HttpException('Erro desconhecido ao consultar CNPJ.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};