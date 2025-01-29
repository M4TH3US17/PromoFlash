
export function formatCPF(cpf: string = ""): string {
    const cleanedCPF = cpf.replace(/\D/g, '');

    if (cleanedCPF.length !== 11) 
        // Disparar erro dizendo q p CPF é invlido

    return cleanedCPF.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        '$1.$2.$3-$4'
    );
};

export function formatCNPJ(cnpj: string = ""): string {
    const cleanedCNPJ = cnpj.replace(/\D/g, '');

    if (cleanedCNPJ.length !== 14) 
        // Disparar erro dizendo q p CNPJ é invlido

    return cleanedCNPJ.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5'
    );
};