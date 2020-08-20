import { LoadingController } from '@ionic/angular';
export class LoaderController{
    loadInstance : HTMLIonLoadingElement;
     constructor(public loaderCrtl: LoadingController){}

    async showLoader(message?: string, customclass?: string){
        this.loadInstance =  await this.loaderCrtl.create({
            cssClass: customclass,
            message: message || 'Please wait...',
          });
          await this.loadInstance.present();
    }

    async hideLoader(){
        await this.loadInstance.dismiss();
    }
}