import { IData } from './IData';

export interface ICountModel<T> extends IData  {
    total?: number;
    items: T[];
}
