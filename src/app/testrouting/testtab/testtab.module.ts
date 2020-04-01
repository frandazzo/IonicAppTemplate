import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TesttabPageRoutingModule } from './testtab-routing.module';

import { TesttabPage } from './testtab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TesttabPageRoutingModule
  ],
  declarations: [TesttabPage]
})
export class TesttabPageModule {}
