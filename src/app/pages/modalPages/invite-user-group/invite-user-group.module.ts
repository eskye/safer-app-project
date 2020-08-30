import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InviteUserGroupPageRoutingModule } from './invite-user-group-routing.module';

import { InviteUserGroupPage } from './invite-user-group.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InviteUserGroupPageRoutingModule
  ],
  declarations: [InviteUserGroupPage]
})
export class InviteUserGroupPageModule {}
