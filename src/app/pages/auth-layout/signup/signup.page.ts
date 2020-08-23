import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { BaseComponent, IAccount } from '@app/shared';
import { LoadingController, ToastController } from '@ionic/angular';
import { AccountService } from '@app/shared/services/account.service';
import { DataStoreService } from '@app/shared/services/data-store.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage extends BaseComponent{
  signup: IAccount = {
    firstname: '',
    lastname: '',
    phonenumber: '',
    address: '',
    email: '',
    password: ''
  };
  submitted = false;

  constructor(
      public router: Router,
      public loaderCtrl: LoadingController,
      public toasterCtrl: ToastController,
      private accountService: AccountService
  ) {
    super(toasterCtrl, router, null, loaderCtrl, accountService);
  }
  async onSignup(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      await this.showLoader('Loading' );
      this.accountService.register(this.signup).subscribe((res) => {
        this.hideLoader();
        this.showToast('Your account has been created successfully');
        this.router.navigateByUrl('/account/verify-otp');
      }, error => {
        this.showToast(error);
        this.hideLoader();
      });
    }
  }

}
