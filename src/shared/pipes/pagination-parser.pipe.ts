import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { AppDataSource } from "src/infrastructure/database/data-source";

@Injectable()
export class PaginationParserPipe implements PipeTransform {
    constructor(private readonly entityClass: Function) { }

    async transform(value: any, metadata: ArgumentMetadata) {
        const entityAttributes = await this.getEntityAttributes(this.entityClass);

        if (value.orderBy && !entityAttributes.includes(value.orderBy))
            throw new HttpException(`Param "orderBy" only accept: ${entityAttributes.toString()}`, HttpStatus.BAD_REQUEST);

        if (value.filterBy && !entityAttributes.includes(value.filterBy))
            throw new HttpException(`Param "filterBy" only accept: ${entityAttributes.toString()}`, HttpStatus.BAD_REQUEST);

        // if (value.sort && !Object.values(SORT_DIRECTIONS).includes(value.sort))
        //   throw new HttpException(`Param "sort" only accept: ${SORT_DIRECTIONS.toString()}`, HttpStatus.BAD_REQUEST);

        value = {
            ...value,
            limit: ![null, undefined].includes(value.limit) ? Number(value.limit) : undefined,
            offset: ![null, undefined].includes(value.offset) ? Number(value.offset) : undefined
        }

        return value;
    };

    private async getEntityAttributes(Entity: EntityClassOrSchema) {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        const entityMetadata = AppDataSource.getMetadata(Entity);
        const attributes = entityMetadata.columns.map(column => column.propertyName);
        AppDataSource.destroy()
        return attributes
    };

};