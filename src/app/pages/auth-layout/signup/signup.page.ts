import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  signup: any = { username: '', password: '' };
  submitted = false;

  constructor(
    public router: Router
  ) {}

  onSignup(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.router.navigateByUrl('/app/tabs/schedule');
    }
  }

}
