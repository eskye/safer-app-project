import { IQueryOptions } from './IQueryOptions';

export class QueryBuilder {
     static toQueryString(query: IQueryOptions): string {
        // tslint:disable-next-line:max-line-length
        return `?page=${query.page}&size=${query.size}${query.whereCondition}`;
    }
}
