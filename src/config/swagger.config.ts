import { CreateAddressRequestDTO } from '@modules/address/others/dto/request-address.dto';
import { AddressResponseDTO } from '@modules/address/others/dto/response-address.dto';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
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
