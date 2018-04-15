webpackJsonp([8],{

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListMasterPageModule", function() { return ListMasterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__list_master__ = __webpack_require__(349);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ListMasterPageModule = (function () {
    function ListMasterPageModule() {
    }
    ListMasterPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__list_master__["a" /* ListMasterPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__list_master__["a" /* ListMasterPage */]),
                __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__list_master__["a" /* ListMasterPage */]
            ]
        })
    ], ListMasterPageModule);
    return ListMasterPageModule;
}());

//# sourceMappingURL=list-master.module.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListMasterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_api__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_providers__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ListMasterPage = (function () {
    function ListMasterPage(navCtrl, items, modalCtrl, api) {
        this.navCtrl = navCtrl;
        this.items = items;
        this.modalCtrl = modalCtrl;
        this.api = api;
        // this.currentItems = this.items.query();
        this.currentItems = this.api.get("");
        console.log(this.api.get("?result=10").subscribe(function (val) { return console.log(val); }));
    }
    /**
     * The view loaded, let's query our items for the list
     */
    ListMasterPage.prototype.ionViewDidLoad = function () {
    };
    /**
     * Prompt the user to add a new item. This shows our ItemCreatePage in a
     * modal and then adds the new item to our data source if the user created one.
     */
    ListMasterPage.prototype.addItem = function () {
        var _this = this;
        var addModal = this.modalCtrl.create('ItemCreatePage');
        addModal.onDidDismiss(function (item) {
            if (item) {
                _this.items.add(item);
            }
        });
        addModal.present();
    };
    /**
     * Delete an item from the list of items.
     */
    ListMasterPage.prototype.deleteItem = function (item) {
        this.items.delete(item);
    };
    /**
     * Navigate to the detail page for this item.
     */
    ListMasterPage.prototype.openItem = function (item) {
        this.navCtrl.push('ItemDetailPage', {
            item: item
        });
    };
    ListMasterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list-master',template:/*ion-inline-start:"/Users/PhucNgo/Desktop/CS/machineQResearch/machineq/src/pages/list-master/list-master.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{ \'LIST_MASTER_TITLE\' | translate }}</ion-title>\n\n    <ion-buttons end>\n      <button ion-button icon-only (click)="addItem()">\n        <ion-icon name="add"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-list>\n    <ion-list-header>\n      First floor\n    </ion-list-header>\n    <ion-item-sliding *ngFor="let item of (currentItems | async)?.results">\n      <button ion-item (click)="openItem(item)">\n        <!--<ion-avatar item-start>-->\n          <!--<img [src]="item.picture.thumbnail" />-->\n        <!--</ion-avatar>-->\n        <h2>{{item.title}} </h2>\n        <!--<p>{{item.email}}</p>-->\n        <!--<ion-thumbnail item-start>-->\n          <!--<img [src]="item.picture">-->\n        <!--</ion-thumbnail>-->\n        <!--<h2>{{item.name}}</h2>-->\n        <!--<p>{{item.about}}</p>-->\n        <!--<ion-note item-end *ngIf="item.note">{{item.note}}</ion-note>-->\n      </button>\n\n      <ion-item-options>\n        <button ion-button color="danger" (click)="deleteItem(item)">\n          {{ \'DELETE_BUTTON\' | translate }}\n        </button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n  <!--<ion-list>-->\n    <!--<ion-list-header>-->\n      <!--Second floor-->\n    <!--</ion-list-header>-->\n    <!--<ion-item-sliding *ngFor="let item of currentItems">-->\n      <!--<button ion-item (click)="openItem(item)">-->\n        <!--&lt;!&ndash;<ion-avatar item-start>&ndash;&gt;-->\n        <!--&lt;!&ndash;<img [src]="item.picture" />&ndash;&gt;-->\n        <!--&lt;!&ndash;</ion-avatar>&ndash;&gt;-->\n        <!--&lt;!&ndash;<h2>{{item.name}}</h2>&ndash;&gt;-->\n        <!--&lt;!&ndash;<p>{{item.about}}</p>&ndash;&gt;-->\n        <!--<ion-thumbnail item-start>-->\n          <!--<img [src]="item.picture">-->\n        <!--</ion-thumbnail>-->\n        <!--<h2>{{item.name}}</h2>-->\n        <!--<p>{{item.about}}</p>-->\n        <!--<ion-note item-end *ngIf="item.note">{{item.note}}</ion-note>-->\n      <!--</button>-->\n\n      <!--<ion-item-options>-->\n        <!--<button ion-button color="danger" (click)="deleteItem(item)">-->\n          <!--{{ \'DELETE_BUTTON\' | translate }}-->\n        <!--</button>-->\n      <!--</ion-item-options>-->\n    <!--</ion-item-sliding>-->\n  <!--</ion-list>-->\n</ion-content>\n'/*ion-inline-end:"/Users/PhucNgo/Desktop/CS/machineQResearch/machineq/src/pages/list-master/list-master.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__providers_providers__["b" /* Items */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__providers_api_api__["a" /* Api */]])
    ], ListMasterPage);
    return ListMasterPage;
}());

//# sourceMappingURL=list-master.js.map

/***/ })

});
//# sourceMappingURL=8.js.map