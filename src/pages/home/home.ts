import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';

import { FacebookLoginService } from '../facebook-login/facebook-login.service';

import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { ListingPage } from '../listing/listing';

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
    public loadingCtrl: LoadingController
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

  doFacebookSignup() {
    this.loading = this.loadingCtrl.create();
    // Here we will check if the user is already logged in
    // because we don't want to ask users to log in each time they open the app
    let env = this;

    this.facebookLoginService.getFacebookUser()
    .then(function(data) {
       // user is previously logged with FB and we have his data we will let him access the app
       console.log("Exito Login FB");
      env.navCtrl.setRoot(env.main_page.component);
    }, function(error){
      //we don't have the user data so we will ask him to log in
      env.facebookLoginService.doFacebookLoginFirebase()
      .then(function(res){
        console.log("Exito signup FB");
        env.loading.dismiss();
        env.navCtrl.setRoot(env.main_page.component);
      }, function(err){
        console.log("Facebook Login error", err);
        env.loading.dismiss();
      });
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
