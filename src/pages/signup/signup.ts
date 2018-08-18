import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { TermsOfServicePage } from '../terms-of-service/terms-of-service';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';

import { FirebaseAuthService } from '../firebase-integration/firebase-auth.service';


@Component({
  selector: 'signup-page',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: FormGroup;
  main_page: { component: any };
  loading: any;
  errorMessage: string = '';

  constructor(
    public nav: NavController,
    public modal: ModalController,
    public loadingCtrl: LoadingController,
    public fAuthService: FirebaseAuthService
  ) {
    this.main_page = { component: TabsNavigationPage };

    this.signup = new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  doSignup(value){

    this.loading = this.loadingCtrl.create();
    this.fAuthService.doRegister(value)
    .then(res => {
      this.fAuthService.doLogin(value)
      .then(res => {
        //this.nav.push(FirebaseTabsNavigationPage);
        this.nav.setRoot(this.main_page.component);
        this.loading.dismiss();
      }, error => this.errorMessage = error.message)
    }, err => this.errorMessage = err.message)

    
    console.log("Se preciono boton de registro");
  }

  showTermsModal() {
    let modal = this.modal.create(TermsOfServicePage);
    modal.present();
  }

  showPrivacyModal() {
    let modal = this.modal.create(PrivacyPolicyPage);
    modal.present();
  }

}
