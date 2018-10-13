import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController, Platform, normalizeURL} from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';

import { TermsOfServicePage } from '../terms-of-service/terms-of-service';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy';

import { WalkthroughPage } from '../walkthrough/walkthrough';

import 'rxjs/Rx';

import { ProfileModel } from '../profile/profile.model';
import { ProfileService } from '../profile/profile.service';

import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from "../../providers/language/language.service";
import { LanguageModel } from "../../providers/language/language.model";
import { AppRate } from '@ionic-native/app-rate';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';

import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirebaseService } from '../firebase-integration/firebase-integration.service';
import { FirebaseAuthService } from '../firebase-integration/firebase-auth.service';



@Component({
  selector: 'settings-page',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  settingsForm: FormGroup;
  // make WalkthroughPage the root (or first) page
  rootPage: any = WalkthroughPage;
  loading: any;
  /*nombre: any;
  telefono: any;
  correo: string;
  direccion: string;*/

  profile: ProfileModel = new ProfileModel();
  
  languages: Array<LanguageModel>;
  avatars: Array<any>;
  usuarios: Array<any>;
  

  constructor(
    public nav: NavController,
    public modal: ModalController,
    public loadingCtrl: LoadingController,
    public translate: TranslateService,
    public languageService: LanguageService,
    public profileService: ProfileService,
    public appRate: AppRate,
    public imagePicker: ImagePicker,
    public cropService: Crop,
    public platform: Platform,
    public firestoreService: FirebaseService,
    public afs: AngularFirestore,
    public fAuthService: FirebaseAuthService

  ) {
    this.loading = this.loadingCtrl.create();

    

    this.settingsForm = new FormGroup({
      name: new FormControl(),
      location: new FormControl(),
      description: new FormControl(),
      currency: new FormControl(),
      weather: new FormControl(),
      notifications: new FormControl(),
      language: new FormControl(),
      phone: new FormControl(),
      email: new FormControl(),
      address: new FormControl()

    });
  }

  ionViewDidLoad() {
    this.loading.present();
   
    

    this.profileService.getData().then(data => {
      this.profile.user = data.user;
      // setValue: With setValue, you assign every form control value at once by passing in a data object whose properties exactly match the form model behind the FormGroup.
      // patchValue: With patchValue, you can assign values to specific controls in a FormGroup by supplying an object of key/value pairs for just the controls of interest.
      // More info: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#populate-the-form-model-with-_setvalue_-and-_patchvalue_
      this.loadData();
     

     /* this.settingsForm.patchValue({
        name: data.user.name,
        location: data.user.location,
        description: data.user.about,
        currency: 'dollar',
        weather: 'fahrenheit',
        notifications: true,
        language: this.languages.filter(x => x.code == currentLang),
        phone: this.telefono,
        email:'melvin@gmail.com',
        address:'roma norte'
      });*/

      this.loading.dismiss();

     /* this.settingsForm.get('language').valueChanges.subscribe((lang) => {
        this.setLanguage(lang);
      });*/
    });

    this.getData2();
    

  }

  logout() {
    this.fAuthService.doLogout();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(this.rootPage);
  }

  showTermsModal() {
    let modal = this.modal.create(TermsOfServicePage);
    modal.present();
  }

  showPrivacyModal() {
    let modal = this.modal.create(PrivacyPolicyPage);
    modal.present();
  }

  openImagePicker(){
   this.imagePicker.hasReadPermission().then(
     (result) => {
       if(result == false){
         // no callbacks required as this opens a popup which returns async
         this.imagePicker.requestReadPermission();
       }
       else if(result == true){
         this.imagePicker.getPictures({ maximumImagesCount: 1 }).then(
           (results) => {
             for (var i = 0; i < results.length; i++) {
               this.cropService.crop(results[i], {quality: 75}).then(
                 newImage => {
                   let image  = normalizeURL(newImage);

                   this.profileService.setUserImage(image);
                   this.profile.user.image = image;
                 },
                 error => console.error("Error cropping image", error)
               );
             }
           }, (err) => console.log(err)
         );
       }
     }, (err) => {
       console.log(err);
     });
  }

  getData2(){
    

    this.firestoreService.getAvatars()
    .then(data => {
      this.avatars = data;
      
    })
  }

//-----Carga datos del usuario almacenado en firestore
  loadData(){
    

    this.firestoreService.getDatos()
    .then(data => {
      this.usuarios = data;
      //console.log(data.nombre);
      this.profile.user.image = data.photoURL;
       this.settingsForm.patchValue({
        name: data.nombre,
        phone: data.telefono,
        email: data.correo,
        address: data.direccion
      });
    })
  }

  doUpdate(value){
    this.loading = this.loadingCtrl.create({
      content: 'Guardando...'
    });

    this.loading.present();
      setTimeout(() => {
        this.loading.dismiss();
      }, 3000);

    this.firestoreService.updateUser(value)
    .then(res => {
      console.log("Se actualizo todo");
      }, err => {
        console.log("Fallo la actualización")
      })

  }


}
