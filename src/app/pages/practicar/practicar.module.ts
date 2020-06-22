import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'


import { IonicModule } from '@ionic/angular';

import { PracticarPageRoutingModule } from './practicar-routing.module';

import { PracticarPage } from './practicar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PracticarPageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule 
  ],
  declarations: [PracticarPage]
})
export class PracticarPageModule {}
