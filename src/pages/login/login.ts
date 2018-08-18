import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { FirebaseAuthService } from '../firebase-integration/firebase-auth.service';

import { ListingPage } from '../listing/listing';



@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: FormGroup;
  main_page: { component: any };
  loading: any;
  errorMessage: string = '';

  constructor(
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public fAuthService: FirebaseAuthService
  ) {
    //this.main_page = { component: TabsNavigationPage };
    this.main_page = { component: ListingPage };

    this.login = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  doLogin(value){
    this.fAuthService.doLogin(value)
    .then(res =>{
      //this.nav.push(FirebaseTabsNavigationPage);
      this.nav.setRoot(this.main_page.component);
    }, err => this.errorMessage = err.message)
  }


  goToForgotPassword() {
    this.nav.push(ForgotPasswordPage);
  }

}
