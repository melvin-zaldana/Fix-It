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


    updateUser(value,imgurl){
    return new Promise<any>((resolve, reject) => {
      let user = firebase.auth().currentUser.uid;
      this.afs.collection('/usuarios').doc(user).update({
        correo: value.email,
        direccion: value.address,
        nombre: value.name,
        telefono: value.phone,
        photoURL: imgurl
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

    createSolicitud(servicio,servicios, form2, form4, fecha, nombre, direccionform, pago, imagenes){
    return new Promise<any>((resolve, reject) => {
     
      var imgURLs = [];
      var resolvedPromisesArray = [];
      var today = new Date();
      let user = firebase.auth().currentUser.uid;
      let idS = this.afs.createId();
      

       for (var i = 0; i < imagenes.length; i++) {
        resolvedPromisesArray.push( this.uploadImage(imagenes[i])
        .then(URL =>{
          imgURLs.push(URL);
        }));
      }

     
      
      // wait for all uploadTasks to be done
      Promise.all(resolvedPromisesArray).then(() => {

      this.afs.collection('/solicitudes').doc(idS).set({
        id : idS,
        userid: user,
        servicio: servicio,
        tiposervicio: servicios,
        descripcion: form2.description2,
        imagenes: imgURLs,
        fecha: fecha,
        horainicio: form4.from_time,
        estatus: "Pendiente de inspección",
        username: nombre,
        direccion: direccionform.direccion,
        numero: direccionform.numero,
        fecha_creacion: today,
        pago: pago.selected_option
        
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )

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

  uploadImage(imageURI){
  return new Promise<any>((resolve, reject) => {
    let newName = `${new Date().getTime()}.jpeg`;
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child(`solicitudes/${newName}`);
    imageRef.putString(imageURI, 'data_url')
      .then(snapshot => {
        console.log("Exito en uploadImage");
        resolve(snapshot.downloadURL)
      }, err => {
        console.log("Error uploadImage");
        reject(err);
      })
  })
}



uploadAvatar(imageURI){
  return new Promise<any>((resolve, reject) => {
    let newName = `${new Date().getTime()}.jpeg`;
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child('profile_pictures').child(newName);
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

//--- codigo para encode image a url base64, funciona seleccionando archivos---//

  encodeImageUri(imageUri, callback) {
    
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    console.log("ping en encodeImageUri");
    img.onload = function () {
      console.log("ping2 en encodeImageUri");
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      console.log("ping3 en encodeImageUri");
      callback(dataURL);
    }
    img.onerror = function(){
        console.log("ping ERROR en encodeImageUri");
        //reject(imageUri)
    }
    img.src = imageUri;
    console.log("ping4 en encodeImageUri"+img.src);
  };

  



}
