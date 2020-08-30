import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/shared/services/authentication.service';
import {DataStoreService} from '@app/shared/services/data-store.service';
import {Router} from '@angular/router';

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
  constructor(private authService: AuthenticationService,
              private dataStore: DataStoreService,
              private router: Router) {
  }

 async ngOnInit() {
     this.decodeToken = this.authService.decodeToken();
     if (this.decodeToken) {
       this.email = this.decodeToken.email;
       this.fullname = this.decodeToken.firstname;
     }
  }

  async logout(){
    this.dataStore.removeAllPersistedData();
    this.router.navigateByUrl('/account/sign-in');
  }

}
