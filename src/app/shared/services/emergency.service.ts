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

 export interface IEmergencyService extends IRootService<ApiResponse<any>> {
  create(body: any): Observable<ApiResponse<string>>;
}

 @Injectable({
  providedIn: 'root'
})

export class EmergencyService extends RootService<ApiResponse<any>> implements IEmergencyService {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
  create(body: any): Observable<ApiResponse<string>> {
    return this.post(routes.EMERGENCY.SEND, body)
      .pipe(map(res => res), catchError(ErrorHandler.ErrorServerConnection));
  }
}
