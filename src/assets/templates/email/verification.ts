
export function EmailVerificationTemplate(
    code: string,
    appName: string = 'PromoFlash',
    isNewContact: boolean = true,
    email: string,
): string {

    const isDevEnvironment: boolean = true;

    return `
    📧 *${appName}* - ${isDevEnvironment ? '[AMBIENTE DE TESTE] ' : ''}Verificação de E-mail
  
  ${isNewContact
            ? `Olá! Estamos confirmando o e-mail ${email} para seu cadastro no ${appName}. Seu código de verificação é:`
            : `Identificamos uma tentativa de acesso associada ao e-mail ${email}.`}
  
  🔢 *${code}*
  
  ⚠️ *Importante:*
  - Código válido por 5 minutos
  - Não compartilhe com terceiros
  - Caso não tenha solicitado, ignore esta mensagem
  
  ${isDevEnvironment
            ? `ℹ️ *MENSAGEM DE TESTE:* Esta é uma simulação do envio por e-mail.\nNo ambiente de produção, você receberia por e-mail oficial.`
            : ''}
  
  _Equipe ${appName}_`;
}