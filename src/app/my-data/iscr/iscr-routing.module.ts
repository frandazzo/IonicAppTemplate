import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IscrPage } from './iscr.page';

const routes: Routes = [
  {
    path: '',
    component: IscrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IscrPageRoutingModule {}
