import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { GoogleMapPage } from "./google-map";

@NgModule({
  declarations: [
    GoogleMapPage,
  ],
  imports: [
    IonicPageModule.forChild(GoogleMapPage),
    TranslateModule.forChild()
  ],
  exports: [
    GoogleMapPage
  ]
})
export class GoogleMapPageModule { }
