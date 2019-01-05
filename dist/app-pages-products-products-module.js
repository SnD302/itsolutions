(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app-pages-products-products-module"],{

/***/ "./src/app/pages/products/product/product-zoom/product-zoom.component.html":
/*!*********************************************************************************!*\
  !*** ./src/app/pages/products/product/product-zoom/product-zoom.component.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"controls\">\r\n    <button mat-mini-fab color=\"primary\" class=\"zoom-in\" (click)=\"zoomIn()\"><mat-icon>zoom_in</mat-icon></button>\r\n    <button mat-mini-fab color=\"primary\" class=\"zoom-out\" (click)=\"zoomOut()\"><mat-icon>zoom_out</mat-icon></button>\r\n    <button mat-mini-fab color=\"warn\" class=\"close\" (click)=\"close()\"><mat-icon>close</mat-icon></button>\r\n</div>\r\n<div mat-dialog-content>\r\n    <div class=\"viewer\">\r\n        <img [src]=\"image\" #zoomImage>\r\n    </div>    \r\n</div>"

/***/ }),

/***/ "./src/app/pages/products/product/product-zoom/product-zoom.component.scss":
/*!*********************************************************************************!*\
  !*** ./src/app/pages/products/product/product-zoom/product-zoom.component.scss ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".zoom-dialog .mat-dialog-container {\n  overflow: visible !important; }\n  .zoom-dialog .mat-dialog-container .controls {\n    position: relative; }\n  .zoom-dialog .mat-dialog-container .controls button {\n      position: absolute;\n      top: -44px; }\n  .zoom-dialog .mat-dialog-container .controls .zoom-in {\n      right: 44px; }\n  .zoom-dialog .mat-dialog-container .controls .zoom-out {\n      right: 0; }\n  .zoom-dialog .mat-dialog-container .controls .close {\n      right: -44px; }\n  .zoom-dialog .mat-dialog-container .viewer {\n    width: 100%;\n    text-align: center; }\n  .zoom-dialog .mat-dialog-container .viewer img {\n      max-width: 60%; }\n"

/***/ }),

/***/ "./src/app/pages/products/product/product-zoom/product-zoom.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/pages/products/product/product-zoom/product-zoom.component.ts ***!
  \*******************************************************************************/
/*! exports provided: ProductZoomComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductZoomComponent", function() { return ProductZoomComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var ProductZoomComponent = /** @class */ (function () {
    function ProductZoomComponent(dialogRef, image) {
        this.dialogRef = dialogRef;
        this.image = image;
        this.count = 10;
        this.maxWidth = 60;
    }
    ProductZoomComponent.prototype.ngOnInit = function () { };
    ProductZoomComponent.prototype.close = function () {
        this.dialogRef.close();
    };
    ProductZoomComponent.prototype.zoomIn = function () {
        if (this.count < 60) {
            this.maxWidth = this.maxWidth + this.count;
            this.zoomImage.nativeElement.style.maxWidth = this.maxWidth + '%';
            this.count = this.count + 10;
        }
    };
    ProductZoomComponent.prototype.zoomOut = function () {
        if (this.count > 10) {
            this.count = this.count - 10;
            this.maxWidth = this.maxWidth - this.count;
            this.zoomImage.nativeElement.style.maxWidth = this.maxWidth + '%';
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('zoomImage'),
        __metadata("design:type", Object)
    ], ProductZoomComponent.prototype, "zoomImage", void 0);
    ProductZoomComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-product-zoom',
            template: __webpack_require__(/*! ./product-zoom.component.html */ "./src/app/pages/products/product/product-zoom/product-zoom.component.html"),
            styles: [__webpack_require__(/*! ./product-zoom.component.scss */ "./src/app/pages/products/product/product-zoom/product-zoom.component.scss")],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], ProductZoomComponent);
    return ProductZoomComponent;
}());



/***/ }),

/***/ "./src/app/pages/products/product/product.component.html":
/*!***************************************************************!*\
  !*** ./src/app/pages/products/product/product.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main_screen\" [hidden]=\"!main\">\r\n  <div class=\"make_offer\" *ngIf=\"this.myid != this.aduserid\" >\r\n      <span class=\"fw-500\">\r\n        <!-- <label for=\"make-offer\" class=\"titles\" id=\"make-offer\">Make Offer</label><br>\r\n        <input type=\"number\" class=\"offer_box\" step=\"100\" required [(ngModel)]=\"make_offer\" [ngModelOptions]=\"{standalone: true}\" [value]=\"make_offer\"/><br> -->\r\n        <label for=\"make-offer\" class=\"titles_off\" id=\"make-offer\" style=\"font-family: proxr;\">Make Offer</label><br>\r\n        <input type=\"number\" class=\"offer_box\" step=\"100\" required [(ngModel)]=\"make_offer\" [ngModelOptions]=\"{standalone: true}\" [value]=\"make_offer\" style=\"font-family: proxr; font-size:200%; border-radius:7px 7px 7px 7px;\"/><br>\r\n      </span>\r\n      <button mat-stroked-button class=\"offer_but\" id=\"make-offer\" (click)=\"makeoffer(make_offer)\" style=\"font-family: proxs; background-color:#156dbf; border-radius: 7px 7px 7px 7px; color:white;\"> OFFER</button>\r\n      <button mat-stroked-button ngDefaultControl class=\"cancel\" (click)=\"cancel()\" style=\"font-family: proxs; border-color:#156dbf; border-radius: 7px 7px 7px 7px; color:#156dbf; margin-left:10%\">CANCEL</button>\r\n\r\n  </div>\r\n\r\n</div>\r\n\r\n<div [hidden]=\"!top\">\r\n  <mat-toolbar style=\"background-color:#FFFFFF; height:100px;\" >\r\n  <mat-toolbar-row fxLayoutAlign=\"space-between center\" class=\"logo-toolbar theme-container\" style=\"background-color:#FFFFFF;margin-bottom:10%; margin-top:2%\">\r\n      <a class=\"logo\" routerLink=\"/\"  (click) =\"closeSubMenus()\">\r\n        <span style=\"font-size:60%; font-family: proxs; color:#342d38; margin-left:190px; cursor:pointer\"> Back to Home</span>\r\n      <!-- <img src=\"assets/images/icons/logo.png\" height=80 style=\"margin-left:100%;\"/> -->\r\n    </a>\r\n  </mat-toolbar-row>\r\n</mat-toolbar>\r\n</div>\r\n\r\n<div class=\"form_view\" [hidden]=\"!frm\">\r\n  <div class=\"titles_s\"> Ad Details</div>\r\n\r\n\r\n<div fxLayout=\"row wrap\" style=\"margin-top:3%;\">\r\n  <!-- <div fxFlex=\"100\" fxFlex.gt-md=\"20\" fxFlex.md=\"30\" style=\"border: 1px solid;\"> -->\r\n    <div fxFlex=\"100\" fxFlex.gt-md=\"32\" fxFlex.md=\"32\" fxFlex.sm=\"45\">\r\n\r\n\r\n    <mat-card class=\"product-image mat-elevation-z0\" style=\"font-family: proxr; padding:0%; display:initial;\">\r\n      <button mat-icon-button (click)=\"openZoomViewer()\" style=\"margin-top:-5%;\"><mat-icon >fullscreen</mat-icon></button>\r\n      <img *ngIf=\"image\" [src]=\"image\" (mousemove)=\"onMouseMove($event)\" (mouseleave)=\"onMouseLeave($event)\"/>\r\n    </mat-card>\r\n\r\n    <div class=\"small-carousel\" style=\"font-family: proxr;padding:0%\">\r\n      <div class=\"swiper-container\" [swiper]=\"config\">\r\n        <div class=\"swiper-wrapper\">\r\n          <div *ngFor=\"let image of product?.pictures\" class=\"swiper-slide\" >\r\n\r\n            <mat-card (click)=\"selectImage(image)\" style=\"display:initial; padding:0px;box-shadow: 0px 0px 0px; \">\r\n              <img [attr.data-src]=\"image\" class=\"swiper-lazy\" />\r\n              <div class=\"swiper-lazy-preloader\"></div>\r\n            </mat-card>\r\n          </div>\r\n        </div>\r\n        <button mat-icon-button class=\"swiper-button-prev swipe-arrow\"><mat-icon>keyboard_arrow_left</mat-icon></button>\r\n        <button mat-icon-button class=\"swiper-button-next swipe-arrow\"><mat-icon>keyboard_arrow_right</mat-icon></button>\r\n      </div>\r\n    </div>\r\n\r\n    <div fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"space-between center\" class=\"details text-muted py-1\">\r\n    </div>\r\n    <div fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"space-between center\" class=\"details text-muted py-1\">\r\n      <!-- <div>\r\n        <img [attr.data-src]=\"profilePic\" class=\"swiper-lazy\" style=\"font-family: proxr;\"/><p>{{name}}</p>\r\n      </div> -->\r\n      <div style=\"margin-left:35px\">\r\n        <img src={{this.profilePicture}} height=\"45\" width=\"45\" class=\"user_img\" style=\"border-radius:50%; object-fit:cover\"/> <span style=\"font-family:proxs; color:#342d38; margin-left:7px; margin-top: 5px;position:absolute; font-size:120%\"> {{name}} </span>\r\n      </div>\r\n    </div>\r\n\r\n    <div fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"space-between center\" class=\"details text-muted py-1\" style=\"margin-left:20px; margin-top:-3%;\" *ngIf=\"this.myid != this.aduserid\">\r\n\r\n      <a mat-button [matMenuTriggerFor]=\"accountMenu\" #accountMenuTrigger=\"matMenuTrigger\" style=\"font-family:proxr\">\r\n          <span fxShow=\"false\" fxShow.gt-sm><i>Report this Ad</i></span>\r\n      </a>\r\n      <mat-menu #accountMenu=\"matMenu\" [overlapTrigger]=\"false\" xPosition=\"before\" class=\"app-dropdown account\" style=\"font-family:proxr\">\r\n          <span (mouseleave)=\"accountMenuTrigger.closeMenu()\">\r\n              <div class=\"divider\"></div>\r\n              <span mat-menu-item>\r\n                  <span style=\"font-family:proxr\" (click)=\"report_fake()\" ><i>flag as fake</i></span>\r\n              </span>\r\n              <span mat-menu-item>\r\n                  <span style=\"font-family:proxr\" (click)=\"report_sold()\"><i>flag as sold</i></span>\r\n              </span>\r\n              <span mat-menu-item>\r\n                  <span style=\"font-family:proxr\" (click)=\"report_review()\"><i>needs review</i></span>\r\n              </span>\r\n\r\n\r\n              <div class=\"divider\"></div>\r\n\r\n          </span>\r\n      </mat-menu>\r\n    </div>\r\n\r\n  <!-- <div>\r\n    <img src=\"\\assets\\images\\heart.png\" (click)=\"addtofavourites()\" class=\"favourite\"/>\r\n  </div> -->\r\n  </div>\r\n\r\n  <div fxFlex=\"100\" fxFlex.gt-md=\"35\" fxFlex.md=\"35\"  fxFlex.sm=\"45\" ngClass.gt-sm=\" m-0\" ngClass.sm=\"mt-2\" ngClass.xs=\"mt-2\" style=\"font-family: proxr;\">\r\n\r\n    <div #zoomViewer fxShow=\"false\" fxShow.gt-md>\r\n      <mat-card *ngIf=\"zoomImage\" class=\"zoom-viewer mat-elevation-z18\" [ngStyle]=\"{'background-image': 'url(' + zoomImage + ')'}\"></mat-card>\r\n    </div>\r\n\r\n    <div fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"space-between center\" class=\"details text-muted py-1\">\r\n    </div>\r\n\r\n    <span class=\"titles\" style=\"margin-left:4%\">{{product?.title}}</span>\r\n    <br>\r\n    <div class=\"py-1 lh\" style=\"height: 140px;margin-left:4% \">\r\n      <p><span class=\"titles_d fw-500\">{{product?.description}}</span></p>\r\n      <!-- <p><span class=\"text-muted fw-500\">Availibility: </span><span>{{ (product?.visible == true) ? 'In stock':'Unavailable'}}</span></p> -->\r\n    </div>\r\n    <!-- <div class=\"py-1\">\r\n    <app-rating [ratingsCount]=\"product?.ratingsCount\" [ratingsValue]=\"product?.ratingsValue\" [direction]=\"'row'\"></app-rating>\r\n  </div> -->\r\n  <!-- <p class=\"py-1 text-muted lh\">{{product?.description}}</p> -->\r\n\r\n  <!-- <div class=\"divider mt-1\"></div> -->\r\n\r\n\r\n\r\n  <div fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"space-between center\" class=\"details text-muted py-1\">\r\n\r\n    <div class=\"titles\" style=\"margin-left:4%\" *ngIf = \"product?.storage\">\r\n      <img class=\"icon\" style=\"margin-bottom:-5%\" src=\"assets/images/icons/memory.png\" />\r\n      {{product?.storage}}\r\n    </div>\r\n    <!-- <div class=\"color\" style=\"font-family: proxr;\">\r\n      <span class=\"fw-500\" style=\"font-family: proxr;\">COLOR : {{product?.color}}</span>\r\n\r\n      <button mat-raised-button *ngFor=\"let color of product?.color\" [style.background]=\"color\">&nbsp;</button>\r\n    </div> -->\r\n\r\n\r\n</div>\r\n\r\n<div fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"space-between center\" class=\"details text-muted py-1\" style=\"margin-top:-20px\">\r\n  <div class=\"titles\" style=\"margin-top:-6px;margin-left:4%\" *ngIf = \"product?.storage\">\r\n    <img class=\"icon\" style=\"margin-bottom:-5%\" src=\"assets/images/icons/colour.png\" />\r\n    {{product?.color}}\r\n  </div>\r\n  <div *ngIf=\"this.myid != this.aduserid\">\r\n  <span *ngIf=\"this.isFavourite == 'false' \"><button mat-icon-button matTooltip=\"Add to Favourites\" (click)=\"addtofavourites()\"><mat-icon style=\"color:#a40000\">favorite_border</mat-icon></button></span>\r\n  <span *ngIf=\"this.isFavourite == 'true' \"><button mat-icon-button (click)=\"addtofavourites()\"><mat-icon style=\"color:#a40000\">favorite</mat-icon></button></span>\r\n\r\n  </div>\r\n</div>\r\n<div fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"space-between center\" class=\"details text-muted py-1\" style=\"margin-left:7%; margin-top:-10px\" >\r\n  <span style=\"color:#342d38; font-family:proxr; font-size:120%; \" *ngIf=\"this.accessories != undefined && this.accessories != null && this.accessories != '' \" >\r\n    - includes <span *ngFor=\"let issues of accessories\" style=\"font-family:proxs; color:#342d38\">{{issues.description}}, </span>\r\n  </span>\r\n</div>\r\n\r\n<div fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"space-between center\" class=\"details text-muted py-1\" style=\"margin-top:-6%; margin-left:7%\">\r\n  <span style=\"color:#342d38; font-family:proxr; font-size:120%; margin-bottom:2%\" *ngIf=\"this.age != undefined && this.age != null && this.age != '' && this.age == 1 \">\r\n    - used <span style=\"font-family:proxs; color:#342d38\">{{product?.age}} Year </span>\r\n  </span>\r\n  <span style=\"color:#342d38; font-family:proxr; font-size:120%; margin-bottom:2%\" *ngIf=\"this.age != undefined && this.age != null && this.age != '' && this.age >= 2 \">\r\n    - used <span style=\"font-family:proxs; color:#342d38\">{{product?.age}} Years </span>\r\n  </span>\r\n  <span style=\"color:#342d38; font-family:proxr; font-size:120%; margin-bottom:2%\" *ngIf=\"this.age != undefined && this.age != null && this.age != '' && this.age == 0 \">\r\n    - used <span style=\"font-family:proxs; color:#342d38\"> Less than a Year </span>\r\n  </span>\r\n  <span style=\"color:#342d38; font-family:proxr; font-size:120%; margin-bottom:2%\" *ngIf=\"this.age != undefined && this.age != null && this.age != '' && this.age == 8 \">\r\n    - used <span style=\"font-family:proxs; color:#342d38\"> More than 7 Years </span>\r\n  </span>\r\n  <span style=\"color:#342d38; font-family:proxr; font-size:120%; margin-bottom:2%\" *ngIf=\"this.age != undefined && this.age != null && this.age != '' && this.age == -1 \">\r\n    -  <span style=\"font-family:proxs; color:#342d38\"> Brand New </span>\r\n  </span>\r\n</div>\r\n\r\n<div fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"space-between center\" class=\"details text-muted py-1\">\r\n  <button mat-raised-button ngDefaultControl class=\"buy_but\" style=\"background-color:#156dbf; border-radius: 7px 7px 7px 7px;color:white;margin-left:4%; margin-top:4%;\" *ngIf=\"this.myid != this.aduserid\">\r\n    <img src=\"assets/images/icons/message.png\" height=20 class=\"envelope\"/>\r\n    CONTACT\r\n  </button>\r\n</div>\r\n\r\n<div fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"space-between center\" class=\"details text-muted py-1\" style=\"margin-top:-3%; \" >\r\n  <button mat-raised-button ngDefaultControl class=\"buy_but\" (click)=\"buy()\" style=\"background-color:#156dbf; border-radius: 7px 7px 7px 7px;color:white;margin-left:4%\" *ngIf=\"this.myid != this.aduserid && !this.offers\">\r\n    <img src=\"assets/images/icons/cart.png\" height=25 class=\"cart\"/>\r\n    BUY THIS\r\n  </button>\r\n  <span class=\"price\">{{this.mycurrency}} <span style=\"font-size:4vmin\"> {{this.price}} </span></span>\r\n</div>\r\n\r\n\r\n<div fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"space-between center\" class=\"details text-muted py-1\" style=\"margin-top:-3%; float:right\" >\r\n  <div style=\"\" *ngIf=\"this.myid == this.aduserid && !this.boosted\">\r\n    <img src=\"assets/images/icons/boost.png\" height=80 style=\"float:right\" (click)=\"boostad(product?._id)\"/>\r\n  </div>\r\n</div>\r\n<div fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"space-between center\" class=\"details text-muted py-1\" style=\"margin-top:-3%; float:right\" >\r\n  <div style=\"\" *ngIf=\"this.myid == this.aduserid && this.boosted\">\r\n    <img src=\"assets/images/icons/boost-dis.png\" height=80 style=\"float:right\" (click)=\"removeboost(product?._id)\"/>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n<!--\r\n<div class=\"py-1\">\r\n  <app-controls [product]=\"product\" [type]=\"'all'\"></app-controls>\r\n</div>\r\n\r\n<div class=\"divider\"></div> -->\r\n<div fxLayout=\"row\" fxLayoutAlign=\"space-between center\" class=\"text-muted py-1\">\r\n\r\n</div>\r\n\r\n</div>\r\n<div fxFlex=\"100\" fxFlex.gt-md=\"33\" fxFlex.md=\"33\" fxShow.sm=\"false\" fxHide fxShow.gt-sm fxHide.sm ngClass.gt-sm=\"px-3 m-0\" ngClass.sm=\"mt-2\" ngClass.xs=\"mt-2\" style=\"font-family: proxr;background-color:#f2f2f2;\" *ngIf=\"this.deviceDetailscheck != null\">\r\n  <div class=\"full-desc lh\" style=\"margin-left:-25%; width:100%;\">\r\n    <div style=\"font-family:proxs; font-size:110%\">\r\n      {{deviceName}}\r\n    </div>\r\n    <!-- <div fxLayout=\"row wrap\" style=\"margin-top:3%;\">\r\n        <div fxFlex=\"100\" fxFlex.gt-md=\"35\" fxFlex.md=\"35\" fxFlex.sm=\"45\"> -->\r\n    <ul  style=\"font-family: proxr; color:black; list-style-type:none; margin-left:2%\">\r\n    <li><b style=\"font-size:85%;font-family:proxs\"class=\"2rd\">Card Slot</b> <span style=\"font-size: 85%; position:absolute; left:70%\" class=\"3rd\">{{card_slot}}</span></li>\r\n    <li><b style=\"font-size:85%;font-family:proxs\"class=\"2rd\">LoudSpeaker</b> <span style=\"font-size: 85%; position:absolute; left:70%\" class=\"3rd\">{{Loudspeaker}}</span></li>\r\n    <li><b style=\"font-size:85%;font-family:proxs\"class=\"2rd\">Brand</b> <span style=\"font-size: 85%;position:absolute; left:70%\" class=\"3rd\">{{brandName}}</span></li>\r\n    <li><b style=\"font-size:85%;font-family:proxs\"class=\"2rd\">Gps</b><span style=\"font-size: 85%;position:absolute;left:70% \" class=\"3rd\">{{gps}}</span></li>\r\n    <li><b style=\"font-size:85%;font-family:proxs\"class=\"2rd\">Description</b><span style=\"font-size: 85%;position:absolute; left:70%\" class=\"3rd\"> later </span></li>\r\n    <li><b style=\"font-size:85%;font-family:proxs\"class=\"2rd\">Technology</b><span style=\"font-size: 85%;position:absolute; left:70%\" class=\"3rd\"> {{technology}} </span></li>\r\n    <li><b style=\"font-size:85%;font-family:proxs\"class=\"2rd\">Sim</b><span style=\"font-size: 85%;position:absolute; left:70%\" class=\"3rd\"> {{sim}} </span></li>\r\n    <li><b style=\"font-size:85%;font-family:proxs\"class=\"2rd\">Type</b><span style=\"font-size: 85%;position:absolute; left:70%; \" class=\"3rd\"> {{type}} </span></li>\r\n    <li><b style=\"font-size:85%;font-family:proxs\"class=\"2rd\">Alert Types</b><span style=\"font-size: 85%;position:absolute; left:70%\" class=\"3rd\"> {{alert_types}} </span></li>\r\n    <li><b style=\"font-size:85%;font-family:proxs\"class=\"2rd\">Bluetooth</b><span style=\"font-size: 85%;position:absolute; left:70%\" class=\"3rd\"> {{bluetooth}} </span></li>\r\n    <li><b style=\"font-size:85%;font-family:proxs\"class=\"2rd\">Edge</b><span style=\"font-size: 85%;position:absolute; left:70%\" class=\"3rd\"> {{edge}} </span></li>\r\n    <li><b style=\"font-size:85%;font-family:proxs\"class=\"2rd\">Messaging</b><span style=\"font-size: 85%;position:absolute; left:70%\" class=\"3rd\"> {{messaging}} </span></li>\r\n    </ul>\r\n  <!-- </div>\r\n  <div fxFlex=\"100\" fxFlex.gt-md=\"65\" fxFlex.md=\"65\" fxFlex.sm=\"45\">\r\n\r\n  </div>\r\n</div> -->\r\n\r\n  </div>\r\n\r\n\r\n<!-- <div fxFlex=\"100\" fxFlex.gt-md=\"20\" fxHide fxShow.gt-md>\r\n\r\n  <div fxLayout=\"row wrap\" class=\"info-bar\" ngClass.gt-md=\"m-0\">\r\n    <div fxFlex=\"100\" fxFlex.md=\"25\" fxFlex.sm=\"50\">\r\n      <mat-card class=\"light-block\" fxLayout=\"row\"  fxLayoutAlign=\"start center\">\r\n        <mat-icon class=\"mat-icon-xlg text-muted m-0\">card_giftcard</mat-icon>\r\n        <div class=\"content\">\r\n          <p>CONDITION</p>\r\n          <span class=\"text-muted m-0\">{{condition}}</span>\r\n        </div>\r\n      </mat-card>\r\n    </div>\r\n    <div fxFlex=\"100\" fxFlex.md=\"25\" fxFlex.sm=\"50\" class=\"mt-16\">\r\n      <mat-card class=\"light-block\" fxLayout=\"row\"  fxLayoutAlign=\"start center\">\r\n        <mat-icon class=\"mat-icon-xlg text-muted m-0\">local_shipping</mat-icon>\r\n        <div class=\"content\">\r\n          <p>FREE SHIPPING</p>\r\n          <span class=\"text-muted m-0\">Free shipping on all orders over $99</span>\r\n        </div>\r\n      </mat-card>\r\n    </div>\r\n    <div fxFlex=\"100\" fxFlex.md=\"25\"fxFlex.sm=\"50\" class=\"mt-16\">\r\n      <mat-card class=\"light-block\" fxLayout=\"row\"  fxLayoutAlign=\"start center\">\r\n        <mat-icon class=\"mat-icon-xlg text-muted m-0\">monetization_on</mat-icon>\r\n        <div class=\"content\">\r\n          <p>MONEY BACK GUARANTEE</p>\r\n          <span class=\"text-muted m-0\">30 Days money return guarantee</span>\r\n        </div>\r\n      </mat-card>\r\n    </div>\r\n    <div fxFlex=\"100\" fxFlex.md=\"25\" fxFlex.sm=\"50\" class=\"mt-16\">\r\n      <mat-card class=\"light-block\" fxLayout=\"row\"  fxLayoutAlign=\"start center\">\r\n        <mat-icon class=\"mat-icon-xlg text-muted m-0\">history</mat-icon>\r\n        <div class=\"content\">\r\n          <p>ONLINE SUPPORT 24</p>\r\n          <span class=\"text-muted m-0\">Call us: (+100) 123 456 7890</span>\r\n        </div>\r\n      </mat-card>\r\n    </div>\r\n  </div> -->\r\n\r\n<!-- </div> -->\r\n\r\n\r\n\r\n</div>\r\n</div>\r\n\r\n\r\n<!-- <div fxLayout=\"row wrap\" class=\"mt-2\" style=\"font-family: proxr;\">\r\n<div fxFlex=\"100\" fxFlex.gt-md=\"78\" fxFlex.md=\"74\">\r\n  <div fxFlex=\"100\" fxFlex.gt-md=\"100\" fxFlex.md=\"100\">\r\n    <mat-card class=\"mat-elevation-z0\" style=\"margin-left: 7%;width:70%\">\r\n      <mat-tab-group [@.disabled]=\"true\" [selectedIndex]=\"0\">\r\n        <mat-tab label=\"DEVICE DETAILS\" style=\"font-family: proxr;\">\r\n          <div class=\"full-desc lh\">\r\n\r\n            <ul class=\"px-2 mt-1\" style=\"font-family: proxr;\">\r\n              <li><b style=\"font-size:2vmin\">Brand Name :</b> <span style=\"position:absolute;font-family: proxr;font-size: 2vmin; left:50%\">{{brandName}} </span></li>\r\n              <li><b style=\"font-size:2vmin\">Alert_types :</b> <span style=\"position:absolute;font-size: 2vmin; left:50%\">{{alert_types}} </span></li>\r\n              <li><b style=\"font-size:2vmin\">Announced :</b> <span style=\"position:absolute;font-size: 2vmin; left:50%\">{{announced}} </span></li>\r\n              <li><b style=\"font-size:2vmin\">Battery :</b> <span style=\"position:absolute; font-size: 2vmin;left:50%\">{{battery_c}}</span></li>\r\n              <li><b style=\"font-size:2vmin\">Bluetooth :</b> <span style=\"position:absolute; font-size: 2vmin;left:50%\">{{bluetooth}}</span></li>\r\n              <li><b style=\"font-size:2vmin\">Card Slot :</b> <span style=\"position:absolute; font-size: 2vmin;left:50%\">{{card_slot}}</span></li>\r\n              <li><b style=\"font-size:2vmin\">Dimensions :</b><span style=\"position:absolute; font-size: 2vmin;left:50%\"> {{dimensions}}</span></li>\r\n              <li><b style=\"font-size:2vmin\">Edge :</b><span style=\"position:absolute; font-size: 2vmin;left:50%\"> {{edge}}</span></li>\r\n              <li><b style=\"font-size:2vmin\">Gps :</b> <span style=\"position:absolute; font-size: 2vmin;left:50%\">{{gps}}</span></li>\r\n              <li><b style=\"font-size:2vmin\">Java :</b> <span style=\"position:absolute; font-size: 2vmin;left:50%\">{{java}}</span></li>\r\n              <li><b style=\"font-size:2vmin\">Messaging :</b> <span style=\"position:absolute; font-size: 2vmin;font-size: 2vmin;left:50%\">{{messaging}}</span></li>\r\n              <li><b style=\"font-size:2vmin\">Loudspeaker :</b> <span style=\"position:absolute;font-size: 2vmin; left:50%\">{{loudspeaker_}}</span></li>\r\n              <li><b style=\"font-size:2vmin\">Radio :</b><span style=\"position:absolute;font-size: 2vmin; left:50%\"> {{radio}}</span></li>\r\n              <li><b style=\"font-size:2vmin\">Sim :</b> <span style=\"position:absolute;font-size: 2vmin; left:50%\">{{sim}}</span></li>\r\n              <li><b style=\"font-size:2vmin\">Stand_by :</b> <span style=\"position:absolute; font-size: 2vmin;left:50%\">{{stand_by}}</span></li>\r\n              <li><b style=\"font-size:2vmin\">Status :</b><span style=\"position:absolute; font-size: 2vmin;left:50%\"> {{status}}</span></li>\r\n              <li><b style=\"font-size:2vmin\">Talk_time :</b><span style=\"position:absolute; font-size: 2vmin;left:50%\"> {{talk_time}}</span></li>\r\n              <li><b style=\"font-size:2vmin\">Technology :</b><span style=\"position:absolute; font-size: 2vmin;left:50%\"> {{technology}}</span></li>\r\n              <li><b style=\"font-size:2vmin\">Type :</b><span style=\"position:absolute;font-size: 2vmin; left:50%\"> {{type}}</span></li>\r\n              <li><b style=\"font-size:2vmin\">Wlan :</b><span style=\"position:absolute;font-size: 2vmin; left:50%\"> {{wlan}}</span></li>\r\n            </ul>\r\n\r\n          </div>\r\n        </mat-tab>\r\n        <mat-tab label=\"PHYSICAL CONDITIONS\" style=\"font-family: proxr;\">\r\n          <div class=\"full-desc lh\" style=\"font-family: proxr;\">\r\n\r\n            <ul class=\"px-2 mt-1\" style=\"font-family: proxr;\">\r\n              <li *ngFor=\"let issue of physicalIssues\"> <b style=\"font-size:2vmin\">{{issue.description}}</b><span style=\"position:absolute; left:40%;font-size:2vmin\"> Yes</span></li>\r\n            </ul>\r\n          </div>\r\n  </mat-tab>\r\n        <mat-tab label=\"CONDITION\" style=\"font-family: proxr;font-size:2vmin\">\r\n          <div class=\"full-desc lh\">\r\n            <p style=\"font-family: proxr;font-size:2vmin\">{{conditionTitle}}</p>\r\n            <ul class=\"px-2 mt-1\">\r\n              <li *ngFor=\"let issue of condition\">{{issue}}</li>\r\n            </ul>\r\n          </div>\r\n  </mat-tab>\r\n\r\n      <mat-tab label=\"ACCESSORIES\" style=\"font-family: proxr;\">\r\n        <div class=\"full-desc lh\">\r\n\r\n          <ul class=\"px-2 mt-1\" style=\"font-family: proxr;\">\r\n            <li *ngFor=\"let issues of accessories\"><b style=\"font-size:2vmin\">{{issues.description}}</b><span style=\"position:absolute; left:40%;font-size:2vmin\"> Yes</span></li>\r\n          </ul>\r\n        </div>\r\n</mat-tab>\r\n      </mat-tab-group>\r\n\r\n    </mat-card>\r\n  </div>\r\n</div>\r\n</div> -->\r\n\r\n<!-- <div class=\"py-2 mt-2\">\r\n  <h2>Related Products</h2>\r\n  <div class=\"divider\"></div>\r\n  <app-products-carousel [products]=\"relatedProducts\"></app-products-carousel>\r\n</div> -->\r\n"

/***/ }),

/***/ "./src/app/pages/products/product/product.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/pages/products/product/product.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".favourite {\n  width: 12%;\n  height: 12%; }\n\n.price {\n  font-size: 2.5vmin;\n  font-family: proxs;\n  color: #342d38;\n  margin-right: 20%; }\n\n.titles {\n  font-size: 130%;\n  font-family: proxs;\n  color: #342d38; }\n\n.titles_off {\n  font-size: 300%;\n  font-family: proxs;\n  color: #342d38; }\n\n.titles_d {\n  font-size: 110%;\n  font-family: proxr;\n  color: #342d38; }\n\n.titles_s {\n  font-size: 150%;\n  text-align: center;\n  margin-top: -9%;\n  font-family: proxs;\n  color: #342d38; }\n\n.icon {\n  height: 20px; }\n\n.main_screen {\n  text-align: center; }\n\n.user_img {\n  border: 3px solid;\n  border-color: #156dbf; }\n\n.3rd_div {\n  background-color: grey;\n  height: 100%; }\n\n.buy_but {\n  width: 120px;\n  font-family: proxr; }\n\n.envelope {\n  color: white;\n  text-align: center; }\n\n.mat-card.product-image {\n  text-align: center; }\n\n.mat-card.product-image button {\n    position: absolute;\n    top: 0;\n    right: 0;\n    z-index: 99; }\n\n.mat-card.product-image img {\n    margin-left: 10%;\n    width: 268px;\n    height: 275px;\n    -o-object-fit: cover;\n       object-fit: cover; }\n\n.3rd {\n  font-size: 85%;\n  position: absolute;\n  left: 70%; }\n\n.2rd {\n  font-size: 85%;\n  font-family: proxs; }\n\n@media (max-width: 1280px) {\n  .mat-card.product-image {\n    text-align: center; }\n    .mat-card.product-image button {\n      position: absolute;\n      top: 0;\n      right: 0;\n      z-index: 99; }\n    .mat-card.product-image img {\n      margin-left: 10%;\n      width: 150px;\n      height: 220px;\n      -o-object-fit: cover;\n         object-fit: cover; } }\n\n.make_offer {\n  text-align: center;\n  width: 30%;\n  margin-top: 15%;\n  padding: 0%;\n  margin-left: 35%;\n  border: 1px solid #bfbdc1;\n  border-radius: 2px 2px 2px 2px;\n  box-shadow: 5px 6px 6px #bfbdc1; }\n\n.small-carousel {\n  margin-top: 8px;\n  margin-bottom: 8px; }\n\n.small-carousel .swiper-container {\n    margin-right: 40px; }\n\n.small-carousel .swiper-container .swiper-slide {\n      text-align: center; }\n\n.small-carousel .swiper-container .swiper-slide img {\n        max-width: 100%;\n        height: 65px;\n        width: 65px;\n        -o-object-fit: cover;\n           object-fit: cover;\n        margin-left: 31px; }\n\n.small-carousel .swiper-button-next.swiper-button-disabled,\n  .small-carousel .swiper-button-prev.swiper-button-disabled {\n    opacity: 0; }\n\n.small-carousel .swiper-button-prev {\n    left: -10px; }\n\n.small-carousel .swiper-button-next {\n    right: -10px; }\n\n.mat-card.zoom-viewer {\n  position: absolute;\n  display: none;\n  background-repeat: no-repeat;\n  padding: 8px;\n  z-index: 99; }\n\n.mt-16 {\n  margin-top: 16px; }\n\n.details button {\n  padding: 0;\n  min-width: 36px;\n  margin-left: 6px; }\n\n.mat-list.reviews .mat-list-item .mat-list-avatar.review-author {\n  width: 80px;\n  height: 80px; }\n\n.mat-list.reviews .mat-list-item .mat-line.text {\n  white-space: unset;\n  font-style: italic;\n  margin: 10px 0; }\n\n.full-desc {\n  padding: 30px 40px; }\n\n.offer_but {\n  width: 10%;\n  margin-top: 5%;\n  font-family: proxr; }\n\n@media (min-width: 1280px) {\n  .mat-card.product-image img {\n    cursor: zoom-in;\n    cursor: url(\"data:image/svg+xml,%3Csvg fill%3D%22%23000000%22 height%3D%2236%22 viewBox%3D%220 0 24 24%22 width%3D%2236%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0D    %3Cpath d%3D%22M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z%22%2F%3E%0D    %3Cpath d%3D%22M0 0h24v24H0V0z%22 fill%3D%22none%22%2F%3E%0D    %3Cpath d%3D%22M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z%22%2F%3E%0D%3C%2Fsvg%3E\") 10 10, zoom-in; } }\n\n.form_view {\n  margin: auto;\n  width: 74%;\n  margin-top: -3%; }\n"

/***/ }),

/***/ "./src/app/pages/products/product/product.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/pages/products/product/product.component.ts ***!
  \*************************************************************/
/*! exports provided: ProductComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductComponent", function() { return ProductComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var ngx_swiper_wrapper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-swiper-wrapper */ "./node_modules/ngx-swiper-wrapper/dist/ngx-swiper-wrapper.es5.js");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../app.service */ "./src/app/app.service.ts");
/* harmony import */ var _theme_utils_app_validators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../theme/utils/app-validators */ "./src/app/theme/utils/app-validators.ts");
/* harmony import */ var _product_zoom_product_zoom_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./product-zoom/product-zoom.component */ "./src/app/pages/products/product/product-zoom/product-zoom.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var ProductComponent = /** @class */ (function () {
    function ProductComponent(router, appService, activatedRoute, dialog, formBuilder, snackBar) {
        this.router = router;
        this.appService = appService;
        this.activatedRoute = activatedRoute;
        this.dialog = dialog;
        this.formBuilder = formBuilder;
        this.snackBar = snackBar;
        this.config = {};
        this.main = false;
        this.top = true;
        this.frm = true;
    }
    ProductComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.activatedRoute.params.subscribe(function (params) {
            _this.getProductById(params['id']);
            _this.isFavourite = params['name'];
            //    console.log(this.isFavourite);
            console.log("***********", _this.isFavourite);
        });
        this.form = this.formBuilder.group({
            'review': [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            'name': [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(4)])],
            'email': [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _theme_utils_app_validators__WEBPACK_IMPORTED_MODULE_6__["emailValidator"]])]
        });
        //this.getRelatedProducts();
        this.mycurrency = localStorage.getItem('currency');
        this.myid = localStorage.getItem('userid');
        // this.isFavourite=localStorage.getItem('favourite');
        // console.log(this.isFavourite);
    };
    ProductComponent.prototype.ngAfterViewInit = function () {
        this.config = {
            observer: false,
            slidesPerView: 4,
            spaceBetween: 10,
            keyboard: true,
            navigation: true,
            pagination: false,
            loop: false,
            preloadImages: false,
            lazy: true,
            breakpoints: {
                480: {
                    slidesPerView: 2
                },
                600: {
                    slidesPerView: 3,
                }
            }
        };
    };
    ProductComponent.prototype.getProductById = function (id) {
        var _this = this;
        console.log("ID : ", id);
        this.appService.getProductById(id).subscribe(function (data) {
            console.log(data);
            //   for(var i=0;i<data['result'].length;i++){
            //   data['result'][i]['price'] = parseFloat(data['result'][i]['price']).toFixed(2);
            // }
            if (data['result']) {
                data['result']['offers'].forEach(function (j, jdy, y) {
                    if (j.user_id == localStorage.getItem('userid')) {
                        data['result']['offered'] = true;
                        console.log("True");
                        if (jdy == y.length - 1) {
                            console.log("Changed Data = ", data['result']);
                        }
                    }
                    else {
                        console.log("Not True");
                        if (jdy == y.length - 1) {
                            console.log("Changed Data = ", data['result']);
                        }
                    }
                });
                _this.price = parseFloat(data['result']['price']).toFixed(2);
                _this.aduserid = data['result']['user_id']['_id'];
                console.log(_this.aduserid);
                _this.advertid = data['result']['_id'];
                _this.boosted = data['result']['boosted'];
                _this.age = data['result']['age'];
                _this.product = data['result'];
                if (data['result']['deviceDetails']) {
                    var deviceDetails = data['result']['deviceDetails'];
                    _this.deviceDetailscheck = data['result']['deviceDetails'];
                    _this.alert_types = deviceDetails['alert_types'];
                    _this.announced = deviceDetails['announced'];
                    _this.battery_c = deviceDetails['battery_c'];
                    _this.bluetooth = deviceDetails['bluetooth'];
                    _this.card_slot = deviceDetails['card_slot'];
                    _this.dimensions = deviceDetails['dimensions'];
                    _this.edge = deviceDetails['edge'];
                    _this.gps = deviceDetails['gps'];
                    _this.games = deviceDetails['games'];
                    _this.java = deviceDetails['java'];
                    _this.messaging = deviceDetails['messaging'];
                    _this.loudspeaker_ = deviceDetails['loudspeaker_'];
                    _this.phonebook = deviceDetails['phonebook'];
                    _this.radio = deviceDetails['radio'];
                    _this.sim = deviceDetails['sim'];
                    _this.stand_by = deviceDetails['stand_by'];
                    _this.status = deviceDetails['status'];
                    _this.talk_time = deviceDetails['talk_time'];
                    _this.technology = deviceDetails['technology'];
                    _this.type = deviceDetails['type'];
                    _this.wlan = deviceDetails['wlan'];
                    _this.deviceName = data['result']['deviceDetails']['DeviceName'];
                }
                if (data['result']['condition']) {
                    _this.condition = data['result']['condition']['title'];
                    _this.condition = data['result']['condition']['condition'];
                    _this.conditionTitle = data['result']['condition']['title'];
                }
                if (data['result']['physicalIssues']) {
                    _this.physicalIssues = data['result']['physicalIssues'];
                }
                if (data['result']['accessories']) {
                    _this.accessories = data['result']['accessories'];
                }
                if (data['result']['offered']) {
                    _this.offers = data['result']['offered'];
                }
                _this.createdAt = new Date(data['result']['createdAt']);
                _this.month = _this.createdAt.getMonth();
                _this.day = _this.createdAt.getDate();
                _this.year = _this.createdAt.getFullYear();
                _this.full = _this.month + '/' + _this.day + '/' + _this.year;
                // console.log(this.createdAt);
                _this.contact = data['result']['user_id']['mobile'];
                _this.image = data['result']['pictures'][0];
                _this.brandName = data['result']['brandName'];
                _this.name = data['result']['user_id']['name'];
                _this.profilePicture = data['result']['user_id']['profilePicture'];
                _this.profilePic = data['result']['user_id']['profilePicUrl'];
                _this.zoomImage = data['result']['pictures'][0];
                if (_this.type.length > 30) {
                    _this.type = _this.type.substring(0, 30) + "...";
                }
                if (_this.messaging.length > 30) {
                    _this.messaging = _this.messaging.substring(0, 30) + "...";
                }
                if (_this.alert_types.length > 30) {
                    _this.alert_types = _this.alert_types.substring(0, 30) + "...";
                }
                if (_this.gps.length > 30) {
                    _this.gps = _this.gps.substring(0, 30) + "...";
                }
            }
            setTimeout(function () {
                _this.config.observer = true;
                // this.directiveRef.setIndex(0);
            });
        });
    };
    ProductComponent.prototype.makeoffer = function (make_offer) {
        var _this = this;
        console.log(make_offer);
        console.log(this.advertid);
        if (localStorage.getItem('jwt') != undefined && localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != '') {
            this.appService.makeoffer(this.advertid, make_offer).subscribe(function (data) {
                console.log("Data => ", data);
                _this.snackBar.open('Offer Made', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
                _this.main = false;
                _this.frm = true;
                _this.top = true;
            });
        }
        else {
            this.snackBar.open('Please login first', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            this.router.navigate(['/sign-in']);
        }
    };
    ProductComponent.prototype.addtofavourites = function () {
        var _this = this;
        this.add = true;
        this.remove = false;
        console.log(this.isFavourite);
        if (this.isFavourite == 'false' && localStorage.getItem('jwt') != undefined && localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != '') {
            this.appService.addtofavourites(this.advertid, this.add).subscribe(function (data) {
                console.log(data);
                console.log("success");
                console.log(_this.advertid);
                _this.isFavourite = 'true';
            });
        }
        if (this.isFavourite == 'true' && localStorage.getItem('jwt') != undefined && localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != '') {
            this.appService.removefavourites(this.advertid, this.remove).subscribe(function (data) {
                console.log(data);
                console.log("removed");
                console.log(_this.advertid);
                _this.isFavourite = 'false';
            });
        }
    };
    // public getRelatedProducts(){
    //   this.appService.getProducts().subscribe(data => {
    //   //  this.relatedProducts = data;
    //   })
    // }
    ProductComponent.prototype.selectImage = function (image) {
        this.image = image;
        this.zoomImage = image;
    };
    ProductComponent.prototype.onMouseMove = function (e) {
        if (window.innerWidth >= 1280) {
            var image, offsetX, offsetY, x, y, zoomer;
            image = e.currentTarget;
            offsetX = e.offsetX;
            offsetY = e.offsetY;
            x = offsetX / image.offsetWidth * 100;
            y = offsetY / image.offsetHeight * 100;
            zoomer = this.zoomViewer.nativeElement.children[0];
            if (zoomer) {
                zoomer.style.backgroundPosition = x + '% ' + y + '%';
                zoomer.style.display = "block";
                zoomer.style.height = image.height + 'px';
                zoomer.style.width = image.width + 'px';
            }
        }
    };
    ProductComponent.prototype.onMouseLeave = function (event) {
        this.zoomViewer.nativeElement.children[0].style.display = "none";
    };
    ProductComponent.prototype.openZoomViewer = function () {
        this.dialog.open(_product_zoom_product_zoom_component__WEBPACK_IMPORTED_MODULE_7__["ProductZoomComponent"], {
            data: this.zoomImage,
            panelClass: 'zoom-dialog'
        });
    };
    ProductComponent.prototype.buy = function () {
        this.main = true;
        this.frm = false;
        this.top = false;
    };
    ProductComponent.prototype.cancel = function () {
        this.main = false;
        this.frm = true;
        this.top = true;
    };
    ProductComponent.prototype.report_fake = function () {
        var _this = this;
        this.report_type = "flag as fake";
        if (localStorage.getItem('jwt') != undefined && localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != '') {
            this.appService.report(this.advertid, this.report_type).subscribe(function (data) {
                console.log("Data => ", data);
                _this.snackBar.open('Reported', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            });
        }
        else {
            this.snackBar.open('Please login first', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            this.router.navigate(['/sign-in']);
        }
    };
    ProductComponent.prototype.report_sold = function () {
        var _this = this;
        this.report_type = "flag as sold";
        if (localStorage.getItem('jwt') != undefined && localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != '') {
            this.appService.report(this.advertid, this.report_type).subscribe(function (data) {
                console.log("Data => ", data);
                _this.snackBar.open('Reported', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            });
        }
        else {
            this.snackBar.open('Please login first', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            this.router.navigate(['/sign-in']);
        }
    };
    ProductComponent.prototype.report_review = function () {
        var _this = this;
        this.report_type = "needs review";
        if (localStorage.getItem('jwt') != undefined && localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != '') {
            this.appService.report(this.advertid, this.report_type).subscribe(function (data) {
                console.log("Data => ", data);
                _this.snackBar.open('Reported', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            });
        }
        else {
            this.snackBar.open('Please login first', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            this.router.navigate(['/sign-in']);
        }
    };
    ProductComponent.prototype.boostad = function (value) {
        var _this = this;
        console.log(value);
        this.boostmyad = value;
        this.boosttrue = "true";
        this.appService.boostad(this.boostmyad, this.boosttrue).subscribe(function (data) {
            console.log("boost", data);
            if (data['result']) {
                _this.snackBar.open('Advertisement Boosted successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            }
        }, function (err) {
            _this.snackBar.open('Invalid Task!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        });
    };
    ProductComponent.prototype.removeboost = function (value) {
        var _this = this;
        console.log(value);
        this.boostmyad = value;
        this.boosttrue = "false";
        this.appService.boostad(this.boostmyad, this.boosttrue).subscribe(function (data) {
            console.log("boost", data);
            if (data['result']) {
                _this.snackBar.open('Advertisement Boosted successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            }
        }, function (err) {
            _this.snackBar.open('Invalid Task!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        });
    };
    //   public report(){
    //     if(localStorage.getItem('jwt') != undefined && localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != '' ){
    //       this.appService.report(this.advertid).subscribe(data=>{
    //       console.log("Data => ",data)
    //       this.snackBar.open('Reported', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    //       })
    //   }
    // else{
    //   this.snackBar.open('Please login first', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    //   this.router.navigate(['/sign-in']);
    // }
    //   }
    ProductComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ProductComponent.prototype.onSubmit = function (values) {
        if (this.form.valid) {
            //email sent
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('zoomViewer'),
        __metadata("design:type", Object)
    ], ProductComponent.prototype, "zoomViewer", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(ngx_swiper_wrapper__WEBPACK_IMPORTED_MODULE_4__["SwiperDirective"]),
        __metadata("design:type", ngx_swiper_wrapper__WEBPACK_IMPORTED_MODULE_4__["SwiperDirective"])
    ], ProductComponent.prototype, "directiveRef", void 0);
    ProductComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-product',
            template: __webpack_require__(/*! ./product.component.html */ "./src/app/pages/products/product/product.component.html"),
            styles: [__webpack_require__(/*! ./product.component.scss */ "./src/app/pages/products/product/product.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _app_service__WEBPACK_IMPORTED_MODULE_5__["AppService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"]])
    ], ProductComponent);
    return ProductComponent;
}());



/***/ }),

/***/ "./src/app/pages/products/products.component.html":
/*!********************************************************!*\
  !*** ./src/app/pages/products/products.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<div [hidden]=\"!hidemain\">\r\n<mat-toolbar style=\"background-color:#156dbf\">\r\n  <mat-toolbar-row fxLayoutAlign=\"space-between center\" class=\"logo-toolbar theme-container\" style=\"background-color:#FFFFFF\">\r\n      <a class=\"logo\" routerLink=\"/\"  (click) =\"closeSubMenus()\">\r\n      <img src=\"assets/images/icons/logo.png\" height=100 style=\"margin-left:100%\"/>\r\n    </a>\r\n      <div fxFlex fxFlexOffset.gt-sm=\"10\" fxShow=\"false\" fxShow.gt-sm>\r\n          <form method=\"get\"  class=\"search-form\" fxLayout=\"row\" style=\"border: 1px solid; border-color:#cccccc; border-radius:15px 15px 15px 15px; margin-left:80px; width:60%;\">\r\n            <button mat-mini-fab type=\"button\" class=\"search-btn mat-elevation-z0 text-muted\">\r\n                <mat-icon>search</mat-icon>\r\n            </button>\r\n              <input type=\"text\" placeholder=\"Search with Keywords\"  fxFlex [(ngModel)]=\"brand_1\" [ngModelOptions]=\"{standalone: true}\"(ngModelChange)=\"onsearch($event)\" style=\"font-size:80%; font-family:proxr\"/>\r\n          </form>\r\n      </div>\r\n      <div *ngIf=\"brand_1 != undefined && brand_1 != '' \" class=\"search_res\"> Searching in {{brand_1}} </div>\r\n\r\n\r\n\r\n      <div fxFlexOffset=\"10\" fxLayout=\"row\" fxLayoutAlign=\"center center\">\r\n          <div fxLayoutAlign=\"center center\" fxHide=\"false\" fxHide.gt-sm>\r\n              <button mat-icon-button [matMenuTriggerFor]=\"searchMenu\" #searchMenuTrigger=\"matMenuTrigger\" class=\"search-toggle-btn\">\r\n                  <mat-icon class=\"mat-icon-lg\">search</mat-icon>\r\n              </button>\r\n              <mat-menu #searchMenu=\"matMenu\" [overlapTrigger]=\"false\" xPosition=\"before\" class=\"search-dropdown mat-elevation-z8\">\r\n                  <form method=\"get\" fxFlex class=\"search-form\">\r\n                      <button mat-raised-button [matMenuTriggerFor]=\"categories2Menu\" #categories2MenuTrigger=\"matMenuTrigger\" type=\"button\" class=\"mat-elevation-z0 categories text-muted\" (click)=\"stopClickPropagate($event)\">{{category?.name}}<mat-icon>arrow_drop_down</mat-icon></button>\r\n                      <mat-menu #categories2Menu=\"matMenu\" [overlapTrigger]=\"false\" xPosition=\"before\" class=\"categories-dropdown\">\r\n                          <span (mouseleave)=\"categories2MenuTrigger.closeMenu()\">\r\n                              <app-category-list [categories]=\"categories\" [categoryParentId]=\"0\" (change)=\"changeCategory($event)\"></app-category-list>\r\n                          </span>\r\n                      </mat-menu>\r\n                      <input type=\"text\" placeholder=\"Type to search...\" fxFlex (click)=\"stopClickPropagate($event)\">\r\n                      <button mat-mini-fab (click)=\"search()\" type=\"button\" class=\"search-btn mat-elevation-z0 text-muted\">\r\n                          <mat-icon>search</mat-icon>\r\n                      </button>\r\n                  </form>\r\n              </mat-menu>\r\n          </div>\r\n\r\n      </div>\r\n\r\n  </mat-toolbar-row>\r\n</mat-toolbar>\r\n\r\n<mat-sidenav-container style=\"background-color:#FFFFFF;\">\r\n\r\n    <mat-sidenav #sidenav [opened]=\"sidenavOpen\" [mode]=\"sidenavOpen ? 'side' : 'over'\" class=\"filter-sidenav\" style=\"padding-left:5%; margin-right: 15%;width:20%;\" perfectScrollbar>\r\n\r\n        <div style=\"margin-top:5%;\">\r\n        </div>\r\n        <br>\r\n        <br>\r\n\r\n        <mat-accordion displayMode=\"flat\" multi=\"false\">\r\n            <mat-expansion-panel class=\"mat-elevation-z0\" expanded>\r\n              <mat-expansion-panel-header>\r\n                    <mat-panel-title>\r\n\r\n                  <div class=\"heads\">{{dtype}}</div>\r\n\r\n                </mat-panel-title>\r\n\r\n                </mat-expansion-panel-header>\r\n\r\n                  <!-- <br> -->\r\n                  <!-- <div fxLayout=\"column\" *ngFor=\"let category of categories\">\r\n                      <mat-checkbox color=\"warn\"[(ngModel)]=\"category.checked\" name=\"checkcat\" [value]=\"category.name\" (ngModelChange)=\"checkcategory(category.name)\">\r\n                        <label>{{category.name}}</label>\r\n                      </mat-checkbox>\r\n\r\n                  </div> -->\r\n\r\n                  <div fxLayout=\"row wrap\" [(ngModel)]=\"select_image\" [ngModelOptions]=\"{standalone: true}\" >\r\n                      <!-- <mat-checkbox color=\"warn\"[(ngModel)]=\"category.checked\" name=\"checkcat\" [value]=\"category.name\" (ngModelChange)=\"checkcategory(category.name)\">\r\n                        <label>{{category.name}}</label>\r\n                      </mat-checkbox> -->\r\n                      <!-- <span class=\"check_1\" [hidden]=\"!c1\" ><img src=\"/assets/images/icons/checked.png\" height=10 /> </span> -->\r\n                      <span fxFlex=\"33.3\" [fxFlex.gt-sm]=\"viewCol\" fxFlex.sm=\"50\" >\r\n                        <span class=\"check_1\" [hidden]=\"!c1\" ><img src=\"/assets/images/icons/checked.png\" height=10 /> </span>\r\n                        <img class=\"img_1\" src=\"{{this.category_image_1}}\" (click)=\"category1(category_name_1)\"/>\r\n                      </span>\r\n\r\n                      <span fxFlex=\"33.3\" [fxFlex.gt-sm]=\"viewCol\" fxFlex.sm=\"50\" >\r\n                        <span class=\"check_2\" [hidden]=\"!c2\" ><img src=\"/assets/images/icons/checked.png\" height=10 /> </span>\r\n                        <img class=\"img_2\" src=\"{{this.category_image_2}}\" (click)=\"category2(category_name_2)\"/>\r\n                      </span>\r\n\r\n                      <span fxFlex=\"33.3\" [fxFlex.gt-sm]=\"viewCol\" fxFlex.sm=\"50\" >\r\n                        <span class=\"check_3\" [hidden]=\"!c3\" ><img src=\"/assets/images/icons/checked.png\" height=10 /> </span>\r\n                        <img class=\"img_3\" src=\"{{this.category_image_3}}\" (click)=\"category3(category_name_3)\"/>\r\n                      </span>\r\n                  </div>\r\n\r\n                    <!-- <app-category-list [categories]=\"categories\" [categoryParentId]=\"0\" (change)=\"onChangeCategory($event)\"></app-category-list> -->\r\n            </mat-expansion-panel>\r\n            <mat-expansion-panel class=\"mat-elevation-z0\" >\r\n                    <!-- <br> -->\r\n                    <mat-expansion-panel-header>\r\n                          <mat-panel-title>\r\n                            <div class=\"heads\">{{brandSelected}}</div>\r\n                          </mat-panel-title>\r\n                        </mat-expansion-panel-header>\r\n                      <!-- <br> -->\r\n\r\n                      <div fxLayout=\"row wrap\" style=\"white-space:nowrap; overflow:hidden; text-overflow:clip; \">\r\n                          <span fxFlex=\"100\" [fxFlex.gt-sm]=\"viewCol\" fxFlex.sm=\"50\" class=\"col\">\r\n                            <div *ngFor=\"let brand of brand1\" class=\"brands1\" fxFlex.sm=\"50\">\r\n                            <mat-checkbox  class=\"chc\" color=\"warn\" [(ngModel)]=\"brand.checked\" name=\"checkbr\" [value]=\"brand.brandName\"  (ngModelChange)=\"checkbrand(brand.brandName)\" >{{brand.brandName}} </mat-checkbox>\r\n                          </div>\r\n                           </span>\r\n                          <span fxFlex=\"100\" [fxFlex.gt-sm]=\"viewCol\" fxFlex.sm=\"50\" class=\"col\">\r\n                              <div *ngFor=\"let brand of brand2\" class=\"brands2\"  fxFlex.sm=\"50\">\r\n                              <mat-checkbox  class=\"chc1\" color=\"warn\" [(ngModel)]=\"brand.checked\" name=\"checkbr\" [value]=\"brand.brandName\"  (ngModelChange)=\"checkbrand(brand.brandName)\" style=\"margin-left:20px\">{{brand.brandName}} </mat-checkbox>\r\n                            </div>\r\n                          </span>\r\n                      </div>\r\n\r\n\r\n\r\n\r\n\r\n                      <!-- <mat-grid-list cols=\"1\" rowHeight=\"5:1\">\r\n                        <mat-grid-tile   *ngFor=\"let brand of brands\" fxFlex.sm=\"50\"> -->\r\n                      <!-- <input type=\"checkbox\" class=\"titles1\" id=\"brands\" placeholder=\"\"=\"brand.brandName\"> -->\r\n                      <!-- <input type=\"checkbox\" name=\"brand.brandName\"  />{{brand.brandName}} -->\r\n                        <!-- <mat-checkbox  class=\"chc\" color=\"warn\" [(ngModel)]=\"brand.checked\" name=\"checkbr\" [value]=\"brand.brandName\"  (ngModelChange)=\"checkbrand(brand.brandName)\" style=\"margin-left:5px\">{{brand.brandName}} </mat-checkbox>\r\n                      </mat-grid-tile>\r\n\r\n                      </mat-grid-list> -->\r\n\r\n            <!-- <div fxLayout=\"row wrap\" fxLayoutAlign=\"space-between center\" class=\"filter-brands\">\r\n                <button  *ngFor=\"let brand of brands\">\r\n                  <mat-checkbox color=\"warn\" [(ngModel)]=\"brand.checked\" name=\"checkbr\" [value]=\"brand.brandName\" (ngModelChange)=\"checkbrand(brand.brandName)\">\r\n                    <label>\r\n                      <img [src]=\"brand.picture\" class=\"images\">\r\n                     </label>\r\n                   </mat-checkbox>\r\n                </button>\r\n            </div> -->\r\n          </mat-expansion-panel>\r\n\r\n\r\n            <mat-expansion-panel class=\"mat-elevation-z0\" >\r\n                      <!-- <br> -->\r\n                      <mat-expansion-panel-header>\r\n                            <mat-panel-title>\r\n                        <div class=\"heads\">{{priceRange}}</div>\r\n                      </mat-panel-title>\r\n                    </mat-expansion-panel-header>\r\n                        <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\" class=\"text-muted\">\r\n                            <!-- <span>From </span>\r\n                            <span>To </span> -->\r\n                        </div>\r\n                        <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\" class=\"text-muted\">\r\n                          <input type=\"number\" placeholder=\"Starting\" style=\"font-size: 90%; padding: 1.5%; width:35%; height:30%; font-family:proxr; color: #5a555e; \" [(ngModel)]=\"price_from\" [ngModelOptions]=\"{standalone: true}\"(ngModelChange)=\"pricefrom($event)\"> to\r\n                          <input type=\"number\" placeholder=\"Ending\" style=\"font-size: 90%; padding: 1.5%; width:32% ; height:30%; font-family:proxr; color: #5a555e; margin-left:-2%\" [(ngModel)]=\"price_to\" [ngModelOptions]=\"{standalone: true}\"(ngModelChange)=\"priceto(price_to)\">\r\n\r\n                        </div>\r\n                        <!-- <button (click)=\"openmap()\">open dialog </button> -->\r\n\r\n\r\n\r\n\r\n\r\n                <!-- <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\" class=\"text-muted\">\r\n                    <span>From: <b style=\"color:#156dbf\">${{priceFrom_1}}</b></span>\r\n                    <span>To: <b>${{priceTo_1}}</b></span>\r\n                </div>\r\n                <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\" class=\"filter-price\">\r\n                    <mat-slider max=\"1000\" min=\"1\" thumb-label=\"true\" [(ngModel)]=\"priceFrom_1\" [value]=\"priceFrom\"></mat-slider>\r\n                    <mat-slider max=\"10000\" min=\"1000\" thumb-label=\"true\" [(ngModel)]=\"priceTo_1\" [value]=\"priceTo\"></mat-slider>\r\n                </div> -->\r\n            </mat-expansion-panel>\r\n\r\n              <!-- <mat-expansion-panel expanded>\r\n                <mat-expansion-panel-header>\r\n                    <mat-panel-title>\r\n                        <h4>Color</h4>\r\n                    </mat-panel-title>\r\n                </mat-expansion-panel-header>\r\n                <div fxLayout=\"row wrap\" fxLayoutAlign=\"space-between center\" class=\"filter-buttons\">\r\n                  <button mat-raised-button *ngFor=\"let color of colors\" [style.background]=\"color\" (click)=\"colorpick(color)\" [(ngModel)]=\"color_1\" [value]=\"color\" ngDefaultControl > &nbsp; </button>\r\n                </div>\r\n            </mat-expansion-panel>\r\n\r\n            <mat-expansion-panel expanded>\r\n                <mat-expansion-panel-header>\r\n                    <mat-panel-title>\r\n                        <h4>Storage</h4>\r\n                    </mat-panel-title>\r\n                </mat-expansion-panel-header>\r\n                <div fxLayout=\"row wrap\" fxLayoutAlign=\"space-between center\" class=\"filter-buttons\">\r\n                    <button mat-raised-button *ngFor=\"let storage of storages\" (click)=\"storagepick(storage)\" [(ngModel)]=\"storage_1\" [value]='storage+\" GB\"' ngDefaultControl>{{storage}} GB</button>\r\n                </div>\r\n            </mat-expansion-panel>\r\n\r\n            <mat-expansion-panel expanded>\r\n                <mat-expansion-panel-header>\r\n                    <mat-panel-title>\r\n                        <h4>Condition</h4>\r\n                    </mat-panel-title>\r\n                </mat-expansion-panel-header>\r\n                <div fxLayout=\"column\" *ngFor=\"let condition of conditions\">\r\n                    <mat-checkbox color=\"warn\"[(ngModel)]=\"condition.checked\" name=\"checkis\" [value]=\"condition._id\" (ngModelChange)=\"checkconditions(condition._id)\">\r\n                      <label>{{condition.title}}</label>\r\n                    </mat-checkbox> -->\r\n                    <!-- <mat-checkbox color=\"primary\">New</mat-checkbox>\r\n                    <mat-checkbox color=\"primary\">Used</mat-checkbox>\r\n                    <mat-checkbox color=\"primary\">Not Specified</mat-checkbox> -->\r\n                <!-- </div> -->\r\n\r\n            <!-- </mat-expansion-panel> -->\r\n\r\n\r\n            <br>\r\n            <!-- <mat-expansion-panel expanded> -->\r\n                <!-- <mat-expansion-panel-header> -->\r\n                    <!-- <mat-panel-title> -->\r\n\r\n                      <!-- <button mat-raised-button class=\"post_but\" (click)=\"submit(priceFrom_1,priceTo_1)\" style=\"background-color:#156dbf; border-radius: 7px 7px 7px 7px;color:white ; \"> Search</button> -->\r\n                      <!-- <button (click)=\"sendMessage()\">Send Message</button> -->\r\n\r\n                    <!-- </mat-panel-title> -->\r\n                <!-- </mat-expansion-panel-header> -->\r\n                <!-- <div fxLayout=\"row wrap\" fxLayoutAlign=\"center center\">\r\n                   <a [routerLink]=\"['/products/electronics']\"><img src=\"assets/images/products/probook/2-medium.png\" alt=\"\" class=\"mw-100\"></a>\r\n                </div> -->\r\n\r\n            <!-- </mat-expansion-panel> -->\r\n        </mat-accordion>\r\n\r\n    </mat-sidenav>\r\n    <mat-sidenav-content class=\"all-products\" ngClass.gt-sm=\"p-left\" style=\"padding-left: 5%;padding-right:5%\">\r\n        <div fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"space-between center\">\r\n            <span style=\"font-family:proxs\"> Listing {{this.ads}} Ads </span>\r\n          <button mat-raised-button class=\"post_but\" style=\"background-color:#156dbf; border-radius: 7px 7px 7px 7px;color:white; font-family:proxs\" (click)=\"adrouter()\"> Post an Ad</button>\r\n\r\n        </div>\r\n        <div style=\"margin-top:3%;\"> </div>\r\n\r\n        <div *ngIf=\"viewType == 'grid'\" fxLayout=\"row wrap\" class=\"products-wrapper\">\r\n            <div *ngFor=\"let product of products | paginate: { itemsPerPage: count, currentPage: page }\" fxFlex=\"100\" [fxFlex.gt-sm]=\"viewCol\" fxFlex.sm=\"50\" fxFlex.md=\"50\" class=\"col\">\r\n                <mat-card class=\"product-item text-center\" style=\"padding:0%; margin-left: 1.5%; border-radius:2px 2px 2px 2px;box-shadow:5px 6px 6px #bfbdc1; white-space:nowrap; overflow:hidden; width:95%; text-overflow:ellipsis; transform:translateZ(100%)\" >\r\n\r\n                    <span *ngIf=\"product.boosted\" class=\"boosted\">BOOSTED </span>\r\n                    <a [routerLink]=\"['/products', product._id, product.isFavourite]\" class=\"image-link\" >\r\n                      <img src=\"{{product.pictures[0] || placeHolder}}\" />\r\n                        <span class=\"title_p\">{{product.title}}</span>\r\n                    </a>\r\n                    <span class=\"pad\">\r\n                    <span class=\"title_d\" style=\"\" text-wrap>{{product.description}}</span>\r\n                    <span class=\"title_s\" *ngIf = \"product.storage\">\r\n                      <img class=\"memory_icon\" style=\"margin-bottom:-5%\" src=\"assets/images/icons/memory.png\" />\r\n                      {{product.storage}}\r\n                    </span>\r\n                    <span *ngIf=\"!product.user_id._id != this.myid\" class=\"title_h\">\r\n                    <span *ngIf=\"!product.isFavourite\"><button mat-icon-button matTooltip=\"Add to Favourites\" (click)=\"addtofavourites(product.isFavourite, product._id)\"><mat-icon style=\"color:#a40000\">favorite_border</mat-icon></button></span>\r\n                    <span *ngIf=\"product.isFavourite\"><button mat-icon-button (click)=\"addtofavourites(product.isFavourite, product._id)\"><mat-icon style=\"color:#a40000\">favorite</mat-icon></button></span>\r\n                  </span>\r\n                    <span class=\"title_c\" *ngIf = \"product.color\">\r\n                      <img class=\"colour_icon\" style=\"margin-bottom:-5%\" src=\"assets/images/icons/colour.png\" />\r\n                      {{product.color}}\r\n                    </span>\r\n\r\n\r\n                    <span  *ngIf=\"this.mycurrency != undefined\" class=\"title_pkr\"> {{this.mycurrency}} </span>\r\n                      <span *ngIf=\"this.mycurrency == undefined\" class=\"title_pkr\"> USD </span>\r\n                      <span class=\"title_pr\">{{product.price}}</span>\r\n                    <!-- <span class=\"title_pkr\"> USD\r\n                      <span class=\"title_pr\">{{product.price}}</span>\r\n                    </span> -->\r\n                  </span>\r\n\r\n                </mat-card>\r\n            </div>\r\n        </div>\r\n\r\n        <div *ngIf=\"viewType == 'list'\" fxLayout=\"row wrap\" class=\"products-wrapper\">\r\n            <div  *ngFor=\"let product of products | paginate: { itemsPerPage: count, currentPage: page }\" fxFlex=\"100\" class=\"col\">\r\n              <mat-card class=\"product-item text-center\">\r\n                  <mat-chip-list >\r\n                      <mat-chip color=\"warn\" selected=\"true\">${{product.price | number : '1.2-2'}}</mat-chip>\r\n                  </mat-chip-list>\r\n                  <a [routerLink]=\"['/products', product._id, product.title]\" class=\"image-link\">\r\n                      <img [src]=\"product.pictures[0]\" alt=\"\" >\r\n                  </a>\r\n                  <a [routerLink]=\"['/products', product._id, product.title]\" class=\"title text-truncate\">\r\n                      {{product.title}}\r\n                  </a>\r\n                  <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\" class=\"prices\">\r\n                      <div fxLayout=\"column\" fxLayoutAlign=\"center start\">\r\n                          <p class=\"new-price\">{{product.color}}</p>\r\n                      </div>\r\n                      <app-rating [ratingsCount]=\"product.ratingsCount\" [ratingsValue]=\"product.ratingsValue\" [direction]=\"'column'\"></app-rating>\r\n                  </div>\r\n                  <div class=\"divider mt-2\"></div>\r\n                  <div class=\"icons\">\r\n                      <app-controls [product]=\"product\" (onOpenProductDialog)=\"openProductDialog(product)\"></app-controls>\r\n                  </div>\r\n              </mat-card>\r\n            </div>\r\n        </div>\r\n        <div></div>\r\n\r\n        <div *ngIf=\"products.length > 0\" fxLayout=\"row wrap\">\r\n            <div fxFlex=\"100\" fxShow.gt-xs fxLayoutAlign=\"center center\">\r\n                    <pagination-controls class=\"product-pagination\" autoHide=\"true\" maxSize=\"20\" (pageChange)=\"onPageChanged($event)\"></pagination-controls>\r\n            </div>\r\n        </div>\r\n\r\n    </mat-sidenav-content>\r\n</mat-sidenav-container>\r\n</div>\r\n<div>\r\n<div [hidden]=\"!searchmap\">\r\n\r\n    <div class=\"container-fluid\" style=\"margin-top:1%; margin-left:10%\"  >\r\n      <div class='row'>\r\n        <div class=\"form-group\">\r\n          <input class='title_area1' (change)=\"updateOnMap(location.address_level_2)\" placeholder=\"Enter City\" [(ngModel)]='location.address_level_2'/>\r\n        </div><br>\r\n        <!-- <div class=\"form-group\">\r\n          <input class='title_area1' (change)=\"updateOnMap()\" placeholder=\"Enter Country\" [(ngModel)]='location.address_country'/>\r\n        </div><br> -->\r\n\r\n      </div>\r\n    </div>\r\n\r\n  <div style=\"box-shadow:5px 6px 6px #bfbdc1; margin-left:30%; width:40%\">\r\n    <agm-map [(latitude)]=\"this.latitude\" [(longitude)]=\"this.longitude\" [(zoom)]=\"location.zoom\" [disableDefaultUI]=\"true\" [zoomControl]=\"true\" [(fitBounds)]='location.viewport' >\r\n      <agm-marker [(latitude)]=\"this.latitude\" [(longitude)]=\"this.longitude\" [markerDraggable]=\"location.marker.draggable\" (dragEnd)='markerDragEnd($event)' ></agm-marker>\r\n\r\n    </agm-map>\r\n\r\n  </div>\r\n\r\n    <div style=\"text-align:center; margin-top:3%;\">\r\n      <button mat-raised-button (click)=\"advertlocation()\" type=\"submit\" style=\"border:1px solid; border-color:#156dbf; color:#156dbf; border-radius: 7px 7px 7px 7px;font-size:150%; height:60%; padding-top: 0.5%;padding-bottom: 0.5%; width:15%\"> Update </button>\r\n\r\n    </div>\r\n\r\n</div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/products/products.component.scss":
/*!********************************************************!*\
  !*** ./src/app/pages/products/products.component.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".zoom-dialog .mat-dialog-container {\n  overflow: visible !important; }\n  .zoom-dialog .mat-dialog-container .controls {\n    position: relative; }\n  .zoom-dialog .mat-dialog-container .controls button {\n      position: absolute;\n      top: -44px; }\n  .zoom-dialog .mat-dialog-container .controls .zoom-in {\n      right: 44px; }\n  .zoom-dialog .mat-dialog-container .controls .zoom-out {\n      right: 0; }\n  .zoom-dialog .mat-dialog-container .controls .close {\n      right: -44px; }\n  .zoom-dialog .mat-dialog-container .viewer {\n    width: 100%;\n    text-align: center; }\n  .zoom-dialog .mat-dialog-container .viewer img {\n      max-width: 60%; }\n  .heads {\n  font-family: proxs;\n  font-weight: 400;\n  font-size: 100%; }\n  .brands {\n  font-family: proxr; }\n  .images {\n  height: 8%;\n  width: 8%; }\n  .chc {\n  font-size: 60%;\n  margin-left: 0px;\n  font-family: proxr;\n  color: #5a555e; }\n  .chc1 {\n  font-size: 60%;\n  color: #5a555e;\n  margin-left: 5%;\n  font-family: proxr; }\n  .brands2 {\n  margin-left: 20%; }\n  .mat-figure {\n  background-color: #156dbf; }\n  .img_1 {\n  height: 35px; }\n  .img_2 {\n  height: 35px;\n  margin-left: -4px; }\n  .img_3 {\n  height: 35px;\n  margin-left: -8px; }\n  .img_container {\n  height: 20%;\n  width: 20%; }\n  .pad {\n  padding: 2%; }\n  .memory_icon {\n  height: 10px;\n  width: auto; }\n  .colour_icon {\n  height: 10px;\n  width: auto; }\n  .title_p {\n  margin-top: 15px;\n  position: absolute;\n  font-size: 100%;\n  margin-left: 2%;\n  font-family: proxs;\n  color: #342d38; }\n  .title_d {\n  position: absolute;\n  margin-top: 40px;\n  font-family: proxs;\n  font-size: 60%;\n  color: #5a555e;\n  word-wrap: break-word;\n  width: 100px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: normal;\n  display: inline-block; }\n  .title_s {\n  position: absolute;\n  margin-top: 73px;\n  font-family: proxr;\n  font-weight: 400;\n  font-size: 70%;\n  color: #342d38; }\n  .title_s, .memory_icon {\n  display: inline; }\n  .title_c, .colour_icon {\n  display: inline; }\n  .title_c {\n  position: absolute;\n  font-size: 130%;\n  margin-top: 90px;\n  font-size: 70%;\n  font-family: proxr;\n  font-weight: 400;\n  color: #342d38; }\n  .title_h {\n  position: absolute;\n  margin-top: 75px;\n  font-size: 80%;\n  font-family: proxr;\n  font-weight: 400;\n  left: 85%; }\n  .title_pr {\n  font-size: 120%;\n  margin-top: 118px;\n  left: 183px;\n  font-family: proxs;\n  position: absolute; }\n  .title_pkr {\n  position: absolute;\n  font-size: 70%;\n  font-family: proxs;\n  margin-top: 125px;\n  left: 160px;\n  color: black; }\n  .post_but {\n  width: 15%;\n  float: right;\n  margin-right: 1%; }\n  .filter-sidenav {\n  width: 280px;\n  padding: 2px; }\n  .filter-sidenav .mat-expansion-panel-header-title {\n    text-transform: uppercase; }\n  .filter-row {\n  background: #fff;\n  padding: 8px 12px; }\n  .all-products {\n  min-height: 400px;\n  padding: 2px;\n  overflow: hidden; }\n  .all-products.p-left {\n    padding-left: 16px; }\n  .products-wrapper {\n  margin: 8px -8px; }\n  .products-wrapper .col {\n    padding: 8px; }\n  .categories-wrapper {\n  position: relative;\n  max-height: 300px; }\n  .filter-buttons button {\n  min-width: 36px;\n  margin: 0 6px 10px 0;\n  padding: 0; }\n  .filter-buttons button:selected {\n  border: 1px solid;\n  border-color: black; }\n  .filter-price .mat-slider-horizontal {\n  min-width: 110px; }\n  .filter-brands button {\n  width: 66px;\n  height: 44px;\n  min-width: 66px;\n  margin: 0 6px 10px 0;\n  padding: 0px;\n  overflow: hidden; }\n  .filter-brands button img {\n    width: 66px;\n    height: 44px; }\n  .boosted {\n  float: right;\n  color: #156dbf;\n  font-size: 60%;\n  font-family: proxs; }\n  .mat-checkbox-inner-container {\n  height: 10px !important;\n  width: 10px !important; }\n  .check_1 {\n  position: absolute;\n  left: 46%;\n  margin-top: -3px; }\n  .check_2 {\n  position: absolute;\n  left: 65%;\n  margin-top: -3px; }\n  .check_3 {\n  position: absolute;\n  margin-top: -3px;\n  left: 84%; }\n  .search_res {\n  font-size: 60%;\n  font-family: proxr;\n  position: absolute;\n  margin-left: 25%;\n  margin-top: 35px; }\n  .sebm-google-map-container {\n  height: 300px;\n  text-align: center; }\n  .title_area1 {\n  font-size: 100%;\n  font-family: proxr;\n  outline: none;\n  width: 30%;\n  padding: 12px 20px;\n  display: inline-block;\n  border: 1px solid #ccc;\n  border-radius: 8px;\n  box-sizing: border-box;\n  color: #342d38;\n  margin-left: 30%;\n  text-align: left; }\n  .mat-expansion-panel {\n  width: 110%; }\n  .mat-accordion {\n  width: 120%; }\n  .mat-tab-body-content {\n  height: unset !important; }\n"

/***/ }),

/***/ "./src/app/pages/products/products.component.ts":
/*!******************************************************!*\
  !*** ./src/app/pages/products/products.component.ts ***!
  \******************************************************/
/*! exports provided: ProductsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductsComponent", function() { return ProductsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _shared_products_carousel_product_dialog_product_dialog_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/products-carousel/product-dialog/product-dialog.component */ "./src/app/shared/products-carousel/product-dialog/product-dialog.component.ts");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../app.service */ "./src/app/app.service.ts");
/* harmony import */ var _chat_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../chat.service */ "./src/app/chat.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var _agm_core_services__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @agm/core/services */ "./node_modules/@agm/core/services.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








// import { ProductMapComponent } from './product-map/product-map.component';


var ProductsComponent = /** @class */ (function () {
    function ProductsComponent(activatedRoute, appService, dialog, router, renderer, chat, mapsApiLoader, formBuilder, zone, wrapper) {
        var _this = this;
        this.activatedRoute = activatedRoute;
        this.appService = appService;
        this.dialog = dialog;
        this.router = router;
        this.renderer = renderer;
        this.chat = chat;
        this.mapsApiLoader = mapsApiLoader;
        this.formBuilder = formBuilder;
        this.zone = zone;
        this.wrapper = wrapper;
        this.sidenavOpen = true;
        this.viewType = 'grid';
        this.viewCol = 33.3;
        this.counts = [12, 24, 36];
        this.sortings = ['Sort by Default', 'Best match', 'Lowest first', 'Highest first'];
        this.products = [];
        this.brands = [];
        this.priceRange = "Price Range";
        this.placeHolder = "/assets/images/icons/logo.png";
        //public colors = ["#5C6BC0","#66BB6A","#EF5350","#BA68C8","#FF4081","#9575CD","#90CAF9","#B2DFDB","#DCE775","#FFD740","#00E676","#FBC02D","#FF7043","#F5F5F5","#000000"];
        this.colors = [];
        this.selectedcolor = [];
        this.price = [];
        this.brandName = "";
        this.dtype = 'Device Type';
        this.brandId = "";
        this.storages = [];
        this.selectedstorage = [];
        this.sizes = ["S", "M", "L", "XL", "2XL", "32", "36", "38", "46", "52", "13.3\"", "15.4\"", "17\"", "21\"", "23.4\""];
        this.conditionsarray = [];
        this.brandsArray = [];
        this.categoryArray = [];
        this.categories = [];
        this.title = 'app';
        this.data2 = "";
        this.categorySearch = "";
        this.brandSelected = "Brands";
        this.location = {
            lat: parseFloat(this.latitude),
            lng: parseFloat(this.longitude),
            marker: {
                lat: parseFloat(this.latitude),
                lng: parseFloat(this.longitude),
                draggable: true
            },
            zoom: 15
        };
        this.renderer.setStyle(document.body, 'background-color', '#FFFFFF');
        this.backupProducts = [];
        this.c1 = false;
        this.c2 = false;
        this.c3 = false;
        this.hidemain = true;
        this.searchmap = false;
        this.priceTo = 0;
        this.priceFrom = 0;
        this.mapsApiLoader = mapsApiLoader;
        this.zone = zone;
        this.wrapper = wrapper;
        this.mapsApiLoader.load().then(function () {
            _this.geocoder = new google.maps.Geocoder();
        });
        if (navigator) {
            navigator.geolocation.getCurrentPosition(function (pos) {
                _this.longitude = pos.coords.longitude;
                _this.latitude = pos.coords.latitude;
                console.log(_this.latitude);
                console.log(_this.longitude);
            });
            // var bounds = getCurrentPosition.getBounds();
            // var NECorner = bounds.getNorthEast();
            // var SWCorner = bounds.getSouthWest();
            // console.log(NECorner);
            // console.log(SWCorner);
        }
    }
    ProductsComponent.prototype.ngOnInit = function () {
        this.location.marker.draggable = true;
        this.circleRadius = 200;
        this.count = this.counts[0];
        this.sort = this.sortings[0];
        this.sub = this.activatedRoute.params.subscribe(function (params) {
        });
        if (window.innerWidth < 960) {
            this.sidenavOpen = false;
        }
        ;
        if (window.innerWidth < 1280) {
            this.viewCol = 33.3;
        }
        ;
        this.mycurrency = localStorage.getItem('currency');
        this.getbrands();
        this.getAllProducts();
        this.getallenums();
        this.phoneCondition();
        this.newbrands();
        this.myid = localStorage.getItem('userid');
        // this.chat.messages.subscribe(msg => {
        //   console.log(msg);
        // })
    };
    // openDialog(): void{
    //   const dialogRef =this.dialog.open(ProductMapComponent, {
    //     data: {
    //       animal: 'panda',
    //     }
    //   });
    // }
    ProductsComponent.prototype.openmap = function () {
        this.hidemain = false;
        this.searchmap = true;
    };
    ProductsComponent.prototype.onsearch = function (value) {
        var count = 0;
        var searchingData = [];
        if (this.backupProducts.length == 0) {
            this.backupProducts = this.products;
        }
        var dataProducts = this.backupProducts;
        for (var i = 0; i < dataProducts.length; i++) {
            if ((dataProducts[i].title).toLowerCase().indexOf(value.toLowerCase()) != -1 || dataProducts[i].description.toLowerCase().indexOf(value.toLowerCase()) != -1) {
                searchingData[count] = dataProducts[i];
                count = count + 1;
            }
            if (i == dataProducts.length - 1) {
                this.products = searchingData;
                this.ads = this.products.length;
            }
        }
    };
    ProductsComponent.prototype.select_image = function (value) {
    };
    ProductsComponent.prototype.pricefrom = function (value) {
        this.priceFrom = value;
        if (value == '' || value == null || value == 'null' && !value) {
            this.products = this.backupProducts;
            if (this.priceTo != '' && this.priceFrom != '') {
                this.priceRange = "Price (" + this.priceFrom + " to " + this.priceTo + ")";
            }
            else if (this.priceFrom != '') {
                this.priceRange = "Price ( " + this.priceFrom + " )";
            }
            else if (this.priceTo != '') {
                this.priceRange = "Price ( " + this.priceTo + " )";
            }
            else {
                this.priceRange = "Price Range";
            }
        }
        else {
            if (this.priceTo != '' && this.priceFrom != '') {
                this.priceRange = "Price (" + this.priceFrom + " to " + this.priceTo + ")";
            }
            else if (this.priceFrom != '') {
                this.priceRange = "Price ( " + this.priceFrom + " )";
            }
            else if (this.priceTo != '') {
                this.priceRange = "Price ( " + this.priceTo + " )";
            }
            else {
                this.priceRange = "Price Range";
            }
            var searchedData = [];
            var count = 0;
            var categorySearchFinal = [];
            if (this.backupProducts.length == 0) {
                this.backupProducts = this.products;
            }
            var searchData = this.backupProducts;
            var categorySearchData = this.backupProducts;
            if (this.priceFrom > -1 && this.priceTo > -1) {
                if (parseInt(this.priceFrom) < parseInt(this.priceTo)) {
                    if (this.categorySearch != '') {
                        for (var j = 0; j < categorySearchData.length; j++) {
                            if (categorySearchData[j].type == value || (parseFloat(categorySearchData[j].price) < parseInt(this.priceFrom) && parseFloat(categorySearchData[j].price) > parseInt(this.priceTo))) {
                                categorySearchFinal[count] = categorySearchData[j];
                                count = count + 1;
                            }
                            if (j == categorySearchData.length - 1) {
                                this.products = categorySearchFinal;
                                this.ads = this.products.length;
                            }
                        }
                    }
                    else {
                        for (var i = 0; i < searchData.length; i++) {
                            if (parseFloat(searchData[i].price) < parseInt(this.priceFrom) && parseFloat(searchData[i].price) > parseInt(this.priceTo)) {
                                searchedData[count] = searchData[i];
                                count = count + 1;
                            }
                            if (i == searchData.length - 1) {
                                this.products = searchedData;
                                this.ads = this.products.length;
                            }
                        }
                    }
                }
                else {
                    if (this.categorySearch != '') {
                        for (var j = 0; j < categorySearchData.length; j++) {
                            if (categorySearchData[j].type == value || (parseFloat(categorySearchData[j].price) < parseInt(this.priceFrom) && parseFloat(categorySearchData[j].price) > parseInt(this.priceTo))) {
                                categorySearchFinal[count] = categorySearchData[j];
                                count = count + 1;
                            }
                            if (j == categorySearchData.length - 1) {
                                this.products = categorySearchFinal;
                                this.ads = this.products.length;
                            }
                        }
                    }
                    else {
                        for (var i = 0; i < searchData.length; i++) {
                            if (parseFloat(searchData[i].price) < parseInt(this.priceFrom) && parseFloat(searchData[i].price) > parseInt(this.priceTo)) {
                                searchedData[count] = searchData[i];
                                count = count + 1;
                            }
                            if (i == searchData.length - 1) {
                                this.products = searchedData;
                                this.ads = this.products.length;
                            }
                        }
                    }
                }
            }
        }
    };
    ProductsComponent.prototype.priceto = function (value) {
        this.priceTo = value;
        if (value == '' || value == null || value == 'null' && !value) {
            this.products = this.backupProducts;
            if (this.priceTo != '' && this.priceFrom != '') {
                this.priceRange = "Price (" + this.priceFrom + " to " + this.priceTo + ")";
            }
            else if (this.priceFrom != '') {
                this.priceRange = "Price ( " + this.priceFrom + " )";
            }
            else if (this.priceTo != '') {
                this.priceRange = "Price ( " + this.priceTo + " )";
            }
            else {
                this.priceRange = "Price Range";
            }
        }
        else {
            var searchedData = [];
            var count = 0;
            var categorySearchFinal = [];
            if (this.backupProducts.length == 0) {
                this.backupProducts = this.products;
            }
            var searchData = this.backupProducts;
            var categorySearchData = this.backupProducts;
            if (this.priceFrom > -1 && this.priceTo > -1) {
                if (parseInt(this.priceFrom) < parseInt(this.priceTo)) {
                    if (this.categorySearch != '') {
                        for (var j = 0; j < categorySearchData.length; j++) {
                            if (categorySearchData[j].type == value || (parseFloat(categorySearchData[j].price) > parseInt(this.priceFrom) && parseFloat(categorySearchData[j].price) < parseInt(this.priceTo))) {
                                categorySearchFinal[count] = categorySearchData[j];
                                count = count + 1;
                            }
                            if (j == categorySearchData.length - 1) {
                                this.products = categorySearchFinal;
                                this.ads = this.products.length;
                            }
                        }
                    }
                    else {
                        for (var i = 0; i < searchData.length; i++) {
                            if (parseFloat(searchData[i].price) > parseInt(this.priceFrom) && parseFloat(searchData[i].price) < parseInt(this.priceTo)) {
                                searchedData[count] = searchData[i];
                                count = count + 1;
                            }
                            if (i == searchData.length - 1) {
                                this.products = searchedData;
                                this.ads = this.products.length;
                            }
                        }
                    }
                }
                else {
                    if (this.categorySearch != '') {
                        for (var j = 0; j < categorySearchData.length; j++) {
                            if (categorySearchData[j].type == value || (parseFloat(categorySearchData[j].price) > parseInt(this.priceFrom) && parseFloat(categorySearchData[j].price) < parseInt(this.priceTo))) {
                                categorySearchFinal[count] = categorySearchData[j];
                                count = count + 1;
                            }
                            if (j == categorySearchData.length - 1) {
                                this.products = categorySearchFinal;
                                this.ads = this.products.length;
                            }
                        }
                    }
                    else {
                        for (var i = 0; i < searchData.length; i++) {
                            if (parseFloat(searchData[i].price) > parseInt(this.priceFrom) && parseFloat(searchData[i].price) < parseInt(this.priceTo)) {
                                searchedData[count] = searchData[i];
                                count = count + 1;
                            }
                            if (i == searchData.length - 1) {
                                this.products = searchedData;
                                this.ads = this.products.length;
                            }
                        }
                    }
                }
            }
        }
        if (this.priceTo != '' && this.priceFrom != '') {
            this.priceRange = "Price (" + this.priceFrom + " to " + this.priceTo + ")";
        }
        else if (this.priceFrom != '') {
            this.priceRange = "Price ( " + this.priceFrom + " )";
        }
        else if (this.priceTo != '') {
            this.priceRange = "Price ( " + this.priceTo + " )";
        }
        else {
            this.priceRange = "Price Range";
        }
    };
    // public filtersearch(tablet_image,mobile_image,acc_image,brand1,brand2,priceFrom,priceTo){
    //
    // }
    ProductsComponent.prototype.getAllProducts = function () {
        var _this = this;
        this.web = true;
        this.appService.getProducts(localStorage.getItem('userid'), this.web, this.mycurrency).subscribe(function (data) {
            console.log(data);
            for (var i = 0; i < data['result'].length; i++) {
                if (data['result'][i]['title'].length > 13) {
                    data['result'][i]['title'] = data['result'][i]['title'].substring(0, 13) + "...";
                }
                if (data['result'][i]['description'].length > 50) {
                    data['result'][i]['description'] = data['result'][i]['description'].substring(0, 50) + "...";
                }
                if (data['result'][i]['pictures'] != undefined && data['result'][i]['pictures'].length > 0) {
                    var x = data['result'][i]['pictures'][0].replace("/upload/", "/upload/c_fill,h_150,w_100/");
                    data['result'][i]['pictures'][0] = x;
                }
                data['result'][i]['price'] = parseFloat(data['result'][i]['price']).toFixed(2);
                if (i == data['result'].length - 1) {
                    // console.log(i);
                    _this.products = data['result'];
                    _this.ads = _this.products.length;
                    // this.aduserid=data['result']['user_id']['_id'];
                    for (var i = 0; i < data['result'].length; i++) {
                        if (data['result'][i]['pictures'].length > 0) {
                            for (var j = 0; j < data['result'][i]['pictures'].length; j++) {
                                if (data['result'][i]['pictures'][j]) {
                                    data['result'][i]['pictures'][j] = data['result'][i]['pictures'][j].replace(".mp4", ".jpg");
                                    data['result'][i]['pictures'][j] = data['result'][i]['pictures'][j].replace(".mov", ".jpg");
                                }
                                //      var digitsprice=data['result'][0]['price'];
                            }
                        }
                        //     if(data['result'][i]['user_id']){
                        //       // console.log("user iddd'''ssssssssssss", data['result'][i]['user_id']);
                        //       this.addsuserids = data['result'][i]['user_id']['_id'];
                        //       console.log(this.addsuserids);
                        //       console.log(this.myid);
                        // }
                        // if(data['result'][i]){
                        //   this.isFavourite = data['result'][i]['isFavourite'];
                        //   console.log(this.isFavourite);
                        //
                        // }
                    }
                    //for show more product
                    // for (var index = 0; index < 3; index++) {
                    //   this.products = this.products.concat(this.products);
                    // }
                }
            }
        });
    };
    // public getfavouriteid(value){
    //   console.log(value);
    //   localStorage.setItem('favourite',value);
    //   console.log(localStorage.getItem('favourite'));
    // }
    // public getfilfav(){
    //   this.appService.getFilters().subscribe(data=>{
    //     console.log(data);
    //   });
    // }
    ProductsComponent.prototype.addtofavourites = function (Favourite, _id) {
        var _this = this;
        this.add = true;
        this.remove = false;
        this.isFavourite = Favourite;
        this.advertid = _id;
        console.log(this.isFavourite);
        console.log(this.advertid);
        console.log(localStorage.getItem('jwt'));
        if (!this.isFavourite && localStorage.getItem('jwt') != undefined && localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != '') {
            console.log("1111");
            console.log(this.advertid, this.add);
            this.appService.addtofavourites(this.advertid, this.add).subscribe(function (data) {
                console.log(data);
                console.log("success");
                console.log(_this.advertid);
                // this.isFavourite='true';
            });
        }
        if (this.isFavourite && localStorage.getItem('jwt') != undefined && localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != '') {
            console.log(this.advertid, this.remove);
            this.appService.removefavourites(this.advertid, this.remove).subscribe(function (data) {
                console.log(data);
                console.log("removed");
                console.log(_this.advertid);
                // this.isFavourite='false';
            });
        }
    };
    ProductsComponent.prototype.submit = function (priceFrom_1, priceTo_1) {
        var _this = this;
        // this.storag =this.selectedstorage +",";
        this.web = true;
        console.log(this.web);
        if (this.selectedstorage.length !== 0) {
            this.storag = this.selectedstorage.join(" GB,") + " GB";
            console.log(this.storag);
        }
        else {
            this.storag = this.selectedstorage;
            console.log(this.storag);
        }
        this.col = this.selectedcolor.join();
        this.bran = this.brandsArray.join();
        // this.col = this.selectedcolor+",";
        // this.bran = this.brandsArray+",";
        console.log(this.storag);
        console.log(this.col);
        console.log(this.bran);
        console.log(this.categoryArray, priceFrom_1, priceTo_1, this.selectedcolor, this.storag, this.conditionsarray, this.bran);
        //  if (localStorage.getItem('userid').length !== 0){
        this.appService.getFilters(this.categoryArray, priceFrom_1, priceTo_1, this.col, this.storag, this.conditionsarray, this.bran, localStorage.getItem('userid')).subscribe(function (data) {
            console.log(data);
            _this.products = data['result'];
        });
        // }
        // else {
        //   this.appService.getFilters(this.categoryArray,priceFrom_1,priceTo_1,this.col,this.storag,this.conditionsarray,this.bran,localStorage.getItem('userid')).subscribe(data=>{
        //     console.log(data);
        //     this.products = data['result'];
        //   });
        // }
    };
    // public getFilters(){
    //   this.appService.getFilters().subscribe(data=>{
    //     this.filters = data['result'];
    //   });
    // }
    ProductsComponent.prototype.getallenums = function () {
        var _this = this;
        this.appService.getenums().subscribe(function (data) {
            console.log(data);
            _this.colors = data['result']['color'];
            _this.categories = data['result']['category'];
            _this.price = data['result']['price'];
            _this.storages = data['result']['storage'];
            _this.category_image_1 = data['result']['category'][0]['image'];
            _this.category_name_1 = data['result']['category'][0]['name'];
            _this.category_image_2 = data['result']['category'][1]['image'];
            _this.category_name_2 = data['result']['category'][1]['name'];
            _this.category_image_3 = data['result']['category'][2]['image'];
            _this.category_name_3 = data['result']['category'][2]['name'];
        });
    };
    ProductsComponent.prototype.phoneCondition = function () {
        var _this = this;
        this.appService.phone_condition().subscribe(function (data) {
            console.log(data);
            _this.conditions = data['result'];
        });
    };
    ProductsComponent.prototype.checkconditions = function (value) {
        console.log(value);
        if (this.conditionsarray.indexOf(value) == -1) {
            this.conditionsarray.push(value);
            //console.log(this.issuesArray);
        }
        else {
            if (this.conditionsarray.length == 1) {
                this.conditionsarray = [];
                console.log(this.conditionsarray);
            }
            else {
                this.conditionsarray.splice(value, 1);
                console.log(this.conditionsarray);
            }
        }
    };
    ProductsComponent.prototype.newbrands = function () {
        var _this = this;
        this.appService.getbrand().subscribe(function (data) {
            console.log(data);
            _this.brands = data['result'];
            var brr = [];
            _this.brands = data['result'];
            brr = _this.brands;
            console.log(brr);
            _this.brand2 = brr.slice(0, (brr.length / 2));
            _this.brand1 = brr.slice(brr.length / 2, brr.length);
            console.log(_this.brand1);
            console.log(_this.brand2);
            _this.brandName = data['result']['brandName'];
            _this.brandId = data['result']['_id'];
        });
    };
    ProductsComponent.prototype.getbrands = function () {
        // this.appService.getbrand().subscribe(data=>{
        //   console.log(data);
        //   var brr=[];
        //   // this.brands=data['result'];
        //   // brr=this.brands;
        //   // console.log("BRR, ",brr.length,brr)
        //   // this.brand1 = brr.splice(0, (brr.length/2)-1,brr);
        //   // this.brand2 = brr.splice(brr.length/2, brr.length,brr);
        //   // console.log(this.brand1);
        //   // console.log(this.brand2);
        //   this.brandName=data['result']['brandName'];
        //   this.brandId=data['result']['_id'];
        // })
    };
    ProductsComponent.prototype.checkbrand = function (value) {
        var count = 0;
        if (this.brandsArray.indexOf(value) == -1) {
            this.brandsArray.push(value);
            if (this.backupProducts.length == 0) {
                this.backupProducts = this.products;
            }
            var totalAds = this.backupProducts;
            var finalSearchAds = [];
            if (this.brandsArray.length > 0) {
                for (var i = 0; i < totalAds.length - 1; i++) {
                    for (var j = 0; j < this.brandsArray.length; j++) {
                        if (this.brandsArray[j] == totalAds[i].brandName) {
                            finalSearchAds[count] = totalAds[i];
                            count = count + 1;
                        }
                    }
                }
                this.products = finalSearchAds;
                this.ads = this.products.length;
            }
        }
        else {
            if (this.brandsArray.length == 1) {
                this.brandsArray = [];
                this.products = this.backupProducts;
                this.ads = this.products.length;
            }
            else {
                if (this.brandsArray.length > 0) {
                    this.brandsArray.splice(value, 1);
                    var totalAds = this.backupProducts;
                    var finalSearchAds = [];
                    for (var i = 0; i < totalAds.length - 1; i++) {
                        for (var j = 0; j < this.brandsArray.length; j++) {
                            if (this.brandsArray[j] == totalAds[i].brandName) {
                                finalSearchAds[count] = totalAds[i];
                                count = count + 1;
                                this.ads = this.products.length;
                            }
                        }
                    }
                    this.ads = this.products.length;
                    this.products = finalSearchAds;
                    this.ads = this.products.length;
                }
                else {
                    this.products = this.backupProducts;
                }
            }
        }
        console.log("array length = ", this.brandsArray.length);
        if (this.brandsArray.length == 1) {
            this.brandSelected = "Brand" + "( " + this.brandsArray[0] + ")";
        }
        else if (this.brandsArray.length > 1) {
            this.brandSelected = "Brands" + "(" + this.brandsArray[0] + " and " + (this.brandsArray.length - 1) + " more )";
        }
        else if (this.brandsArray.length == 0) {
            this.brandSelected = "Brands";
        }
        else {
            this.brandSelected = "Brands";
        }
    };
    ProductsComponent.prototype.checkcategory = function (value) {
        console.log(value);
        if (this.categoryArray.indexOf(value) == -1) {
            this.categoryArray.push(value);
            //console.log(this.issuesArray);
        }
        else {
            if (this.categoryArray.length == 1) {
                this.categoryArray = [];
                console.log(this.categoryArray);
            }
            else {
                this.brandsArray.splice(value, 1);
                console.log(this.categoryArray);
            }
        }
    };
    ProductsComponent.prototype.colorpick = function (value) {
        console.log(value);
        if (this.selectedcolor.indexOf(value) == -1) {
            this.selectedcolor.push(value);
            //console.log(this.issuesArray);
        }
        else {
            if (this.selectedcolor.length == 1) {
                this.selectedcolor = [];
                console.log(this.selectedcolor);
            }
            else {
                this.selectedcolor.splice(value, 1);
                console.log(this.selectedcolor);
            }
        }
    };
    ProductsComponent.prototype.storagepick = function (value) {
        console.log(value);
        if (this.selectedstorage.indexOf(value) == -1) {
            this.selectedstorage.push(value);
            //console.log(this.issuesArray);
        }
        else {
            if (this.selectedstorage.length == 1) {
                this.selectedstorage = [];
                console.log(this.selectedstorage);
            }
            else {
                this.selectedstorage.splice(value, 1);
                console.log(this.selectedstorage);
            }
        }
    };
    // public colorpick(value){
    //   console.log(value);
    //   this.selectedcolor.push(value);
    //   console.log(selectedcolor);
    // }
    ProductsComponent.prototype.getCategories = function () {
        var _this = this;
        if (this.appService.Data.categories.length == 0) {
            this.appService.getCategories().subscribe(function (data) {
                _this.categories = data;
                _this.appService.Data.categories = data;
            });
        }
        else {
            this.categories = this.appService.Data.categories;
        }
    };
    // public getBrands(){
    //   this.brands = this.appService.getBrands();
    // }
    ProductsComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ProductsComponent.prototype.onWindowResize = function () {
        (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
        (window.innerWidth < 1280) ? this.viewCol = 33.3 : this.viewCol = 33.3;
    };
    ProductsComponent.prototype.changeCount = function (count) {
        this.count = count;
        // this.getAllProducts();
    };
    ProductsComponent.prototype.changeSorting = function (sort) {
        this.sort = sort;
    };
    ProductsComponent.prototype.changeViewType = function (viewType, viewCol) {
        this.viewType = viewType;
        this.viewCol = viewCol;
    };
    ProductsComponent.prototype.openProductDialog = function (product) {
        var _this = this;
        var dialogRef = this.dialog.open(_shared_products_carousel_product_dialog_product_dialog_component__WEBPACK_IMPORTED_MODULE_3__["ProductDialogComponent"], {
            data: product,
            panelClass: 'product-dialog'
        });
        dialogRef.afterClosed().subscribe(function (product) {
            if (product) {
                _this.router.navigate(['/products/', JSON.stringify(product.id), product.title]);
            }
        });
    };
    ProductsComponent.prototype.onPageChanged = function (event) {
        this.page = event;
        // this.getAllProducts();
        window.scrollTo(0, 0);
    };
    ProductsComponent.prototype.onChangeCategory = function (event) {
        if (event.target) {
            this.router.navigate(['/products', event.target.innerText.toLowerCase()]);
        }
    };
    ProductsComponent.prototype.adrouter = function () {
        if (localStorage.getItem('jwt') != undefined && localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != '') {
            this.router.navigate(['/sell']);
        }
        else {
            this.router.navigate(['/sign-in']);
        }
    };
    // public same(){
    //   for(var i; i<1000; i++){
    //     let x= i.toString;
    //     if(x.length ==2){
    //       x[0]=x[2]
    //       console.log(x)f
    //     }
    //
    //   }
    // }
    ProductsComponent.prototype.category1 = function (value) {
        this.c2 = false;
        this.c3 = false;
        this.c1 = true;
        var count = 0;
        var categorySearchData = [];
        var categorySearchFinal = [];
        if (this.categorySearch == "" || this.categorySearch != value) {
            this.categorySearch = value;
            if (this.backupProducts.length == 0) {
                this.backupProducts = this.products;
                this.dtype = "Device Type" + " (" + value + ")";
            }
            categorySearchData = this.backupProducts;
            for (var i = 0; i < categorySearchData.length; i++) {
                if (categorySearchData[i].type == value) {
                    categorySearchFinal[count] = categorySearchData[i];
                    count = count + 1;
                }
                if (i == categorySearchData.length - 1) {
                    this.products = categorySearchFinal;
                    this.ads = this.products.length;
                    this.dtype = "Device Type" + " (" + value + ")";
                }
            }
        }
        else if (this.categorySearch == value) {
            this.categorySearch = "";
            this.products = this.backupProducts;
            this.c1 = false;
            this.ads = this.products.length;
            this.dtype = "Device Type" + " (" + value + ")";
        }
    };
    ProductsComponent.prototype.category2 = function (value) {
        this.c1 = false;
        this.c3 = false;
        this.c2 = true;
        var count = 0;
        var categorySearchData = [];
        var categorySearchFinal = [];
        if (this.categorySearch == "" || this.categorySearch != value) {
            this.categorySearch = value;
            if (this.backupProducts.length == 0) {
                this.backupProducts = this.products;
                this.dtype = "Device Type" + " (" + value + ")";
            }
            categorySearchData = this.backupProducts;
            for (var i = 0; i < categorySearchData.length; i++) {
                if (categorySearchData[i].type == value) {
                    categorySearchFinal[count] = categorySearchData[i];
                    count = count + 1;
                }
                if (i == categorySearchData.length - 1) {
                    this.products = categorySearchFinal;
                    this.ads = this.products.length;
                    this.dtype = "Device Type" + " (" + value + ")";
                }
            }
        }
        else if (this.categorySearch == value) {
            this.categorySearch = "";
            this.products = this.backupProducts;
            this.c2 = false;
            this.ads = this.products.length;
            this.dtype = "Device Type" + " (" + value + ")";
        }
    };
    ProductsComponent.prototype.category3 = function (value) {
        this.dtype = "Device Type" + " (" + value + ")";
        this.c1 = false;
        this.c2 = false;
        this.c3 = true;
        var count = 0;
        var categorySearchData = [];
        var categorySearchFinal = [];
        if (this.categorySearch == "" || this.categorySearch != value) {
            this.categorySearch = value;
            if (this.backupProducts.length == 0) {
                this.backupProducts = this.products;
            }
            categorySearchData = this.backupProducts;
            for (var i = 0; i < categorySearchData.length; i++) {
                if (categorySearchData[i].type == value) {
                    categorySearchFinal[count] = categorySearchData[i];
                    count = count + 1;
                }
                if (i == categorySearchData.length - 1) {
                    this.products = categorySearchFinal;
                    this.ads = this.products.length;
                }
            }
        }
        else if (this.categorySearch == value) {
            this.categorySearch = "";
            this.products = this.backupProducts;
            this.c3 = false;
            this.ads = this.products.length;
        }
    };
    //map section
    ProductsComponent.prototype.updateOnMap = function (location) {
        var full_address = this.location.address_level_1 || "";
        if (this.location.address_level_2)
            full_address = full_address + " " + this.location.address_level_2;
        if (this.location.address_state)
            full_address = full_address + " " + this.location.address_state;
        if (this.location.address_country)
            full_address = full_address + " " + this.location.address_country;
        this.findLocation(full_address);
    };
    ProductsComponent.prototype.findLocation = function (address) {
        var _this = this;
        if (!this.geocoder)
            this.geocoder = new google.maps.Geocoder();
        this.geocoder.geocode({
            'address': address
        }, function (results, status) {
            console.log(results);
            if (status == google.maps.GeocoderStatus.OK) {
                for (var i = 0; i < results[0].address_components.length; i++) {
                    var types = results[0].address_components[i].types;
                    if (types.indexOf('locality') != -1) {
                        _this.location.address_level_2 = results[0].address_components[i].long_name;
                    }
                    if (types.indexOf('country') != -1) {
                        _this.location.address_country = results[0].address_components[i].long_name;
                    }
                    if (types.indexOf('postal_code') != -1) {
                        _this.location.address_zip = results[0].address_components[i].long_name;
                    }
                    if (types.indexOf('administrative_area_level_1') != -1) {
                        _this.location.address_state = results[0].address_components[i].long_name;
                    }
                }
                if (results[0].geometry.location) {
                    _this.location.lat = results[0].geometry.location.lat();
                    _this.location.lng = results[0].geometry.location.lng();
                    _this.location.marker.lat = results[0].geometry.location.lat();
                    _this.latitude = _this.location.marker.lat;
                    console.log(_this.latitude);
                    _this.location.marker.lng = results[0].geometry.location.lng();
                    _this.longitude = _this.location.marker.lng;
                    console.log(_this.longitude);
                    _this.location.marker.draggable = true;
                    _this.location.viewport = results[0].geometry.viewport;
                    // let northeast = {
                    //   latitude: this.location.marker.lat + this.location.marker.latitudeDelta / 2,
                    //   longitude: this.location.marker.lng + this.location.marker.longitudeDelta / 2,
                    // }
                    // , southwest = {
                    //   latitude: this.location.marker.lat - this.location.marker.latitudeDelta / 2,
                    //   longitude: this.location.marker.lng - this.location.marker.longitudeDelta / 2,
                    // };
                    //
                    // console.log("locations" ,this.location.marker, northeast, southwest);
                }
                _this.map.triggerResize();
            }
            else {
                alert("Sorry, this search produced no results.");
            }
        });
    };
    ProductsComponent.prototype.markerDragEnd = function (m, $event) {
        this.location.marker.lat = m.coords.lat;
        this.location.marker.lng = m.coords.lng;
        this.findAddressByCoordinates();
        // this.updateOnMap();
    };
    ProductsComponent.prototype.findAddressByCoordinates = function () {
        var _this = this;
        this.geocoder.geocode({
            'location': {
                lat: this.location.marker.lat,
                lng: this.location.marker.lng
            }
        }, function (results, status) {
            _this.decomposeAddressComponents(results);
        });
    };
    ProductsComponent.prototype.decomposeAddressComponents = function (addressArray) {
        if (addressArray.length == 0)
            return false;
        var address = addressArray[0].address_components;
        for (var _i = 0, address_1 = address; _i < address_1.length; _i++) {
            var element = address_1[_i];
            if (element.length == 0 && !element['types'])
                continue;
            if (element['types'].indexOf('street_number') > -1) {
                this.location.address_level_1 = element['long_name'];
                continue;
            }
            if (element['types'].indexOf('route') > -1) {
                this.location.address_level_1 += ', ' + element['long_name'];
                continue;
            }
            if (element['types'].indexOf('locality') > -1) {
                this.location.address_level_2 = element['long_name'];
                continue;
            }
            if (element['types'].indexOf('administrative_area_level_1') > -1) {
                this.location.address_state = element['long_name'];
                continue;
            }
            if (element['types'].indexOf('country') > -1) {
                this.location.address_country = element['long_name'];
                continue;
            }
            if (element['types'].indexOf('postal_code') > -1) {
                this.location.address_zip = element['long_name'];
                continue;
            }
        }
    };
    ProductsComponent.prototype.milesToRadius = function (value) {
        this.circleRadius = value / 0.00062137;
    };
    ProductsComponent.prototype.circleRadiusInMiles = function () {
        return this.circleRadius * 0.00062137;
    };
    ProductsComponent.prototype.advertlocation = function () {
        this.updateOnMap("abc");
        //   this.heading="CONFIRM YOUR AD";
        console.log(this.longitude);
        console.log(this.latitude);
        //
        //   if(this.advert_id != null && this.advert_id != undefined && this.advert_id != '' &&
        // this.latitude != null && this.latitude != undefined && this.latitude != ''
        // && this.longitude != null && this.longitude != undefined && this.longitude != ''){
        //         this.appService.advertlocation(this.advert_id,this.latitude,this.longitude).subscribe(data=>{
        //           console.log(data);
        //           if(data['result']){
        //             this.hid=false;
        //             this.confhid=true;
        //             this.fhid=false;
        //           }
        //
        //         })
        //       }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('sidenav'),
        __metadata("design:type", Object)
    ], ProductsComponent.prototype, "sidenav", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_agm_core__WEBPACK_IMPORTED_MODULE_7__["AgmMap"]),
        __metadata("design:type", _agm_core__WEBPACK_IMPORTED_MODULE_7__["AgmMap"])
    ], ProductsComponent.prototype, "map", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('window:resize'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ProductsComponent.prototype, "onWindowResize", null);
    ProductsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-products',
            template: __webpack_require__(/*! ./products.component.html */ "./src/app/pages/products/products.component.html"),
            styles: [__webpack_require__(/*! ./products.component.scss */ "./src/app/pages/products/products.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _app_service__WEBPACK_IMPORTED_MODULE_4__["AppService"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"], _chat_service__WEBPACK_IMPORTED_MODULE_5__["ChatService"],
            _agm_core__WEBPACK_IMPORTED_MODULE_7__["MapsAPILoader"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"],
            _agm_core_services__WEBPACK_IMPORTED_MODULE_8__["GoogleMapsAPIWrapper"]])
    ], ProductsComponent);
    return ProductsComponent;
}());

// @Component({
//   selector: 'app-product-map',
//   templateUrl: './product-map.component.html',
//   // styleUrls: ['./product-map/product-map.component.scss'],
//   // encapsulation: ViewEncapsulation.None
// })
// export class ProductMapComponent {
//   constructor(
//     public dialogRef: MatDialogRef<ProductMapComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: Location) {}
// }


/***/ }),

/***/ "./src/app/pages/products/products.module.ts":
/*!***************************************************!*\
  !*** ./src/app/pages/products/products.module.ts ***!
  \***************************************************/
/*! exports provided: routes, ProductsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductsModule", function() { return ProductsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_swiper_wrapper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-swiper-wrapper */ "./node_modules/ngx-swiper-wrapper/dist/ngx-swiper-wrapper.es5.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _theme_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../theme/pipes/pipes.module */ "./src/app/theme/pipes/pipes.module.ts");
/* harmony import */ var _products_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./products.component */ "./src/app/pages/products/products.component.ts");
/* harmony import */ var _product_product_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./product/product.component */ "./src/app/pages/products/product/product.component.ts");
/* harmony import */ var _product_product_zoom_product_zoom_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./product/product-zoom/product-zoom.component */ "./src/app/pages/products/product/product-zoom/product-zoom.component.ts");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












// import { ProductMapComponent } from './product-map.component';
var routes = [
    { path: '', component: _products_component__WEBPACK_IMPORTED_MODULE_8__["ProductsComponent"], pathMatch: 'full' },
    { path: ':name', component: _products_component__WEBPACK_IMPORTED_MODULE_8__["ProductsComponent"] },
    { path: ':id/:name', component: _product_product_component__WEBPACK_IMPORTED_MODULE_9__["ProductComponent"] }
];
var ProductsModule = /** @class */ (function () {
    function ProductsModule() {
    }
    ProductsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                ngx_swiper_wrapper__WEBPACK_IMPORTED_MODULE_4__["SwiperModule"],
                ngx_pagination__WEBPACK_IMPORTED_MODULE_5__["NgxPaginationModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__["SharedModule"],
                _theme_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_7__["PipesModule"],
                _agm_core__WEBPACK_IMPORTED_MODULE_11__["AgmCoreModule"]
            ],
            declarations: [
                _products_component__WEBPACK_IMPORTED_MODULE_8__["ProductsComponent"],
                // ProductMapComponent,
                _product_product_component__WEBPACK_IMPORTED_MODULE_9__["ProductComponent"],
                _product_product_zoom_product_zoom_component__WEBPACK_IMPORTED_MODULE_10__["ProductZoomComponent"],
            ],
            providers: [
                // ProductMapComponent,
                _agm_core__WEBPACK_IMPORTED_MODULE_11__["GoogleMapsAPIWrapper"],
            ],
            entryComponents: [
                // ProductMapComponent,
                _product_product_zoom_product_zoom_component__WEBPACK_IMPORTED_MODULE_10__["ProductZoomComponent"]
            ]
        })
    ], ProductsModule);
    return ProductsModule;
}());



/***/ })

}]);
//# sourceMappingURL=app-pages-products-products-module.js.map