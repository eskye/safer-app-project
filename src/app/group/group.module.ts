import { GroupPageRoutingModule } from './group-routing.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ExploreContainerComponentModule } from '../shared/explore-container/explore-container.module'; 
import { GroupPage } from './group.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    GroupPageRoutingModule
  ],
  declarations: [GroupPage]
})
export class GroupPageModule {}
