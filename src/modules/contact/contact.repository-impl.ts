import { IContactRepositoryContract } from "src/infrastructure/repository_contracts/Icontract.repository-contract";
import { ContactEntity } from "./contact.entity";
import { CreateContactDTO, UpdateContactDTO } from "./dto/contact.dto";

class ContactRepositoryImpl implements IContactRepositoryContract {

    getAll(): Promise<ContactEntity[]> {
        throw new Error("Method not implemented.");
    };

    getById(id: number): Promise<ContactEntity> {
        throw new Error("Method not implemented.");
    };

    create(entityToCreate: CreateContactDTO): Promise<ContactEntity> {
        throw new Error("Method not implemented.");
    };

    update(id: number, entityToUpdate: UpdateContactDTO): Promise<ContactEntity> {
        throw new Error("Method not implemented.");
    };

    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    };

};