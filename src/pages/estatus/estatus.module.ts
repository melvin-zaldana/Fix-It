import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstatusPage } from './estatus';

@NgModule({
  declarations: [
    EstatusPage,
  ],
  imports: [
    IonicPageModule.forChild(EstatusPage),
  ],
})
export class EstatusPageModule {}
