import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { LoaderController } from 'src/app/shared/loaderctrl';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends LoaderController {

  login: any = { username: '', password: '' };
  submitted = false;

  constructor(
    public router: Router,
    public loadingController: LoadingController
  ) {
    super(loadingController);
  }

  async onLogin(form: NgForm) {
    this.submitted = true;
    await this.showLoader('loading');
  }

  onSignup() {
    this.router.navigateByUrl('/account/signup');
  }

}
