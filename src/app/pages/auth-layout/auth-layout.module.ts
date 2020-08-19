import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthLayoutPageRoutingModule } from './auth-layout-routing.module';

import { AuthLayoutPage } from './auth-layout.page';
import { LoginPage } from './login/login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthLayoutPageRoutingModule
  ],
  declarations: [AuthLayoutPage, LoginPage]
})
export class AuthLayoutPageModule {}
