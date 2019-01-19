import { Injectable } from "@angular/core";
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { FacebookUserModel } from './facebook-user.model';

import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
// import { environment } from '../../environment/environment';

@Injectable()
export class FacebookLoginService {

  constructor(
    public http: Http,
    public nativeStorage: NativeStorage,
    public fb: Facebook,
    public platform: Platform,
    public afs: AngularFirestore
  ){
    // this.fb.browserInit(environment.facebook_app_id, "v2.8");
  }

doFacebookLoginFirebase2(){
    return new Promise<FacebookUserModel>((resolve, reject) => {

      this.fb.logout().then(() => { 
        console.log("FB Logout");

        //["public_profile"] is the array of permissions, you can add more if you need
      this.fb.login(["public_profile,email"]).then((response) => {
        //Getting name, gender and email properties
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential)
        .then( success => { 
          console.log("Firebase success: " + JSON.stringify(success)); 
            //Getting name, gender and email properties
            this.fb.api("/me?fields=name,gender,email", [])
            .then((user) => {
              //now we have the users info, let's save it in the Firebase Database
              this.setFacebookUserFireDatabase(user)
              .then((res) => {
                resolve(res);
              });
            })
            

        });
      },(err) => {
        console.log("Error doFacebookLoginFirebase");
        reject(err);
      });

      }).catch((err) => {
        console.log("ERROR FB Logout",err);
       });
    });
  }

  doFacebookLoginFirebase(){
    return new Promise<FacebookUserModel>((resolve, reject) => {
      //["public_profile"] is the array of permissions, you can add more if you need
      this.fb.login(['public_profile','email']).then((response) => {
        //Getting name, gender and email properties
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential)
        .then( success => { 
          console.log("Firebase success: " + JSON.stringify(success)); 
            //Getting name, gender and email properties
            this.fb.api("/me?fields=name,gender,email", [])
            .then((user) => {
              //now we have the users info, let's save it in the Firebase Database
              this.setFacebookUserFireDatabase(user)
              .then((res) => {
                resolve(res);
              });
            })
            

        });
      },(err) => {
        console.log("Error doFacebookLoginFirebase");
        reject(err);
      });
    });
  }


doFacebookLoginFirebase3(){
    return new Promise<FacebookUserModel>((resolve, reject) => {

      this.fb.getLoginStatus().then((res) => {
        if (res.status === 'connected') {
            // Already logged in to FB so pass credentials to provider (in my case firebase)
            let provider = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
            firebase.auth().signInWithCredential(provider).then(success => {
               console.log("Firebase success: status ==== connected"); 
               //Getting name, gender and email properties
               this.fb.api("/me?fields=name,gender,email", []).then((user)=>{
                //now we have the users info, let's save it in the Firebase Database
                    this.setFacebookUserFireDatabase(user)
                    .then((res) => {
                      resolve(res);
                    });
               })
            });
        } else {
            // Not already logged in to FB so sign in
            
            //["public_profile"] is the array of permissions, you can add more if you need
            this.fb.login(["public_profile,email"]).then((response) => {
              //Getting name, gender and email properties
              const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);

              firebase.auth().signInWithCredential(facebookCredential)
              .then( success => { 
                console.log("Firebase success: " + JSON.stringify(success)); 
                  //Getting name, gender and email properties
                  this.fb.api("/me?fields=name,gender,email", [])
                  .then((user) => {
                    //now we have the users info, let's save it in the Firebase Database
                    this.setFacebookUserFireDatabase(user)
                    .then((res) => {
                      resolve(res);
                    });
                  })
                  

              });
            },(err) => {
              console.log("Error doFacebookLoginFirebase");
              reject(err);
            });
        }
    });
    });
  }


  setFacebookUserFireDatabase(user: any){
    return new Promise<any>((resolve, reject) => {

            //*** Firestore ***//
            var userData = firebase.auth().currentUser;
            var uid = "0";
            if (userData != null){
              uid = userData.uid;
            }
            this.afs.collection('/usuarios').doc(uid).set({
            id: uid,
            nombre: user.name,
            telefono: "",
            correo: user.email,
            direccion: "",
            photoURL: "https://graph.facebook.com/" + user.id + "/picture?type=large"
          })
          .then(
            res => resolve(res),
            err => reject(err)
          )

          this.nativeStorage.setItem('facebook_user',
              {
                userId: user.id,
                name: user.name,
                gender: user.gender,
                image: "https://graph.facebook.com/" + user.id + "/picture?type=large"            
              })
           
        })
}


  setFacebookUserFirebase(user: any)
  {
    return new Promise<FacebookUserModel>((resolve, reject) => {
      this.getFriendsFakeData()
      .then(data => {
        resolve({
          userId: user.id,
          name: user.name,
          gender: user.gender,
          image: "https://graph.facebook.com/" + user.id + "/picture?type=large",
          friends: data.friends,
          photos: data.photos
        })
      });
    });
  }

  doFacebookLogin()
  {
    return new Promise<FacebookUserModel>((resolve, reject) => {
      //["public_profile"] is the array of permissions, you can add more if you need
      this.fb.login(["public_profile"]).then((response) => {
        //Getting name and gender properties
        this.fb.api("/me?fields=name,gender", [])
        .then((user) => {
          //now we have the users info, let's save it in the NativeStorage
          this.setFacebookUser(user)
          .then((res) => {
            resolve(res);
          });
        })
      }, (err) => {
        reject(err);
      });
    });
  }

  doFacebookLogout()
  {
    return new Promise((resolve, reject) => {
      this.fb.logout()
      .then((res) => {
        //user logged out so we will remove him from the NativeStorage
        this.nativeStorage.remove('facebook_user');
        resolve();
      }, (err) => {
        reject();
      });
    });
  }

  getFacebookUser()
  {
    return this.nativeStorage.getItem('facebook_user');
  }

  setFacebookUser(user: any)
  {
    return new Promise<FacebookUserModel>((resolve, reject) => {
      this.getFriendsFakeData()
      .then(data => {
        resolve(this.nativeStorage.setItem('facebook_user',
          {
            userId: user.id,
            name: user.name,
            gender: user.gender,
            image: "https://graph.facebook.com/" + user.id + "/picture?type=large",
            friends: data.friends,
            photos: data.photos
          })
        );
      });
    });
  }

  getFriendsFakeData(): Promise<FacebookUserModel> {
    return this.http.get('./assets/example_data/social_integrations.json')
     .toPromise()
     .then(response => response.json() as FacebookUserModel)
     .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
