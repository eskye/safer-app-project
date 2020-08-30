import { Component, OnInit } from '@angular/core';
import { Config, LoadingController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { IGroup } from '@app/shared/core/model/IGroup';
import { GroupService } from '@app/shared/services/group.service';
import { NgForm } from '@angular/forms';
import { BaseComponent } from '@app/shared';

@Component({
  selector: 'app-creategroup',
  templateUrl: './creategroup.page.html',
  styleUrls: ['./creategroup.page.scss'],
})
export class CreategroupPage{
  public group: any = {name: ''};
  constructor(
    public modalCtrl: ModalController,
    public navParams: NavParams
  ) {
  }

  ionViewWillEnter() {
    const group = this.navParams.get('group');
    if (group) {
      this.group = group;
    }
  }
  getValue(value){
    this.group.name = value;
  }
  close(){
    this.modalCtrl.dismiss();
  }
  createGroup() {
    this.modalCtrl.dismiss(this.group);
  }
}
