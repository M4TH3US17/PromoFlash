
/**
 * Gera um código numérico aleatório de 6 dígitos.
 * 
 * Esta função retorna um número inteiro aleatório entre 100000 e 999999, 
 * garantindo que o código gerado tenha exatamente 6 dígitos.
 * 
 * @returns {number} Um número aleatório de 6 dígitos.
 */
export function generateRandomCode(): number {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};