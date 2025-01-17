import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';
import { SystemConstant } from '@app-shared/constant';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})

export class DataStoreService {

  private dataHolder: any = {};
  private item: any;

  constructor(private storage: Storage) { }

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
  this.storage.ready().then(async () => {
    await this.storage.set(key, data);
   });
  }

  public removeAllPersistedData(): void {
    window.localStorage.clear();
    this.storage.clear();
  }

  public getPersistedData(key): any {
    const item = window.localStorage.getItem(key);
    if (!item) { return; }
    return key === '_sstt23tken5_' ? item : this.decryptData(item);
  }
  public getNativePersistedData(key): any {
    // let item: any;
    this.storage.get(key).then(data => {
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
      return this.persistData('_sstt23tken5_', sharedData);
    }

    if (key === 'fcmToken') {
      return this.persistData('_112230994_', sharedData);
    }
    if (key === 'emergencies') {
      return this.persistData('_emergency_tracker__', sharedData);
    }


    this.dataHolder[key] = sharedData;
  }
  public getLocalData(key){
    return window.localStorage.getItem(key);
  }

  public setLocalData(key, data){
    return window.localStorage.setItem(key, data);
  }

  public getData(key) {

    if (key === 'role') {
      return this.getPersistedData('__jtoh67823_') ?
        this.getPersistedData('__jtoh67823_') : false;
    }
    if (key === 'token') {
      return this.getPersistedData('_sstt23tken5_');
    }
    if (key === 'fcmToken') {
      return this.getPersistedData('_112230994_');
    }
    if (key === 'emergencies') {
      return this.getPersistedData('_emergency_tracker__');
    }
    return key ? this.dataHolder[key] : this.dataHolder;
  }

  public getNativeData(key) {
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
