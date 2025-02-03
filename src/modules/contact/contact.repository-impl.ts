import { Injectable } from "@nestjs/common";
import { ContactEntity } from "./contact.entity";
import { CreateContactRequestDTO } from "./dto/create-contact.dto";
import { UpdateContactRequestDTO } from "./dto/update-contact.dto";
import { IContactRepositoryContract } from "src/infrastructure/repository_contracts/Icontract.repository-contract";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ContactRepositoryImpl implements IContactRepositoryContract {

    constructor(
        @InjectRepository(ContactEntity)
        private readonly contactRepository: Repository<ContactEntity>,
    ) {}

    getAllAsync(): Promise<ContactEntity[]> {
        throw new Error("Method not implemented.");
    };

    getByIdAsync(id: number): Promise<ContactEntity> {
        throw new Error("Method not implemented.");
    };

    createAsync(entityToCreate: CreateContactRequestDTO): Promise<ContactEntity> {
        throw new Error("Method not implemented.");
    };

    updateAsync(id: number, entityToUpdate: UpdateContactRequestDTO): Promise<ContactEntity> {
        throw new Error("Method not implemented.");
    };

    deleteAsync(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    };

};