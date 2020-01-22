import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocDetailPageRoutingModule } from './doc-detail-routing.module';

import { DocDetailPage } from './doc-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocDetailPageRoutingModule
  ],
  declarations: [DocDetailPage]
})
export class DocDetailPageModule {}
