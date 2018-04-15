import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Api } from "../../providers/api/api";
import { Item } from '../../models/item';
import { Items } from '../../providers/providers';
import {Observable} from "rxjs/Observable";

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  // currentItems: Item[];
  currentItems: Observable<any>;

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController, public api: Api) {
    // this.currentItems = this.items.query();
    this.currentItems = this.api.get("");

    console.log(this.api.get("?result=10").subscribe(val => console.log(val)));
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
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
