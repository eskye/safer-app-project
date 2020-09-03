import { Component } from '@angular/core';
import { ActionSheetController, AlertController, IonRouterOutlet, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CreategroupPage } from '../modalPages/creategroup/creategroup.page';
import { GroupService } from '@app/shared/services/group.service';
import { BaseComponent } from '@app/shared';
import { IGroup } from '@app/shared/core/model/IGroup';
import { GroupDetailPage } from '@pages/modalPages/group-detail/group-detail.page';
import { InviteUserGroupPage } from '@pages/modalPages/invite-user-group/invite-user-group.page';

@Component({
  selector: 'app-group',
  templateUrl: 'group.page.html',
  styleUrls: ['group.page.scss']
})
export class GroupPage extends BaseComponent {
  excludeTracks: any;
  group: IGroup = {
    name: ''
  };

  constructor(public modalCtrl: ModalController,
              public router: Router,
              public alertCtrl: AlertController,
              public loadCtrl: LoadingController,
              public toastCtrl: ToastController,
              public actionSheetController: ActionSheetController,
              public routerOutlet: IonRouterOutlet,
              private groupService: GroupService) {
    super(toastCtrl, router, null, loadCtrl, groupService);
  }

  async ionViewDidEnter() {
    await this.init();
  }

  async presentActionSheet(item) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Invite',
        handler: async () => {
          const modal = await this.modalCtrl.create({
            component: InviteUserGroupPage,
            componentProps: {group: item}
          });
          await modal.present();
        }
      }, {
        text: 'Edit',
        handler: async () => {
          const modal = await this.modalCtrl.create({
            component: CreategroupPage,
            componentProps: {group: item}
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
          handler: () => {
            this.deleteConfirm();
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


  // async createGroup(form: NgForm) {
  //   if (form.valid){
  //     await this.showLoader('Loading' );
  //     this.groupService.create(this.group).subscribe(async (res) => {
  //       this.dismiss();
  //       await this.hideLoader();
  //     }, error => {
  //       this.showToast(error);
  //       this.hideLoader();
  //     });
  //   }
  //
  // }

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
