import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
  selector: 'app-invite-user-group',
  templateUrl: './invite-user-group.page.html',
  styleUrls: ['./invite-user-group.page.scss'],
})
export class InviteUserGroupPage  {

  public group: any = {name: ''};
  constructor(
      public modalCtrl: ModalController,
      public navParams: NavParams
  ) {
  }

  ionViewWillEnter() {
    this.group = this.navParams.get('group');
  }

  getValue(value){
    this.group.name = value;
  }
  createGroup() {
    this.modalCtrl.dismiss(this.group);
  }
}
