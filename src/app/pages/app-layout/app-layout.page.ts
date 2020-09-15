import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/shared/services/authentication.service';
import { DataStoreService } from '@app/shared/services/data-store.service';
import { Router } from '@angular/router';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { INotificationPayload } from 'cordova-plugin-fcm-with-dependecy-updated';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { LocationService } from '@app/shared/services/location.service';
import { EmergencyService } from '@app/shared/services/emergency.service';
import { BaseComponent } from '@app/shared';
import { NativeGeocoder, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { AudioService } from '@app/shared/services/audio.service';
import { IEmergency } from '@app/shared/core/model/IEmergency';
import { isNullOrUndefined } from 'util';
import { debounceTime } from 'rxjs/operators';
import {environment} from '@src/environments/environment.prod';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.page.html',
  styleUrls: ['./app-layout.page.scss'],
})
// tslint:disable-next-line:component-class-suffix
export class AppLayoutPage extends BaseComponent implements OnInit, OnDestroy {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Groups',
      url: '/app/tab/tabs/group',
      icon: 'people'
    },
    {
      title: 'Setting',
      url: '/sidemenu/Trash',
      icon: 'settings'
    }
  ];
  fullname: any;
  email: string;
  decodeToken: any;
  public hasPermission: boolean;
  public token: string;
  public pushPayload: INotificationPayload;
  emergency = {
    latitude: 0,
    longitude: 0,
    address: ''
  };
  emergencies: IEmergency[] = [];
  private address: string;
  constructor(public router: Router,
              private authService: AuthenticationService,
              private dataStore: DataStoreService,
              private fcm: FCM,
              private platform: Platform,
              private locationService: LocationService,
              private geolocation: Geolocation,
              private nativeGeocoder: NativeGeocoder,
              private emergencyService: EmergencyService,
              public loaderCtrl: LoadingController,
              private audioService: AudioService,
              private vibration: Vibration,
              public toastCtrl: ToastController) {
    super(toastCtrl, router, null, loaderCtrl, emergencyService);
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(async () => {
      window.addEventListener('volumebuttonslistener', debounce(async (e) => {
        e.preventDefault();
        const signal = (e as any).signal;
        if (signal === 'volume-down') {
             await this.getCurrentLocation();
        }
      },  3000), false);
      await this.setupFCM();
    });
  }
  async ngOnInit() {
    this.decodeToken = this.authService.decodeToken();
    if (this.decodeToken) {
      this.email = this.decodeToken.email;
      this.fullname = this.decodeToken.firstname;
    }
  }
  async getFireBaseNotifications() {
    this.fcm.onNotification().subscribe((payload) => {
      this.pushPayload = payload;
      this.vibration.vibrate(3000);
      this.audioService.play('notification');
      this.saveEmergency(payload);
      console.log('onNotification received event with: ', payload);
    });
    this.pushPayload = await this.fcm.getInitialPushPayload();
    console.log('getInitialPushPayload result: ', this.pushPayload);
  }
  getAddress(lat, long) {
    this.nativeGeocoder.reverseGeocode(lat, long, this.locationService.nativeGeocoderOptions)
      .then((res: NativeGeocoderResult[]) => {
        this.address = this.locationService.pretifyAddress(res[0]);
      });
  }
  async getCurrentLocation() {
    await this.geolocation.getCurrentPosition().then(async res => {
      this.getAddress(res.coords.latitude, res.coords.longitude);
      this.emergency = {
        address: '',
        latitude: res.coords.latitude,
        longitude: res.coords.longitude
      };
      await this.sendEmergency(this.emergency);
    }).catch(err => {
      console.error(err);
    });
  }
  async logout() {
    this.dataStore.removeAllPersistedData();
    this.router.navigateByUrl('/account/sign-in');
  }
  ngAfterViewInit() {
    this.audioService.preload('notification', 'assets/sounds/emergency.ogg');
  }
  ngOnDestroy() {
    window.removeEventListener('volumebuttonslistener', () => { }, false);
  }

  async sendEmergency(emergency) {
    emergency.address = this.address;
    await this.showLoader('Activating emergency signal');
    this.emergencyService.create(emergency).subscribe(async _res => {
      await this.showToast('emergency activated');
      await this.hideLoader();
    }, error => {
      this.showToast(error);
      this.hideLoader();
    });
  }
  private async setupFCM() {
    await this.platform.ready();
    console.log('FCM setup started');
    if (!this.platform.is('cordova')) {
      return;
    }
    console.log('In cordova platform');
    this.fcm.onTokenRefresh().subscribe((newToken) => {
      this.token = newToken;
      console.log('onTokenRefresh received event with: ', newToken);
    });
    this.hasPermission = await this.fcm.requestPushPermission();
    console.log('requestPushPermission result: ', this.hasPermission);
    this.token = await this.fcm.getToken();
    console.log('getToken result: ', this.token);
    this.dataStore.keepData('fcmToken', this.token);
    await this.getFireBaseNotifications();
  }
  private saveEmergency(payload){
    const records = window.localStorage.getItem('emergencies');
    const getEmergencies = JSON.parse(records) as IEmergency[];
    if (isNullOrUndefined(getEmergencies)){
      this.emergencies.push({
        isRead: false,
        wasTapped: false,
        title: payload.title,
        longitude: payload.longitude,
        latitude: payload.latitude,
        emergency_id: payload.emergency_id,
        body: payload.body,
        address: payload.address
      });
      this.dataStore.setLocalData('emergencies', JSON.stringify(this.emergencies));
    }else if (getEmergencies.length > 0){ 
      if(!getEmergencies.find(e => e.emergency_id === payload.emergency_id)){
        getEmergencies.push({
          isRead: false,
          wasTapped: false,
          title: payload.title,
          longitude: payload.longitude,
          latitude: payload.latitude,
          emergency_id: payload.emergency_id,
          body: payload.body,
          address: payload.address
        });
        this.dataStore.setLocalData('emergencies', JSON.stringify(getEmergencies));
      }
      const existingEmergencyIndex = getEmergencies.findIndex(x => x.emergency_id === payload.emergency_id);
      getEmergencies.splice(existingEmergencyIndex, 1);
    }
  }
}

const debounce = (func, delay) => {
  let inDebounce;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };

};
const loadMap = () => {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.APIKEY}`;
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
};
