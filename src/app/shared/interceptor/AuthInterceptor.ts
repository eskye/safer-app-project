import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AuthenticationService } from '@app/shared/services/authentication.service';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthenticationService, private router: Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.auth.tokenLocal;
        if (token){
            req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
        }
        return next.handle(req).pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.router.navigateByUrl('/account/sign-in');
                } else {
                    return throwError(error);
                }
            })
        );
    }

}
