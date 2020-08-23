import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/shared/services/authentication.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.page.html',
  styleUrls: ['./app-layout.page.scss'],
})
export class AppLayoutPage implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Inbox',
      url: '/sidemenu/Inbox',
      icon: 'mail'
    },
    {
      title: 'Outbox',
      url: '/sidemenu/Outbox',
      icon: 'paper-plane'
    },
    {
      title: 'Favorites',
      url: '/sidemenu/Favorites',
      icon: 'heart'
    },
    {
      title: 'Archived',
      url: '/sidemenu/Archived',
      icon: 'archive'
    },
    {
      title: 'Trash',
      url: '/sidemenu/Trash',
      icon: 'trash'
    },
    {
      title: 'Spam',
      url: '/sidemenu/Spam',
      icon: 'warning'
    },
    {
      title: 'Login',
      url: '/sign-in',
      icon: 'person'
    }
  ];

  constructor(private nativeStorage: NativeStorage, private authService: AuthenticationService) { }
fullname: any;
  ngOnInit() {
    this.fullname = this.authService.fullname;
  }

}
