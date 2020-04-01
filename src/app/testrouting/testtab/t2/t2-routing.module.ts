import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { T2Page } from './t2.page';

const routes: Routes = [
  {
    path: '',
    component: T2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class T2PageRoutingModule {}
