import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './auth/auth.guard';
import {AlreadyLoggedGuardGuard} from './auth/already-logged-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'my-data', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule),
    canLoad: [AlreadyLoggedGuardGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'my-data',
    loadChildren: () => import('./my-data/my-data.module').then( m => m.MyDataPageModule),
   canLoad : [AuthGuard]
  },
  {
    path: 'my-communications',
    loadChildren: () => import('./my-communications/my-communications.module').then( m => m.MyCommunicationsPageModule),
    canLoad : [AuthGuard]
  },
  {
    path: 'testrouting',
    loadChildren: () => import('./testrouting/testrouting.module').then( m => m.TestroutingPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
