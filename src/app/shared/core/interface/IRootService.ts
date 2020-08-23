import { Observable } from 'rxjs/internal/Observable';

import { IRootObject } from './IRootObject';
import { IQueryOptions } from './IQueryOptions';
import { ICountModel } from './ICountModel';


export interface IRootService<T extends IRootObject> {
    count(query: IQueryOptions, url: string): Observable<ICountModel<T>>;
    query(query: IQueryOptions, url: string): Observable<ICountModel<T>>;
    create(item: T, url: string): Observable<T>;
    update(item: T, url: string): Observable<T>;
    delete(item: T, url: string);
    get(id: number, url: string): Observable<T>;
    post(url: string, body: any, headers?: any): Observable<any>;
    getlist(url: string): Observable<T>;
    getquery(url: string, queryKey: string, param?: any): Observable<any>;
     details(id: number, url: string): any;
    // successAlert(msg, title?);
     errorAlert(msg, title?);
    // warningAlert(msg: any, title?: any);
    getService(service: T): T;
}
