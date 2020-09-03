import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InviteUserGroupPage } from './invite-user-group.page';

const routes: Routes = [
  {
    path: '',
    component: InviteUserGroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InviteUserGroupPageRoutingModule {}
