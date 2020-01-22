import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyDataPage } from './my-data.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: MyDataPage,
    // redirectTo : '/my-data/tabs/anag',
    // pathMatch : 'full',
    children: [
      {
        path: 'anag',
        loadChildren: () => import('./anag/anag.module').then( m => m.AnagPageModule)
      },
      {
        path: 'iscr',
        loadChildren: () => import('./iscr/iscr.module').then( m => m.IscrPageModule)
      },
      {
        path: 'docs',
        children: [
          {
            path : '',
            loadChildren: () => import('./docs/docs.module').then( m => m.DocsPageModule)
          },
          {
            path: ':id',
            loadChildren: () => import('./docs/doc-detail/doc-detail.module').then( m => m.DocDetailPageModule)
          }
        ]
      }
    ]
  },
  {
    path : '',
    redirectTo : '/my-data/tabs/anag',
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyDataPageRoutingModule {}
