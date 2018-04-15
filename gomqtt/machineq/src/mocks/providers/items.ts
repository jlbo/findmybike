import { Injectable } from '@angular/core';

import { Item } from '../../models/item';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "name": "Sensor",
    "picture": "assets/img/appicon.jpg",
    "about": "Active",
  };


  constructor() {
    let items = [
      {
        "name": "Heat Sensor 1",
        "picture": "assets/img/speakers/heatsensor.png",
        "about": "70°F",
        "note": ""
      },
      {
        "name": "Heat Sensor 2",
        "picture": "assets/img/speakers/heatsensor.png",
        "about": "69°F",
        "note": ""
      },
      {
        "name": "Heat Sensor 3",
        "picture": "assets/img/speakers/heatsensor.png",
        "about": "70°F",
        "note": "Low Battery"
      },
      {
        "name": "Motion Sensor 1",
        "picture": "assets/img/speakers/motionsensor.png",
        "about": "Detection: 2 hours ago",
        "note": "Inactive"
      },
      {
        "name": "Motion Sensor 2",
        "picture": "assets/img/speakers/motionsensor.png",
        "about": "Detection: 5 mins ago",
        "note": ""
      },
      // {
      //   "name": "Molly Mouse",
      //   "picture": "assets/img/speakers/mouse.jpg",
      //   "about": "Molly is a Mouse."
      // },
      // {
      //   "name": "Paul Puppy",
      //   "picture": "assets/img/speakers/puppy.jpg",
      //   "about": "Paul is a Puppy."
      // }
    ];

    for (let item of items) {
      this.items.push(new Item(item));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
