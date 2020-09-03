import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/shared/guards/auth.guard';

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
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/app-layout/app-layout.module').then( m => m.AppLayoutPageModule)
  },
  {
    path: 'invite-user-group',
    loadChildren: () => import('./pages/modalPages/invite-user-group/invite-user-group.module').then( m => m.InviteUserGroupPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
