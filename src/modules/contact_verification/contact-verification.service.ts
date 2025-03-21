import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { APIResponseDTO } from "@shared/bases/usecase-response.dto";
import { ContactVerificationRequestDTO } from "./others/dto/request-contact-verification.dto";
import { ResponseContactVerificationDTO } from "./others/dto/response-contact-verification.dto";
import { ContactVerificationEntity } from "./contact-verification.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ContactVerificationService {

    constructor(
        @InjectRepository(ContactVerificationEntity)
        private readonly repository: Repository<ContactVerificationEntity>,
    ) {}

    public async validateContact(request: ContactVerificationRequestDTO): Promise<ResponseContactVerificationDTO> {
        const contact: ContactVerificationEntity = await this.repository.
        findOne({
            where: {
                id: request.contactId,
                contact_type: request.contactType,
                // adicionar o id do usuario (pegar no header da requisição)
            },
            relations: ["user"]
        });

        if(!contact) 
            throw new HttpException(`${request.contactType} não foi encontrado na base de dados!`, HttpStatus.NOT_FOUND);

        return {
            
        }
    };

};