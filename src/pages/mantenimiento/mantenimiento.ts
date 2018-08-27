import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, LoadingController, AlertController, normalizeURL } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { NgCalendarModule  } from 'ionic2-calendar';

import { FirebaseService } from '../firebase-integration/firebase-integration.service';
import { ListingPage } from '../listing/listing';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the MantenimientoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mantenimiento',
  templateUrl: 'mantenimiento.html',
})
export class MantenimientoPage {
	@ViewChild('formSlider') slides: Slides;
	viewTitle: string;
	servicioForm: FormGroup;
	servicioForm2: FormGroup;
	servicioForm3: FormGroup;
	servicioForm4: FormGroup;
	fechaSeleccionada: Date;
	loading: any;
	pictures: Array<any> = [];
  default_img: string;
  default_img2: string;
  default_img3: string;
  default_img4: string;



	calendar = {
    mode: 'month',
    currentDate: new Date()
  	};

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public firestoreService: FirebaseService,
  	public loadingCtrl: LoadingController,
  	private alertCtrl: AlertController,
  	private camera: Camera
  	) 
  {
  	this.servicioForm = new FormGroup({
  	  opcion_1: new FormControl(true),
      opcion_2: new FormControl(false),
      opcion_3: new FormControl(false),
      opcion_4: new FormControl(false),
      opcion_5: new FormControl(false),
      opcion_6: new FormControl(false),
      opcion_7: new FormControl(false),
      opcion_8: new FormControl(false),
      opcion_9: new FormControl(false),
      opcion_10: new FormControl(false),
      description: new FormControl('',Validators.required)
    });

    this.servicioForm2 = new FormGroup({
      description2: new FormControl('',Validators.required)
    });

    this.servicioForm3 = new FormGroup({
  	 selected_option: new FormControl('PRIORIDAD BAJA')
    });

    this.servicioForm4 = new FormGroup({
    	from_time: new FormControl('08:00'),
    	to_time: new FormControl('10:00')
    });

    this.fechaSeleccionada = new Date();
    this.loading = this.loadingCtrl.create();
    this.pictures = []; 
    this.default_img = "././assets/images/fix_it/servicios/add-image-64.png";
    this.default_img2 = "././assets/images/fix_it/servicios/add-image-64.png";
    this.default_img3 = "././assets/images/fix_it/servicios/add-image-64.png";
    this.default_img4 = "././assets/images/fix_it/servicios/add-image-64.png";
    

  }

  ionViewDidLoad() {
    this.slides.lockSwipeToNext(true);
  }

   //Tomar foto function
	takePhoto(){
		const options: CameraOptions = {
		  quality: 100,
		  destinationType: this.camera.DestinationType.DATA_URL,
		  encodingType: this.camera.EncodingType.JPEG,
		  mediaType: this.camera.MediaType.PICTURE
		}

		this.camera.getPicture(options).then((imageData) => {
			 // imageData is either a base64 encoded string or a file URI
			 // If it's base64:
			 let base64Image = 'data:image/jpeg;base64,' + imageData;
       this.pictures[0] = base64Image;
       this.default_img = base64Image;
       //función que carga la foto a firestorage 
       //this.firestoreService.uploadImage(base64Image);
			}, (err) => {
			 // Handle error
       console.log("Error en takePhoto");
			});
	}

  //Tomar foto function
  takePhoto2(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64:
       let base64Image = 'data:image/jpeg;base64,' + imageData;
       this.pictures[1] = base64Image;
       this.default_img2 = base64Image;
       //función que carga la foto a firestorage 
       //this.firestoreService.uploadImage(base64Image);
      }, (err) => {
       // Handle error
       console.log("Error en takePhoto");
      });
  }

   //Tomar foto function
  takePhoto3(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64:
       let base64Image = 'data:image/jpeg;base64,' + imageData;
       this.pictures[2] = base64Image;
       this.default_img3 = base64Image;
       //función que carga la foto a firestorage 
       //this.firestoreService.uploadImage(base64Image);
      }, (err) => {
       // Handle error
       console.log("Error en takePhoto");
      });
  }

   //Tomar foto function
  takePhoto4(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64:
       let base64Image = 'data:image/jpeg;base64,' + imageData;
       this.pictures[3] = base64Image;
       this.default_img4 = base64Image;
       //función que carga la foto a firestorage 
       //this.firestoreService.uploadImage(base64Image);
      }, (err) => {
       // Handle error
       console.log("Error en takePhoto");
      });
  }


  

  //Nest slida function
  next(){
  	this.slides.lockSwipeToNext(false);
  	this.slides.slideNext();
  	this.slides.lockSwipeToNext(true);
  }



  //Mensaje de exito function
  presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Solicitud confirmada',
    subTitle: 'Nos pondremos en contacto contigo en menos de 24 horas',
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

//Guardar solicitud function
  save(){
 	
 	this.firestoreService.getDatos()
 	.then(valores =>{

 		this.loading = this.loadingCtrl.create({
      content: 'Tu solicitud esta siendo agendada...'
    });
    this.loading.present();
    
    setTimeout(() => {
        this.loading.dismiss();
      }, 7000);
    setTimeout(() => {
        this.presentAlert();
      }, 7000);

     this.firestoreService.createMantenimiento(
     	this.servicioForm.value, 
     	this.servicioForm2.value, 
     	this.servicioForm3.value,
     	this.servicioForm4.value, 
     	this.fechaSeleccionada,
     	valores.nombre,
     	valores.direccion,
      this.pictures
     	)
    .then(data => {

    })
 	})   
}

//Funciones del calendario
	onViewTitleChanged(title) {
    this.viewTitle = title;
  	}

  	onTimeSelected(ev) {

  		this.fechaSeleccionada = ev.selectedTime;
            console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
                (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
     };

    markDisabled = (date: Date) => {
            var current = new Date();
            return date < current;
    };

}
