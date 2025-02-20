import { Column } from "typeorm";

export class EstablishmentAffiliateEntity {

    @Column({ 
        name: "main_fk", 
        type: "int",
        default: null,
        comment: "ID do estabelecimento matriz. Se preenchido, indica que a entidade atual é uma filial vinculada à loja matriz.", 
    })
    main_fk: number = null;
    
    @Column({ 
        name: "is_verified",
        type: "enum",
        enum: [0, 1], 
        default: 0,
        comment: "Status de verificação da filial, conforme determinado pela loja matriz. '1' indica que a filial foi validada pela matriz, enquanto '0' significa que a filial ainda não foi validada."
    })
    isVerified: number;
    
};