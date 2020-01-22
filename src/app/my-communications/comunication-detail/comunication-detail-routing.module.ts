import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComunicationDetailPage } from './comunication-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ComunicationDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComunicationDetailPageRoutingModule {}
