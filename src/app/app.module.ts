import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { AuthInterceptor } from '@app/shared/interceptor/AuthInterceptor';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { LocationService } from '@app/shared/services/location.service';
import { Vibration } from '@ionic-native/vibration/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { AudioService } from '@app/shared/services/audio.service';
import { AgmCoreModule } from '@agm/core';
import {environment} from '@src/environments/environment';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
      BrowserModule,
    IonicModule.forRoot(),
      IonicStorageModule.forRoot({
        name: '__mydb',
        driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
      }),
    HttpClientModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: environment.APIKEY
    }),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    NativeGeocoder,
      Vibration,
      NativeAudio,
      FCM,
      LocationService,
      AudioService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
