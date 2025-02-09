import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IContactRepositoryContract } from "src/infrastructure/repository_contracts/Icontract.repository-contract";
import { UseCaseResponseDTO } from "src/shared/bases/usecase-response.dto";
import { ContactPaginationDTO } from "../dto/pagination-contact.dto";
import { ContactEntity } from "../contact.entity";

@Injectable()
export class GetAllContactsUseCase {

    constructor(
        @Inject("CONTACT_REPOSITORY")
        private readonly contactRepository: IContactRepositoryContract,
    ) { }

    public async executeAsync(pagination: ContactPaginationDTO): Promise<UseCaseResponseDTO> {
        try {
            const contacts: ContactEntity[] = await this.contactRepository.getAllAsync(pagination);

            return {
                statusCode: HttpStatus.OK,
                message: "",
                data: []
            };
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new HttpException("Desculpe, houve um erro interno no servidor. Por favor, catatar o suporte.", HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

};