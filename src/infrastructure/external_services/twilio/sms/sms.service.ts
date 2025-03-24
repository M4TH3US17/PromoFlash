import { Injectable } from "@nestjs/common";
import * as twilio from 'twilio';
import "dotenv/config";
import { UserEntity } from "@modules/user/user.entity";
import { ConfirmCodeRequestDTO } from "../../../../modules/contact_verification/others/dto/request-confirm-code.dto";

@Injectable()
export class TwilioSMSService {
    
    public async sendSMS(to: string /* | string[]*/, body: string): Promise<void> {
        try {
            const accountSid: string = process.env.TWILIO_ACCOUNT_SID;
            const authToken: string = process.env.TWILIO_AUTH_TOKEN;
            const from: string = process.env.TWILIO_PHONE_NUMBER;

            const client: twilio.Twilio = twilio(accountSid, authToken);

            const response = await client.messages.create({
                to,
                from,
                body,
            });

            if(response.errorCode || response.errorMessage) {
                console.log("error twilio (code: " + response.errorCode + "): " + response.errorMessage)
            }

            // response.numSegments 
            // O número de segmentos usados para enviar a mensagem. SMS longos são divididos em vários segmentos. Utilidade: Útil para calcular custos, já que cada segmento pode ser cobrado separadamente
            
            // response.price, response.priceUnit
            // O custo do envio da mensagem e a moeda usada. Quando preenchidos, ajudam a rastrear os custos do envio de SMS.
            
            // response.sid
            // O identificador único da mensagem (Message SID). Útil para rastrear e consultar o status da mensagem posteriormente.

            // response.to
            // O número de telefone do destinatário da mensagem. Confirma para quem a mensagem foi enviada.

            // response.uri
            // O URI da mensagem, que pode ser usado para acessar detalhes da mensagem diretamente na API. Útil para consultar ou atualizar a mensagem posteriormente.

            console.log(`SMS enviado para ${to}`, response);
        } catch (error) {
            console.error('Erro ao enviar SMS:', error);
            throw error;
        }
    };
    
};