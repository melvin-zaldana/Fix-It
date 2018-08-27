import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { FeedPage } from '../feed/feed';
import 'rxjs/Rx';

import { ListingModel } from './listing.model';
import { ListingService } from './listing.service';

import { ConstruccionPage } from '../construccion/construccion';
import { RemodelacionPage } from '../remodelacion/remodelacion';
import { ReparacionPage } from '../reparacion/reparacion';
import { MantenimientoPage } from '../mantenimiento/mantenimiento';


@Component({
  selector: 'listing-page',
  templateUrl: 'listing.html',
})
export class ListingPage {
  listing: ListingModel = new ListingModel();
  loading: any;

  constructor(
    public nav: NavController,
    public listingService: ListingService,
    public loadingCtrl: LoadingController
  ) {
    this.loading = this.loadingCtrl.create();
  }


  ionViewDidLoad() {
    this.loading.present();
    this.listingService
      .getData()
      .then(data => {
        this.listing.banner_image = data.banner_image;
        this.listing.banner_title = data.banner_title;
        this.listing.populars = data.populars;
        this.listing.categories = data.categories;
        this.loading.dismiss();
      });
  }


  goToFeed(category: any) {
    console.log("Clicked goToFeed", category);
    console.log("Categoria", category.title);
    let cons:string = "Construcción";
    let remo:string = "Remodelación";
    let repa:string = "Reparación";
    let mante:string = "Mantenimiento";

    if(cons === category.title){
      this.nav.push(ConstruccionPage);
    } else if(remo === category.title){
      this.nav.push(RemodelacionPage);
    }else if(repa === category.title){
      this.nav.push(ReparacionPage);
    }else if(mante === category.title){
      this.nav.push(MantenimientoPage);
    }else{
      console.log("NAAAA");
    }

  }

}
