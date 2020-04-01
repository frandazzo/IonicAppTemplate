import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { T2PageRoutingModule } from './t2-routing.module';

import { T2Page } from './t2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    T2PageRoutingModule
  ],
  declarations: [T2Page]
})
export class T2PageModule {}
