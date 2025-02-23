import { Column } from "typeorm";

export class EstablishmentValidationsEntity {

    /*
     Este campo será responsável pelo upload de documentos necessários para validar tanto a legitimidade do estabelecimento
     quanto a veracidade de suas informações.

     Os documentos enviados serão utilizados para confirmar a categoria (franqueado, matriz ou filial) e a autenticidade 
     das informações fornecidas, garantindo que o estabelecimento esteja devidamente registrado e em conformidade com 
     os critérios do sistema. */
    proofDocuments: Object[] //Media[]

    @Column({
        name: "is_validated",
        enum: [0, 1, 2],
        default: 0,
        comment: "Indica o status de validação do estabelecimento: "
                 + "0: Não confiável (informações insuficientes ou inválidas), "
                 + "1: Válido (informações verificadas e confirmadas), "
                 + "2: Em análise (pendente de verificação ou validação).",
    })
    isValid: number;

};