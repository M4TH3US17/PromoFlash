import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";
import { EntitySchema } from 'typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

@Injectable()
export class PaginationParserPipe implements PipeTransform {
    constructor(private readonly entityClass: Function) { }

    async transform(value: any, metadata: ArgumentMetadata) {
        /*const entityAttributes = await getEntityAttributes(this.entityClass);

        if (value.orderBy && !entityAttributes.includes(value.orderBy))
            throw new HttpException('Param "orderBy" only accept: ' + entityAttributes.toString(), HttpStatus.BAD_REQUEST);

        if (value.filterBy && !entityAttributes.includes(value.filterBy))
            throw new HttpException('Param "filterBy" only accept: ' + entityAttributes.toString(), HttpStatus.BAD_REQUEST);

        if (value.sort && !Object.values(SORT_DIRECTIONS).includes(value.sort))
          throw new HttpException('Param "sort" only accept: ' + SORT_DIRECTIONS.toString(), HttpStatus.BAD_REQUEST);

        value = {
            ...value,
            limit: ![null, undefined].includes(value.limit) ? Number(value.limit) : undefined,
            offset: ![null, undefined].includes(value.offset) ? Number(value.offset) : undefined
        }*/

        return value;
    };

    private async getEntityAttributes(Entity: EntityClassOrSchema) {
        /*if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }
        const entityMetadata = dataSource.getMetadata(Entity);
        const attributes = entityMetadata.columns.map(column => column.propertyName);
        dataSource.destroy()
        return attributes*/
    };

};