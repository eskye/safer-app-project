import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthLayoutPage } from './auth-layout.page';
import { LoginPage } from 'src/app/pages/auth-layout/login/login.page';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutPage,
    children: [
      {
        path: 'sign-in',
        component: LoginPage
      },
      {
        path: 'signup',
        loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
      },
      {
        path: 'verify-otp',
        loadChildren: () => import('./otp-verify/otp-verify.module').then( m => m.OtpVerifyPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/account/sign-in',
    pathMatch: 'full'
  },
  {
    path: 'otp-verify',
    loadChildren: () => import('./otp-verify/otp-verify.module').then( m => m.OtpVerifyPageModule)
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthLayoutPageRoutingModule {}
