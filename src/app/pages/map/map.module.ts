import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '@app-shared/explore-container/explore-container.module';
import { MapPageRoutingModule } from './map-routing.module';
import { MapPage } from './map.page';
import { AgmCoreModule } from '@agm/core';
import { environment } from '@src/environments/environment';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        MapPageRoutingModule,
        AgmCoreModule.forRoot({
            apiKey: environment.APIKEY
        })
    ],
  declarations: [MapPage]
})
export class MapPageModule {}
