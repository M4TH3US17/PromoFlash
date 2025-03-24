import { Body, Controller, Headers, HttpException, HttpStatus, Inject, Put, Req, Res } from "@nestjs/common";
import { ContactVerificationService } from "./contact-verification.service";
import { ContactVerificationRequestDTO } from "./others/dto/request-contact-verification.dto";
import { Response } from "express";
import { APIResponseDTO } from "@shared/bases/usecase-response.dto";
import { ResponseContactVerificationDTO } from "./others/dto/response-contact-verification.dto";
import { ConfirmCodeRequestDTO } from "./others/dto/request-confirm-code.dto";
import { ApiOperation } from "@nestjs/swagger";

@Controller({ 
    path: "verification"
 })
export class ContactVerificationController {

    constructor(
        private readonly service: ContactVerificationService,
    ) {}

    // @Put()
    // public async validateContact(
    //     @Body() request: ContactVerificationRequestDTO, 
    //     @Res() res: Response,
    // ) {
    //     try {
    //         const response: ResponseContactVerificationDTO = await this.service.validateContact(request);
    //         return res.status(HttpStatus.OK).json(response);
    //     } catch(error) {
    //         console.log(error)
    //         throw new HttpException("Houve um erro interno no servidor!", HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // };

    @Put()
    @ApiOperation({ summary: "Realiza a validação do token de verificação enviado para o usuário" })
    public async confirmCode(
        @Body() request: ConfirmCodeRequestDTO,
        @Res() res: Response,
        @Headers() headers: Record<string, string>
    ) {
        const data = this.service.confirmCode(request, headers['authorization']);
        return res.status(HttpStatus.OK).send(data);
    };

};