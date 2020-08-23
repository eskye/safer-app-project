import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';
import { SystemConstant } from '@app-shared/constant';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})

export class DataStoreService {

  private dataHolder: any = {};
  private item: any;

  constructor(private nativeStorage: NativeStorage) { }

  public encryptData(unEncryptedData) {
    return crypto.AES.encrypt(unEncryptedData, SystemConstant.RSA).toString();
  }

  public decryptData(encryptedData) {
    return crypto.AES.decrypt(encryptedData.toString(), SystemConstant.RSA).toString(crypto.enc.Utf8);
  }

  public persistData(key, encryptedNumber) {
    const data = (key === '_sstt23tken5_' ? encryptedNumber : this.encryptData(encryptedNumber));
    window.localStorage.setItem(key, data);
  }

  public keepNativeData(key, data){
    this.nativeStorage.setItem(key, data);
  }

  public removeAllPersistedData(): void {
    window.localStorage.clear();
    this.nativeStorage.clear();
  }

  public getPersistedData(key): any {
    const item = window.localStorage.getItem(key);
    if (!item) { return; }
    return key === '_sstt23tken5_' ? item : this.decryptData(item);
  }
  public getNativePersistedData(key): any {
    //let item: any;
    this.nativeStorage.getItem(key).then(data => {
      console.log(data);
    });
  //  return key === '_sstt23tken5_' ? item : this.decryptData(item);
  }

  private removePersistedData(key) {
    return window.localStorage.removeItem(key);
  }

  keepData(key, sharedData): void {
    if (key === 'role') {
     return this.persistData('__jtoh67823_', sharedData);
    }

    if (key === 'token') {
      return this.persistData(key, sharedData);
    }

    if (key === 'key') {
      return this.persistData('_sj45jmker23h_', sharedData);
    }


    if (key === 'page') {
      return this.persistData('_form_tracker__', sharedData);
    }


    this.dataHolder[key] = sharedData;
  }

  public getData(key) {

    if (key === 'role') {
      return this.getPersistedData('__jtoh67823_') ?
        this.getPersistedData('__jtoh67823_') : false;
    }
    if (key === 'token') {
      return this.getPersistedData('_sstt23tken5_');
    }
    if (key === 'key') {
      return this.getPersistedData('_sj45jmker23h_');
    }
    if (key === 'page') {
      return this.getPersistedData('_form_tracker__');
    }
    return key ? this.dataHolder[key] : this.dataHolder;
  }

  public getNativeData(key) {
    debugger;
    if (key === 'role') {
      return this.getNativePersistedData('__jtoh67823_') ?
          this.getNativePersistedData('__jtoh67823_') : false;
    }
    if (key === 'token') {
      return this.getNativePersistedData('_sstt23tken5_');
    }
    if (key === 'key') {
      return this.getNativePersistedData('_sj45jmker23h_');
    }
    if (key === 'page') {
      return this.getNativePersistedData('_form_tracker__');
    }
    return key ? this.dataHolder[key] : this.dataHolder;
  }

  removeData(key?) {
    if (key) {
      if (key === 'phoneNo') {
        this.removePersistedData('__ss67823');
      }
      if (key === 'page') {
         this.removePersistedData('_form_tracker__');
      }
      delete this.dataHolder[key];
    } else {
      this.dataHolder = {};
    }
  }

}
