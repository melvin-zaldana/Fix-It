import { Injectable } from "@angular/core";
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable()
export class FirebaseService {

  constructor(
    public afs: AngularFirestore,
    public platform: Platform
  ){}

  getAvatars(){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/usuarios').valueChanges()
      .subscribe(snapshots => {
        console.log("getAvatars",snapshots);
        resolve(snapshots);
      })
    });
  }

  getDatos(){
    return new Promise<any>((resolve,reject) =>{
      let user = firebase.auth().currentUser.uid;
      this.afs.collection('/usuarios').doc(user).valueChanges()
      .subscribe(snapshots => {
            //console.log("getDatos",snapshots);
            resolve(snapshots);
          })
      });
  }

  getPeople(){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/usuarios').snapshotChanges()
      .subscribe(snapshots => {
        console.log("Document data:", snapshots);
        resolve(snapshots)
      })
    })
  }

  getTest(){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/usuarios').snapshotChanges()
      .subscribe( data=>{
        if(data){
          data.map( test =>{
            //console.log("Map: ", test.payload.doc.data());
            let id = test.payload.doc.id;
            let data = { id, ...test.payload.doc.data() };
            console.log(data);
            //resolve(test.payload.doc.data());
            return data;
          });
        }
      })
    })
  }

  updatePerson(personKey, value){
    return new Promise<any>((resolve, reject) => {
      value.nameToSearch = value.name.toLowerCase();
      this.afs.collection('/people').doc(personKey).set(value)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

    updateUser(value){
    return new Promise<any>((resolve, reject) => {
      let user = firebase.auth().currentUser.uid;
      this.afs.collection('/usuarios').doc(user).set({
        correo: value.email,
        direccion: value.address,
        nombre: value.name,
        telefono: value.phone
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  deletePerson(personKey){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/people').doc(personKey).delete()
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  



  searchPeople(searchValue){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('people', ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      })
    })
  }

  searchPeopleByAge(lower, upper){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('people', ref => ref.orderBy('age').startAt(lower).endAt(upper))
      .snapshotChanges()
      .subscribe(snapshots => {
        resolve (snapshots);
      })
    })
  }


  createPerson(value, avatar){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/people').add({
        name: value.name,
        nameToSearch: value.name.toLowerCase(),
        surname: value.surname,
        age: parseInt(value.age),
        avatar: avatar
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  createConstruccion(form1, form2, form3, form4, fecha, nombre, direccion){
    return new Promise<any>((resolve, reject) => {
      var opcion1 ="";
      var opcion2 ="";
      var opcion3 ="";
      var opcion4 ="";
      
      let user = firebase.auth().currentUser.uid;
      let idS = this.afs.createId();
      if(form1.opcion_1){
        opcion1="Construcción de Cochera";
      }
      if(form1.opcion_2){
        opcion2="Construcción de Terraza";
      }
      if(form1.opcion_3){
        opcion3="Construcción de Cisterna";
      }
      if(form1.opcion_4){
        opcion4="Otros";
      }
      this.afs.collection('/solicitudes').doc(idS).set({
        id : idS,
        userid: user,
        servicio: "Construcción",
        tiposervicio: opcion1 + " " + opcion2 + " " + opcion3+ " " + opcion4,
        descripcion: form1.description,
        descripcion2: form2.description2,
        imagenes: "foto de la construcción",
        prioridad: form3.selected_option,
        fecha: fecha,
        horainicio: form4.from_time,
        horafin: form4.to_time,
        estatus: "Pendiente de inspección",
        username: nombre,
        direccion: direccion
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  uploadImage(personId, imageURI){
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('solicitudes').child(personId).child('image');
      this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          resolve(snapshot.downloadURL)
        }, err => {
          reject(err);
        })
      })
    })
  }

  getSolicitudes(){
    return new Promise<any>((resolve,reject) =>{
      let user = firebase.auth().currentUser.uid;
      this.afs.collection('/solicitudes', ref => ref.where('userid', '==', user)).valueChanges()
      .subscribe(snapshots => {
            //console.log("getDatos",snapshots);
            resolve(snapshots);
          })
      });
  }

  cancelEstatus(id){
    return new Promise<any>((resolve,reject) =>{
      
      this.afs.collection('/solicitudes').doc(id).update({
        estatus:"Cancelado"
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
      });
  }



  //**************************************************************

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

  



}
