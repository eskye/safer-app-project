import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { BaseComponent } from '@app/shared/core/base/BaseComponent';
import { AccountService } from '@app/shared/services/account.service';
import { ILogin } from '@app/shared';
import { DataStoreService } from '@app/shared/services/data-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
// tslint:disable-next-line:component-class-suffix
export class LoginPage extends BaseComponent {

  login: ILogin = { email: '', password: '' };
  submitted = false;

  constructor(
    public router: Router,
    public loaderCtrl: LoadingController,
    public toasterCtrl: ToastController,
    private accountService: AccountService,
    private dataService: DataStoreService
  ) {
    super(toasterCtrl, router, null, loaderCtrl, accountService);
  }

  async onLogin(form: NgForm) {
    if (form.valid){
      await this.showLoader('Loading' );
      this.accountService.login(this.login).subscribe(async (res) => {
        this.dataService.keepData('token', res.data.token);
       // await this.dataService.keepNativeData('token', res.data.token);
        await this.hideLoader();
        this.goToNav('/app/tab/tabs/group');
      }, error => {
        this.showToast(error);
        this.hideLoader();
      });
    }

  }

  onSignup() {
    this.router.navigateByUrl('/account/signup');
  }

}
