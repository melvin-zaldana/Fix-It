import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseService } from '../firebase-integration/firebase-integration.service';
import { ListingPage } from '../listing/listing';
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
    private alertCtrl: AlertController,
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
        this.presentAlert();
	  	})
  }

  //Mensaje de exito function
  presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Solicitud cancelada',
    subTitle: 'Tu solicitud fue cancelada con exito',
    buttons: [
       {
        text: 'Ok',
        handler: () => {
          //this.navCtrl.push();
          this.navCtrl.setRoot(ListingPage);
        }
      }
    ]
  });
  alert.present();
}
 
}
