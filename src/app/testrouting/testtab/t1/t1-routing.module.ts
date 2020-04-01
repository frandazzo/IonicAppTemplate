import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { T1Page } from './t1.page';

const routes: Routes = [
  {
    path: '',
    component: T1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class T1PageRoutingModule {}
