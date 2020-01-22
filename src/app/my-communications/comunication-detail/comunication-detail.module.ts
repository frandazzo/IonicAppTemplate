import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComunicationDetailPageRoutingModule } from './comunication-detail-routing.module';

import { ComunicationDetailPage } from './comunication-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComunicationDetailPageRoutingModule
  ],
  declarations: [ComunicationDetailPage]
})
export class ComunicationDetailPageModule {}
