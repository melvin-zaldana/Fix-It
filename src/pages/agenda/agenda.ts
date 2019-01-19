import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//import { NgCalendarModule  } from 'ionic2-calendar';

import { FirebaseService } from '../firebase-integration/firebase-integration.service';
import { CalendarComponent } from "ionic2-calendar/calendar";


/**
 * Generated class for the AgendaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html',
})
export class AgendaPage {
  @ViewChild(CalendarComponent) myCalendar:CalendarComponent;
	eventSource = [];
  	viewTitle: string;
  	selectedDay = new Date();

  	inicio = new Date(2018, 4, 25, 10, 10);
  	fin = new Date(2018, 4, 25, 15, 10);

    calendar = {
    mode: 'month',
    currentDate: new Date()
    };
	

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public firestoreService: FirebaseService) {
  	
  	console.log("Inicio: " + this.inicio);
  	console.log("Fin: " + this.fin);
  	this.loadData();
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgendaPage');
    
  }

  loadData(){
    

    this.firestoreService.getSolicitudes()
    .then(data => {
      
      let dateI;
      let dateF;
      let hi: Array<any>;
      let hf: Array<any>;

      	this.eventSource= [];
        

        console.log(this.eventSource);
        for (let sol of data) {

          if(!(sol.estatus === 'Cancelado' || sol.estatus === 'Realizado')){

          hi = sol.horainicio.split(":");


          dateI = new Date(sol.fecha);
          dateI.setHours(hi[0]);
          dateI.setMinutes(hi[1]);

          dateF = new Date(sol.fecha);


         this.eventSource.push({
            title: sol.servicio,
            startTime: dateI,
            endTime: dateF,
            allDay: false,
            tiposervicios: sol.tiposervicio,
            direccion: sol.direccion,
            fecha: sol.fecha,
            description: sol.descripcion
        });
         
        }
      }
      

      console.log(this.eventSource);
      this.myCalendar.loadEvents();
    })
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  	};

  	onTimeSelected(ev) {
            // console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            //     (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
     };

     eventSelected(event) {
    	//let start = event.startTime;
    	//let end = event.endTime;
    
	   

      console.log(event.title + " x "+ event.startTime + " y " + event.description);
  };

}
