import { CreateAddressRequestDTO } from '@modules/address/others/dto/create-address.dto';
import { ResponseAddressDTO } from '@modules/address/others/dto/response-address.dto';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { UseCaseResponseDTO } from 'src/shared/bases/usecase-response.dto';

export const createSwaggerConfig = (app) => {
    const swaggerInfos = new DocumentBuilder()
        .setVersion('1.0')
        .setTitle('Documentação PromoFlash')
        .setDescription('Documentação da API PromoFlash')
        .setContact('Matheus Washington', 'https://www.linkedin.com/in/matheus-washington-478400207', null)
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'JWT',
                description: 'Insira o token JWT',
                in: 'header'
            },
            'JWT-auth'
        )
        .build();

    const swaggerUiConfig: SwaggerCustomOptions = {
        customSiteTitle: 'PromoFlash Documentation',
        swaggerOptions: {
            persistAuthorization: true,
        }
    };

    const docFactory = () => {
        return SwaggerModule.createDocument(app, swaggerInfos, {
            autoTagControllers: true,
            extraModels: [ResponseAddressDTO, UseCaseResponseDTO, CreateAddressRequestDTO],
        });
    };

    return { docFactory, swaggerUiConfig };
};