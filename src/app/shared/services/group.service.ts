 import { Injectable, Injector } from '@angular/core';
 import { Observable } from 'rxjs/internal/Observable';
 import { HttpClient } from '@angular/common/http';
 import { map, catchError } from 'rxjs/operators';

 import { ErrorHandler } from '@app-shared/core/Error/ErrorHandler';

 import {
    IRootService
 } from '@app-shared/core';

 import { RootService } from '@app-shared/core/interface/RootService';
 import { routes } from '@app-shared/constant';
 import { ApiResponse } from '@app/shared/core/interface/IRootObject';
 import {IGroup, IGroupInvites} from '@app/shared/core/model/IGroup';

 export interface IGroupService extends IRootService<ApiResponse<any>> {
  create(body: any): Observable<ApiResponse<string>>;
  getGroups(): Observable<ApiResponse<IGroup>>;
  remove(uid: string): Observable<ApiResponse<string>>;
  edit(body: IGroup): Observable<ApiResponse<string>>;
  invite(body: any): Observable<ApiResponse<string>>;
  getInvites(): Observable<ApiResponse<IGroupInvites>>;
  acceptInvite(body: any): Observable<ApiResponse<string>>;
}

 @Injectable({
  providedIn: 'root'
})

export class GroupService extends RootService<ApiResponse<any>> implements IGroupService {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  create(body: any): Observable<ApiResponse<string>> {
    return this.post(routes.GROUP.CREATE, body)
      .pipe(map(res => res), catchError(ErrorHandler.ErrorServerConnection));
  }
  getGroups(): Observable<ApiResponse<IGroup>> {
         return this.getlist(routes.GROUP.LIST)
             .pipe(map(res => res), catchError(ErrorHandler.ErrorServerConnection));
  }

  edit(body: IGroup): Observable<ApiResponse<string>> {
         return this.post(`${routes.GROUP.EDIT}/${body.uid}`, body)
             .pipe(map(res => res),
                 catchError(ErrorHandler.ErrorServerConnection));
     }
 remove(uid: string): Observable<ApiResponse<string>> {
         return this.delete(uid, routes.GROUP.DELETE)
             .pipe(map(res => res as ApiResponse<string>),
                 catchError(ErrorHandler.ErrorServerConnection));
     }
 invite(body: any): Observable<ApiResponse<string>> {
         return this.post(`${routes.GROUP.INVITE}/${body.uid}`, body)
             .pipe(map(res => res), catchError(ErrorHandler.ErrorServerConnection));
     }
     getInvites(): Observable<ApiResponse<IGroupInvites>> {
         return this.getlist(routes.GROUP.GETINVITES)
             .pipe(map(res => res), catchError(ErrorHandler.ErrorServerConnection));
     }
     acceptInvite(body: any): Observable<ApiResponse<string>> {
         return this.post(routes.GROUP.ACCEPT, body)
             .pipe(map(res => res), catchError(ErrorHandler.ErrorServerConnection));
     }
}
