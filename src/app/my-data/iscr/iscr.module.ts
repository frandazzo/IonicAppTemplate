import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IscrPageRoutingModule } from './iscr-routing.module';

import { IscrPage } from './iscr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IscrPageRoutingModule
  ],
  declarations: [IscrPage]
})
export class IscrPageModule {}
