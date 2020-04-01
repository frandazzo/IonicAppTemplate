import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TesttabPage } from './testtab.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TesttabPage,
    children: [
      {
        path: 't1',
        children: [
          {
            path: '',
            loadChildren: () => import('./t1/t1.module').then( m => m.T1PageModule)
          }
        ]
      },
      {
        path: 't2',
        children: [
          {
            path: ':id',
            loadChildren: () => import('./t2/t2.module').then( m => m.T2PageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 't1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/t1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TesttabPageRoutingModule {}
