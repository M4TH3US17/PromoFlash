import "dotenv/config";
import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppDataSource } from "./infrastructure/database/data-source";
import { DocumentBuilder, OpenAPIObject, SwaggerCustomOptions, SwaggerDocumentOptions, SwaggerModule } from "@nestjs/swagger";
import { join } from "path";

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(MainModule);
  const APP_PORT: number = Number(process.env.PORT) || 3000;
  const DB_NAME: string = process.env.DB_NAME;

  AppDataSource.initialize()
    .then(() => console.log(`Conexão com o banco "${DB_NAME}" foi inicializada!`))
    .catch((error) => console.error(`Conexão com o banco "${DB_NAME}" falhou! Erro:`, error));

  // Swagger Config
  const swaggerInfos = new DocumentBuilder()
    .setTitle('Documentação PromoFlash')
    .setDescription('Documentação da API PromoFlash')
    .setVersion('1.0')
    .build()
  const swaggerUiConfig: SwaggerCustomOptions = { customSiteTitle: "PromoFlash Documentation" };
  SwaggerModule.setup('promoflash-doc', app, () => SwaggerModule.createDocument(app, swaggerInfos, { autoTagControllers: true }), swaggerUiConfig);

  await app.listen(APP_PORT);
};

bootstrap();