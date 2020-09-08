import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

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
    }else{
      this.group = {name: ''};
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
