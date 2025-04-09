import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { APIResponseDTO } from "@shared/bases/usecase-response.dto";
import { ContactVerificationRequestDTO } from "./others/dto/request-contact-verification.dto";
import { ResponseContactVerificationDTO } from "./others/dto/response-contact-verification.dto";
import { ContactVerificationEntity } from "./contact-verification.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfirmCodeRequestDTO } from "./others/dto/request-confirm-code.dto";
import { UserEntity } from "@modules/user/user.entity";
import { TokenType } from "./others/enums/token-type.enum";
import { capitalize } from "@shared/utils/global.utils";

@Injectable()
export class ContactVerificationService {

    constructor(
        @InjectRepository(ContactVerificationEntity)
        private readonly repository: Repository<ContactVerificationEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    public async confirmCode(contactId: number, request: ConfirmCodeRequestDTO, requestingUsername: string) {
        const verification: ContactVerificationEntity = await this.repository.
            findOne({
                where: { id: contactId, contact_type: request.contactType },
                relations: ["user"]
            });

        if (!verification) // verifica se o token informado existe
            throw new HttpException(`Nenhuma verificação de contato cujo ID seja ${contactId} foi encontrado!`, HttpStatus.NOT_FOUND);

        if (verification.used_at) // verifica se o token informado já foi usado
            throw new HttpException(`Token de ${verification.contact_type} cujo ID é ${contactId} já foi utilizado!`, HttpStatus.UNAUTHORIZED);

        if (verification.expired_at < new Date()) // verifica se o token informado já expirou
            throw new HttpException(`Token de ${verification.contact_type} (ID: ${contactId}) expirado em ${verification.expired_at.toISOString()}`, HttpStatus.UNAUTHORIZED);

        const contactOwnerUsername: string = verification.user.username.toUpperCase();
        const isNotContactOwner: boolean = (requestingUsername.toUpperCase() !== contactOwnerUsername); // usuário q está enviando a requisição é o msm q gerou o token ?

        if (isNotContactOwner && (verification.token_type === TokenType.CONFIRMATION)) // se for token de confirmação, usuário só pode usar se ele próprio gerou
            throw new HttpException(`Você não possui permissões para alterar os dados de ${capitalize(contactOwnerUsername)}`, HttpStatus.FORBIDDEN);

        if (verification.token !== request.token) // token informado é o mesmo token que foin enviado para o usuário?
            throw new HttpException(`Token de verificação fornecido está incorreto!`, HttpStatus.BAD_REQUEST);

        if (verification.contact_type !== request.contactType) // o token gerado para o contato X é o mesmo que o do token gerado?
            throw new HttpException(`Nenhum token de verificação para ${request.contactType} está em aberto!`, HttpStatus.BAD_REQUEST);

        verification.used_at = new Date();
        verification.updatedAt = new Date();
        await this.repository.save(verification);

        return null;
    };

};
// if(verification.token_type === TokenType.CONFIRMATION) {
//     await this.repository.save(verification);
// };

// if(verification.token_type === TokenType.RECOVERY) {
//     await this.repository.save(verification);
// };