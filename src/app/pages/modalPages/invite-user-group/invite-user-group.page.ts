import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
  selector: 'app-invite-user-group',
  templateUrl: './invite-user-group.page.html',
  styleUrls: ['./invite-user-group.page.scss'],
})
export class InviteUserGroupPage  {

  public group: any = {name: ''};
  public invite: any = {email: '', uid: ''};
  constructor(
      public modalCtrl: ModalController,
      public navParams: NavParams
  ) {
  }

  ionViewWillEnter() {
    this.group = this.navParams.get('group');
  }

  getValue(value){
    this.invite.email = value;
  }
  close(){
    this.modalCtrl.dismiss();
  }
  sendInvite() {
    this.invite.uid = this.group.uid;
    this.modalCtrl.dismiss(this.invite);
  }
}
