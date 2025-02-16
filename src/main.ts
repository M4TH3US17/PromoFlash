import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppDataSource } from "./infrastructure/database/data-source";
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from "@nestjs/swagger";
import "dotenv/config";

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(MainModule);
  const APP_PORT: number = Number(process.env.PORT) || 3000;
  const DB_NAME: string = process.env.DB_NAME;

  AppDataSource.initialize()
    .then(() => console.log(`Conexão com o banco "${DB_NAME}" foi inicializada!`))
    .catch((error) => console.error(`Conexão com o banco "${DB_NAME}" falhou! Erro:`, error));

  // Swagger Config
  const swaggerInfos = new DocumentBuilder()
  .setVersion('1.0')
  .setTitle('Documentação PromoFlash')
  .setDescription('Documentação da API PromoFlash')
  .setContact('Matheus Washington', 'https://www.linkedin.com/in/matheus-washington-478400207', null)
  .build();
  const swaggerUiConfig: SwaggerCustomOptions = { customSiteTitle: "PromoFlash Documentation" };
  const docFactory = () => SwaggerModule.createDocument(app, swaggerInfos, { autoTagControllers: true })
  SwaggerModule.setup('promoflash-doc', app, docFactory, swaggerUiConfig);

  await app.listen(APP_PORT);
};

bootstrap();