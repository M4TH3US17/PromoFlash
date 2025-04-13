import { PhoneEntity } from "@modules/contact/phone/phone.entity";
import { EstablishmentEntity } from "@modules/establishment/establishment.entity";
import { UserEntity } from "@modules/user/user.entity";


export function SMSVerificationTemplate(
  code: string,
  appName: string = 'PromoFlash',
  isNewContact: boolean = true,
  phone: PhoneEntity,
): string {
  const isDevEnvironment: boolean = true
  const formattedPhone = `(${phone.ddd}) ${phone.number.substring(0, 5)}-${phone.number.substring(5)}`;

  return `
📱 *${appName}* - ${isDevEnvironment ? '[AMBIENTE DE TESTE] ' : ''}Verificação de Telefone

${isNewContact
      ? `Olá! Estamos confirmando o número ${formattedPhone} para seu cadastro no ${appName}. Seu código de verificação é:`
      : `Identificamos uma tentativa de acesso associada ao número ${formattedPhone}.`}

🔢 *${code}*

⚠️ *Importante:*
- Código válido por 5 minutos
- Não compartilhe com terceiros
- Caso não tenha solicitado, ignore esta mensagem

${isDevEnvironment
      ? `ℹ️ *MENSAGEM DE TESTE:* Esta é uma simulação do envio por SMS.\nNo ambiente de produção, você receberia por SMS oficial.`
      : ''}

_Equipe ${appName}_`;
}