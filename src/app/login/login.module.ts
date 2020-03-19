import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { MessageService } from 'primeng/api';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule
  ],
  providers: [MessageService],
  declarations: [LoginPage]
})
export class LoginPageModule {}
