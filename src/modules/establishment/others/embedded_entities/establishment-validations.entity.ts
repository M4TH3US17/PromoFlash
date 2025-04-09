import { Column } from "typeorm";
import { establishmentValidateStatusEnum } from "../enums/establishment-validate-status.enum";

export class EstablishmentValidationsEntity {

    /*
     Este campo será responsável pelo upload de documentos necessários para validar tanto a legitimidade do estabelecimento
     quanto a veracidade de suas informações.

     Os documentos enviados serão utilizados para confirmar a categoria (franqueado, matriz ou filial) e a autenticidade 
     das informações fornecidas, garantindo que o estabelecimento esteja devidamente registrado e em conformidade com 
     os critérios do sistema. */
   // proofDocuments: Object[] //Media[]

    // @Column({
    //     type: "enum",
    //     name: "establishment_validate_status",
    //     enum: establishmentValidateStatusEnum,
    //     default: establishmentValidateStatusEnum.UNTRUSTED,
    // })
    @Column({
        name: "establishment_validate_status",
        default: 0
    })
    isValid: number;

};