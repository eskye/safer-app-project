import { ToastController } from '@ionic/angular';
export class ToasterController {
    toastInstance: HTMLIonToastElement;
     constructor(public toastCtrl: ToastController){
     }
    async showToast(message?: string, customclass?: string){
         this.toastInstance =  await this.toastCtrl.create({
            cssClass: customclass,
            message: message || 'Please wait...',
          });
         await this.toastInstance.present();
    }
    async hideToast(){
        await this.toastInstance.dismiss();
    }
    async getToastInstance(): Promise<HTMLIonToastElement>{
         return this.toastInstance;
    }
}
