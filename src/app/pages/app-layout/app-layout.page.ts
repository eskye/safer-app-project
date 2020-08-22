import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
