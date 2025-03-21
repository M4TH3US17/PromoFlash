import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Raw, Repository } from "typeorm";
import { CreateUserRequestDTO } from "./others/dto/create-user.dto";
import { ResponseUserDTO } from "./others/dto/response-user.dto";
import { mapUserEntityToDTO, mapUserRequestToEntity } from "./others";
import { UserPaginationDTO } from "./others/dto/pagination-user.dto";
import { AddressEntity } from "@modules/address/address.entity";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>,
        @InjectRepository(AddressEntity)
        private readonly addressRepository: Repository<AddressEntity>,
    ) { }

    public async getAll(pagination: UserPaginationDTO): Promise<ResponseUserDTO[]> {
        try {
            const users: UserEntity[] = await this.repository.find({
                relations: [
                    "addresses",
                    "phones",
                    "emails",
                    "followingEstablishments",
                ]
            });
            //const users: PaginatedList<UserEntity> = await this.repository.getAllAsync(pagination);
            return users.map(user => mapUserEntityToDTO(user));
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new HttpException("Desculpe, houve um erro interno no servidor. Por favor, catatar o suporte.", HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    public async create(request: CreateUserRequestDTO): Promise<ResponseUserDTO> {
        const userAlreadyExists: boolean = await this.existsByUsername(request.username);

        if (userAlreadyExists)
            throw new HttpException(`Usuário de username ${request.username} já existe na base de dados!`, HttpStatus.CONFLICT);

        const userToBeCreated: UserEntity = mapUserRequestToEntity(request);
        const userCreated: UserEntity = await this.repository.save(userToBeCreated);
        return mapUserEntityToDTO(userCreated);
    };

    public async existsByUsername(username: string): Promise<boolean> {
        const userFound: UserEntity = await this.repository.findOne({
            where: { username: Raw(alias => `REPLACE(LOWER(${alias}), ' ', '') = REPLACE(LOWER(:username), ' ', '')`, { username }) }
        });

        return userFound ? true : false;
    };

};