import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { FirebaseAuthService } from '../firebase-integration/firebase-auth.service';

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
    public fAuthService: FirebaseAuthService
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
      console.log("Se envio correo");
    }, err => this.errorMessage = err.message)

  }

}
