import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injector } from '@angular/core';
import { ICountModel } from '@app-shared/core/interface/ICountModel';
import { IQueryOptions } from '@app-shared/core/interface/IQueryOptions';
import { IRootObject } from '@app-shared/core/interface/IRootObject';
import { IRootService } from '@app-shared/core/interface/IRootService';
import { QueryBuilder } from '@app-shared/core/interface/QueryBuilder';
import {ToasterController} from '@app/shared/toastctrl';


export class RootService<T extends IRootObject> implements IRootService<T> {
  header = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };
  constructor(public httpClient: HttpClient, private inject?: Injector) { }

  count(queryOptions: IQueryOptions, url: string): Observable<ICountModel<T>> {
    return this.httpClient
      .get<ICountModel<T>>(`${url}/${QueryBuilder.toQueryString(queryOptions)}`)
      .pipe(
        map(data => {
          return data as ICountModel<T>;
        })
      );
  }

  query(queryOptions: IQueryOptions, url: string): Observable<ICountModel<T>> {
    return this.httpClient
      .get<ICountModel<T>>(`${url}${QueryBuilder.toQueryString(queryOptions)}`)
      .pipe(
        map(data => {
          return data as ICountModel<T>;
        })
      );
  }

  create(item: T, url: string): Observable<T> {
    return this.httpClient.post<T>(`${url}`, JSON.stringify(item));
  }

  post(url: string, body: any, headers?: any): Observable<T> {
    const reqHeader = new HttpHeaders(
      headers || this.header
    );
    return this.httpClient.post<T>(`${url}`, body, { headers: reqHeader });
  }

  update(item: any, url: string): Observable<T> {
    const reqHeader = new HttpHeaders(this.header);
    return this.httpClient.put<T>(`${url}`, item, { headers: reqHeader }).pipe(
      map(data => {
        return data as T;
      })
    );
  }

  delete(id: any, url: string) {
    return this.httpClient.delete(`${url}/${id}`);
  }

  get(id: any, url: string): Observable<T> {
    return this.httpClient.get(`${url}/${id}`).pipe(
      map(data => {
        return data as T;
      })
    );
  }

  getlist(url: string, param?: any): Observable<T> {
    return this.httpClient.get(`${url}`).pipe(
      map(data => {
        return data as T;
      })
    );
  }

  getquery(url: string, queryKey: string, param?: any): Observable<any> {
    const paramval = new HttpParams().set(queryKey, param);
    return this.httpClient.get(`${url}`, { params: paramval }).pipe(
      map(data => {
        return data;
      })
    );
  }

  details(id: number, url: string) {
    return this.httpClient.get(`${url}/${id}`).pipe(
      map(data => {
        return data as T;
      })
    );
  }

  // private get alert(): ToastrService {
  //   return this.inject.get<ToastrService>(ToastrService);
  // }
  //
  private get snackBar(): ToasterController {
    return this.inject.get<ToasterController>(ToasterController);
  }

  getService(service: T): T {
    // @ts-ignore
    return this.inject.get<T>(T) as T;
  }

  // showSuccess(message: string): void {
  //   this.snackBar.open(message, 'X', {panelClass: ['success']});
  // }
  // showError(message: string): void {
  //   // The second parameter is the text in the button.
  //   // In the third, we send in the css class for the snack bar.
  //   this.snackBar.open(message, 'X', {panelClass: ['error']});
  // }
  //
  // showWarning(message: string){
  //   this.snackBar.open(message, 'X', {panelClass: ['warning']});
  // }
  //
  // successAlert(msg: any, title?: any) {
  //   this.alert.success(msg, title, { timeOut: 5000, progressBar: true });
 // }
  errorAlert(msg: any, title?: any) {
    this.snackBar.showToast(msg);
  }
  // warningAlert(msg: any, title?: any) {
  //   this.alert.warning(msg, title, { timeOut: 5000, progressBar: true });
  // }
  // InfoAlert(msg: any, title?: any) {
  //   this.alert.info(msg, title, { timeOut: 5000, progressBar: true });
  // }
}
