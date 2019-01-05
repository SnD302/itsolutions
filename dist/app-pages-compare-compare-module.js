(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app-pages-compare-compare-module"],{

/***/ "./src/app/pages/compare/compare.component.html":
/*!******************************************************!*\
  !*** ./src/app/pages/compare/compare.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-chip-list *ngIf=\"appService.Data.compareList.length == 0\">\r\n    <mat-chip color=\"warn\" selected=\"true\">YOU HAVE NO ITEMS TO COMPARE.</mat-chip>\r\n</mat-chip-list>\r\n\r\n<mat-card *ngIf=\"appService.Data.compareList?.length > 0\" class=\"p-0\">\r\n\r\n  <div class=\"mat-table compare-table\">\r\n    <div class=\"mat-row\">\r\n      <div class=\"mat-cell\">\r\n          product       \r\n      </div>\r\n      <div class=\"mat-cell\" *ngFor=\"let product of appService.Data.compareList\">\r\n        <button mat-icon-button color=\"accent\" class=\"remove\" (click)=\"remove(product)\"><mat-icon>close</mat-icon></button>\r\n        <img [src]=\"product.images[0].small\" alt=\"\">\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"mat-row\">\r\n      <div class=\"mat-cell\">\r\n        name\r\n      </div>\r\n      <div class=\"mat-cell\" *ngFor=\"let product of appService.Data.compareList\">\r\n        <a [routerLink]=\"['/products', product.id, product.name]\" class=\"product-name\">{{product.name}}</a>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"mat-row\">\r\n      <div class=\"mat-cell\">\r\n        price\r\n      </div>\r\n      <div class=\"mat-cell\" *ngFor=\"let product of appService.Data.compareList\">\r\n        <b class=\"new-price\">${{product.newPrice | number : '1.2-2'}}</b>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"mat-row\">\r\n      <div class=\"mat-cell\">\r\n        availability\r\n      </div>\r\n      <div class=\"mat-cell\" *ngFor=\"let product of appService.Data.compareList\">\r\n          <b class=\"text-muted\">{{ (product.availibilityCount > 0) ? 'In stock':'Unavailable'}}</b>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"mat-row\">\r\n      <div class=\"mat-cell\">\r\n        rating\r\n      </div>\r\n      <div class=\"mat-cell\" *ngFor=\"let product of appService.Data.compareList\">\r\n        <app-rating [ratingsCount]=\"product.ratingsCount\" [ratingsValue]=\"product.ratingsValue\"></app-rating>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"mat-row\">\r\n      <div class=\"mat-cell\">\r\n        description\r\n      </div>\r\n      <div class=\"mat-cell\" *ngFor=\"let product of appService.Data.compareList\">\r\n        <span class=\"text-muted lh\">{{product.description}}</span>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"mat-row\">\r\n      <div class=\"mat-cell\">\r\n        color\r\n      </div>\r\n      <div class=\"mat-cell\" *ngFor=\"let product of appService.Data.compareList\">\r\n        <button mat-raised-button *ngFor=\"let color of product.color\" [style.background]=\"color\" class=\"color\">&nbsp;</button>              \r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"mat-row\">\r\n      <div class=\"mat-cell\">\r\n        size\r\n      </div>\r\n      <div class=\"mat-cell\" *ngFor=\"let product of appService.Data.compareList\">\r\n        <span *ngFor=\"let size of product.size\" class=\"size\">{{size}}</span>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"mat-row\">\r\n      <div class=\"mat-cell\">\r\n        weight\r\n      </div>\r\n      <div class=\"mat-cell\" *ngFor=\"let product of appService.Data.compareList\">\r\n        <span *ngIf=\"product.weight\">{{product.weight}} g</span>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"mat-row\">\r\n      <div class=\"mat-cell\">\r\n        <button mat-raised-button color=\"warn\" (click)=\"clear()\">Clear All</button>\r\n      </div>\r\n      <div class=\"mat-cell\" *ngFor=\"let product of appService.Data.compareList\">\r\n        <button mat-raised-button color=\"primary\" class=\"add\" (click)=\"addToCart(product)\">\r\n          <mat-icon>shopping_cart</mat-icon>Add to cart</button>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n  \r\n</mat-card>"

/***/ }),

/***/ "./src/app/pages/compare/compare.component.scss":
/*!******************************************************!*\
  !*** ./src/app/pages/compare/compare.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".compare-table.mat-table {\n  display: block;\n  overflow-x: auto; }\n  .compare-table.mat-table .mat-row {\n    display: flex;\n    border-bottom-width: 1px;\n    border-bottom-style: solid;\n    min-width: 920px; }\n  .compare-table.mat-table .mat-row:last-child .mat-cell {\n      padding: 20px 16px; }\n  .compare-table.mat-table .mat-cell {\n    position: relative;\n    display: flex;\n    flex: 1;\n    overflow: hidden;\n    word-wrap: break-word;\n    align-items: center;\n    min-height: 36px;\n    padding: 8px 16px;\n    justify-content: center; }\n  .compare-table.mat-table .mat-cell img {\n      max-width: 100%; }\n  .compare-table.mat-table .mat-cell:first-child {\n      width: 100px;\n      flex: unset;\n      justify-content: flex-end;\n      text-transform: capitalize;\n      background: rgba(0, 0, 0, 0.03);\n      font-weight: 500;\n      color: #757575; }\n  .compare-table.mat-table .mat-cell .product-name {\n      color: inherit;\n      text-decoration: none;\n      font-weight: 500;\n      font-size: 18px; }\n  .compare-table.mat-table .mat-cell .new-price {\n      font-size: 16px; }\n  .compare-table.mat-table .mat-cell button.color {\n      padding: 0;\n      min-width: 36px;\n      margin-left: 6px; }\n  .compare-table.mat-table .mat-cell button.remove {\n      position: absolute;\n      top: 0;\n      right: 0; }\n  .compare-table.mat-table .mat-cell button.add .mat-icon {\n      margin-right: 6px; }\n  .compare-table.mat-table .mat-cell .size {\n      margin-left: 6px; }\n  .compare-table.mat-table .mat-cell .size:after {\n        content: ','; }\n  .compare-table.mat-table .mat-cell .size:last-child:after {\n        content: none; }\n"

/***/ }),

/***/ "./src/app/pages/compare/compare.component.ts":
/*!****************************************************!*\
  !*** ./src/app/pages/compare/compare.component.ts ***!
  \****************************************************/
/*! exports provided: CompareComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompareComponent", function() { return CompareComponent; });
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


var CompareComponent = /** @class */ (function () {
    function CompareComponent(appService) {
        this.appService = appService;
    }
    CompareComponent.prototype.ngOnInit = function () { };
    CompareComponent.prototype.remove = function (product) {
        var index = this.appService.Data.compareList.indexOf(product);
        if (index !== -1) {
            this.appService.Data.compareList.splice(index, 1);
        }
    };
    CompareComponent.prototype.clear = function () {
        this.appService.Data.compareList.length = 0;
    };
    CompareComponent.prototype.addToCart = function (product) {
        this.appService.addToCart(product);
    };
    CompareComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-compare',
            template: __webpack_require__(/*! ./compare.component.html */ "./src/app/pages/compare/compare.component.html"),
            styles: [__webpack_require__(/*! ./compare.component.scss */ "./src/app/pages/compare/compare.component.scss")]
        }),
        __metadata("design:paramtypes", [_app_service__WEBPACK_IMPORTED_MODULE_1__["AppService"]])
    ], CompareComponent);
    return CompareComponent;
}());



/***/ }),

/***/ "./src/app/pages/compare/compare.module.ts":
/*!*************************************************!*\
  !*** ./src/app/pages/compare/compare.module.ts ***!
  \*************************************************/
/*! exports provided: routes, CompareModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompareModule", function() { return CompareModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _compare_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./compare.component */ "./src/app/pages/compare/compare.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [
    { path: '', component: _compare_component__WEBPACK_IMPORTED_MODULE_4__["CompareComponent"], pathMatch: 'full' }
];
var CompareModule = /** @class */ (function () {
    function CompareModule() {
    }
    CompareModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__["SharedModule"]
            ],
            declarations: [
                _compare_component__WEBPACK_IMPORTED_MODULE_4__["CompareComponent"]
            ]
        })
    ], CompareModule);
    return CompareModule;
}());



/***/ })

}]);
//# sourceMappingURL=app-pages-compare-compare-module.js.map