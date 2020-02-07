import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ByphotoPageRoutingModule } from './byphoto-routing.module';

import { ByphotoPage } from './byphoto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ByphotoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ByphotoPage]
})
export class ByphotoPageModule {}
