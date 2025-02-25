import { IContactVerificationRepositoryContract } from "@infrastructure/repository_contracts/Icontact-verification.repository-contract";
import { BasePaginationDTO } from "@shared/bases/base-pagination.dto";
import { PaginatedList } from "@shared/types/pagination.types";
import { ContactVerificationEntity } from "./contact-verification.entity";
import { CreateContactVerificationDTO, UpdateContactVerificationDTO } from "./others/dto/request-contact-verification.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ContactVerificationRepositoryImpl implements IContactVerificationRepositoryContract {

    constructor(
        @InjectRepository(ContactVerificationEntity)
        private readonly repository: Repository<ContactVerificationEntity>,
    ) {}


    async getByIdAsync(id: number): Promise<ContactVerificationEntity> {
        throw new Error("Method not implemented.");
    };

    async getAllAsync(pagination: BasePaginationDTO<ContactVerificationEntity>): Promise<PaginatedList<ContactVerificationEntity>> {
        throw new Error("Method not implemented.");
    };

    async createAsync(entityToCreate: CreateContactVerificationDTO): Promise<ContactVerificationEntity> {
        throw new Error("Method not implemented.");
    };

    async updateAsync(id: number, entityToUpdate: UpdateContactVerificationDTO): Promise<ContactVerificationEntity> {
        throw new Error("Method not implemented.");
    };

    async deleteAsync(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    };

};