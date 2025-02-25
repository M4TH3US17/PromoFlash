import { ApiProperty, OmitType } from '@nestjs/swagger';
import { AddressResponseDTO } from '@modules/address/others/dto/response-address.dto';
import { ContactResponseDTO } from '@modules/contact/others/dto/response-contact.dto';
import { EstablishmentEntity } from '@modules/establishment/establishment.entity';
import { PromotionResponseDTO } from '@modules/promotion/others/dto/response-promotion.dto';

export class EstablishmentResponseDTO
    extends OmitType(EstablishmentEntity, ["updatedAt", "createdAt", "deletedAt", "address", "contact", "promotions"]) {

    @ApiProperty({ type: ContactResponseDTO })
    contact: ContactResponseDTO;

    @ApiProperty({ type: AddressResponseDTO })
    address: AddressResponseDTO;

    @ApiProperty({ type: [PromotionResponseDTO] })
    promotions: PromotionResponseDTO[];

};