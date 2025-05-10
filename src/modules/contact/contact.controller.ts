import { Body, Controller, HttpStatus, Param, Put, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { Roles } from "@modules/authentication/others";
import { UserRole } from "@modules/user/others/enums/user-role.enum";
import { ContactVerificationService } from "./verification/verification.service";
import { ConfirmCodeRequestDTO } from "./verification/dto/confirm-code.dto";

@Controller({
    path: "verification"
})
@ApiBearerAuth('JWT-auth')
export class ContactController {

    constructor(
        private readonly service: ContactVerificationService,
    ) { }

    @Put(":id")
    @Roles([UserRole.ADMIN, UserRole.USER])
    @ApiOperation({ summary: "Realiza a validação do token de verificação enviado para o usuário" })
    public async confirmCode(
        @Param("id") contactId: number,
        @Body() request: ConfirmCodeRequestDTO,
        @Res() res: Response,
        @Req() req
    ) {
        const userAttemptingValidation: string = req.user.username;
        const data = this.service.confirmCode(contactId, request, userAttemptingValidation);
        return res.status(HttpStatus.OK).send(data);
    };

};