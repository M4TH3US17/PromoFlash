import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { APIResponseDTO } from "@shared/bases/usecase-response.dto";
import { ContactVerificationRequestDTO } from "./others/dto/request-contact-verification.dto";
import { ResponseContactVerificationDTO } from "./others/dto/response-contact-verification.dto";
import { ContactVerificationEntity } from "./contact-verification.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfirmCodeRequestDTO } from "./others/dto/request-confirm-code.dto";
import { UserEntity } from "@modules/user/user.entity";

@Injectable()
export class ContactVerificationService {

    constructor(
        @InjectRepository(ContactVerificationEntity)
        private readonly repository: Repository<ContactVerificationEntity>,
    ) {}

    public async confirmCode(request: ConfirmCodeRequestDTO, tokenJWT: string) {

        // const contact: ContactVerificationEntity = await this.repository.
        // findOne({
        //     where: {
        //         id: request.contactId,
        //         contact_type: request.contactType,
        //         // adicionar o id do usuario (pegar no header da requisição)
        //     },
        //     relations: ["user"]
        // });

        return null;
    };

};