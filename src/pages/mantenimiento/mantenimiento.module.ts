import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MantenimientoPage } from './mantenimiento';

@NgModule({
  declarations: [
    MantenimientoPage,
  ],
  imports: [
    IonicPageModule.forChild(MantenimientoPage),
  ],
})
export class MantenimientoPageModule {}
