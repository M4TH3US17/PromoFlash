import { Injectable, OnModuleInit } from '@nestjs/common';
import * as venom from 'venom-bot';
import "dotenv/config";

@Injectable()
export class VenomWhatsappService implements OnModuleInit {
    private client: any;

    async onModuleInit() {
        // const enviromnmnet = String(process.env.NODE_ENV);

        // if(enviromnmnet === "dev") {

        // };

        try {
            // await this.initializeWhatsApp();
        } catch (e) {
            console.error('onModuleInit (function):', e);
        }
    }

    private async initializeWhatsApp() {
        try {
            console.log('Escaneie esse QRCode no seu Whatsapp');
            this.client = await venom.create(
                'session-name',
                (base64Qr, asciiQR) => {
                    console.log('📲 Escaneie o QRCode:');
                    console.log(asciiQR);
                },
                (statusSession) => {
                    console.log('🔄 Status da sessão:', statusSession);
                },
                {
                    headless: "new", // "new" | "old" | false
                    browserArgs: [
                        '--no-sandbox',
                        '--disable-setuid-sandbox',
                        '--disable-dev-shm-usage',
                        '--disable-extensions',
                        '--disable-gpu',
                    ],
                    disableWelcome: true,
                    logQR: true,
                    updatesLog: true,
                    autoClose: 0,
                }
            );
            this.setupListeners();

            console.log('Cliente WhatsApp inicializado com sucesso', this.client);
        } catch (error) {
            console.error('Erro ao inicializar cliente WhatsApp:', error);
        }
    }

    private setupListeners() {
        try {
            this.client.onMessage(async (message) => {
                if (message.body === '!ping') {
                    await this.client.sendText(message.from, 'pong');
                }
            });
        } catch (e) {
            console.error('setupListeners (function):', e);
        }
    }

    public async sendMessage(to: string, content: string) {
        try {
            if (!this.client)
                throw new Error('Cliente WhatsApp não inicializado');

            if (!await this.client.isConnected())
                throw new Error('Sessão do WhatsApp não está conectada');

            to = to.replace(/[^\d]/g, '');
            let numberZDG = null;

            const countryCode = to.substring(0, 2);
            const ddd = to.substring(2, 4);
            const number = to.slice(-8);

            if (Number(ddd) <= 30)
                numberZDG = `${countryCode}${ddd}9${number}@c.us`;
            else
                numberZDG = `${countryCode}${ddd}${number}@c.us`;

            const result = await this.client.sendText(numberZDG, content)
            // const result = await Promise.race([
            //     this.client.sendText(numberZDG, content),
            //     new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout ao enviar mensagem')), 30000))
            // ]);

        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            throw new Error(`Falha ao enviar mensagem: ${error.message}`);
        }
    }

}