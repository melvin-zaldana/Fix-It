import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';

import { Firebase } from '@ionic-native/firebase';
import * as firebase from 'firebase/app';

/*
  Generated class for the FcmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FcmProvider {

  constructor(
  	public http: HttpClient,
    public firebaseNative: Firebase,
     public afs: AngularFirestore,
    private platform: Platform
    ) {

    console.log('Hello FcmProvider Provider');

  }

   // Get permission from the user
  async getToken() {

  	let token;

  if (this.platform.is('android')) {
    token = await this.firebaseNative.getToken();
    console.log("obtuvimos el token",token);
  } 

  if (this.platform.is('ios')) {
    token = await this.firebaseNative.getToken();
    await this.firebaseNative.grantPermission();
  } 
  
  return this.saveTokenToFirestore(token)

  }

  // Save the token to firestore
  private saveTokenToFirestore(token) {
    console.log("intentaremos guardar  el token",token);
  	if (!token){
      console.log("Null: el token es",token);
      return;
    } 

  //Get id of current user
  let user = firebase.auth().currentUser.uid;
  const devicesRef = this.afs.collection('/usuarios')

  const docData = { 
    token
  }
  console.log("obtuvimos el token y lo guardamos");
  return devicesRef.doc(user).update(docData)

  }

  // Listen to incoming FCM messages
  listenToNotifications() {
  	return this.firebaseNative.onNotificationOpen()
  }

}
