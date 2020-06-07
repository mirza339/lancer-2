import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPagePageRoutingModule } from './modal-page-routing.module';

import { ModalPagePage } from './modal-page.page';

import { CardIO } from '@ionic-native/card-io/ngx';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPagePageRoutingModule
  ],
  declarations: [ModalPagePage]
})
export class ModalPagePageModule {}