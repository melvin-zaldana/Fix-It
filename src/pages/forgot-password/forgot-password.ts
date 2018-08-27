import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { FirebaseAuthService } from '../firebase-integration/firebase-auth.service';

import { HomePage } from '../home/home';

@Component({
  selector: 'forgot-password-page',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {
  forgot_password: FormGroup;
  main_page: { component: any };
  errorMessage: string = '';

  constructor(
    public nav: NavController,
    public fAuthService: FirebaseAuthService,
    private alertCtrl: AlertController,
    ) {
    this.main_page = { component: TabsNavigationPage };

    this.forgot_password = new FormGroup({
      email: new FormControl('', Validators.required)
    });
  }

  recoverPassword(value){

    this.fAuthService.recoverPassword(value)
    .then(res =>{
      //this.nav.push(FirebaseTabsNavigationPage);
      //this.nav.setRoot(this.main_page.component);
      this.presentAlert();
      console.log("Se envio correo");
    }, err => this.errorMessage = err.message)

  }

  //Mensaje de exito function
  presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Correo enviado',
    subTitle: 'Revisa tu bandeja de entrada, te enviamos un correo para restablecer tu contraseña',
    buttons: [
       {
        text: 'Ok',
        handler: () => {
          //this.navCtrl.push();
          this.nav.setRoot(HomePage);
        }
      }
    ]
  });
  alert.present();
}

}
