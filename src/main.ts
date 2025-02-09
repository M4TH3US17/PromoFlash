import "dotenv/config";
import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppDataSource } from "./infrastructure/database/data-source";

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(MainModule);
  const APP_PORT: number = Number(process.env.PORT) || 3000;
  const DB_NAME: string = process.env.DB_NAME;
  
  AppDataSource.initialize()
    .then(() => console.log(`Conexão com o banco "${DB_NAME}" foi inicializada!`))
    .catch((error) => console.error(`Conexão com o banco "${DB_NAME}" falhou! Erro:`, error));

  await app.listen(APP_PORT);
}

bootstrap();