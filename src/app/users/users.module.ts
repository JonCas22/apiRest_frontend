import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersPageRoutingModule } from './users-routing.module';

import { UsersPage } from './users.page';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    UsersPageRoutingModule,
    ConfirmDialogModule
  ],
  declarations: [UsersPage],
  providers: [ConfirmationService]
})
export class UsersPageModule {}
