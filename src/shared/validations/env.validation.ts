import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
    // Porta do servidor
    PORT: Joi.number()
        .default(3000)
        .messages({
            'number.base': '[ENV] PORT deve ser um número.',
            'any.required': '[ENV] PORT é obrigatório.',
        }),

    // Configuração do banco de dados
    DB_NAME: Joi.string()
        .required()
        .messages({ 'any.required': '[ENV] DB_NAME é obrigatório.' }),

    DB_HOST: Joi.string()
        .required()
        .messages({ 'any.required': '[ENV] DB_HOST é obrigatório.' }),

    DB_USERNAME: Joi.string()
        .required()
        .messages({ 'any.required': '[ENV] DB_USERNAME é obrigatório.' }),

    DB_PASSWORD: Joi.string()
        .required()
        .messages({ 'any.required': '[ENV] DB_PASSWORD é obrigatório.' }),

    DB_PORT: Joi.number()
        .required()
        .messages({
            'number.base': '[ENV] DB_PORT deve ser um número.',
            'any.required': '[ENV] DB_PORT é obrigatório.',
        }),
});
