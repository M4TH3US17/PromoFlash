import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import axios from "axios";
import { EstablishmentDTO } from "../dto/response-cnpj-searched.dto";

@Injectable()
export class FindEstablishmentByCNPJUseCase {

    public async executeAsync(cnpj: string): Promise<EstablishmentDTO> {
        try {
            const response = await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);

            if (response.status !== 200)
                throw new HttpException(`Falha ao consultar o CNPJ ${cnpj}.`, HttpStatus.INTERNAL_SERVER_ERROR);

            return Object.assign(new EstablishmentDTO(), response.data);

        } catch (error) {
            if (axios.isAxiosError(error))
                throw new HttpException(`Erro ao consultar a API para o CNPJ ${cnpj}: ${error.message}`, HttpStatus.BAD_GATEWAY);
            else 
                throw new HttpException('Erro desconhecido ao consultar CNPJ.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

};