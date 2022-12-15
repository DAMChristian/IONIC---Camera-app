import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Galeria } from './galeria.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { GaleriaRoutingModule } from './galeria-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    GaleriaRoutingModule
  ],
  declarations: [Galeria]
})
export class GaleriaModule {}
