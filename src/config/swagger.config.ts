import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { CreateAddressRequestDTO } from 'src/modules/address/dto/request-address.dto';
import { AddressResponseDTO } from 'src/modules/address/dto/response-address.dto';
import { UseCaseResponseDTO } from 'src/shared/bases/usecase-response.dto';

export const createSwaggerConfig = (app) => {
    const swaggerInfos = new DocumentBuilder()
        .setVersion('1.0')
        .setTitle('Documentação PromoFlash')
        .setDescription('Documentação da API PromoFlash')
        .setContact('Matheus Washington', 'https://www.linkedin.com/in/matheus-washington-478400207', null)
        .build();

    const swaggerUiConfig: SwaggerCustomOptions = { customSiteTitle: 'PromoFlash Documentation' };

    const docFactory = () => {
        return SwaggerModule.createDocument(app, swaggerInfos, {
            autoTagControllers: true,
            extraModels: [AddressResponseDTO, UseCaseResponseDTO, CreateAddressRequestDTO],
        });
    };

    return { docFactory, swaggerUiConfig };
};
