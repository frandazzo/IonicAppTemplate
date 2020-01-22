import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyCommunicationsPage } from './my-communications.page';

const routes: Routes = [
  {
    path: '',
    component: MyCommunicationsPage
  },
  {
    path: ':id',
    loadChildren: () => import('./comunication-detail/comunication-detail.module').then( m => m.ComunicationDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCommunicationsPageRoutingModule {}
