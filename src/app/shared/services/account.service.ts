 import { Injectable, Injector } from '@angular/core';
 import { Observable } from 'rxjs/internal/Observable';
 import { HttpClient } from '@angular/common/http';
 import { map, catchError } from 'rxjs/operators';

 import { ErrorHandler } from '@app-shared/core/Error/ErrorHandler';

 import {
  IRootService,
  IAccount,
  ILogin,
  ILoginResponse, IUser
} from '@app-shared/core';

 import { RootService } from '@app-shared/core/interface/RootService';
 import { routes } from '@app-shared/constant';
 import { ApiResponse } from '@app/shared/core/interface/IRootObject';

 export interface IAccountService extends IRootService<ApiResponse<IAccount>> {
  register(body: any): Observable<ApiResponse<IUser>>;
  login(body: ILogin): Observable<ApiResponse<ILoginResponse>>;
  forgotPassword(body): Observable<ApiResponse<string>>;
  resetPassword(body): Observable<ApiResponse<string>>;

}

 @Injectable({
  providedIn: 'root'
})

export class AccountService extends RootService<ApiResponse<any>>
  implements IAccountService {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

   resetPassword(body: any): Observable<ApiResponse<string>> {
     return this.post(routes.RESETPASSWORD, body)
       .pipe(map(res => res as ApiResponse<string>), catchError(ErrorHandler.ErrorServerConnection));
   }
   forgotPassword(body: any): Observable<ApiResponse<string>> {
     return this.post(routes.FORGOTPASSWORD, body)
       .pipe(map(res => res as ApiResponse<string>), catchError(ErrorHandler.ErrorServerConnection));
   }

  login(body: ILogin): Observable<ApiResponse<ILoginResponse>> {
    return this.post(routes.LOGIN, body)
        .pipe(map(res => res as ApiResponse<ILoginResponse>), catchError(ErrorHandler.ErrorServerConnection));
  }

  register(body: any): Observable<ApiResponse<IUser>> {
    return this.post(routes.REGISTER, body)
      .pipe(map(res => res as ApiResponse<IUser>), catchError(ErrorHandler.ErrorServerConnection));
  }


}
