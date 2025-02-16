import { HttpException, HttpStatus } from "@nestjs/common";


/**
 * Processa erros lançados durante a execução, capturando exceções e lançando uma nova exceção do tipo `HttpException` 
 * com uma mensagem genérica, caso o erro não seja uma instância de `HttpException`.
 * 
 * Essa função é útil para garantir que todos os erros sejam tratados de maneira uniforme.
 * 
 * @param error - O erro que ocorreu durante a execução de algum processo, que pode ser uma exceção interna ou específica.
 * 
 * @throws {HttpException} Se o erro não for uma instância de `HttpException`, ele será convertido em uma exceção 
 * interna genérica com o status `500`. Isso garante que todos os erros da aplicação sejam tratados como `HttpException`, 
 * simplificando o processo de filtragem e manejo das exceções.
 * 
 * @example
 * try {
 *     // Alguma lógica que pode lançar erro
 * } catch (error) {
 *     processError(error);
 * }
 */
export function processError(error): void {
    console.error(error);
    if (error instanceof HttpException) throw error;
    throw new HttpException("Desculpe, houve um erro interno no servidor. Por favor, catatar o suporte.", HttpStatus.INTERNAL_SERVER_ERROR);
};