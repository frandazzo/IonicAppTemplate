import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestroutingPageRoutingModule } from './testrouting-routing.module';

import { TestroutingPage } from './testrouting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestroutingPageRoutingModule
  ],
  declarations: [TestroutingPage]
})
export class TestroutingPageModule {}
