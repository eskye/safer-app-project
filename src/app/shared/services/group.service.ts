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
 import { IGroup } from '@app/shared/core/model/IGroup';

 export interface IGroupService extends IRootService<ApiResponse<any>> {
  create(body: any): Observable<ApiResponse<string>>;
  getGroups(): Observable<ApiResponse<IGroup>>;
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


}
