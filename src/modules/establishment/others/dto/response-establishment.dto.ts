import { ApiProperty, OmitType } from '@nestjs/swagger';
import { AddressResponseDTO } from '@modules/address/others/dto/response-address.dto';
import { EstablishmentEntity } from '@modules/establishment/establishment.entity';
import { PromotionResponseDTO } from '@modules/promotion/others/dto/response-promotion.dto';
import { ResponseEmailContactDTO, ResponsePhoneContactDTO } from '@modules/contact_verification/others/dto/response-contact-verification.dto';

export class EstablishmentResponseDTO
    extends OmitType(EstablishmentEntity, ["updatedAt", "createdAt", "deletedAt", "address", "promotions", "firstPhone", "secondPhone", "email"]) {

    //@ApiProperty({ type: ContactResponseDTO })
    //contact: ContactResponseDTO;

    @ApiProperty({ type: AddressResponseDTO })
    address: AddressResponseDTO;

    @ApiProperty({ type: [PromotionResponseDTO] })
    promotions: PromotionResponseDTO[];

    @ApiProperty({ type: ResponsePhoneContactDTO })
    firstPhone: ResponsePhoneContactDTO;

    @ApiProperty({ type: ResponsePhoneContactDTO })
    secondPhone: ResponsePhoneContactDTO;

    @ApiProperty({ type: ResponseEmailContactDTO })
    email: ResponseEmailContactDTO;
};