import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';

import { FacebookLoginService } from '../facebook-login/facebook-login.service';
import { FirebaseService } from '../firebase-integration/firebase-integration.service';

import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { ListingPage } from '../listing/listing';
import { Events } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  main_page: { component: any };
  loading: any;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    public facebookLoginService: FacebookLoginService,
    public loadingCtrl: LoadingController,
    public firestoreService: FirebaseService,
    public events: Events
    ) {
  	this.main_page = { component: ListingPage };
  }

    doSignup(){
    this.navCtrl.setRoot(this.main_page.component);
  }

  	goToLogin() {
    this.navCtrl.push(LoginPage);
  }

  	goToSignup() {
    this.navCtrl.push(SignupPage);
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


  doFacebookSignup() {
    this.loading = this.loadingCtrl.create();
    // Here we will check if the user is already logged in
    // because we don't want to ask users to log in each time they open the app
    let env = this;

    env.facebookLoginService.getFacebookUser()
    .then(function(data) {
       // user is previously logged with FB and we have his data we will let him access the app
       console.log("Exito Login FB");
       env.loadData();
      env.navCtrl.setRoot(env.main_page.component);
    }, function(error){
      //we don't have the user data so we will ask him to log in
      env.facebookLoginService.doFacebookLoginFirebase()
      .then(function(res){
        console.log("Exito signup FB");
        env.loadData();
        env.loading.dismiss();
        env.navCtrl.setRoot(env.main_page.component);
      }, function(err){
        console.log("home.ts: Facebook Login error", err);
        env.loading.dismiss();
      });
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
