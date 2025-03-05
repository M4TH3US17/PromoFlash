import { ResponseEmailContactDTO, ResponsePhoneContactDTO } from '@modules/contact_verification/others/dto/response-contact-verification.dto';
import { UserEntity } from '@modules/user/user.entity';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class UserResponseDTO extends OmitType(UserEntity, ["phone", "email", "createdAt", "deletedAt", "updatedAt", "password"]) {

    @ApiProperty({ type: ResponsePhoneContactDTO })
    phone: ResponsePhoneContactDTO;

    @ApiProperty({ type: ResponseEmailContactDTO })
    email: ResponseEmailContactDTO;

};