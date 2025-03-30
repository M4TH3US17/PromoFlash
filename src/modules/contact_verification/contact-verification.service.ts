import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { APIResponseDTO } from "@shared/bases/usecase-response.dto";
import { ContactVerificationRequestDTO } from "./others/dto/request-contact-verification.dto";
import { ResponseContactVerificationDTO } from "./others/dto/response-contact-verification.dto";
import { ContactVerificationEntity } from "./contact-verification.entity";
import { Raw, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfirmCodeRequestDTO } from "./others/dto/request-confirm-code.dto";
import { UserEntity } from "@modules/user/user.entity";

@Injectable()
export class ContactVerificationService {

    constructor(
        @InjectRepository(ContactVerificationEntity)
        private readonly repository: Repository<ContactVerificationEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    public async confirmCode(
        contactId: number,
        request: ConfirmCodeRequestDTO,
        requestingUsername: string,
    ) {
        const contact: ContactVerificationEntity = await this.repository.
            findOne({
                where: {
                    id: contactId,
                    contact_type: request.contactType,
                },
                relations: ["user"]
            });

        // if(!contact)
        //     throw new HttpException(`Nenhuma verificação de ID ${contactId} foi encontrada!`, HttpStatus.NOT_FOUND);

        const contactOwnerUsername: string = contact.user.username.toUpperCase();
        requestingUsername = requestingUsername.toUpperCase()

        if (requestingUsername !== contactOwnerUsername) {
            throw new HttpException(`Você não possui permissões para alterar dados de ${contactOwnerUsername}`, HttpStatus.FORBIDDEN);
        };

        return null;
    };

};