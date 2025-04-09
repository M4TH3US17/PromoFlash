import { ApiProperty } from "@nestjs/swagger";

export type TSortDirection = 'ASC' | 'DESC';
export const SORT_DIRECTIONS: TSortDirection[] = ['ASC', 'DESC'];

export interface IGetListArgs<Entity> {
    limit?: number,
    offset?: number,
    orderBy?: keyof Entity,
    sort?: TSortDirection,
    key?: string,
    filterBy?: keyof Entity,
};

export class PaginatedList<T> {
    @ApiProperty()
    data: T[];
    @ApiProperty()
    total: number
};