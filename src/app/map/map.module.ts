import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ExploreContainerComponentModule } from '../shared/explore-container/explore-container.module'; 
import { MapPageRoutingModule } from './map-routing.module';
import { MapPage } from './map.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    MapPageRoutingModule
  ],
  declarations: [MapPage]
})
export class MapPageModule {}
