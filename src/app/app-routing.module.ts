import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/account/sign-in',
    pathMatch: 'full'
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/auth-layout/auth-layout.module').then( m => m.AuthLayoutPageModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./pages/app-layout/app-layout.module').then( m => m.AppLayoutPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
