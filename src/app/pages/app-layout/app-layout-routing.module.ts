import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppLayoutPage } from './app-layout.page';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutPage,
    children: [
      {
        path: 'tab',
        loadChildren: () => import('../tabs/tabs.module').then(m => m.TabsPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppLayoutPageRoutingModule {}
