import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateEstablishmentRequestDTO } from "./others/dto/create-establishment.dto";
import { ResponseEstablishmentDTO } from "./others/dto/response-establishment.dto";
import { formatCNPJ, mapEstablishmentEntityToDTO, mapEstablishmentRequestToEntity } from "./others";
import { EstablishmentEntity } from "./establishment.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AddressEntity } from "@modules/address/address.entity";
import { mapAddressRequestToEntity } from "@modules/address/others/addresses.utils";
import { EstablishmentPaginationDTO } from "./others/dto/pagination-establishment.dto";
import { PaginatedList } from "@shared/types/pagination.types";
import { TwilioSMSService } from "@infrastructure/external_services/twilio/sms/sms.service";
import { BrazilFederalRevenueService } from "@infrastructure/external_services/cnpj_service/brazil_federal_revenue/brazil-federal-revenue.service";
import { ResponseBrazilianFederalRevenueDTO } from "@infrastructure/external_services/cnpj_service/brazil_federal_revenue/dto/response-cnpj-searched.dto";
import { generateRandomCode } from "@modules/contact/contact.utils";
import { PhoneEntity } from "@modules/contact/phone/phone.entity";

@Injectable()
export class EstablishmentService {

    constructor(
        private readonly SMSService: TwilioSMSService,
        private readonly brFederalRevenueService: BrazilFederalRevenueService,

        @InjectRepository(EstablishmentEntity)
        private readonly repository: Repository<EstablishmentEntity>,
        @InjectRepository(AddressEntity)
        private readonly addressRepository: Repository<AddressEntity>,
    ) { }

    async getAll(pagination: EstablishmentPaginationDTO): Promise<ResponseEstablishmentDTO[]> {
        try {
            //const establishments: PaginatedList<EstablishmentEntity> = await this.establishmentRepository.getAllAsync(pagination);
            const establishmentsFound: EstablishmentEntity[] = await this.repository.find({
                relations: [
                    "address",
                    "promotions",
                    "phones",
                    "emails",
                ]
            });

            const establishmentsDTO: ResponseEstablishmentDTO[] = establishmentsFound.map((item: EstablishmentEntity) => mapEstablishmentEntityToDTO(item));
            return establishmentsDTO;

        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new HttpException("Desculpe, houve um erro interno no servidor. Por favor, contatar o suporte.", HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    async create(request: CreateEstablishmentRequestDTO): Promise<ResponseEstablishmentDTO> {
        const establishmentExistsByCNPJ: boolean = await this.existsByCNPJ(request.cnpj);
        const establishmentExistsByAddress: boolean = await this.existsByAddress(mapAddressRequestToEntity(request.address));
        //const IsItValidInTheBrazilianFederalRevenue: ResponseBrazilianFederalRevenueDTO = await this.brFederalRevenueService.findEstablishmentByCNPJ(request.cnpj);

        if (establishmentExistsByCNPJ)
            throw new HttpException(`Estabelecimento de CNPJ "${request.cnpj}" já existe!`, HttpStatus.CONFLICT);

        if (establishmentExistsByAddress)
            throw new HttpException(`Já existe um estabelecimento cadastrado no endereço informado!`, HttpStatus.CONFLICT);

        const establishmentToBeCreated: EstablishmentEntity = mapEstablishmentRequestToEntity(request);
        establishmentToBeCreated.phones.forEach((phone: PhoneEntity, index: number) => {
            if (index <= 1) {
                let verificationCode: number = generateRandomCode();
                let message: string = `[ESTABELECIMENTO] Olá, seu código de verificação PromoFlash é: ${verificationCode}`;
                //this.SMSService.sendSMS(formatPhoneNumberToSendSMS(phone), message);
            }
        });

        const establishmentCreated: EstablishmentEntity = await this.repository.save(establishmentToBeCreated);
        return mapEstablishmentEntityToDTO(establishmentCreated);
    };

    public async existsByCNPJ(cnpj: string): Promise<boolean> {
        const userFound: EstablishmentEntity = await this.repository.findOne({ where: { cnpj: formatCNPJ(cnpj) } });
        return userFound ? true : false;
    };

    public async existsByAddress(address: AddressEntity): Promise<boolean> {
        let addressFound: AddressEntity = null;

        addressFound = await this.addressRepository.findOne({
            where: [
                {
                    address: address.address,
                    place_id: address.place_id,
                    location: address.location,
                }
            ]
        });

        return addressFound ? true : false;
    };

}