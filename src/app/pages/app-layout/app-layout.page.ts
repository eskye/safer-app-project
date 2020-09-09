import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/shared/services/authentication.service';
import { DataStoreService } from '@app/shared/services/data-store.service';
import { Router } from '@angular/router';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { INotificationPayload } from 'cordova-plugin-fcm-with-dependecy-updated';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.page.html',
  styleUrls: ['./app-layout.page.scss'],
})
// tslint:disable-next-line:component-class-suffix
export class AppLayoutPage implements OnInit {
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
  constructor(private authService: AuthenticationService,
              private dataStore: DataStoreService,
              private fcm: FCM,
              private platform: Platform,
              private router: Router) {
      this.setupFCM();
  }

 async ngOnInit() {
     this.decodeToken = this.authService.decodeToken();
     if (this.decodeToken) {
       this.email = this.decodeToken.email;
       this.fullname = this.decodeToken.firstname;
     }
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
    }
  async logout(){
    this.dataStore.removeAllPersistedData();
    this.router.navigateByUrl('/account/sign-in');
  }

}
