import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { T1PageRoutingModule } from './t1-routing.module';

import { T1Page } from './t1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    T1PageRoutingModule
  ],
  declarations: [T1Page]
})
export class T1PageModule {}
