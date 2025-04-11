import { Injectable } from "@nestjs/common";
import * as twilio from 'twilio';

@Injectable()
export class TwilioWhatsappService {

  async sendMessage(to: string, body: string, from: string = '+14155238886') {
    try {
      const accountSid: string = process.env.TWILIO_ACCOUNT_SID;
      const authToken: string = process.env.TWILIO_AUTH_TOKEN;
      const client: twilio.Twilio = twilio(accountSid, authToken);

      const message = await client.messages.create({
        to: `whatsapp:${to}`,
        from: `whatsapp:${from}`,
        body,
        // contentVariables: '{"1":"12/1","2":"3pm"}',
        // contentSid: 'HXb5b62575e6e4ff6129ad7c8efe1f983e',
      });

      console.log(message);
    } catch (error) {
      console.error('Erro ao enviar Whatsapp:', error);
      throw error;
    }
  };
}

/*
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "body": "Hello there!",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "whatsapp:+14155238886",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "tags": {
    "campaign_name": "Spring Sale 2022",
    "message_type": "cart_abandoned"
  },
  "to": "whatsapp:+15005550006",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
*/