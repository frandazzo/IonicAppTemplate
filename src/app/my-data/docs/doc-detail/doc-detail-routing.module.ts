import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocDetailPage } from './doc-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DocDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocDetailPageRoutingModule {}
