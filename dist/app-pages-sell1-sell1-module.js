(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app-pages-sell1-sell1-module"],{

/***/ "./src/app/pages/sell1/sell1.module.ts":
/*!*********************************************!*\
  !*** ./src/app/pages/sell1/sell1.module.ts ***!
  \*********************************************/
/*! exports provided: routes, Sell1Module */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sell1Module", function() { return Sell1Module; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _sell1_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sell1.component */ "./src/app/pages/sell1/sell1.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



//import { ReactiveFormsModule } from '@angular/forms';


var routes = [
    { path: '', component: _sell1_component__WEBPACK_IMPORTED_MODULE_4__["Sell1Component"], pathMatch: 'full' }
];
var Sell1Module = /** @class */ (function () {
    function Sell1Module() {
    }
    Sell1Module = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
                //ReactiveFormsModule,
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__["SharedModule"]
            ],
            declarations: [
                _sell1_component__WEBPACK_IMPORTED_MODULE_4__["Sell1Component"]
            ]
            // providers: [
            //   FormBuilder
            // ]
        })
    ], Sell1Module);
    return Sell1Module;
}());



/***/ })

}]);
//# sourceMappingURL=app-pages-sell1-sell1-module.js.map