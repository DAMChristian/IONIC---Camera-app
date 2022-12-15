import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Galeria } from './galeria.page';

import { GaleriaRoutingModule } from './galeria-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    GaleriaRoutingModule
  ],
  declarations: [Galeria]
})
export class GaleriaModule {}
