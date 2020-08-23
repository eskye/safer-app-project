import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ILoginResponse } from '@app/shared';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  helper: JwtHelperService = new JwtHelperService();
  tokenObject: ILoginResponse;
  constructor(private nativeStorage: NativeStorage) {
    this.nativeStorage.getItem('token')
        .then((data) => {
          this.tokenObject = data;
        }, error => console.log(error));
  }
   get token(): string {
     return this.tokenObject.token;
  }
  public isAuthenticated(): boolean {
    const token = this.token;
    if (!token) { return false; }
    return !this.helper.isTokenExpired(token);
  }
  get decodeToken(){
    return this.helper.decodeToken(this.token);
  }
  get role(): string{
    if (!this.decodeToken) { return null; }
    return this.decodeToken.role;
  }
  get uid(): string{
    if (!this.decodeToken) { return null; }
    return this.decodeToken.uid;
  }
  get isActive(): boolean{
    if (!this.decodeToken) { return false; }
    return this.decodeToken.isActive;
  }
  get isVerified(): boolean{
    if (!this.decodeToken) { return false; }
    return this.decodeToken.isVerified;
  }
  get email(): string{
    if (!this.decodeToken) { return null; }
    return this.decodeToken.email;
  }

  get fullname(): string{
    if (!this.decodeToken) { return null; }
    return this.decodeToken.firstname;
  }

}
