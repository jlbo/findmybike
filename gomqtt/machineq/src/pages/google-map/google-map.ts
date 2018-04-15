import {Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Api } from "../../providers/api/api";
import { Item } from '../../models/item';
import { Items } from '../../providers/providers';
import {Observable} from "rxjs/Observable";

// import {
//   GoogleMaps,
//   GoogleMap,
//   GoogleMapsEvent,
//   GoogleMapOptions,
//   CameraPosition,
//   MarkerOptions,
//   Marker } from "@ionic-native/google-maps";

declare var google;

@IonicPage()
@Component({
  selector: 'page-google-map',
  templateUrl: 'google-map.html'
})

export class GoogleMapPage {
  // currentItems: Item[];
  currentItems: Observable<any>;

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController, public api: Api) {
    // this.currentItems = this.items.query();
    this.currentItems = this.api.get("");

    console.log(this.api.get("?result=10").subscribe(val => console.log(val)));
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });



    // let mapOptions: GoogleMapOptions = {
    //   camera: {
    //     target: {
    //       lat: 43.0741904,
    //       lng: -89.3809802
    //     },
    //     zoom: 18,
    //     tilt: 30
    //   }
    // };
    //
    // this.map = GoogleMaps.create('map', mapOptions);
    //
    // // Wait the MAP_READY before using any methods.
    // this.map.one(GoogleMapsEvent.MAP_READY)
    //   .then(() => {
    //     console.log('Map is ready!');
    //
    //     // Now you can use all methods safely.
    //     this.map.addMarker({
    //       title: 'Ionic',
    //       icon: 'blue',
    //       animation: 'DROP',
    //       position: {
    //         lat: 43.0741904,
    //         lng: -89.3809802
    //       }
    //     })
    //       .then(marker => {
    //         marker.on(GoogleMapsEvent.MARKER_CLICK)
    //           .subscribe(() => {
    //             alert('clicked');
    //           });
    //       });
    //
    //   });
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }
}
