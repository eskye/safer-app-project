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
      }
    ]
  },
  {
    path: '',
    redirectTo: '/account/sign-in',
    pathMatch: 'full'
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthLayoutPageRoutingModule {}
