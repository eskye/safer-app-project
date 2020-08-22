import { Component } from '@angular/core';
import { ModalController, IonRouterOutlet, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CreategroupPage } from '../pages/modalPages/creategroup/creategroup.page';

@Component({
  selector: 'app-group',
  templateUrl: 'group.page.html',
  styleUrls: ['group.page.scss']
})
export class GroupPage {
  excludeTracks: any;

  constructor(public modalCtrl: ModalController, 
    public router: Router,
    public alertCtrl: AlertController,
    public routerOutlet: IonRouterOutlet) {}

  async createGroup(){
    const modal = await this.modalCtrl.create({
      component: CreategroupPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: { excludedTracks: this.excludeTracks }
    });
    await modal.present();

  }

  async deleteConfirm() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Delete!',
      message: 'Do you want to proceed?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

}
