import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { TableModule } from 'primeng/table';
import {DropdownModule} from 'primeng';
import { FullCalendarModule } from 'primeng/fullcalendar';
import {FieldsetModule} from 'primeng';
import {ChartModule} from 'primeng/chart';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TableModule,
    DropdownModule,
    FullCalendarModule,
    FieldsetModule,
    ChartModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
