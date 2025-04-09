export enum AccountStatus {
    PENDING = "PENDING",          // Aguardando confirmação/validação
    ACTIVE = "ACTIVE",            // Conta ativa e verificada
    INACTIVE = "INACTIVE",        // Conta inativa (usuário desativou)
    SUSPENDED = "SUSPENDED",      // Conta suspensa temporariamente
    BANNED = "BANNED",            // Conta banida permanentemente
    UNDER_REVIEW = "UNDER_REVIEW",// Em análise pela equipe
    LOCKED = "LOCKED",            // Bloqueada após várias tentativas falhas
    DELETED = "DELETED"           // Conta marcada para exclusão
};