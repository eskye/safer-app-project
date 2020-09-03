import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.page.html',
  styleUrls: ['./group-detail.page.scss'],
})
export class GroupDetailPage {

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
