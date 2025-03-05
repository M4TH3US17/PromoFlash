import { CreatePhoneContactDTO } from "@modules/contact_verification/others/dto/request-contact-verification.dto";
import { UserEntity } from "@modules/user/user.entity";
import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from "@nestjs/swagger";

export class CreateUserRequestDTO extends OmitType(UserEntity,  
    ["createdAt", "updatedAt", "id", "followingEstablishments", "phone", "email"]) { 

    //@ApiProperty({ type: CreateEmailContactDTO })
    email?: string; //CreateEmailContactDTO;
    
    @ApiPropertyOptional({ type: CreatePhoneContactDTO })
    phone?: CreatePhoneContactDTO;

};

export class UpdateUserRequestDTO extends PartialType(CreateUserRequestDTO) { };