import { Injectable, OnModuleInit } from '@nestjs/common';
import * as venom from 'venom-bot';
import "dotenv/config";

@Injectable()
export class VenomWhatsappService implements OnModuleInit {
    private client: any;

    async onModuleInit() {
        const enviromnmnet = String(process.env.NODE_ENV);

        // if(enviromnmnet === "dev") {
            await this.initializeWhatsApp();
        // };
    }

    private async initializeWhatsApp() {
        try {
            console.log('Escaneie esse QRCode no seu Whatsapp');
            this.client = await venom.create({
                session: 'session-name',
                headless: 'new', // Usa o novo modo Headless
                browserArgs: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage'
                ]
            });

            console.log('Cliente WhatsApp inicializado com sucesso');
            this.setupListeners();
        } catch (error) {
            console.error('Erro ao inicializar cliente WhatsApp:', error);
        }
    }

    private setupListeners() {
        this.client.onMessage(async (message) => {
            if (message.body === '!ping') {
                await this.client.sendText(message.from, 'pong');
            }
        });
    }

    public async sendMessage(to: string, content: string) {
        try {
            if (!this.client)
                throw new Error('Cliente WhatsApp não inicializado');

            to = to.replace(/[^\d]/g, '');
            let numberZDG = null;

            const countryCode = to.substring(0, 2);
            const ddd = to.substring(2, 4);
            const number = to.slice(-8);

            if (Number(ddd) <= 30)
                numberZDG = `${countryCode}${ddd}9${number}@c.us`;
            else
                numberZDG = `${countryCode}${ddd}${number}@c.us`;

            const result = await this.client.sendText(numberZDG, content);
            console.log(result);

        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            throw new Error(`Falha ao enviar mensagem: ${error.message}`);
        }
    }

}