export class EstablishmentDTO {
    abertura: string;
    situacao: string;
    tipo: string;
    nome: string;
    porte: string;
    natureza_juridica: string;
  
    atividade_principal: { code: string; text: string }[];
    atividades_secundarias: { code: string; text: string }[];
  
    logradouro: string;
    numero: string;
    municipio: string;
    bairro: string;
    uf: string;
    cep: string;
    email: string;
    telefone: string;
    data_situacao: string;
    cnpj: string;
    ultima_atualizacao: string;
    status: string;
    fantasia: string;
    complemento: string;
    efr: string;
    motivo_situacao: string;
    situacao_especial: string;
    data_situacao_especial: string;
    capital_social: string;
    
    qsa: {
      nome: string;
      qual: string;
      nome_rep_legal?: string;
      qual_rep_legal?: string;
    }[];
  
    simples: {
      optante: boolean;
      data_opcao: string | null;
      data_exclusao: string | null;
      ultima_atualizacao: string;
    };
    
    simei: {
      optante: boolean;
      data_opcao: string | null;
      data_exclusao: string | null;
      ultima_atualizacao: string;
    };
    
    extra: Record<string, any>;
    
    billing: {
      free: boolean;
      database: boolean;
    };
  }
  