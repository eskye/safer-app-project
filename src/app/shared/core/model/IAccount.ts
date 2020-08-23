import { IRootObject } from '@app/shared/core/interface/IRootObject';

export interface IAccount extends IRootObject{
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  nickName: string;
  type: string;
}

export interface ILogin extends IRootObject {
  email: string;
  password: string;
}

export interface IResetPassword extends IRootObject, IAccount {
  code: string;
}

export interface IUser {
  name: string;
  email: string;
  phone_number: string;
  nick_name: string;
  isActive: boolean | number;
  isVerified: boolean | number;
  type: string;
  uid: string;
  email_verified_at: Date|string;
}

export interface ILoginResponse{
  token: string;
  type: string;
  expires_in: number;
}

