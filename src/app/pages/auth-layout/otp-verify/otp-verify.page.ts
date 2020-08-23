import { Component, OnInit } from '@angular/core';
import {BaseComponent, IOtp} from '@app/shared';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {LoadingController, ToastController} from '@ionic/angular';
import {AccountService} from '@app/shared/services/account.service';
import {DataStoreService} from '@app/shared/services/data-store.service';

@Component({
  selector: 'app-otp-verify',
  templateUrl: './otp-verify.page.html',
  styleUrls: ['./otp-verify.page.scss'],
})
export class OtpVerifyPage extends BaseComponent {
 otpmodel: IOtp = {otp: ''};
  submitted = false;
  constructor(
      public router: Router,
      public loaderCtrl: LoadingController,
      public toasterCtrl: ToastController,
      private accountService: AccountService
  ) {
    super(toasterCtrl, router, null, loaderCtrl, accountService);
  }

 async onVerify(form: NgForm){
    this.submitted = true;
    if (form.valid) {
      await this.showLoader('Loading' );
      this.accountService.verifyOtp(this.otpmodel).subscribe((res) => {
        this.hideLoader();
        this.showToast('Your account has been activated successfully');
        this.goToNav('/account/sign-in');
      }, error => {
        this.showToast(error);
        this.hideLoader();
      });
    }
  }

}
