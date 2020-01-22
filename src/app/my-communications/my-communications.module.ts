import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyCommunicationsPageRoutingModule } from './my-communications-routing.module';

import { MyCommunicationsPage } from './my-communications.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyCommunicationsPageRoutingModule
  ],
  declarations: [MyCommunicationsPage]
})
export class MyCommunicationsPageModule {}
