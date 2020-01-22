import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnagPage } from './anag.page';

const routes: Routes = [
  {
    path: '',
    component: AnagPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnagPageRoutingModule {}
