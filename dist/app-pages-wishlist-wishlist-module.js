(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app-pages-wishlist-wishlist-module"],{

/***/ "./src/app/pages/wishlist/wishlist.component.html":
/*!********************************************************!*\
  !*** ./src/app/pages/wishlist/wishlist.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-chip-list *ngIf=\"appService.Data.wishList.length == 0\">\r\n    <mat-chip color=\"warn\" selected=\"true\">YOU HAVE NO ITEMS IN WISH LIST.</mat-chip>\r\n</mat-chip-list>\r\n\r\n<mat-card *ngIf=\"appService.Data.wishList?.length > 0\" class=\"p-0\">\r\n\r\n  <div class=\"mat-table wishlist-table\">\r\n    <div class=\"mat-header-row\">\r\n      <div class=\"mat-header-cell\">Product</div>\r\n      <div class=\"mat-header-cell\">Name</div>\r\n      <div class=\"mat-header-cell\">Price</div>\r\n      <div class=\"mat-header-cell\">Availability</div>\r\n      <div class=\"mat-header-cell\">Quantity</div>\r\n      <div class=\"mat-header-cell\">\r\n        <div class=\"px-1\">\r\n          <button mat-raised-button color=\"warn\" (click)=\"clear()\">Clear All</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div *ngFor=\"let product of appService.Data.wishList\" class=\"mat-row\">\r\n      <div class=\"mat-cell\"><img [src]=\"product.images[0].small\"></div>\r\n      <div class=\"mat-cell\"><a [routerLink]=\"['/products', product.id, product.name]\" class=\"product-name\">{{product.name}}</a></div>\r\n      <div class=\"mat-cell\">${{product.newPrice | number : '1.2-2'}}</div>\r\n      <div class=\"mat-cell\">{{ (product.availibilityCount > 0) ? 'In stock':'Unavailable'}}</div>\r\n      <div class=\"mat-cell text-muted\">\r\n        <app-controls [product]=\"product\" [type]=\"'wish'\"></app-controls>\r\n      </div>\r\n      <div class=\"mat-cell\">\r\n        <div class=\"p-1\">          \r\n          <button mat-mini-fab color=\"primary\" (click)=\"addToCart(product)\" matTooltip=\"Add to cart\">\r\n              <mat-icon>add_shopping_cart</mat-icon>\r\n          </button>\r\n          <button mat-mini-fab color=\"warn\" (click)=\"remove(product)\" matTooltip=\"Clear\" class=\"remove\">\r\n              <mat-icon>close</mat-icon>\r\n          </button>\r\n        </div>\r\n      </div>\r\n      \r\n    </div>\r\n  </div>\r\n\r\n</mat-card>"

/***/ }),

/***/ "./src/app/pages/wishlist/wishlist.component.scss":
/*!********************************************************!*\
  !*** ./src/app/pages/wishlist/wishlist.component.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".wishlist-table.mat-table {\n  display: block;\n  overflow-x: auto; }\n  .wishlist-table.mat-table .mat-row, .wishlist-table.mat-table .mat-header-row {\n    display: flex;\n    border-bottom-width: 1px;\n    border-bottom-style: solid;\n    align-items: center;\n    min-height: 48px;\n    padding: 0 24px;\n    min-width: 870px; }\n  .wishlist-table.mat-table .mat-row {\n    min-height: 100px; }\n  .wishlist-table.mat-table .mat-cell, .wishlist-table.mat-table .mat-header-cell {\n    flex: 1;\n    overflow: hidden;\n    word-wrap: break-word; }\n  .wishlist-table.mat-table .mat-header-cell {\n    font-size: 14px; }\n  .wishlist-table.mat-table .mat-cell img {\n    width: 100px; }\n  .wishlist-table.mat-table .mat-cell .product-name {\n    color: inherit;\n    text-decoration: none;\n    font-weight: 500; }\n  .wishlist-table.mat-table .mat-cell .remove {\n    margin-left: 8px; }\n"

/***/ }),

/***/ "./src/app/pages/wishlist/wishlist.component.ts":
/*!******************************************************!*\
  !*** ./src/app/pages/wishlist/wishlist.component.ts ***!
  \******************************************************/
/*! exports provided: WishlistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WishlistComponent", function() { return WishlistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../app.service */ "./src/app/app.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WishlistComponent = /** @class */ (function () {
    function WishlistComponent(appService) {
        this.appService = appService;
    }
    WishlistComponent.prototype.ngOnInit = function () { };
    WishlistComponent.prototype.remove = function (product) {
        var index = this.appService.Data.wishList.indexOf(product);
        if (index !== -1) {
            this.appService.Data.wishList.splice(index, 1);
        }
    };
    WishlistComponent.prototype.clear = function () {
        this.appService.Data.wishList.length = 0;
    };
    WishlistComponent.prototype.addToCart = function (product) {
        this.appService.addToCart(product);
    };
    WishlistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-wishlist',
            template: __webpack_require__(/*! ./wishlist.component.html */ "./src/app/pages/wishlist/wishlist.component.html"),
            styles: [__webpack_require__(/*! ./wishlist.component.scss */ "./src/app/pages/wishlist/wishlist.component.scss")]
        }),
        __metadata("design:paramtypes", [_app_service__WEBPACK_IMPORTED_MODULE_1__["AppService"]])
    ], WishlistComponent);
    return WishlistComponent;
}());



/***/ }),

/***/ "./src/app/pages/wishlist/wishlist.module.ts":
/*!***************************************************!*\
  !*** ./src/app/pages/wishlist/wishlist.module.ts ***!
  \***************************************************/
/*! exports provided: routes, WishlistModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WishlistModule", function() { return WishlistModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _wishlist_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./wishlist.component */ "./src/app/pages/wishlist/wishlist.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [
    { path: '', component: _wishlist_component__WEBPACK_IMPORTED_MODULE_4__["WishlistComponent"], pathMatch: 'full' }
];
var WishlistModule = /** @class */ (function () {
    function WishlistModule() {
    }
    WishlistModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__["SharedModule"]
            ],
            declarations: [
                _wishlist_component__WEBPACK_IMPORTED_MODULE_4__["WishlistComponent"]
            ]
        })
    ], WishlistModule);
    return WishlistModule;
}());



/***/ })

}]);
//# sourceMappingURL=app-pages-wishlist-wishlist-module.js.map