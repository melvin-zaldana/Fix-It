import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from '../firebase-integration/firebase-integration.service';

/**
 * Generated class for the EstatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-estatus',
  templateUrl: 'estatus.html',
})
export class EstatusPage {
	
	listaS: any;
	

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public firestoreService: FirebaseService
  	) {
  	
  	
  }

  ionViewWillEnter() {
    this.firestoreService.getSolicitudes()
	  	.then( solicitudes =>{
	  		this.listaS = solicitudes;
	  		console.log(this.listaS);
	  	})
  }

  Cancel(id){
  	this.firestoreService.cancelEstatus(id)
	  	.then( solicitudes =>{
	  		console.log("Cancelado");
	  	})
  }
 
}
