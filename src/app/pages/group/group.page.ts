import { Component } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  IonRouterOutlet,
  LoadingController,
  ModalController,
  Platform,
  ToastController
} from '@ionic/angular';
import { Router } from '@angular/router';
import { CreategroupPage } from '../modalPages/creategroup/creategroup.page';
import { GroupService } from '@app/shared/services/group.service';
import { BaseComponent } from '@app/shared';
import { IGroup } from '@app/shared/core/model/IGroup';
import { GroupDetailPage } from '@pages/modalPages/group-detail/group-detail.page';
import { InviteUserGroupPage } from '@pages/modalPages/invite-user-group/invite-user-group.page';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { INotificationPayload } from 'cordova-plugin-fcm-with-dependecy-updated';
import {AuthenticationService} from '@app/shared/services/authentication.service';

@Component({
  selector: 'app-group',
  templateUrl: 'group.page.html',
  styleUrls: ['group.page.scss']
})
// tslint:disable-next-line:component-class-suffix
export class GroupPage extends BaseComponent {
  excludeTracks: any;
  group: IGroup = {
    name: '',
    uid: ''
  };


  public hasPermission: boolean;
  public token: string;
  public pushPayload: INotificationPayload;

  constructor(public modalCtrl: ModalController,
              public router: Router,
              public alertCtrl: AlertController,
              public loadCtrl: LoadingController,
              public toastCtrl: ToastController,
              public actionSheetController: ActionSheetController,
              public routerOutlet: IonRouterOutlet,
              private platform: Platform,
              private authService: AuthenticationService,
              private fcm: FCM,
              private groupService: GroupService) {
    super(toastCtrl, router, null, loadCtrl, groupService);
    this.setupFCM();
  }

  async ionViewDidEnter() {
    await this.init();
  }

  private async setupFCM() {
    await this.platform.ready();
    console.log('FCM setup started');

    console.log('Subscribing to new notifications');
    this.fcm.onNotification().subscribe((payload) => {
      this.pushPayload = payload;
      console.log('onNotification received event with: ', payload);
    });

    this.pushPayload = await this.fcm.getInitialPushPayload();
    console.log('getInitialPushPayload result: ', this.pushPayload);
  }
  async presentActionSheet(item) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      cssClass: 'my-custom-class',
      buttons: [
          {
        text: 'Edit',
        handler: async () => {
          const modal = await this.modalCtrl.create({
            component: CreategroupPage,
            componentProps: {group: item}
          });
          modal.onDidDismiss().then(async res => {
            console.log(res);
            if (res.data){
              await this.showLoader('Loading');
              this.groupService.edit(res.data).subscribe(async (response) => {
                await this.hideLoader();
                await this.showToast('Group updated successfully');
                await this.init();
              }, error => {
                this.showToast(error);
                this.hideLoader();
              });
            }
          });
          await modal.present();
        }
      }, {
        text: 'Details',
        handler: async () => {
          const modal = await this.modalCtrl.create({
            component: GroupDetailPage,
            componentProps: {group: item}
          });
          await modal.present();
        }
       },
        {
          text: 'Delete',
          role: 'destructive',
          handler: async () => {
            await this.deleteConfirm(item);
          }
        },
        {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

 async inviteUser(item){
   const modal = await this.modalCtrl.create({
     component: InviteUserGroupPage,
     componentProps: {group: item}
   });
   modal.onDidDismiss().then(async res => {
     if (!res.data) { return false; }
     await this.showLoader('Loading');
     this.groupService.invite(res.data).subscribe(async (response) => {
       await this.hideLoader();
       await this.showToast(response.data);
     }, error => {
       this.showToast(error);
       this.hideLoader();
     });
   });
   await modal.present();
 }

  async init() {
    await this.showLoader('Fetching data');
    this.groupService.getGroups().subscribe(res => {
      this.items = res.data;
      this.hideLoader();
    }, error => {
      this.hideLoader();
      this.showToast(error);
    });
  }

  async createGroup() {
    const modal = await this.modalCtrl.create({
      component: CreategroupPage
    });
    modal.onDidDismiss().then(async res => {
      await this.showLoader('Loading');
      res.data.token = this.authService.fcmToken;
      this.groupService.create(res.data).subscribe(async (response) => {
        await this.hideLoader();
        await this.showToast('Group created successfully');
        await this.init();
      }, error => {
        this.showToast(error);
        this.hideLoader();
      });
    });
    await modal.present();

  }

  async deleteConfirm(item) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Delete!',
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
            if (!item) {
              await this.showToast('No item to delete');
              return false;
            }
            await this.showLoader('Loading');
            this.groupService.remove(item.uid).subscribe(async (response) => {
                await this.hideLoader();
                await this.showToast('Group deleted successfully');
                await this.init();
              }, error => {
                this.showToast(error);
                this.hideLoader();
              });
          }
        }
      ]
    });

    await alert.present();
  }

}
