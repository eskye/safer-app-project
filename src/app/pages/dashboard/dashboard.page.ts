import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/shared';
import { ActionSheetController, AlertController, IonRouterOutlet, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GroupService } from '@app/shared/services/group.service';
import { AuthenticationService } from '@app/shared/services/authentication.service';
import { IEmergency } from '@app/shared/core/model/IEmergency';
import { DataStoreService } from '@app/shared/services/data-store.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage  extends BaseComponent {
emergencies: IEmergency[];
  constructor(public modalCtrl: ModalController,
              public router: Router,
              public alertCtrl: AlertController,
              public loadCtrl: LoadingController,
              public toastCtrl: ToastController,
              public actionSheetController: ActionSheetController,
              private authService: AuthenticationService,
              private dataStoreService: DataStoreService,
              private groupService: GroupService) {
    super(toastCtrl, router, null, loadCtrl, groupService);
  }

  async ionViewDidEnter() {
    await this.init();
    this.getNotifications();
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

  getNotifications(): IEmergency[]{
    const rawData = this.dataStoreService.getLocalData('emergencies');
    if (isNullOrUndefined(rawData)){
      return [];
    }
    const unreadData = JSON.parse(rawData) as IEmergency[];
    if (!unreadData) { return []; }
    this.emergencies = unreadData.filter(x => !x.isRead);
    return this.emergencies;
  }

  showMap(item) {
    this.router.navigate(['/app/tab/tabs/map'], { queryParams: { latitude: item.latitude, 'longitude': item.longitude, 'address':item.address} });
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
