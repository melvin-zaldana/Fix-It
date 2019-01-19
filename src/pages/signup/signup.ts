import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { TermsOfServicePage } from '../terms-of-service/terms-of-service';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy';

import { ListingPage } from '../listing/listing';

import { FirebaseAuthService } from '../firebase-integration/firebase-auth.service';
import { FirebaseService } from '../firebase-integration/firebase-integration.service';
import { Events } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

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
    public fAuthService: FirebaseAuthService,
    public firestoreService: FirebaseService,
    public events: Events,
    public nativeStorage: NativeStorage
  ) {
    //this.main_page = { component: TabsNavigationPage };
    this.main_page = { component: ListingPage };

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
        this.loadData();

      this.nativeStorage.setItem('user', {email: value.email, password: value.password})
      .then(() => {
        console.log('Datos guardados');
        this.nav.setRoot(this.main_page.component);
        this.loading.dismiss();
      },
        error => console.error('Error storing item', error)
      );


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

  //-----Carga los valores del usuario 
  loadData(){
    this.firestoreService.getDatos()
    .then(data => {
      //this.usuarios = data;
      //console.log(data.nombre);
      this.createUser(data.nombre,data.photoURL);
    })
  }

//----- metodo para pasar el nombre de usuario despues del login a app.html por medio de event
  createUser(user,photo) {
  console.log('User created on Signup!')
  this.events.publish('user:created', user, photo);
  }

}
