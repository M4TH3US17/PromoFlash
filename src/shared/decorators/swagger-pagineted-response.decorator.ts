import { applyDecorators, Type } from "@nestjs/common";
import { ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { PaginatedList } from "../types/pagination.types";
import { UseCaseResponseDTO } from "../bases/usecase-response.dto";

export enum EndpointType {
    SOFT_DELETE = "SOFT_DELETE",
    UPDATE = "UPDATE",
    CREATE = "CREATE",
    PAGINATION = "PAGINATION",
    GET_BY_ID = "GET_BY_ID",
}

export const ApiResponse = <TModel extends Type<any>>(
    model: TModel,
    endpointType: EndpointType = EndpointType.PAGINATION
) => {
    return applyDecorators(
        ApiExtraModels(PaginatedList, model),
        getResponseDecorator(model, endpointType)
    );
};

function getResponseDecorator<TModel extends Type<any>>(
    model: TModel,
    endpointType: EndpointType
) {
    switch (endpointType) {
        case EndpointType.PAGINATION:
            return ApiOkResponse({
                schema: {
                    allOf: [
                        { $ref: getSchemaPath(PaginatedList) },
                        { properties: { data: { type: 'array', items: { $ref: getSchemaPath(model) } } } },
                    ],
                },
            });
        case EndpointType.GET_BY_ID:
            return ApiOkResponse({ schema: {
                    allOf: [
                        { $ref: getSchemaPath(UseCaseResponseDTO) },
                        { properties: { data: { $ref: getSchemaPath(model) } } },
                    ]
                }
            });
        case EndpointType.CREATE:
            return ApiCreatedResponse({
                schema: {
                    allOf: [
                        { $ref: getSchemaPath(UseCaseResponseDTO) },
                        { properties: { data: { $ref: getSchemaPath(model) } } },
                    ]
                }
            })
        case EndpointType.UPDATE:
            return ApiOkResponse({
                schema: {
                    allOf: [
                        { $ref: getSchemaPath(UseCaseResponseDTO) },
                        { properties: { data: { $ref: getSchemaPath(model) } } },
                    ]
                }
            });
        case EndpointType.SOFT_DELETE:
            return ApiNoContentResponse({
                schema: { allOf: [{ $ref: getSchemaPath(UseCaseResponseDTO) }] }
            });
        default:
            return null
    }

}

