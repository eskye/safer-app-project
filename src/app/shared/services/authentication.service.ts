import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import {DataStoreService} from '@app/shared/services/data-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  helper: JwtHelperService = new JwtHelperService();
  tokenObject$ = new BehaviorSubject<string>('');
   constructor(private storage: Storage, private dataService: DataStoreService) {
     (async () => {
      const token = await this.storage.get('token');
      this.tokenObject$.next(token);
     })();
  }
  get token(): string {
     let token = '';
     this.tokenObject$.subscribe(res => {
       console.log(res + '\n  Token Method retrievd');
       token = res;
     });
     return token;
  }

  get tokenLocal(): string{
      return this.dataService.getData('token');
  }
  public isAuthenticated(): boolean {
    if (!this.tokenLocal) { return false; }
    return !this.helper.isTokenExpired(this.tokenLocal);
  }
  decodeToken(){
     return this.helper.decodeToken(this.tokenLocal);
  }
  get fcmToken(){
       return this.dataService.getData('fcmToken');
  }
  // get role(): string{
  //   if (!this.decodeToken) { return null; }
  //   return this.decodeToken.role;
  // }
  // get uid(): string{
  //   if (!this.decodeToken) { return null; }
  //   return this.decodeToken.uid;
  // }
  // get isActive(): boolean{
  //   if (!this.decodeToken) { return false; }
  //   return this.decodeToken.isActive;
  // }
  // get isVerified(): boolean{
  //   if (!this.decodeToken) { return false; }
  //   return this.decodeToken.isVerified;
  // }
  // get email(): string{
  //   if (!this.decodeToken) { return null; }
  //   return this.decodeToken.email;
  // }
  //
  // get fullname(): string{
  //   if (!this.decodeToken) { return null; }
  //   return this.decodeToken.firstname;
  // }
}
