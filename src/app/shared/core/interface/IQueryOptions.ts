export interface IQueryOptions {
    page?: number;
    size?: number;
    orderByExpression?: {};
    whereCondition?: string;
}

export interface IFilter {
    key: string;
    value: number;
}

