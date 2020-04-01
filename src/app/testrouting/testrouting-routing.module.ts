import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestroutingPage } from './testrouting.page';

const routes: Routes = [
  {
    path: '',
    component: TestroutingPage
  },
  {
    path: 'testtab/:id',
    loadChildren: () => import('./testtab/testtab.module').then( m => m.TesttabPageModule)
  },
  {
    path: 'testtab',
    loadChildren: () => import('./testtab/testtab.module').then( m => m.TesttabPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestroutingPageRoutingModule {}
