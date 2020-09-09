import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/shared';
import { ActionSheetController, AlertController, IonRouterOutlet, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GroupService } from '@app/shared/services/group.service';
import { AuthenticationService } from '@app/shared/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage  extends BaseComponent {

  constructor(public modalCtrl: ModalController,
              public router: Router,
              public alertCtrl: AlertController,
              public loadCtrl: LoadingController,
              public toastCtrl: ToastController,
              public actionSheetController: ActionSheetController,
              private authService: AuthenticationService,
              private groupService: GroupService) {
    super(toastCtrl, router, null, loadCtrl, groupService);
  }

  async ionViewDidEnter() {
    await this.init();
  }

  async init() {
    await this.showLoader('Fetching Activities');
    this.groupService.getInvites().subscribe(res => {
      this.items = res.data;
      this.hideLoader();
    }, error => {
      this.hideLoader();
      this.showToast(error);
    });
  }

  async acceptInvite(item: any) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Accept Invite!',
      message: 'Do you want to proceed?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: async () => {
            if (!item) { return false; }
            await this.showLoader('Loading...');
            const body = {uid: item.uid, token: this.authService.fcmToken};
            this.groupService.acceptInvite(body).subscribe(async res => {
              await this.hideLoader();
              await this.showToast(res.data);
              await this.init();
            }, error => {
              this.hideLoader();
              this.showToast(error);
            });
          }
        }
      ]
    });

    await alert.present();
  }
}
