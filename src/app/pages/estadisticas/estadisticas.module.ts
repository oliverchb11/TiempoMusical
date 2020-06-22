import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadisticasPageRoutingModule } from './estadisticas-routing.module';

import { EstadisticasPage } from './estadisticas.page';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadisticasPageRoutingModule,
    ChartsModule
  ],
  declarations: [EstadisticasPage]
})
export class EstadisticasPageModule {}
