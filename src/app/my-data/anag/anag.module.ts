import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnagPageRoutingModule } from './anag-routing.module';

import { AnagPage } from './anag.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnagPageRoutingModule
  ],
  declarations: [AnagPage]
})
export class AnagPageModule {}
