import { ApiProperty, OmitType } from '@nestjs/swagger';
import { EstablishmentEntity } from '../establishment.entity';
import { EstablishmentAffiliateEntity } from '../others/embbededs/establishment-affiliate.entity';
import { ContactResponseDTO } from 'src/modules/contact/dto/response-contact.dto';
import { AddressResponseDTO } from 'src/modules/address/dto/response-address.dto';
import { PromotionResponseDTO } from 'src/modules/promotion/dto/response-promotion.dto';

export class EstablishmentAffiliatedDTO extends OmitType(EstablishmentAffiliateEntity, []) {};

export class EstablishmentResponseDTO
    extends OmitType(EstablishmentEntity, ["updatedAt", "createdAt", "ifAffiliated", "address", "contact", "promotions"]) {

    @ApiProperty({ type: () => EstablishmentAffiliatedDTO, })
    affiliated: EstablishmentAffiliatedDTO;

    @ApiProperty({ type: ContactResponseDTO })
    contact: ContactResponseDTO;

    @ApiProperty({ type: AddressResponseDTO })
    address: AddressResponseDTO;

    @ApiProperty({ type: [PromotionResponseDTO] })
    promotions: PromotionResponseDTO[];

};