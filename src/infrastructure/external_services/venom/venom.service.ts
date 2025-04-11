import { Injectable, OnModuleInit } from '@nestjs/common';
import * as venom from 'venom-bot';

@Injectable()
export class VenomWhatsappService implements OnModuleInit {
    private client: any;

    async onModuleInit() {
        await this.initializeWhatsApp();
    }

    private async initializeWhatsApp() {
        try {
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
            if (!this.client) {
                throw new Error('Cliente WhatsApp não inicializado');
            }
            
            if (!this.validatePhoneNumber(to)) {
                throw new Error('Número de telefone inválido');
            }
            
            const formattedTo = to.includes('@') ? to : `${to}@c.us`;
            const result = await this.client.sendText(formattedTo, content);
            
            return { 
                success: true,
                messageId: result.id.id,
                timestamp: result.timestamp
            };
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            throw new Error(`Falha ao enviar mensagem: ${error.message}`);
        }
    }

    private validatePhoneNumber(phone: string): boolean {
        const regex = /^(\d{10,15})(@c\.us)?$/;
        return regex.test(phone);
    }
}