(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"app/pages/brands/brands.module": [
		"./src/app/pages/brands/brands.module.ts",
		"app-pages-brands-brands-module~app-pages-products-products-module",
		"app-pages-brands-brands-module"
	],
	"app/pages/cart/cart.module": [
		"./src/app/pages/cart/cart.module.ts",
		"app-pages-cart-cart-module"
	],
	"app/pages/checkout/checkout.module": [
		"./src/app/pages/checkout/checkout.module.ts",
		"app-pages-checkout-checkout-module"
	],
	"app/pages/compare/compare.module": [
		"./src/app/pages/compare/compare.module.ts",
		"app-pages-compare-compare-module"
	],
	"app/pages/contact/contact.module": [
		"./src/app/pages/contact/contact.module.ts",
		"app-pages-contact-contact-module"
	],
	"app/pages/products/products.module": [
		"./src/app/pages/products/products.module.ts",
		"app-pages-brands-brands-module~app-pages-products-products-module",
		"app-pages-products-products-module"
	],
	"app/pages/sell1/sell1.module": [
		"./src/app/pages/sell1/sell1.module.ts",
		"app-pages-sell1-sell1-module"
	],
	"app/pages/wishlist/wishlist.module": [
		"./src/app/pages/wishlist/wishlist.module.ts",
		"app-pages-wishlist-wishlist-module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error('Cannot find module "' + req + '".');
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		var module = __webpack_require__(ids[0]);
		return module;
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"app\" class=\"h-100 app\" [ngClass]=\"settings.theme\">\r\n    <router-outlet></router-outlet>\r\n    <!--<ngx-spinner [bdOpacity]= \"0.7\" [bdColor] = \"'#333'\" [size] = \"'large'\" [color] = \"'#fff'\" [type] = \"'ball-clip-rotate'\"></ngx-spinner>     -->\r\n    <ngx-spinner bdColor=\"rgba(51,51,51,0.7)\" size=\"large\" color= \"#fff\" type=\"ball-clip-rotate\"></ngx-spinner>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.settings */ "./src/app/app.settings.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent(appSettings, router) {
        this.appSettings = appSettings;
        this.router = router;
        this.loading = false;
        this.settings = this.appSettings.settings;
    }
    AppComponent.prototype.ngOnInit = function () {
        // this.router.navigate(['']);  //redirect other pages to homepage on browser refresh
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        this.router.events.subscribe(function (event) {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"]) {
                window.scrollTo(0, 0);
            }
        });
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [_app_settings__WEBPACK_IMPORTED_MODULE_2__["AppSettings"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.models.ts":
/*!*******************************!*\
  !*** ./src/app/app.models.ts ***!
  \*******************************/
/*! exports provided: Category, Product */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Category", function() { return Category; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Product", function() { return Product; });
var Category = /** @class */ (function () {
    function Category(id, name, hasSubCategory, parentId) {
        this.id = id;
        this.name = name;
        this.hasSubCategory = hasSubCategory;
        this.parentId = parentId;
    }
    return Category;
}());

var Product = /** @class */ (function () {
    function Product(id, name, images, oldPrice, newPrice, discount, ratingsCount, ratingsValue, description, availibilityCount, color, size, weight, categoryId) {
        this.id = id;
        this.name = name;
        this.images = images;
        this.oldPrice = oldPrice;
        this.newPrice = newPrice;
        this.discount = discount;
        this.ratingsCount = ratingsCount;
        this.ratingsValue = ratingsValue;
        this.description = description;
        this.availibilityCount = availibilityCount;
        this.color = color;
        this.size = size;
        this.weight = weight;
        this.categoryId = categoryId;
    }
    return Product;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: firebaseConfig, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "firebaseConfig", function() { return firebaseConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/ngx-spinner.umd.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ngx_spinner__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var angularfire2__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angularfire2 */ "./node_modules/angularfire2/index.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.cjs.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var ng_recaptcha__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng-recaptcha */ "./node_modules/ng-recaptcha/index.js");
/* harmony import */ var ng_recaptcha__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(ng_recaptcha__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/cdk/overlay */ "./node_modules/@angular/cdk/esm5/overlay.es5.js");
/* harmony import */ var _theme_utils_custom_overlay_container__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./theme/utils/custom-overlay-container */ "./src/app/theme/utils/custom-overlay-container.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _app_routing__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./app.routing */ "./src/app/app.routing.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _pages_pages_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./pages/pages.component */ "./src/app/pages/pages.component.ts");
/* harmony import */ var _pages_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./pages/not-found/not-found.component */ "./src/app/pages/not-found/not-found.component.ts");
/* harmony import */ var _post_post_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./post/post.component */ "./src/app/post/post.component.ts");
/* harmony import */ var _pages_sell1_sell1_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./pages/sell1/sell1.component */ "./src/app/pages/sell1/sell1.component.ts");
/* harmony import */ var _pages_sig_sig_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./pages/sig/sig.component */ "./src/app/pages/sig/sig.component.ts");
/* harmony import */ var _pages_accounts_accounts_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./pages/accounts/accounts.component */ "./src/app/pages/accounts/accounts.component.ts");
/* harmony import */ var _pages_offer_details_offer_details_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./pages/offer_details/offer_details.component */ "./src/app/pages/offer_details/offer_details.component.ts");
/* harmony import */ var _pages_myaccs_myaccs_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./pages/myaccs/myaccs.component */ "./src/app/pages/myaccs/myaccs.component.ts");
/* harmony import */ var _pages_products_product_map_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./pages/products/product-map.component */ "./src/app/pages/products/product-map.component.ts");
/* harmony import */ var _pages_sell_sell_sell_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./pages/sell/sell/sell.component */ "./src/app/pages/sell/sell/sell.component.ts");
/* harmony import */ var _theme_components_top_menu_top_menu_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./theme/components/top-menu/top-menu.component */ "./src/app/theme/components/top-menu/top-menu.component.ts");
/* harmony import */ var _theme_components_menu_menu_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./theme/components/menu/menu.component */ "./src/app/theme/components/menu/menu.component.ts");
/* harmony import */ var _theme_components_sidenav_menu_sidenav_menu_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./theme/components/sidenav-menu/sidenav-menu.component */ "./src/app/theme/components/sidenav-menu/sidenav-menu.component.ts");
/* harmony import */ var _theme_components_breadcrumb_breadcrumb_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./theme/components/breadcrumb/breadcrumb.component */ "./src/app/theme/components/breadcrumb/breadcrumb.component.ts");
/* harmony import */ var _app_settings__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./app.settings */ "./src/app/app.settings.ts");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./app.service */ "./src/app/app.service.ts");
/* harmony import */ var _theme_utils_app_interceptor__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./theme/utils/app-interceptor */ "./src/app/theme/utils/app-interceptor.ts");
/* harmony import */ var _theme_components_options_options_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./theme/components/options/options.component */ "./src/app/theme/components/options/options.component.ts");
/* harmony import */ var _theme_components_footer_footer_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./theme/components/footer/footer.component */ "./src/app/theme/components/footer/footer.component.ts");
/* harmony import */ var _map_map_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./map/map.component */ "./src/app/map/map.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






// import { FileSelectDirective } from 'ng2-file-upload';
//import { AngularFileUploaderModule } from "angular-file-uploader";







//import { FormBuilder, FormGroup, Validators } from '@angular/forms';














//import { AccComponent } from './pages/accounts/acc/acc.component';











var firebaseConfig = {
    apiKey: "AIzaSyAmJXP-luQXB68lchXN2Wm9oe40MuxzHHI",
    authDomain: "celx-c64f9.firebaseapp.com",
    databaseURL: "https://celx-c64f9.firebaseio.com",
    projectId: "celx-c64f9",
    storageBucket: "celx-c64f9.appspot.com",
    messagingSenderId: "947615458866"
};
firebase__WEBPACK_IMPORTED_MODULE_7__["initializeApp"](firebaseConfig);
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_forms__WEBPACK_IMPORTED_MODULE_13__["ReactiveFormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_13__["FormsModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                ng_recaptcha__WEBPACK_IMPORTED_MODULE_8__["RecaptchaModule"].forRoot(),
                //RecaptchaFormsModule,
                angularfire2__WEBPACK_IMPORTED_MODULE_6__["AngularFireModule"].initializeApp(_environments_environment__WEBPACK_IMPORTED_MODULE_10__["environment"].firebase),
                // AngularFireDatabaseModule, // for database
                ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerModule"],
                _agm_core__WEBPACK_IMPORTED_MODULE_5__["AgmCoreModule"].forRoot({
                    apiKey: 'AIzaSyAmJXP-luQXB68lchXN2Wm9oe40MuxzHHI'
                }),
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_14__["SharedModule"],
                _app_routing__WEBPACK_IMPORTED_MODULE_15__["routing"]
            ],
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_16__["AppComponent"],
                // FileSelectDirective,
                _pages_pages_component__WEBPACK_IMPORTED_MODULE_17__["PagesComponent"],
                _pages_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_18__["NotFoundComponent"],
                _pages_sell_sell_sell_component__WEBPACK_IMPORTED_MODULE_26__["SellComponent"],
                _pages_sig_sig_component__WEBPACK_IMPORTED_MODULE_21__["SigComponent"],
                _pages_myaccs_myaccs_component__WEBPACK_IMPORTED_MODULE_24__["MyaccsComponent"],
                _post_post_component__WEBPACK_IMPORTED_MODULE_19__["PostComponent"],
                _pages_sell1_sell1_component__WEBPACK_IMPORTED_MODULE_20__["Sell1Component"],
                _pages_accounts_accounts_component__WEBPACK_IMPORTED_MODULE_22__["AccountsComponent"],
                _pages_offer_details_offer_details_component__WEBPACK_IMPORTED_MODULE_23__["Offer_detailsComponent"],
                _theme_components_top_menu_top_menu_component__WEBPACK_IMPORTED_MODULE_27__["TopMenuComponent"],
                _theme_components_menu_menu_component__WEBPACK_IMPORTED_MODULE_28__["MenuComponent"],
                _theme_components_sidenav_menu_sidenav_menu_component__WEBPACK_IMPORTED_MODULE_29__["SidenavMenuComponent"],
                _theme_components_breadcrumb_breadcrumb_component__WEBPACK_IMPORTED_MODULE_30__["BreadcrumbComponent"],
                _theme_components_options_options_component__WEBPACK_IMPORTED_MODULE_34__["OptionsComponent"],
                _theme_components_footer_footer_component__WEBPACK_IMPORTED_MODULE_35__["FooterComponent"],
                _map_map_component__WEBPACK_IMPORTED_MODULE_36__["MapComponent"],
                _pages_products_product_map_component__WEBPACK_IMPORTED_MODULE_25__["ProductMapComponent"]
            ],
            entryComponents: [
                _pages_products_product_map_component__WEBPACK_IMPORTED_MODULE_25__["ProductMapComponent"],
            ],
            providers: [
                _app_settings__WEBPACK_IMPORTED_MODULE_31__["AppSettings"],
                _pages_products_product_map_component__WEBPACK_IMPORTED_MODULE_25__["ProductMapComponent"],
                _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatBottomSheet"],
                _agm_core__WEBPACK_IMPORTED_MODULE_5__["GoogleMapsAPIWrapper"],
                _app_service__WEBPACK_IMPORTED_MODULE_32__["AppService"],
                { provide: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_11__["OverlayContainer"], useClass: _theme_utils_custom_overlay_container__WEBPACK_IMPORTED_MODULE_12__["CustomOverlayContainer"] },
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HTTP_INTERCEPTORS"], useClass: _theme_utils_app_interceptor__WEBPACK_IMPORTED_MODULE_33__["AppInterceptor"], multi: true }
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_16__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.routing.ts":
/*!********************************!*\
  !*** ./src/app/app.routing.ts ***!
  \********************************/
/*! exports provided: routes, routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _pages_pages_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/pages.component */ "./src/app/pages/pages.component.ts");
/* harmony import */ var _pages_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/not-found/not-found.component */ "./src/app/pages/not-found/not-found.component.ts");
/* harmony import */ var _post_post_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./post/post.component */ "./src/app/post/post.component.ts");
/* harmony import */ var _pages_sell1_sell1_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/sell1/sell1.component */ "./src/app/pages/sell1/sell1.component.ts");
/* harmony import */ var _pages_sig_sig_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/sig/sig.component */ "./src/app/pages/sig/sig.component.ts");
/* harmony import */ var _pages_accounts_accounts_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pages/accounts/accounts.component */ "./src/app/pages/accounts/accounts.component.ts");
/* harmony import */ var _pages_myaccs_myaccs_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pages/myaccs/myaccs.component */ "./src/app/pages/myaccs/myaccs.component.ts");
/* harmony import */ var _pages_offer_details_offer_details_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pages/offer_details/offer_details.component */ "./src/app/pages/offer_details/offer_details.component.ts");









//import { AccComponent } from './pages/accounts/acc/acc.component';
var routes = [
    { path: 'post', component: _post_post_component__WEBPACK_IMPORTED_MODULE_3__["PostComponent"] },
    //{ path: 'sell', component: SellComponent },
    { path: 'sell', component: _pages_sell1_sell1_component__WEBPACK_IMPORTED_MODULE_4__["Sell1Component"] },
    { path: 'sign-in', component: _pages_sig_sig_component__WEBPACK_IMPORTED_MODULE_5__["SigComponent"] },
    { path: 'account', component: _pages_myaccs_myaccs_component__WEBPACK_IMPORTED_MODULE_7__["MyaccsComponent"] },
    //{ path: 'acc', component: AccComponent },
    { path: 'accounts', component: _pages_accounts_accounts_component__WEBPACK_IMPORTED_MODULE_6__["AccountsComponent"] },
    { path: 'offers', component: _pages_offer_details_offer_details_component__WEBPACK_IMPORTED_MODULE_8__["Offer_detailsComponent"], data: { breadcrumb: 'Offers', } },
    {
        path: '',
        component: _pages_pages_component__WEBPACK_IMPORTED_MODULE_1__["PagesComponent"], children: [
            //            { path: '', loadChildren: 'app/pages/home/home.module#HomeModule' },
            // { path: 'account', loadChildren: 'app/pages/account/account.module#AccountModule', data: { breadcrumb: 'Account Settings' } },
            { path: 'compare', loadChildren: 'app/pages/compare/compare.module#CompareModule', data: { breadcrumb: 'Compare' } },
            { path: 'wishlist', loadChildren: 'app/pages/wishlist/wishlist.module#WishlistModule', data: { breadcrumb: 'Wishlist' } },
            { path: 'cart', loadChildren: 'app/pages/cart/cart.module#CartModule', data: { breadcrumb: 'Cart' } },
            { path: 'Sell', loadChildren: 'app/pages/sell1/sell1.module#Sell1Module', data: { breadcrumb: 'Sell' } },
            { path: 'checkout', loadChildren: 'app/pages/checkout/checkout.module#CheckoutModule', data: { breadcrumb: 'Checkout' } },
            { path: 'contact', loadChildren: 'app/pages/contact/contact.module#ContactModule', data: { breadcrumb: 'Contact' } },
            // { path: 'sign-in', loadChildren: 'app/pages/sign-in/sign-in.module#SignInModule', data: { breadcrumb: 'Sign In ' } },
            { path: 'brands', loadChildren: 'app/pages/brands/brands.module#BrandsModule', data: { breadcrumb: 'Brands' } },
            { path: 'products', loadChildren: 'app/pages/products/products.module#ProductsModule', data: { breadcrumb: 'All Products' } },
            { path: '', loadChildren: 'app/pages/products/products.module#ProductsModule', data: { breadcrumb: 'All Products' } }
        ]
    },
    { path: '**', component: _pages_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_2__["NotFoundComponent"] },
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes, {
    preloadingStrategy: _angular_router__WEBPACK_IMPORTED_MODULE_0__["PreloadAllModules"],
});


/***/ }),

/***/ "./src/app/app.service.ts":
/*!********************************!*\
  !*** ./src/app/app.service.ts ***!
  \********************************/
/*! exports provided: Data, AppService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Data", function() { return Data; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppService", function() { return AppService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Data = /** @class */ (function () {
    function Data(categories, compareList, wishList, cartList, totalPrice) {
        this.categories = categories;
        this.compareList = compareList;
        this.wishList = wishList;
        this.cartList = cartList;
        this.totalPrice = totalPrice;
    }
    return Data;
}());

var AppService = /** @class */ (function () {
    function AppService(http, snackBar) {
        this.http = http;
        this.snackBar = snackBar;
        this.Data = new Data([], // categories
        [], // compareList
        [], // wishList
        [], // cartList
        null //totalPrice
        );
        this.url = "assets/data/";
        this.API_URL = "https://celx-dev.herokuapp.com";
    }
    AppService.prototype.getCategories = function () {
        return this.http.get(this.url + 'categories.json');
    };
    AppService.prototype.getProducts = function (userid, web, mycurrency) {
        if (localStorage.getItem('userid') != null && localStorage.getItem('userid') != undefined && localStorage.getItem('userid') != '') {
            return this.http.post(this.API_URL + '/searchFilter', { user_id: localStorage.getItem('userid'), web: web, currency: mycurrency });
        }
        else {
            return this.http.post(this.API_URL + '/searchFilter', { web: web });
        }
    };
    AppService.prototype.getFilters = function (categoryArray, priceFrom_1, priceTo_1, selectedcolor, selectedstorage, conditionsarray, brandsArray, userid) {
        console.log(categoryArray, priceFrom_1, priceTo_1, selectedcolor, selectedstorage, conditionsarray, brandsArray, localStorage.getItem('userid'));
        return this.http.post(this.API_URL + '/searchFilter', { priceStart: priceFrom_1, priceEnd: priceTo_1, color: selectedcolor, storage: selectedstorage, brandName: brandsArray, user_id: localStorage.getItem('userid') });
    };
    // public dheaders()
    // {
    //   let headers= new HttpHeaders();
    //   headers.append({Authorization:localStorage.getItem('jwt')});
    // }
    AppService.prototype.createAuthorizationHeader = function (headers) {
        headers.append('Authorization', localStorage.getItem('jwt'));
        console.log(headers);
    };
    AppService.prototype.getenums = function () {
        return this.http.post(this.API_URL + '/getEnums', {});
    };
    AppService.prototype.getProductById = function (id) {
        if (localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != undefined && localStorage.getItem('jwt') != '') {
            var httpOptions = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') })
            };
            console.log(httpOptions);
            console.log("authencticated");
            return this.http.post(this.API_URL + '/api/getAdvertisementDetails', { advert_id: id }, httpOptions);
        }
        else {
            console.log("un-authencticated");
            return this.http.post(this.API_URL + '/getAdvertismentDetatils', { advert_id: id });
        }
    };
    AppService.prototype.getmobiles = function (brand_id) {
        console.log(brand_id);
        return this.http.post(this.API_URL + '/getMobileSpecs', { brand_id: brand_id });
    };
    AppService.prototype.addAccessories = function () {
        var httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') })
        };
        console.log(httpOptions);
        return this.http.post(this.API_URL + '/api/getAllPhysicalIssues/accessories', {}, httpOptions);
    };
    AppService.prototype.addissues = function () {
        var httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') })
        };
        console.log(httpOptions);
        return this.http.post(this.API_URL + '/api/getAllPhysicalIssues/issues', {}, httpOptions);
    };
    AppService.prototype.phoneswitch = function () {
        var httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') })
        };
        console.log(httpOptions);
        return this.http.post(this.API_URL + '/api/phoneSwitchOn', {}, httpOptions);
    };
    AppService.prototype.createbrand = function (newbrand) {
        console.log(newbrand);
        var httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') })
        };
        return this.http.post(this.API_URL + '/api/createMobileBrand', { brandName: newbrand }, httpOptions);
    };
    AppService.prototype.getbrand = function () {
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        // var head = {
        //   Authorization:localStorage.getItem('jwt');
        // };
        console.log(httpOptions);
        //this.createAuthorizationHeader(headers);
        return this.http.post(this.API_URL + '/getMobileBrands', {});
        //return this.http.post(this.API_URL + '/api/getMobileBrands', {header:headers});
        //console.log("in API");
    };
    AppService.prototype.upload_images = function (file, id) {
        var fd = new FormData();
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'multipart/form-data', 'enctype': 'multipart/form-data', 'Authorization': localStorage.getItem('jwt') }) };
        console.log("services", file);
        return this.http.post(this.API_URL + '/api/uploadImage/' + id, { userFile: file, _id: id }, httpOptions);
    };
    AppService.prototype.uploadImage = function (file, id) {
        var fd = new FormData();
        fd.append('userFile', file, file.name);
        var aid = new FormData();
        aid.append('_id', id);
        console.log("services img", file, id);
        console.log(fd);
        console.log(aid);
        return this.http.post(this.API_URL + '/uploadImageWeb/' + id, fd);
    };
    AppService.prototype.phone_condition = function () {
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        console.log(httpOptions);
        return this.http.post(this.API_URL + '/api/getAllConditions', {}, httpOptions);
    };
    AppService.prototype.phoneCondition = function () {
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        console.log(httpOptions);
        return this.http.post(this.API_URL + '/api/addCondition', {}, httpOptions);
    };
    AppService.prototype.placeAdd = function (title_1, category_1, brand_1, mobile_1, price_1, description_1, color_1, store_1, imei, switchonoff, condition_1, ag_1, accessoriesArray, issuesArray) {
        console.log("in service : ", accessoriesArray);
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        console.log(httpOptions);
        return this.http.post(this.API_URL + '/api/placeAddWeb', { title: title_1, type: category_1, brandName: brand_1.brandName, deviceDetails: mobile_1, price: parseFloat(price_1), description: description_1, color: color_1, storage: store_1, IMEI: imei, phoneDead: switchonoff, condition: condition_1, age: ag_1, accessories: accessoriesArray, physicalIssues: issuesArray }, httpOptions);
    };
    AppService.prototype.verify_add = function (advert_id) {
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        console.log(httpOptions);
        return this.http.post(this.API_URL + '/api/verifyTrue', { advert_id: advert_id }, httpOptions);
    };
    AppService.prototype.advertlocation = function (advert_id, latitude, longitude) {
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        console.log(httpOptions);
        return this.http.post(this.API_URL + '/api/updateAddLocation', { advert_id: advert_id, lat: latitude, lng: longitude }, httpOptions);
    };
    AppService.prototype.makeoffer = function (advertid, make_offer) {
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        return this.http.post(this.API_URL + '/api/makeOffer', { advert_id: advertid, price: make_offer }, httpOptions);
    };
    AppService.prototype.report = function (advertid, report_type) {
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        return this.http.post(this.API_URL + '/api/report', { advert_id: advertid, type: report_type }, httpOptions);
    };
    AppService.prototype.myadds = function () {
        console.log("in ap service");
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        console.log("after request");
        return this.http.post(this.API_URL + '/api/myAdds', {}, httpOptions);
    };
    AppService.prototype.myPurchases = function () {
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        console.log("after request");
        return this.http.post(this.API_URL + '/api/myPurchases', {}, httpOptions);
    };
    AppService.prototype.updateUser = function (new_name, curr_lowercase) {
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        console.log("after request");
        return this.http.post(this.API_URL + '/api/updateUser', { name: new_name, currency: curr_lowercase }, httpOptions);
    };
    AppService.prototype.updateUserinregister = function (mobile_number, smsVerification) {
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwtr') }) };
        console.log("after request");
        return this.http.post(this.API_URL + '/api/updateUser', { mobile: mobile_number, smsVerification: smsVerification }, httpOptions);
    };
    AppService.prototype.changepassword = function (old_pass, new_pass) {
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        console.log("after request");
        return this.http.post(this.API_URL + '/api/changePassword', { oldPassword: old_pass, newPassword: new_pass }, httpOptions);
    };
    AppService.prototype.uploaduserimage = function (file, id) {
        var fd = new FormData();
        fd.append('userFile', file, file.name);
        var aid = new FormData();
        aid.append('_id', id);
        console.log("services img", file, id);
        console.log(fd);
        console.log(aid);
        return this.http.post(this.API_URL + '/uploadUserImageWeb/' + id, fd);
    };
    AppService.prototype.getUserDetails = function () {
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        console.log("after request");
        return this.http.post(this.API_URL + '/api/getUserDetails', {}, httpOptions);
    };
    AppService.prototype.getAllChats = function () {
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        console.log("after request");
        return this.http.post(this.API_URL + '/api/getAllChats', {}, httpOptions);
    };
    AppService.prototype.getAllMessages = function (myuserid, chathisid, chatadvertid) {
        console.log(myuserid, chathisid, chatadvertid);
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        console.log("after request");
        return this.http.post(this.API_URL + '/api/getAllMessages', { myId: myuserid, hisId: chathisid, advert_id: chatadvertid }, httpOptions);
    };
    AppService.prototype.myaddsoffers = function () {
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        return this.http.post(this.API_URL + '/api/getMyAddsOffers', {}, httpOptions);
    };
    AppService.prototype.offersbyme = function () {
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        return this.http.post(this.API_URL + '/api/getAllOffersCreatedBySelf', {}, httpOptions);
    };
    AppService.prototype.adverthistory = function () {
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        return this.http.post(this.API_URL + '/api/advertisementHistory', {}, httpOptions);
    };
    AppService.prototype.favouriteadds = function () {
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        return this.http.post(this.API_URL + '/api/getFavouriteAdds', {}, httpOptions);
    };
    AppService.prototype.boostad = function (boostmyad, boosttrue) {
        console.log(boostmyad, boosttrue);
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        return this.http.post(this.API_URL + '/api/boostAdverisement', { advert_id: boostmyad, boost: boosttrue }, httpOptions);
    };
    AppService.prototype.enabledisable = function (disid) {
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        return this.http.post(this.API_URL + '/api/enableDisableAdd', { advert_id: disid }, httpOptions);
    };
    AppService.prototype.updateoffer = function (offeridnew, price) {
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        return this.http.post(this.API_URL + '/api/updateOfferCreatedBySelf', { offer_id: offeridnew, offered_price: price }, httpOptions);
    };
    AppService.prototype.updateofferchat = function (matchedofferid, updateprice) {
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        return this.http.post(this.API_URL + '/api/updateOfferCreatedBySelf', { offer_id: matchedofferid, offered_price: updateprice }, httpOptions);
    };
    AppService.prototype.counterofferchat = function (chatadvertid, chathisid, updateprice) {
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        return this.http.post(this.API_URL + '/api/createCounterOffer', { advert_id: chatadvertid, user_id: chathisid, price: updateprice }, httpOptions);
    };
    AppService.prototype.accept = function (offerid, tick) {
        console.log(tick);
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        return this.http.post(this.API_URL + '/api/acceptRejectOffer', { offer_id: offerid, status: tick }, httpOptions);
        //console.log(data);
    };
    AppService.prototype.reject = function (offerid, cross) {
        console.log(cross);
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        return this.http.post(this.API_URL + '/api/acceptRejectOffer', { offer_id: offerid, status: cross }, httpOptions);
        //console.log(data);
    };
    AppService.prototype.getsale = function (saleIdseller) {
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        return this.http.post(this.API_URL + '/api/getSail', { sail_id: saleIdseller }, httpOptions);
    };
    AppService.prototype.getsaleseller = function (sellersaleid) {
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        return this.http.post(this.API_URL + '/api/getSail', { sail_id: sellersaleid }, httpOptions);
    };
    AppService.prototype.enteraddress = function (saleid, address) {
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        return this.http.post(this.API_URL + '/api/enterAddress', { sail_id: saleid, address: address }, httpOptions);
    };
    // public getusercards()
    // {
    //   const httpOptions=
    //   { headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
    //   return this.http.post(this.API_URL + '/api/makePaymentWithCard', {advert_id:advertid,amount:amount,currency:currency,card_id:cardid}, httpOptions);
    // }
    AppService.prototype.retreiveCustomerCards = function () {
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        return this.http.post(this.API_URL + '/api/retreiveCustomerCards', {}, httpOptions);
    };
    AppService.prototype.deletecard = function (card_id, stripeID) {
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        return this.http.post(this.API_URL + '/api/deleteCard', { card_id: card_id, stript_id: stripeID }, httpOptions);
    };
    AppService.prototype.add_card = function (ExpiryMonth, ExpiryYear, Country, addresscountry, addresszip, cardNumber, csv) {
        console.log(ExpiryMonth, ExpiryYear, Country, addresscountry, addresszip, cardNumber, csv);
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        return this.http.post(this.API_URL + '/api/addUserCard', { exp_month: ExpiryMonth, exp_year: ExpiryYear, country: Country, address_country: addresscountry, address_zip: addresszip, number: cardNumber, csv: csv }, httpOptions);
    };
    AppService.prototype.makePaymentWithCard = function (adverts, Amount, curr_lowercase, Card) {
        console.log(adverts, Amount, curr_lowercase, Card);
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        return this.http.post(this.API_URL + '/api/makePaymentWithCard', { advert_id: adverts, amount: Amount, currency: curr_lowercase, card_id: Card }, httpOptions);
    };
    AppService.prototype.addcourierinfo = function (sellersaleid, courier, track) {
        console.log(sellersaleid, courier, track);
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        return this.http.post(this.API_URL + '/api/addCourierInfo', { sail_id: sellersaleid, courierServiceName: courier, tracking_id: track }, httpOptions);
    };
    AppService.prototype.confirmdelivery = function (saleid, confirmstatus) {
        console.log(saleid, confirmstatus);
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        return this.http.post(this.API_URL + '/api/courierReceived', { sail_id: saleid, status: confirmstatus }, httpOptions);
    };
    // public addtofavourites(advertid,add)
    // {
    // const httpOptions=
    // { headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
    // return this.http.post(this.API_URL + '/api/addFavouriteAdds', {advert_id:advertid,add:add}, httpOptions);
    // }
    // public removefavourites(advertid,remove)
    // {
    // const httpOptions=
    // { headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('jwt')})};
    // return this.http.post(this.API_URL + '/api/addFavouriteAdds', {advert_id:advertid,add:remove}, httpOptions);
    // }
    AppService.prototype.getallpackages = function () {
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        return this.http.post(this.API_URL + '/api/getAllPackages', {}, httpOptions);
    };
    AppService.prototype.addtofavourites = function (advertid, add) {
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        return this.http.post(this.API_URL + '/api/addFavouriteAdds', { advert_id: advertid, add: add }, httpOptions);
    };
    AppService.prototype.removefavourites = function (advertid, remove) {
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        return this.http.post(this.API_URL + '/api/addFavouriteAdds', { advert_id: advertid, add: remove }, httpOptions);
    };
    AppService.prototype.updateUserPackage = function (package_id) {
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        return this.http.post(this.API_URL + '/api/updateUserPackage', { package_id: package_id }, httpOptions);
    };
    AppService.prototype.removeMyCreatedOffer = function (offeradvertid, offeridnew) {
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt') }) };
        return this.http.post(this.API_URL + '/api/removeMyCreatedOffer', { advert_id: offeradvertid, offer_id: offeridnew }, httpOptions);
    };
    AppService.prototype.getBanners = function () {
        return this.http.get(this.url + 'banners.json');
    };
    AppService.prototype.login1 = function (email, password) {
        console.log("in login");
        return this.http.post(this.API_URL + '/authenticate', { email: email, password: password });
    };
    AppService.prototype.register1 = function (name, email1, password) {
        console.log("in services", name, email1, password);
        return this.http.post(this.API_URL + '/register', { name: name, email: email1, password: password });
    };
    AppService.prototype.checkmobile = function (mobile_number) {
        var httpOptions = { headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwtr') }) };
        return this.http.post(this.API_URL + '/api/checkMobile', { mobile: mobile_number }, httpOptions);
    };
    AppService.prototype.getLoggedIn = function () {
        console.log("in services component");
        //         return this.http.post(`${this.API_URL}/authenticate/`,JSON.stringify({email:"mohsin1111@gmail.com",password:"qwertyui"}),{});
        return this.http.post(this.API_URL + '/searchMobile', {}, {});
    };
    AppService.prototype.addToCompare = function (product) {
        var message, status;
        if (this.Data.compareList.filter(function (item) { return item.id == product.id; })[0]) {
            message = 'The product ' + product.name + ' already added to comparison list.';
            status = 'error';
        }
        else {
            this.Data.compareList.push(product);
            message = 'The product ' + product.name + ' has been added to comparison list.';
            status = 'success';
        }
        this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    };
    AppService.prototype.addToWishList = function (product) {
        var message, status;
        if (this.Data.wishList.filter(function (item) { return item.id == product.id; })[0]) {
            message = 'The product ' + product.name + ' already added to wish list.';
            status = 'error';
        }
        else {
            this.Data.wishList.push(product);
            message = 'The Item ' + ' has been added to Favourites.';
            status = 'success';
        }
        this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    };
    AppService.prototype.addToCart = function (product) {
        var _this = this;
        var message, status;
        if (this.Data.cartList.filter(function (item) { return item.id == product.id; })[0]) {
            message = 'The product ' + product.name + ' already added to cart.';
            status = 'error';
        }
        else {
            this.Data.totalPrice = null;
            this.Data.cartList.push(product);
            this.Data.cartList.forEach(function (product) {
                _this.Data.totalPrice = _this.Data.totalPrice + product.newPrice;
            });
            message = 'The product ' + product.name + ' has been added to cart.';
            status = 'success';
        }
        this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    };
    AppService.prototype.getBrands = function () {
        return [
            { name: 'aloha', image: 'assets/images/brands/aloha.png' },
            { name: 'dream', image: 'assets/images/brands/dream.png' },
            { name: 'congrats', image: 'assets/images/brands/congrats.png' },
            { name: 'best', image: 'assets/images/brands/best.png' },
            { name: 'original', image: 'assets/images/brands/original.png' },
            { name: 'retro', image: 'assets/images/brands/retro.png' },
            { name: 'king', image: 'assets/images/brands/king.png' },
            { name: 'love', image: 'assets/images/brands/love.png' },
            { name: 'the', image: 'assets/images/brands/the.png' },
            { name: 'easter', image: 'assets/images/brands/easter.png' },
            { name: 'with', image: 'assets/images/brands/with.png' },
            { name: 'special', image: 'assets/images/brands/special.png' },
            { name: 'bravo', image: 'assets/images/brands/bravo.png' }
        ];
    };
    AppService.prototype.getCountries = function () {
        return [
            { name: 'Afghanistan', code: 'AF' },
            { name: 'Aland Islands', code: 'AX' },
            { name: 'Albania', code: 'AL' },
            { name: 'Algeria', code: 'DZ' },
            { name: 'American Samoa', code: 'AS' },
            { name: 'AndorrA', code: 'AD' },
            { name: 'Angola', code: 'AO' },
            { name: 'Anguilla', code: 'AI' },
            { name: 'Antarctica', code: 'AQ' },
            { name: 'Antigua and Barbuda', code: 'AG' },
            { name: 'Argentina', code: 'AR' },
            { name: 'Armenia', code: 'AM' },
            { name: 'Aruba', code: 'AW' },
            { name: 'Australia', code: 'AU' },
            { name: 'Austria', code: 'AT' },
            { name: 'Azerbaijan', code: 'AZ' },
            { name: 'Bahamas', code: 'BS' },
            { name: 'Bahrain', code: 'BH' },
            { name: 'Bangladesh', code: 'BD' },
            { name: 'Barbados', code: 'BB' },
            { name: 'Belarus', code: 'BY' },
            { name: 'Belgium', code: 'BE' },
            { name: 'Belize', code: 'BZ' },
            { name: 'Benin', code: 'BJ' },
            { name: 'Bermuda', code: 'BM' },
            { name: 'Bhutan', code: 'BT' },
            { name: 'Bolivia', code: 'BO' },
            { name: 'Bosnia and Herzegovina', code: 'BA' },
            { name: 'Botswana', code: 'BW' },
            { name: 'Bouvet Island', code: 'BV' },
            { name: 'Brazil', code: 'BR' },
            { name: 'British Indian Ocean Territory', code: 'IO' },
            { name: 'Brunei Darussalam', code: 'BN' },
            { name: 'Bulgaria', code: 'BG' },
            { name: 'Burkina Faso', code: 'BF' },
            { name: 'Burundi', code: 'BI' },
            { name: 'Cambodia', code: 'KH' },
            { name: 'Cameroon', code: 'CM' },
            { name: 'Canada', code: 'CA' },
            { name: 'Cape Verde', code: 'CV' },
            { name: 'Cayman Islands', code: 'KY' },
            { name: 'Central African Republic', code: 'CF' },
            { name: 'Chad', code: 'TD' },
            { name: 'Chile', code: 'CL' },
            { name: 'China', code: 'CN' },
            { name: 'Christmas Island', code: 'CX' },
            { name: 'Cocos (Keeling) Islands', code: 'CC' },
            { name: 'Colombia', code: 'CO' },
            { name: 'Comoros', code: 'KM' },
            { name: 'Congo', code: 'CG' },
            { name: 'Congo, The Democratic Republic of the', code: 'CD' },
            { name: 'Cook Islands', code: 'CK' },
            { name: 'Costa Rica', code: 'CR' },
            { name: 'Cote D\'Ivoire', code: 'CI' },
            { name: 'Croatia', code: 'HR' },
            { name: 'Cuba', code: 'CU' },
            { name: 'Cyprus', code: 'CY' },
            { name: 'Czech Republic', code: 'CZ' },
            { name: 'Denmark', code: 'DK' },
            { name: 'Djibouti', code: 'DJ' },
            { name: 'Dominica', code: 'DM' },
            { name: 'Dominican Republic', code: 'DO' },
            { name: 'Ecuador', code: 'EC' },
            { name: 'Egypt', code: 'EG' },
            { name: 'El Salvador', code: 'SV' },
            { name: 'Equatorial Guinea', code: 'GQ' },
            { name: 'Eritrea', code: 'ER' },
            { name: 'Estonia', code: 'EE' },
            { name: 'Ethiopia', code: 'ET' },
            { name: 'Falkland Islands (Malvinas)', code: 'FK' },
            { name: 'Faroe Islands', code: 'FO' },
            { name: 'Fiji', code: 'FJ' },
            { name: 'Finland', code: 'FI' },
            { name: 'France', code: 'FR' },
            { name: 'French Guiana', code: 'GF' },
            { name: 'French Polynesia', code: 'PF' },
            { name: 'French Southern Territories', code: 'TF' },
            { name: 'Gabon', code: 'GA' },
            { name: 'Gambia', code: 'GM' },
            { name: 'Georgia', code: 'GE' },
            { name: 'Germany', code: 'DE' },
            { name: 'Ghana', code: 'GH' },
            { name: 'Gibraltar', code: 'GI' },
            { name: 'Greece', code: 'GR' },
            { name: 'Greenland', code: 'GL' },
            { name: 'Grenada', code: 'GD' },
            { name: 'Guadeloupe', code: 'GP' },
            { name: 'Guam', code: 'GU' },
            { name: 'Guatemala', code: 'GT' },
            { name: 'Guernsey', code: 'GG' },
            { name: 'Guinea', code: 'GN' },
            { name: 'Guinea-Bissau', code: 'GW' },
            { name: 'Guyana', code: 'GY' },
            { name: 'Haiti', code: 'HT' },
            { name: 'Heard Island and Mcdonald Islands', code: 'HM' },
            { name: 'Holy See (Vatican City State)', code: 'VA' },
            { name: 'Honduras', code: 'HN' },
            { name: 'Hong Kong', code: 'HK' },
            { name: 'Hungary', code: 'HU' },
            { name: 'Iceland', code: 'IS' },
            { name: 'India', code: 'IN' },
            { name: 'Indonesia', code: 'ID' },
            { name: 'Iran, Islamic Republic Of', code: 'IR' },
            { name: 'Iraq', code: 'IQ' },
            { name: 'Ireland', code: 'IE' },
            { name: 'Isle of Man', code: 'IM' },
            { name: 'Israel', code: 'IL' },
            { name: 'Italy', code: 'IT' },
            { name: 'Jamaica', code: 'JM' },
            { name: 'Japan', code: 'JP' },
            { name: 'Jersey', code: 'JE' },
            { name: 'Jordan', code: 'JO' },
            { name: 'Kazakhstan', code: 'KZ' },
            { name: 'Kenya', code: 'KE' },
            { name: 'Kiribati', code: 'KI' },
            { name: 'Korea, Democratic People\'S Republic of', code: 'KP' },
            { name: 'Korea, Republic of', code: 'KR' },
            { name: 'Kuwait', code: 'KW' },
            { name: 'Kyrgyzstan', code: 'KG' },
            { name: 'Lao People\'S Democratic Republic', code: 'LA' },
            { name: 'Latvia', code: 'LV' },
            { name: 'Lebanon', code: 'LB' },
            { name: 'Lesotho', code: 'LS' },
            { name: 'Liberia', code: 'LR' },
            { name: 'Libyan Arab Jamahiriya', code: 'LY' },
            { name: 'Liechtenstein', code: 'LI' },
            { name: 'Lithuania', code: 'LT' },
            { name: 'Luxembourg', code: 'LU' },
            { name: 'Macao', code: 'MO' },
            { name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' },
            { name: 'Madagascar', code: 'MG' },
            { name: 'Malawi', code: 'MW' },
            { name: 'Malaysia', code: 'MY' },
            { name: 'Maldives', code: 'MV' },
            { name: 'Mali', code: 'ML' },
            { name: 'Malta', code: 'MT' },
            { name: 'Marshall Islands', code: 'MH' },
            { name: 'Martinique', code: 'MQ' },
            { name: 'Mauritania', code: 'MR' },
            { name: 'Mauritius', code: 'MU' },
            { name: 'Mayotte', code: 'YT' },
            { name: 'Mexico', code: 'MX' },
            { name: 'Micronesia, Federated States of', code: 'FM' },
            { name: 'Moldova, Republic of', code: 'MD' },
            { name: 'Monaco', code: 'MC' },
            { name: 'Mongolia', code: 'MN' },
            { name: 'Montserrat', code: 'MS' },
            { name: 'Morocco', code: 'MA' },
            { name: 'Mozambique', code: 'MZ' },
            { name: 'Myanmar', code: 'MM' },
            { name: 'Namibia', code: 'NA' },
            { name: 'Nauru', code: 'NR' },
            { name: 'Nepal', code: 'NP' },
            { name: 'Netherlands', code: 'NL' },
            { name: 'Netherlands Antilles', code: 'AN' },
            { name: 'New Caledonia', code: 'NC' },
            { name: 'New Zealand', code: 'NZ' },
            { name: 'Nicaragua', code: 'NI' },
            { name: 'Niger', code: 'NE' },
            { name: 'Nigeria', code: 'NG' },
            { name: 'Niue', code: 'NU' },
            { name: 'Norfolk Island', code: 'NF' },
            { name: 'Northern Mariana Islands', code: 'MP' },
            { name: 'Norway', code: 'NO' },
            { name: 'Oman', code: 'OM' },
            { name: 'Pakistan', code: 'PK' },
            { name: 'Palau', code: 'PW' },
            { name: 'Palestinian Territory, Occupied', code: 'PS' },
            { name: 'Panama', code: 'PA' },
            { name: 'Papua New Guinea', code: 'PG' },
            { name: 'Paraguay', code: 'PY' },
            { name: 'Peru', code: 'PE' },
            { name: 'Philippines', code: 'PH' },
            { name: 'Pitcairn', code: 'PN' },
            { name: 'Poland', code: 'PL' },
            { name: 'Portugal', code: 'PT' },
            { name: 'Puerto Rico', code: 'PR' },
            { name: 'Qatar', code: 'QA' },
            { name: 'Reunion', code: 'RE' },
            { name: 'Romania', code: 'RO' },
            { name: 'Russian Federation', code: 'RU' },
            { name: 'RWANDA', code: 'RW' },
            { name: 'Saint Helena', code: 'SH' },
            { name: 'Saint Kitts and Nevis', code: 'KN' },
            { name: 'Saint Lucia', code: 'LC' },
            { name: 'Saint Pierre and Miquelon', code: 'PM' },
            { name: 'Saint Vincent and the Grenadines', code: 'VC' },
            { name: 'Samoa', code: 'WS' },
            { name: 'San Marino', code: 'SM' },
            { name: 'Sao Tome and Principe', code: 'ST' },
            { name: 'Saudi Arabia', code: 'SA' },
            { name: 'Senegal', code: 'SN' },
            { name: 'Serbia and Montenegro', code: 'CS' },
            { name: 'Seychelles', code: 'SC' },
            { name: 'Sierra Leone', code: 'SL' },
            { name: 'Singapore', code: 'SG' },
            { name: 'Slovakia', code: 'SK' },
            { name: 'Slovenia', code: 'SI' },
            { name: 'Solomon Islands', code: 'SB' },
            { name: 'Somalia', code: 'SO' },
            { name: 'South Africa', code: 'ZA' },
            { name: 'South Georgia and the South Sandwich Islands', code: 'GS' },
            { name: 'Spain', code: 'ES' },
            { name: 'Sri Lanka', code: 'LK' },
            { name: 'Sudan', code: 'SD' },
            { name: 'Suriname', code: 'SR' },
            { name: 'Svalbard and Jan Mayen', code: 'SJ' },
            { name: 'Swaziland', code: 'SZ' },
            { name: 'Sweden', code: 'SE' },
            { name: 'Switzerland', code: 'CH' },
            { name: 'Syrian Arab Republic', code: 'SY' },
            { name: 'Taiwan, Province of China', code: 'TW' },
            { name: 'Tajikistan', code: 'TJ' },
            { name: 'Tanzania, United Republic of', code: 'TZ' },
            { name: 'Thailand', code: 'TH' },
            { name: 'Timor-Leste', code: 'TL' },
            { name: 'Togo', code: 'TG' },
            { name: 'Tokelau', code: 'TK' },
            { name: 'Tonga', code: 'TO' },
            { name: 'Trinidad and Tobago', code: 'TT' },
            { name: 'Tunisia', code: 'TN' },
            { name: 'Turkey', code: 'TR' },
            { name: 'Turkmenistan', code: 'TM' },
            { name: 'Turks and Caicos Islands', code: 'TC' },
            { name: 'Tuvalu', code: 'TV' },
            { name: 'Uganda', code: 'UG' },
            { name: 'Ukraine', code: 'UA' },
            { name: 'United Arab Emirates', code: 'AE' },
            { name: 'United Kingdom', code: 'GB' },
            { name: 'United States', code: 'US' },
            { name: 'United States Minor Outlying Islands', code: 'UM' },
            { name: 'Uruguay', code: 'UY' },
            { name: 'Uzbekistan', code: 'UZ' },
            { name: 'Vanuatu', code: 'VU' },
            { name: 'Venezuela', code: 'VE' },
            { name: 'Viet Nam', code: 'VN' },
            { name: 'Virgin Islands, British', code: 'VG' },
            { name: 'Virgin Islands, U.S.', code: 'VI' },
            { name: 'Wallis and Futuna', code: 'WF' },
            { name: 'Western Sahara', code: 'EH' },
            { name: 'Yemen', code: 'YE' },
            { name: 'Zambia', code: 'ZM' },
            { name: 'Zimbabwe', code: 'ZW' }
        ];
    };
    AppService.prototype.getMonths = function () {
        return [
            { value: '01', name: 'January' },
            { value: '02', name: 'February' },
            { value: '03', name: 'March' },
            { value: '04', name: 'April' },
            { value: '05', name: 'May' },
            { value: '06', name: 'June' },
            { value: '07', name: 'July' },
            { value: '08', name: 'August' },
            { value: '09', name: 'September' },
            { value: '10', name: 'October' },
            { value: '11', name: 'November' },
            { value: '12', name: 'December' }
        ];
    };
    AppService.prototype.getYears = function () {
        return [
            { value: '18', name: '2018' },
            { value: '19', name: '2019' },
            { value: '20', name: '2020' },
            { value: '21', name: '2021' },
            { value: '22', name: '2022' },
            { value: '23', name: '2023' },
            { value: '24', name: '2024' },
            { value: '25', name: '2025' },
            { value: '26', name: '2026' },
            { value: '27', name: '2027' },
            { value: '28', name: '2028' },
            { value: '29', name: '2029' },
            { value: '30', name: '2030' }
        ];
    };
    AppService.prototype.getDeliveryMethods = function () {
        return [
            { value: 'free', name: 'Free Delivery', desc: '$0.00 / Delivery in 7 to 14 business Days' },
            { value: 'standard', name: 'Standard Delivery', desc: '$7.99 / Delivery in 5 to 7 business Days' },
            { value: 'express', name: 'Express Delivery', desc: '$29.99 / Delivery in 1 business Days' }
        ];
    };
    AppService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSnackBar"]])
    ], AppService);
    return AppService;
}());



/***/ }),

/***/ "./src/app/app.settings.ts":
/*!*********************************!*\
  !*** ./src/app/app.settings.ts ***!
  \*********************************/
/*! exports provided: Settings, AppSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Settings", function() { return Settings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppSettings", function() { return AppSettings; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var Settings = /** @class */ (function () {
    function Settings(name, theme) {
        this.name = name;
        this.theme = theme;
    }
    return Settings;
}());

var AppSettings = /** @class */ (function () {
    function AppSettings() {
        this.settings = new Settings('CelX', // theme name
        'grey' // green, blue, red, pink, purple, grey
        );
    }
    AppSettings = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], AppSettings);
    return AppSettings;
}());



/***/ }),

/***/ "./src/app/chat.service.ts":
/*!*********************************!*\
  !*** ./src/app/chat.service.ts ***!
  \*********************************/
/*! exports provided: ChatService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatService", function() { return ChatService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_Observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/Observable */ "./node_modules/rxjs-compat/_esm5/Observable.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_2__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ChatService = /** @class */ (function () {
    function ChatService() {
        this.url = 'https://celx-dev.herokuapp.com';
    }
    ChatService.prototype.ngOnInit = function () {
        this.socketConnection();
    };
    ChatService.prototype.startchat = function (myuserid, chathisid, chatadvertid) {
        this.socket.emit('startchat', { myId: myuserid, hisId: chathisid, advert_id: chatadvertid });
        console.log("started");
    };
    ChatService.prototype.sendMessage = function (myuserid, chathisid, chatadvertid, chat_msg) {
        console.log("myid", myuserid, "hisid", chathisid, "advertid", chatadvertid, "chatmessage", chat_msg);
        this.socket.emit('room', { myId: myuserid, hisId: chathisid, advert_id: chatadvertid, text: chat_msg });
        // socket.emit('add-message', message);
    };
    ChatService.prototype.socketConnection = function () {
        console.log("******************" + localStorage.getItem('userid') + "****************");
        console.log("connecting");
        this.socket.on('connect', function () {
            console.log("+++++++++Conected+++++++");
            this.socket.emit('user', { user_id: localStorage.getItem('userid') });
        });
    };
    ChatService.prototype.getMessages = function () {
        var _this = this;
        var observable = new rxjs_Observable__WEBPACK_IMPORTED_MODULE_1__["Observable"](function (observer) {
            _this.socket = socket_io_client__WEBPACK_IMPORTED_MODULE_2__(_this.url);
            _this.socket.on('room', function (data) {
                observer.next(data.chat);
                console.log(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        return observable;
    };
    ChatService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], ChatService);
    return ChatService;
}());



/***/ }),

/***/ "./src/app/map/map.component.html":
/*!****************************************!*\
  !*** ./src/app/map/map.component.html ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  map works!\n</p>\n"

/***/ }),

/***/ "./src/app/map/map.component.scss":
/*!****************************************!*\
  !*** ./src/app/map/map.component.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/map/map.component.ts":
/*!**************************************!*\
  !*** ./src/app/map/map.component.ts ***!
  \**************************************/
/*! exports provided: MapComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapComponent", function() { return MapComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MapComponent = /** @class */ (function () {
    function MapComponent() {
    }
    MapComponent.prototype.ngOnInit = function () {
    };
    MapComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-map',
            template: __webpack_require__(/*! ./map.component.html */ "./src/app/map/map.component.html"),
            styles: [__webpack_require__(/*! ./map.component.scss */ "./src/app/map/map.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], MapComponent);
    return MapComponent;
}());



/***/ }),

/***/ "./src/app/pages/accounts/accounts.component.html":
/*!********************************************************!*\
  !*** ./src/app/pages/accounts/accounts.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<mat-sidenav-container>\r\n\r\n<!-- <mat-sidenav [opened]=\"false\" mode=\"over\" #sidenav class=\"sidenav mat-elevation-z6\">\r\n    <button mat-icon-button color=\"warn\" class=\"close\" (click)=\"sidenav.close()\">\r\n       <mat-icon color=\"warn\">close</mat-icon>\r\n    </button>\r\n    <div class=\"divider\"></div>\r\n    <app-sidenav-menu [menuItems]=\"sidenavMenuItems\" [menuParentId]=\"0\"></app-sidenav-menu>\r\n    <div class=\"divider\"></div>\r\n    <div class=\"text-center py-2\">\r\n        <svg class=\"social-icon\" viewBox=\"0 0 24 24\">\r\n            <path d=\"M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M18,5H15.5A3.5,3.5 0 0,0 12,8.5V11H10V14H12V21H15V14H18V11H15V9A1,1 0 0,1 16,8H18V5Z\" />\r\n        </svg>\r\n        <svg class=\"social-icon\" viewBox=\"0 0 24 24\">\r\n            <path d=\"M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M17.71,9.33C18.19,8.93 18.75,8.45 19,7.92C18.59,8.13 18.1,8.26 17.56,8.33C18.06,7.97 18.47,7.5 18.68,6.86C18.16,7.14 17.63,7.38 16.97,7.5C15.42,5.63 11.71,7.15 12.37,9.95C9.76,9.79 8.17,8.61 6.85,7.16C6.1,8.38 6.75,10.23 7.64,10.74C7.18,10.71 6.83,10.57 6.5,10.41C6.54,11.95 7.39,12.69 8.58,13.09C8.22,13.16 7.82,13.18 7.44,13.12C7.81,14.19 8.58,14.86 9.9,15C9,15.76 7.34,16.29 6,16.08C7.15,16.81 8.46,17.39 10.28,17.31C14.69,17.11 17.64,13.95 17.71,9.33Z\" />\r\n        </svg>\r\n        <svg class=\"social-icon\" viewBox=\"0 0 24 24\">\r\n            <path d=\"M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M19.5,12H18V10.5H17V12H15.5V13H17V14.5H18V13H19.5V12M9.65,11.36V12.9H12.22C12.09,13.54 11.45,14.83 9.65,14.83C8.11,14.83 6.89,13.54 6.89,12C6.89,10.46 8.11,9.17 9.65,9.17C10.55,9.17 11.13,9.56 11.45,9.88L12.67,8.72C11.9,7.95 10.87,7.5 9.65,7.5C7.14,7.5 5.15,9.5 5.15,12C5.15,14.5 7.14,16.5 9.65,16.5C12.22,16.5 13.96,14.7 13.96,12.13C13.96,11.81 13.96,11.61 13.89,11.36H9.65Z\" />\r\n        </svg>\r\n    </div>\r\n</mat-sidenav> -->\r\n\r\n\r\n\r\n    <mat-toolbar-row fxLayoutAlign=\"space-between center\" class=\"top-toolbar theme-container\" style=\"background-color:#156dbf\">\r\n        <span fxHide=\"false\" fxHide.gt-sm>\r\n            <button mat-button (click)=\"sidenav.toggle()\" class=\"sidenav-toggle\">\r\n                <mat-icon>menu</mat-icon>\r\n            </button>\r\n        </span>\r\n        <span fxShow=\"false\" fxShow.gt-xs fxLayoutAlign=\"center center\">   </span>\r\n        <span fxShow=\"false\" fxShow.gt-sm></span>\r\n        <app-top-menu></app-top-menu>\r\n    </mat-toolbar-row>\r\n\r\n\r\n\r\n<router-outlet></router-outlet>\r\n\r\n\r\n<span class=\"new_price\" [hidden]=\"hid\">\r\n  <input type=\"number\" [(ngModel)]=\"price\">\r\n  <button (click)=\"submitPrice(price)\">Submit</button>\r\n  <button>Cancel</button>\r\n</span>\r\n<div class=\"form_div\">\r\n\r\n  <div class=\"inner_div\"  [hidden]=\"!hid\">\r\n\r\n\r\n<mat-tab-group class=\"tab_group\" >\r\n\r\n  <mat-tab label=\"My Advertisements\">\r\n\r\n    <div class=\"above_tab\">Ads You Have Posted Till Now </div>\r\n\t\t<div *ngFor=\"let myad of myadd\" class=\"adds_view\" >\r\n\t\t<a [routerLink]=\"['/products', myad._id, myad.title]\" class=\"title text-truncate\">\r\n      <span class=\"pics\"><img [src]=\"myad.pictures[0]\" class=\"pictures\"></span>\r\n        <span class=\"titl\">{{myad.title}}</span>\r\n\t\t</a>\r\n      <span class=\"price\">Rs. {{myad.price}}</span>\r\n\r\n    <span class=\"deactivate\">deactivate ad X </span>\r\n    <span class=\"edit\">edit  </span>\r\n    <span class=\"preview\" [routerLink]=\"['/products', myad._id, myad.title]\">  preview >>> </span>\r\n    <mat-icon class=\"msgs\">mail_outline</mat-icon>\r\n    <span class=\"created\">Ad Posted: {{myad.createdAt}}</span>\r\n      <mat-slide-toggle color=\"primary\" class=\"slide\" Default=\"true\" [(ngModel)]=\"myad._id\" name=\"sli\" ng-true-value = 'false'\r\n      ng-false-value='true' (ngModelChange)=\"slide_ad(myad._id)\"></mat-slide-toggle>\r\n    <img src=\"\\assets\\images\\boost.png\" class=\"boost\" (click)=\"boostad(myad._id)\"/>\r\n\t</div>\r\n</mat-tab>\r\n\t<mat-tab label=\"My Offers\">\r\n    <mat-horizontal-stepper [linear]=\"isLinear\" #horizontalstepper>\r\n    <mat-step>\r\n    <ng-template matStepLabel>Sent</ng-template>\r\n    <div *ngFor=\"let myoffer of myoffers\" class=\"adds_view\">\r\n      <img [src]=\"myoffer.advert_id.pictures[0]\" class=\"pictures\">\r\n        <span class=\"titl\">{{myoffer.advert_id.title}}</span>\r\n    <span class=\"price\" >Rs. {{myoffer.offered_price}}</span>\r\n\r\n\r\n\r\n    <span class=\"created\">Ad Posted: {{myoffer.advert_id.createdAt}}</span>\r\n    <span *ngIf=\"myoffer.status ==='accepted'\">\r\n      <button mat-raised-button ngDefaultControl class=\"acc_rjj\" [(ngModel)]=\"myoffer.sail_id\" [value]=\"myoffer.sail_id\"  (click)=\"afteraccepted(myoffer.sail_id)\">{{myoffer.status}}</button>\r\n    </span>\r\n    <span *ngIf=\"myoffer.status ==='pending'\">\r\n      <button mat-raised-button ngDefaultControl class=\"acc_rjj\" [(ngModel)]=\"myoffer.sail_id\" [value]=\"myoffer.sail_id\"  (click)=\"updateoffer(myoffer._id)\">{{Edit}}</button>\r\n    </span>\r\n  </div>\r\n  <span class=\"adds_view\">{{this.nooffers}}</span>\r\n  </mat-step>\r\n  <mat-step>\r\n    <ng-template matStepLabel>Received</ng-template>\r\n  <div *ngFor=\"let myaddoff of myaddoffers\" class=\"adds_view\" (click)=\"clickoff()\">\r\n    <a [routerLink]=\"['/offers']\" target=\"_blank\" class=\"title text-truncate\" >\r\n    <img [src]=\"myaddoff.pictures[0]\" class=\"pictures\">\r\n      <span class=\"titl\">{{myaddoff.title}}</span>\r\n    <span class=\"price\">Rs. {{myaddoff.offers[0].offered_price}}</span>\r\n    <!-- <span class=\"preview1\" [routerLink]=\"['/products', myaddoff._id, myaddoff.title]\">  preview >>> </span> -->\r\n    <span class=\"created\">Ad Posted: {{myaddoff.createdAt}}</span>\r\n  </a>\r\n    <!-- <mat-icon class=\"tick_cross1\" (click)=\"accept_reject(tick,myaddoff.offers[0]._id)\">check</mat-icon>\r\n    <mat-icon class=\"tick_cross\" (click)=\"accept_reject1(cross)\">clear</mat-icon> -->\r\n</div>\r\n<span class=\"adds_view\">{{this.nooffers}}</span>\r\n\r\n<div *ngFor=\"let myaccept of myaddaccepted\" class=\"adds_view\" (click)=\"clickoff()\">\r\n  <img [src]=\"myaccept.pictures[0]\" class=\"pictures\">\r\n    <span class=\"titl\">{{myaccept.title}}</span>\r\n  <span class=\"price\">Rs. {{myaccept.offers[0].offered_price}}</span>\r\n  <button mat-raised-button ngDefaultControl class=\"acc_rjj\" [(ngModel)]=\"myaccept.sail_id\" [value]=\"myaccept.offers[0].sail_id\" (click)=\"afteracceptedsell(myaccept.offers[0].sail_id)\">{{myaccept.offers[0].status}}</button>\r\n  <span class=\"created\">Ad Posted: {{myaccept.createdAt}}</span>\r\n</div>\r\n  </mat-step>\r\n  </mat-horizontal-stepper>\r\n\r\n</mat-tab>\r\n\t<mat-tab label=\"My Purchases\">\r\n\t\t<div *ngFor=\"let myoffer of myoffers\" class=\"adds_view\">\r\n\t\t<a [routerLink]=\"['/products', myoffer._id, myoffer.title]\" class=\"title text-truncate\">\r\n      <img [src]=\"myoffer.advert_id.pictures[0]\" class=\"pictures\">\r\n        <span class=\"titl\">{{myoffer.advert_id.title}}</span>\r\n\t\t</a>\r\n    <span class=\"price\">Rs. {{myoffer.offered_price}}</span>\r\n    <span class=\"created\">Ad Posted: {{myoffer.advert_id.createdAt}}</span>\r\n    <button mat-raised-button ngDefaultControl class=\"acc_rjj\" >{{myoffer.status}}</button>\r\n\r\n\r\n\t</div>\r\n</mat-tab>\r\n  <mat-tab label=\"Favourite Adds\"> Content 3\r\n\t\t<div *ngFor=\"let myfavourit of myfavourite\" class=\"adds_view\">\r\n\t\t<a [routerLink]=\"['/products', myfavourit._id, myfavourit.title]\" class=\"title text-truncate\">\r\n      <img [src]=\"myfavourit.pictures[0]\" class=\"pictures\">\r\n      \t<span class=\"titl\">{{myfavourit.title}}</span>\r\n\t\t</a>\r\n  <span class=\"price\">Rs. {{myfavourit.price}}</span>\r\n  <span class=\"created\">Ad Posted: {{myfavourit.createdAt}}</span>\r\n\t</div>\r\n</mat-tab>\r\n</mat-tab-group>\r\n</div>\r\n</div>\r\n\r\n\r\n<app-options></app-options>\r\n\r\n<!-- <app-footer></app-footer> -->\r\n\r\n<div *ngIf=\"showBackToTop\" fxLayout=\"row\" fxLayoutAlign=\"center center\" class=\"back-to-top transition\" (click)=\"scrollToTop()\">\r\n    <mat-icon>arrow_upward</mat-icon>\r\n</div>\r\n\r\n\r\n</mat-sidenav-container>\r\n"

/***/ }),

/***/ "./src/app/pages/accounts/accounts.component.scss":
/*!********************************************************!*\
  !*** ./src/app/pages/accounts/accounts.component.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".funky-show-hide.ng-hide-add {\n  -webkit-transform: rotateZ(0);\n          transform: rotateZ(0);\n  -webkit-transform-origin: right;\n          transform-origin: right;\n  transition: all 0.5s ease-in-out; }\n\n.funky-show-hide.ng-hide-add.ng-hide-add-active {\n  -webkit-transform: rotateZ(-135deg);\n          transform: rotateZ(-135deg); }\n\n.funky-show-hide.ng-hide-remove {\n  -webkit-transform: rotateY(90deg);\n          transform: rotateY(90deg);\n  -webkit-transform-origin: left;\n          transform-origin: left;\n  transition: all 0.5s ease; }\n\n.funky-show-hide.ng-hide-remove.ng-hide-remove-active {\n  -webkit-transform: rotateY(0);\n          transform: rotateY(0); }\n\n.check-element {\n  border: 1px solid black;\n  opacity: 1;\n  padding: 10px; }\n\n.form_div {\n  align-items: center;\n  margin: auto;\n  width: 80%;\n  background-color: white;\n  margin-bottom: 10%; }\n\n.new_price {\n  margin-left: 40%; }\n\n.inner_div {\n  margin: auto;\n  width: 90%; }\n\n.above_tab {\n  margin-top: 2%;\n  border-style: solid;\n  border-width: 1px;\n  border-color: #dedede; }\n\n.adds_view {\n  border-style: solid;\n  border-width: 1%;\n  border-color: #dedede;\n  margin-bottom: 10px; }\n\n.pictures {\n  height: 100px;\n  width: 10%;\n  padding: 1%;\n  overflow: hidden; }\n\n.titl {\n  font-size: 4vmin;\n  text-align: center;\n  color: #5a555e;\n  position: absolute;\n  left: 15%;\n  margin-top: 10px;\n  font-weight: bold; }\n\n.price {\n  font-size: 4vmin;\n  text-align: center;\n  color: black;\n  position: absolute;\n  left: 65%;\n  margin-top: 10px;\n  font-weight: bold; }\n\n.deactivate {\n  font-size: 2.5vmin;\n  position: absolute;\n  left: 15%;\n  margin-top: 40px;\n  color: #f41b23;\n  font-style: underline;\n  font-weight: 400;\n  text-decoration: underline; }\n\n.edit {\n  font-size: 2.5vmin;\n  position: absolute;\n  left: 35%;\n  margin-top: 40px;\n  color: black;\n  font-weight: 400;\n  text-decoration: underline; }\n\n.preview {\n  font-size: 2.5vmin;\n  position: absolute;\n  left: 42%;\n  margin-top: 40px;\n  color: #173b95;\n  font-weight: 400;\n  text-decoration: underline; }\n\n.preview1 {\n  font-size: 2.5vmin;\n  position: absolute;\n  left: 15%;\n  margin-top: 40px;\n  color: #173b95;\n  font-weight: 400;\n  text-decoration: underline; }\n\n.created {\n  font-size: 2.5vmin;\n  text-align: center;\n  color: #bfbdc1;\n  position: absolute;\n  left: 15%;\n  margin-top: 90px;\n  font-weight: bold; }\n\n.msgs {\n  position: absolute;\n  left: 90%;\n  font-size: 4vmin;\n  margin-top: 20px;\n  color: #173b95; }\n\n.boost {\n  height: 10%;\n  width: 10%;\n  float: right;\n  margin-top: 90px; }\n\n.slide {\n  position: absolute;\n  left: 80%;\n  font-size: 4vmin;\n  margin-top: 20px; }\n\n.acc_rjj {\n  height: 10%;\n  width: 10%;\n  float: right;\n  margin-top: 45px;\n  margin-right: 2%; }\n\n.tick_cross {\n  float: right;\n  margin-top: 45px;\n  margin-right: 2%;\n  background-color: #f41b23;\n  color: white; }\n\n.tick_cross1 {\n  float: right;\n  margin-top: 45px;\n  margin-right: 2%;\n  background-color: #173b95;\n  color: white; }\n\n.all-products {\n  min-height: 400px;\n  padding: 2px;\n  overflow: hidden; }\n\n.all-products.p-left {\n    padding-left: 16px; }\n\n.products-wrapper {\n  margin: 8px -8px; }\n\n.products-wrapper .col {\n    padding: 8px; }\n\n.review-order-table.mat-table {\n  display: block;\n  overflow-x: auto; }\n\n.review-order-table.mat-table .mat-row, .review-order-table.mat-table .mat-header-row {\n    display: flex;\n    border-bottom-width: 1px;\n    border-bottom-style: solid;\n    align-items: center;\n    min-height: 48px;\n    padding: 0 24px;\n    min-width: 760px; }\n\n.review-order-table.mat-table .mat-row {\n    min-height: 60px; }\n\n.review-order-table.mat-table .mat-cell, .review-order-table.mat-table .mat-header-cell {\n    flex: 1;\n    overflow: hidden;\n    word-wrap: break-word; }\n\n.review-order-table.mat-table .mat-header-cell {\n    font-size: 14px; }\n\n.review-order-table.mat-table .mat-cell img {\n    width: 60px; }\n"

/***/ }),

/***/ "./src/app/pages/accounts/accounts.component.ts":
/*!******************************************************!*\
  !*** ./src/app/pages/accounts/accounts.component.ts ***!
  \******************************************************/
/*! exports provided: AccountsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountsComponent", function() { return AccountsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app.service */ "./src/app/app.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';






//import { AccComponent } from './acc/acc.component';
var AccountsComponent = /** @class */ (function () {
    //items: Observable<any[]>;
    function AccountsComponent(appService, dialog, bottomSheet, router, snackBar) {
        this.appService = appService;
        this.dialog = dialog;
        this.bottomSheet = bottomSheet;
        this.router = router;
        this.snackBar = snackBar;
        this.title = 'JavaSampleApproach';
        this.description = 'Angular-Firebase Demo';
        this.itemValue = '';
        //  this.items = db.list('items').valueChanges();
        this.Edit = "Edit";
        this.hid = true;
    }
    // openDialog(): void {
    //   const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
    //     width: '250px',
    //     data: {name: this.name, animal: this.animal}
    //   });
    //
    //   dialogRef.afterClosed().subscribe(result => {
    //     console.log('The dialog was closed');
    //     this.animal = result;
    //   });
    // }
    AccountsComponent.prototype.ngOnInit = function () {
        this.showadds();
        this.myaddsoffers();
        this.myaddsoffersaccepted();
        this.offersbyme();
        this.favouriteadds();
        this.tick = ("accepted");
        this.cross = ("rejected");
        this.adverthistory();
        console.log("in on in it");
        //this.accept_reject();
    };
    // public openBottomSheet(): void {
    //   this.bottomSheet.open(AccComponent);
    // }
    AccountsComponent.prototype.showadds = function () {
        var _this = this;
        console.log("before service request");
        this.appService.myadds().subscribe(function (data) {
            console.log("my adds", data);
            _this.myadd = data['result'];
            _this.myad_id = data['result']['_id'];
            _this.mytitle = data['result']['title'];
            _this.myprice = data['result']['price'];
        });
    };
    AccountsComponent.prototype.myaddsoffers = function () {
        var _this = this;
        var count = 0;
        this.appService.myaddsoffers().subscribe(function (data) {
            var off = [];
            if (data['result']) {
                console.log("offers on my =>", data);
                for (var k = 0; k < data['result'].length; k++) {
                    //            off[k]  = data['result'][k]['offers'];
                    if (data['result'][k]['offers'].length > 0) {
                        var stat = false;
                        for (var m = 0; m < data['result'][k]['offers'].length; m++) {
                            console.log(data['result'][k]['offers'][m]['status']);
                            if (data['result'][k]['offers'][m]['status'] != 'pending') {
                                console.log(stat);
                                stat = true;
                            }
                            else {
                                console.log("else");
                                if (m == data['result'][k]['offers'].length - 1) {
                                    if (stat) {
                                        console.log("no");
                                    }
                                    else {
                                        console.log('yes');
                                        off[count] = data['result'][k];
                                        count = count + 1;
                                    }
                                }
                            }
                        }
                    }
                }
                _this.offerid = data['result']['offers'];
                //        off =data['result']['offers'];
                console.log("ff", off);
                _this.myaddoffers = off;
            }
        }, function (err) {
            _this.nooffers = ("Did Not Receive any offers Yet!");
            console.log("No offers exist");
        });
    };
    AccountsComponent.prototype.myaddsoffersaccepted = function () {
        var _this = this;
        var count = 0;
        this.appService.myaddsoffers().subscribe(function (data) {
            var off = [];
            if (data['result']) {
                console.log("offers on my =>", data);
                for (var k = 0; k < data['result'].length; k++) {
                    //            off[k]  = data['result'][k]['offers'];
                    if (data['result'][k]['offers'].length > 0) {
                        var stat = false;
                        for (var m = 0; m < data['result'][k]['offers'].length; m++) {
                            //console.log(data['result'][k]['offers'][m]['status'])
                            if (data['result'][k]['offers'][m]['status'] != 'accepted') {
                                //console.log(stat);
                                stat = true;
                            }
                            else {
                                //console.log("else");
                                if (m == data['result'][k]['offers'].length - 1) {
                                    if (stat) {
                                        //console.log("no")
                                    }
                                    else {
                                        //console.log('yes')
                                        off[count] = data['result'][k];
                                        count = count + 1;
                                    }
                                }
                            }
                        }
                    }
                }
                //this.offerid=data['result']['offers'];
                //        off =data['result']['offers'];
                console.log("ff", off);
                _this.myaddaccepted = off;
                //console.log(this.myaddoffers);
                //if(of != null && of != undefined && of != ''){
                //    this.myaddoffers=data['result'];
                //  }
                //   for(var d=0; d < off.length; d++){
                //   var new= off[d];
                //   console.log (new);
                // }
                // off.forEach((x)=>{
                //   console.log(x.status);
                // });
                //   console.log(this.offerid);
            }
        }, function (err) {
            _this.nooffers = ("Did Not Receive any offers Yet!");
            console.log("No offers exist");
        });
    };
    AccountsComponent.prototype.offersbyme = function () {
        var _this = this;
        this.appService.offersbyme().subscribe(function (data) {
            console.log("offers by self =>", data);
            _this.myoffers = data['result'];
            _this.myoffersstatus = data['result']['status'];
            _this.sale = data['result']['sail_id'];
            console.log(_this.sale);
            sessionStorage.setItem("onsale", JSON.stringify(_this.sale));
            //   if(data['result']['status'] = 'accepted'){
            //   this.appService.getsale(data['result']['sail_id']).subscribe(data=>{
            //     console.log("in sale",data);
            //   })
            // }
        });
    };
    // public getsale(){
    //   this.appService.getsale().subscribe(data=>{
    //
    // }
    AccountsComponent.prototype.favouriteadds = function () {
        this.appService.favouriteadds().subscribe(function (data) {
            console.log("favourit adds =>", data);
        });
    };
    AccountsComponent.prototype.accept_reject = function (tick, offerid) {
        console.log(offerid);
        this.appService.accept(offerid, this.tick).subscribe(function (data) {
            console.log("accept_reject adds =>", data);
            //this.myfavourite=data['result'];
        });
    };
    AccountsComponent.prototype.accept_reject1 = function (offerid, cross) {
        this.appService.reject(this.offerid, this.cross).subscribe(function (data) {
            console.log("accept_reject adds =>", data);
            //this.myfavourite=data['result'];
        });
    };
    AccountsComponent.prototype.clickoff = function () {
        //this.appService.myaddsof = this.myaddoffers;
        //console.log("saved: ",this.appService.myaddsof);
        sessionStorage.setItem("saved", JSON.stringify(this.myaddoffers));
    };
    AccountsComponent.prototype.afteraccepted = function (value) {
        this.sale = value;
        console.log(this.sale);
        sessionStorage.setItem("setsail", JSON.stringify(this.sale));
        this.router.navigate(['/checkout']);
    };
    AccountsComponent.prototype.afteracceptedsell = function (value) {
        this.sellid = value;
        sessionStorage.setItem("sellersaleid", JSON.stringify(this.sellid));
        this.router.navigate(['/checkout']);
    };
    AccountsComponent.prototype.adverthistory = function () {
        this.appService.adverthistory().subscribe(function (data) {
            console.log("advertisement history", data);
        });
    };
    // public boostad(value){
    //   console.log(value);
    //   this.boost=value;
    //   this.appService.boostad(this.boost).subscribe(data=>{
    //     console.log("boost", data);
    //     if(data['result'] ){
    //     this.snackBar.open('Advertisement Boosted successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    //     }
    //   },err=>{
    //     this.snackBar.open('Invalid Task!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    //   });
    // }
    AccountsComponent.prototype.slide_ad = function (value) {
        console.log(value);
    };
    AccountsComponent.prototype.updateoffer = function (id) {
        this.offeridnew = id;
        if (this.hid == true) {
            this.hid = false;
        }
        else {
            this.hid = true;
        }
        if (this.Edit == 'Edit') {
            this.Edit = "Submit";
        }
        else {
            this.Edit = "Edit";
        }
    };
    AccountsComponent.prototype.submitPrice = function (price) {
        var _this = this;
        if (this.hid == true) {
            this.hid = false;
        }
        else {
            console.log(this.offeridnew);
            console.log(price);
            this.appService.updateoffer(this.offeridnew, price).subscribe(function (data) {
                console.log(data);
                _this.offersbyme();
            });
            this.hid = true;
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('horizontalStepper'),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatStepper"])
    ], AccountsComponent.prototype, "horizontalStepper", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('verticalStepper'),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatStepper"])
    ], AccountsComponent.prototype, "verticalStepper", void 0);
    AccountsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-accounts',
            template: __webpack_require__(/*! ./accounts.component.html */ "./src/app/pages/accounts/accounts.component.html"),
            styles: [__webpack_require__(/*! ./accounts.component.scss */ "./src/app/pages/accounts/accounts.component.scss")]
        }),
        __metadata("design:paramtypes", [_app_service__WEBPACK_IMPORTED_MODULE_2__["AppService"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatBottomSheet"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBar"]])
    ], AccountsComponent);
    return AccountsComponent;
}());

// @Component({
//   selector: 'app-acc',
//   templateUrl: './acc/acc.component.html',
//   //styleUrls: ['./acc.component.scss']
// })
// export class AccComponent {
//   constructor(private bottomSheetRef: MatBottomSheetRef<AccComponent>) {}
//
//   openLink(event: MouseEvent): void {
//     this.bottomSheetRef.dismiss();
//     event.preventDefault();
//   }
// }


/***/ }),

/***/ "./src/app/pages/myaccs/myaccs.component.html":
/*!****************************************************!*\
  !*** ./src/app/pages/myaccs/myaccs.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n  <mat-toolbar-row fxLayoutAlign=\"space-between center\"  class=\"top-toolbar theme-container\" style=\"background-color:#156dbf; max-width:100% !important; height:40px\">\r\n      <span fxHide=\"false\" fxHide.gt-sm>\r\n          <button mat-button (click)=\"sidenav.toggle()\" class=\"sidenav-toggle\" >\r\n              <mat-icon>menu</mat-icon>\r\n          </button>\r\n      </span>\r\n      <span fxShow=\"false\" fxShow.gt-xs fxLayoutAlign=\"center center\"></span>\r\n      <span fxShow=\"false\" fxShow.gt-sm></span>\r\n      <app-top-menu style=\"margin-right:1%\"></app-top-menu>\r\n  </mat-toolbar-row>\r\n  <div class=\"form_view\" >\r\n\r\n<mat-toolbar-row fxLayoutAlign=\"space-between center\" class=\"logo-toolbar theme-container\" style=\"background-color:#FFFFFF\">\r\n    <!-- <a  routerLink=\"/\"  (click) =\"closeSubMenus()\">\r\n    <img src=\"assets/images/icons/logo.png\" height=100 class=\"logo\" style=\"margin-left:50%;\"/>\r\n  </a> -->\r\n  <span class=\"logo\" style=\"font-size:140%; font-family: proxs; color:#342d38; margin-left:5%; margin-top:-5%; cursor:pointer\" (click)=\"adrouterhome()\">\r\n     Back to Home\r\n   </span>\r\n\r\n  <div style=\"margin-left: -50%; margin-top:-3%;\">\r\n    <span class=\"head\" [hidden]=\"!headi\">\r\n    {{this.headings}}\r\n  </span>\r\n  <!-- <span class=\"head\" [hidden]=\"!head_m\">\r\n  Messages\r\n</span>\r\n<span class=\"head\" [hidden]=\"!head_o\">\r\nOffers\r\n</span>\r\n<span class=\"head\" [hidden]=\"!head_f\">\r\nFavourites\r\n</span>\r\n<span class=\"head\" [hidden]=\"!head_he\">\r\nHelp\r\n</span> -->\r\n<span class=\"head\" style=\"margin-left:-5%\" [hidden]=\"!head_a\">\r\nAccount Settings\r\n</span>\r\n</div>\r\n\r\n  <!-- <div class=\"upper\" [hidden]=\"!hist_but\">\r\n    <button mat-button class=\"first\" (click)=\"showadds()\">My Ads</button>\r\n    <button mat-button class=\"second1\" (click)=\"myPurchases()\">Purchases</button>\r\n  </div> -->\r\n  <div class=\"upper\" [hidden]=\"!offer_but\">\r\n    <button mat-button class=\"first\" (click)=\"offersbyme()\">Sent</button>\r\n    <button mat-button class=\"second1\" (click)=\"myaddsoffers()\">Received</button>\r\n  </div>\r\n  <button mat-raised-button class=\"post_but\" style=\"background-color:#156dbf; border-radius: 7px 7px 7px 7px;color:white;\" (click)=\"adrouter()\"> Post Ad</button>\r\n\r\n</mat-toolbar-row>\r\n\r\n<span class=\"new_price\" [hidden]=\"!hid\">\r\n  <input type=\"number\" [(ngModel)]=\"price\">\r\n  <button (click)=\"submitPrice(price)\">Submit</button>\r\n  <button (click)=\"cancel()\">Cancel</button>\r\n</span>\r\n<mat-sidenav-container fxLayoutAlign=\"space-between center\"  class=\"top-toolbar theme-container\" style=\"background-color:#FFFFFF\">\r\n\r\n\r\n    <mat-sidenav #sidenav [opened]=\"sidenavOpen\" [mode]=\"sidenavOpen ? 'side' : 'over'\" class=\"account-sidenav\" perfectScrollbar>\r\n\r\n\r\n        <mat-nav-list class=\"mat-elevation-z0 h-100\">\r\n          <mat-list-item  (click)=\"adrouterhome()\">\r\n              <img src=\"assets/images/icons/home.png\" class=\"icons\" matListIcon style=\"border-radius:0%; height:16px; width:16px\"/>\r\n              <a matLine  routerLinkActive=\"horizontal-active-link\" [routerLinkActiveOptions]=\"{exact:true}\" style=\"cursor:pointer\">Home</a>\r\n          </mat-list-item>\r\n\r\n            <mat-list-item  (click)=\"showadds()\">\r\n                <img src=\"assets/images/icons/myads.png\" class=\"icons\" matListIcon style=\"border-radius:0%; height:16px; width:16px\">\r\n                <a matLine  routerLinkActive=\"horizontal-active-link\" [routerLinkActiveOptions]=\"{exact:true}\" style=\"cursor:pointer\">My Ads</a>\r\n            </mat-list-item>\r\n            <mat-list-item  (click)=\"myPurchases()\">\r\n                <img src=\"assets/images/icons/purchases.png\" class=\"icons\" matListIcon style=\"border-radius:0%; height:16px; width:16px\">\r\n                <a matLine  routerLinkActive=\"horizontal-active-link\" [routerLinkActiveOptions]=\"{exact:true}\" style=\"cursor:pointer\">My Purchases</a>\r\n            </mat-list-item>\r\n            <mat-list-item (click)=\"getAllChats()\">\r\n              <img src=\"assets/images/icons/envelope.png\" class=\"icons\" matListIcon style=\"border-radius:0%; height:16px; width:16px\">\r\n\r\n                <a matLine  routerLinkActive=\"horizontal-active-link\" [routerLinkActiveOptions]=\"{exact:true}\" style=\"cursor:pointer\">Messages</a>\r\n            </mat-list-item>\r\n\r\n            <mat-list-item (click)=\"offersbyme()\">\r\n              <img src=\"assets/images/icons/shopping.png\" class=\"icons\" matListIcon style=\"border-radius:0%; height:16px; width:16px\">\r\n\r\n                <a matLine  routerLinkActive=\"horizontal-active-link\" [routerLinkActiveOptions]=\"{exact:true}\">Offers</a>\r\n            </mat-list-item>\r\n\r\n            <mat-list-item (click)=\"favouriteadds()\">\r\n              <img src=\"assets/images/icons/heart.png\" class=\"icons\" matListIcon style=\"border-radius:0%; height:16px; width:16px\">\r\n\r\n                <a matLine  routerLinkActive=\"horizontal-active-link\" [routerLinkActiveOptions]=\"{exact:true}\" style=\"cursor:pointer\">Favourites</a>\r\n            </mat-list-item>\r\n            <mat-list-item>\r\n              <img src=\"assets/images/icons/information.png\" class=\"icons\" matListIcon style=\"border-radius:0%; height:16px; width:16px\">\r\n\r\n                <a matLine  routerLinkActive=\"horizontal-active-link\" [routerLinkActiveOptions]=\"{exact:true}\" style=\"cursor:pointer\">Help</a>\r\n            </mat-list-item >\r\n            <mat-list-item (click)=\"acc_s()\">\r\n              <img src=\"assets/images/icons/settings.png\" class=\"icons\" matListIcon style=\"border-radius:0%; height:16px; width:16px\">\r\n\r\n                <a matLine  routerLinkActive=\"horizontal-active-link\" [routerLinkActiveOptions]=\"{exact:true}\" style=\"cursor:pointer\">Account Settings</a>\r\n            </mat-list-item>\r\n          </mat-nav-list>\r\n\r\n    </mat-sidenav>\r\n    <mat-sidenav-content class=\"account-content\" ngClass.gt-sm=\"p-left\" style=\"max-width:80% !important\">\r\n\r\n      <div [hidden]=\"!adds\">\r\n\r\n\r\n      <div *ngFor=\"let myad of myadd\" class=\"adds_view\">\r\n      <a [routerLink]=\"['/products', myad._id, myad.title]\" class=\"title text-truncate\">\r\n        <img [src]=\"myad.pictures[0]\" class=\"pictures\" style=\"cursor:pointer\">\r\n      </a>\r\n\r\n<!-- /*\r\ncreated by sherry\r\n*/ -->\r\n\r\n<!-- <span class=\"title_p\">{{myad.username}}</span>\r\n<span class=\"title_p\">{{myad.offered_price}}</span>\r\n(click)=\"openOfferDetails(myad)\" -->\r\n\r\n<!-- /*\r\ncreated by sherry\r\nalso added click function on title span below\r\n*/ -->\r\n\r\n\r\n\r\n\r\n      <span class=\"title_p\">{{myad.title}}</span>\r\n      <span class=\"title_d\">{{myad.description}}</span>\r\n      <span class=\"title_s\">\r\n        <img class=\"memory_icon\" src=\"assets/images/icons/memory.png\" />\r\n        <span class=\"title_s1\"> &nbsp;{{myad.storage}}</span>\r\n\r\n      </span>\r\n      <span class=\"title_c\">\r\n        <img class=\"colour_icon\" src=\"assets/images/icons/colour.png\" />\r\n        <span class=\"title_c1\"> &nbsp;{{myad.color}}</span>\r\n      </span>\r\n\r\n      <span [hidden]=\"!pkr\">\r\n      <span class=\"title_pkr\" [hidden]=\"!pkr\"> {{this.mycurrency}} </span>\r\n        <span class=\"title_pr\" >{{myad.price}}</span>\r\n        </span>\r\n\r\n      <span [hidden]=\"!off_pr\">\r\n      <span class=\"title_pkr\" [hidden]=\"!off_pr\"> Offered:</span>\r\n        <span class=\"title_pri\" >{{myad.offered_price}}</span>\r\n      </span>\r\n\r\n\r\n      <!-- <span [hidden]= \"!msg\"><mat-icon class=\"msgs\">mail_outline</mat-icon></span> -->\r\n      <!-- <span class=\"createat\" [hidden]= \"!offer_create\" >{{myd.createdAt}} </span> -->\r\n      <span [hidden]= \"!disable\">\r\n      <span *ngIf=\"myad.visible\" style=\"color:#f41b23; float:right;\" >\r\n        <mat-icon (click)=\"enabledisable(myad._id)\" style=\"font-size:120%; margin-right:-7px\">cancel </mat-icon>\r\n      </span>\r\n        <span *ngIf=\"!myad.visible\" style=\"color:green; float:right;\">\r\n          <mat-icon (click)=\"enabledisable(myad._id)\" style=\"font-size:120%; margin-right:-7px\">check </mat-icon>\r\n        </span>\r\n      </span>\r\n\r\n      <span [hidden]= \"!boost\"><img src=\"\\assets\\images\\boost.png\" class=\"boost\" (click)=\"boostad(myad._id)\"/></span>\r\n\r\n    <span [hidden]= \"!status_but\">\r\n      <span *ngIf=\"myad.status ==='accepted'\">\r\n      <button mat-raised-button ngDefaultControl class=\"status_but\" style=\"background-color:#156dbf; border-radius: 7px 7px 7px 7px;color:white;\" [(ngModel)]=\"myad.sail_id\" [value]=\"myad.sail_id\"  (click)=\"afteraccepted(myad.sail_id)\">{{myad.status}}</button>\r\n    </span>\r\n    <span *ngIf=\"myad.status ==='pending'\">\r\n      <button mat-raised-button ngDefaultControl class=\"status_but1\" [(ngModel)]=\"myad.sail_id\" [value]=\"myad.sail_id\" style=\"background-color:#156dbf; border-radius: 7px 7px 7px 7px;color:white;\"  (click)=\"updateoffer(myad.createdOffer)\">Edit</button>\r\n      <button mat-raised-button ngDefaultControl class=\"status_but2\" [(ngModel)]=\"myad.sail_id\" [value]=\"myad.sail_id\" style=\"border-color:#156dbf; border-radius: 7px 7px 7px 7px; color:#156dbf\"  (click)=\"deleteoffer(myad.createdOffer,myad._id)\">Delete</button>\r\n    </span>\r\n    <span *ngIf=\"myad.status ==='rejected'\">\r\n      <span style=\"color:#156dbf; float:right\">\r\n        rejected\r\n      </span>\r\n    </span>\r\n  </span>\r\n  <span [hidden]= \"!favour_but\">\r\n    <span style=\"color:#f41b23; float:right;\">\r\n      <mat-icon (click)=\"addtofavourites(myad._id)\" style=\"font-size:130%; margin-right:-7px\">cancel </mat-icon>\r\n    </span>\r\n    <span *ngIf=\"!myad.sold\">\r\n      <a [routerLink]=\"['/products', myad._id, myad.title]\" class=\"title text-truncate\">\r\n    <button mat-raised-button ngDefaultControl class=\"sold_but\" style=\"background-color:#156dbf; border-radius: 7px 7px 7px 7px;color:white;\"  >AVAILABLE</button>\r\n  </a>\r\n  </span>\r\n  <span *ngIf=\"myad.sold\">\r\n    <button mat-raised-button ngDefaultControl class=\"sold_but\" style=\"border:1px solid; border-color:#156dbf; border-radius: 7px 7px 7px 7px; color:#156dbf;\" >SOLD</button>\r\n  </span>\r\n</span>\r\n  <span [hidden]=\"!off_rc\">\r\n    <button mat-raised-button ngDefaultControl class=\"sold_but\" style=\"background-color:#156dbf; border-radius: 7px 7px 7px 7px;color:white;\"  (click)=\"openOfferDetails(myad)\">Check</button>\r\n</span>\r\n<span [hidden]= \"!status_but1\">\r\n  <span *ngIf=\"myad.status ==='pending'\">\r\n  <button mat-raised-button ngDefaultControl class=\"status_but1\" (click)=\"accept_reject(myad._id)\" style=\"background-color:#156dbf; border-radius: 7px 7px 7px 7px;color:white;\">Accept</button>\r\n</span>\r\n<span *ngIf=\"myad.status ==='pending'\">\r\n  <button mat-raised-button ngDefaultControl class=\"status_but2\" (click)=\"accept_reject1()\" style=\"border-color:#156dbf; border-radius: 7px 7px 7px 7px; color:#156dbf;\">Reject</button>\r\n</span>\r\n<span *ngIf=\"myad.status ==='accepted'\">\r\n  <button mat-stroked-button ngDefaultControl class=\"status_but1\" (click)=\"status_seller(myad.sail_id)\" style=\"border-color:#156dbf; border-radius: 7px 7px 7px 7px; color:#156dbf;\">Status</button>\r\n</span>\r\n</span>\r\n\r\n\r\n      <!-- <span class=\"deactivate\" [hidden]= \"!deactivate\">deactivate ad X </span> -->\r\n      <span *ngIf=\"myad.status ==='accepted'\"><span class=\"proceed\" [hidden]= \"!proceed\" >Proceed To Payment </span>\r\n    </span>\r\n\r\n    </div>\r\n\r\n      </div>\r\n      <div [hidden]=\"!chat\" class=\"acc_div\">\r\n\r\n        <div *ngFor=\"let cha of chats\" class=\"chat_view\" >\r\n          <div>\r\n            <span class=\"img_div\" >\r\n              <img src={{cha.messageFrom.profilePicture}} height=\"60\" width=\"60\" class=\"user_img\" style=\"border-radius:50%;\" (click)=\"getAllMessages(cha.messageFrom._id,cha.advert_id._id)\"/>\r\n              <span class=\"chat_head\">\r\n              {{cha.messageFrom.name}}\r\n            </span>\r\n            <span class=\"chat_time\">\r\n              {{this.full}}\r\n            </span>\r\n          </span>\r\n          <div class=\"chat_title\">\r\n          <i>For {{cha.advert_id.title}}</i>\r\n        </div>\r\n        <div class=\"chat_det\">\r\n          {{cha.message}}\r\n         </div>\r\n      </div>\r\n      <div class=\"divider\"></div>\r\n      </div>\r\n    </div>\r\n\r\n      <div [hidden]=\"!msg\" class=\"acc_div\">\r\n        <div style=\" margin-bottom:2%;height:70px; width: 500px; background-color:#f2f2f2\" >\r\n          <span class=\"img_div\" >\r\n            <img src={{this.adpictures}} height=\"60\" width=\"60\" class=\"user_img\" style=\"border-radius:50%;\"/>\r\n            <span class=\"chat_head\">\r\n          {{this.adTitle}}\r\n          </span>\r\n          <div *ngIf=\"!this.offerstatus && this.mymatchedad == 'notmatched'\" style=\"float:right;\">\r\n            <button mat-raised-button ngDefaultControl class=\"buy_but\" (click)=\"mk_offr()\" style=\"background-color:#156dbf; border-radius: 7px 7px 7px 7px;color:white;margin-top:15px; margin-right:10px\" >\r\n              MAKE OFFER\r\n            </button>\r\n          </div>\r\n          <div *ngIf=\"this.offerstatus == 'pending' && this.mymatchedad == 'notmatched'\" style=\"float:right;\">\r\n\r\n            <a mat-button [matMenuTriggerFor]=\"accountMenu\" #accountMenuTrigger=\"matMenuTrigger\" style=\"font-family:proxr\">\r\n                <span fxShow=\"false\" fxShow.gt-sm>\r\n                  <button mat-raised-button ngDefaultControl class=\"buy_but\" (click)=\"mk_offr()\" style=\"background-color:#156dbf; border-radius: 7px 7px 7px 7px;color:white;margin-top:15px; margin-right:10px\" >\r\n                    ACTIONS\r\n                  </button>\r\n                </span>\r\n            </a>\r\n            <mat-menu #accountMenu=\"matMenu\" [overlapTrigger]=\"false\" xPosition=\"before\" class=\"app-dropdown account\" style=\"font-family:proxr\">\r\n                <span (mouseleave)=\"accountMenuTrigger.closeMenu()\">\r\n                    <div class=\"divider\"></div>\r\n                    <span mat-menu-item>\r\n                        <span style=\"font-family:proxr\" (click)=\"mk_offr()\" >UPDATE OFFER</span>\r\n                    </span>\r\n                    <!-- <span mat-menu-item>\r\n                        <span style=\"font-family:proxr\" (click)=\"accept()\">ACCEPT</span>\r\n                    </span>\r\n                    <span mat-menu-item>\r\n                        <span style=\"font-family:proxr\" (click)=\"reject()\">REJECT</span>\r\n                    </span> -->\r\n\r\n\r\n                    <div class=\"divider\"></div>\r\n\r\n                </span>\r\n            </mat-menu>\r\n          </div>\r\n          <span *ngFor=\"let stat of offersbyseller\">\r\n          <div *ngIf=\"this.mymatchedad == 'matchedad' && stat.user_id == this.messageuserid && stat.status == 'rejected'\" style=\"float:right;\">\r\n          <button mat-raised-button ngDefaultControl class=\"buy_but\" style=\"background-color:#156dbf; border-radius: 7px 7px 7px 7px;color:white;margin-top:15px; margin-right:10px\" >\r\n            REJECTED\r\n          </button>\r\n          </div>\r\n          <div *ngIf=\"this.mymatchedad == 'matchedad' && stat.user_id == this.messageuserid && stat.status == 'accepted'\" style=\"float:right;\">\r\n          <button mat-raised-button ngDefaultControl class=\"buy_but\"  style=\"background-color:#156dbf; border-radius: 7px 7px 7px 7px;color:white;margin-top:15px; margin-right:10px\" >\r\n            Accepted\r\n          </button>\r\n          </div>\r\n        </span>\r\n          <div *ngIf=\"this.offerstatus == 'rejected' && this.mymatchedad == 'notmatched'\" style=\"float:right;\">\r\n\r\n            <button mat-raised-button ngDefaultControl class=\"buy_but\"  style=\"background-color:#156dbf; border-radius: 7px 7px 7px 7px;color:white;margin-top:15px; margin-right:10px\" >\r\n              REJECTED\r\n            </button>\r\n\r\n          </div>\r\n          <div *ngIf=\"this.offerstatus == 'accepted' && this.mymatchedad == 'notmatched'\" style=\"float:right;\">\r\n\r\n            <button mat-raised-button ngDefaultControl class=\"buy_but\"  style=\"background-color:#156dbf; border-radius: 7px 7px 7px 7px;color:white;margin-top:15px; margin-right:10px\" >\r\n              ACCEPTED\r\n            </button>\r\n\r\n          </div>\r\n\r\n          <div *ngIf=\"this.offerstatus == 'counter' && this.mymatchedad == 'notmatched'\" style=\"float:right;\">\r\n\r\n            <a mat-button [matMenuTriggerFor]=\"accountMenu\" #accountMenuTrigger=\"matMenuTrigger\" style=\"font-family:proxr\">\r\n                <span fxShow=\"false\" fxShow.gt-sm>\r\n                  <button mat-raised-button ngDefaultControl class=\"buy_but\" (click)=\"mk_offr()\" style=\"background-color:#156dbf; border-radius: 7px 7px 7px 7px;color:white;margin-top:15px; margin-right:10px\" >\r\n                    ACTIONS\r\n                  </button>\r\n                </span>\r\n            </a>\r\n            <mat-menu #accountMenu=\"matMenu\" [overlapTrigger]=\"false\" xPosition=\"before\" class=\"app-dropdown account\" style=\"font-family:proxr\">\r\n                <span (mouseleave)=\"accountMenuTrigger.closeMenu()\">\r\n                    <div class=\"divider\"></div>\r\n                    <span mat-menu-item>\r\n                        <span style=\"font-family:proxr\" (click)=\"mk_offr()\" >RE-COUNTER</span>\r\n                    </span>\r\n                    <span mat-menu-item>\r\n                        <span style=\"font-family:proxr\" (click)=\"accept()\">ACCEPT</span>\r\n                    </span>\r\n                    <span mat-menu-item>\r\n                        <span style=\"font-family:proxr\" (click)=\"reject()\">REJECT</span>\r\n                    </span>\r\n\r\n\r\n                    <div class=\"divider\"></div>\r\n\r\n                </span>\r\n            </mat-menu>\r\n          </div>\r\n          <span *ngFor= \"let stat of offersbyseller\">\r\n          <div *ngIf=\"this.mymatchedad == 'matchedad' && stat.user_id == this.messageuserid && stat.status == 'pending' || stat.status =='re-counter'\" style=\"float:right;\">\r\n\r\n            <a mat-button [matMenuTriggerFor]=\"accountMenu\" #accountMenuTrigger=\"matMenuTrigger\" style=\"font-family:proxr\">\r\n                <span fxShow=\"false\" fxShow.gt-sm>\r\n\r\n                  <button mat-raised-button ngDefaultControl class=\"buy_but\" (click)=\"mk_offr()\" style=\"background-color:#156dbf; border-radius: 7px 7px 7px 7px;color:white;margin-top:15px; margin-right:10px\" >\r\n                    ACTIONS\r\n                  </button>\r\n                </span>\r\n            </a>\r\n            <mat-menu #accountMenu=\"matMenu\" [overlapTrigger]=\"false\" xPosition=\"before\" class=\"app-dropdown account\" style=\"font-family:proxr\">\r\n                <span (mouseleave)=\"accountMenuTrigger.closeMenu()\">\r\n                    <div class=\"divider\"></div>\r\n                    <span mat-menu-item>\r\n                        <span style=\"font-family:proxr\" (click)=\"mk_offr()\" >COUNTER OFFER</span>\r\n                    </span>\r\n                    <span mat-menu-item>\r\n                        <span style=\"font-family:proxr\" (click)=\"acceptseller(stat._id)\">ACCEPT</span>\r\n                    </span>\r\n                    <span mat-menu-item>\r\n                        <span style=\"font-family:proxr\" (click)=\"rejectseller(stat._id)\">REJECT</span>\r\n                    </span>\r\n\r\n\r\n                    <div class=\"divider\"></div>\r\n\r\n                </span>\r\n            </mat-menu>\r\n          </div>\r\n        </span>\r\n\r\n          <!-- <div *ngFor=\"let my of offersMatched\">\r\n            {{my.status}}\r\n          </div> -->\r\n          <div style=\"  font-family: proxr;margin-left: 20%;color: #5a555e\">\r\n            {{this.adcolor}}\r\n            - {{this.adstorage}}\r\n          </div>\r\n          <div style=\"  font-family: proxr;margin-left: 20%;color: #5a555e\" *ngIf=\"this.mymatchedad == 'notmatched'\">\r\n            Offered Price is: {{this.matchedofferprice}}\r\n          </div>\r\n          <span *ngFor= \"let stat of offersbyseller\">\r\n          <div style=\"  font-family: proxr;margin-left: 20%;color: #5a555e\" *ngIf=\"this.mymatchedad == 'matchedad' && stat.user_id == this.messageuserid && stat.status == 'pending' || stat.status =='re-counter' || stat.status =='rejected'\">\r\n            Offered Price is: {{stat.offered_price}}\r\n          </div>\r\n        </span>\r\n\r\n        </span>\r\n\r\n        </div>\r\n        <div class=\"text-center\" style=\"height:300px;width: 500px;overflow:scroll; overflow-x:hidden\" #scrollMe [scrollTop]=\"scrollMe.scrollHeight\">\r\n      <ng-container *ngFor=\"let msg of messages\" class=\"message_view\" >\r\n        <ng-container *ngIf=\"msg.messageFrom != this.myuserid\" text-wrap>\r\n\r\n      <p mat-line class=\"mymessages\"> {{msg.message}} </p>\r\n\r\n        </ng-container>\r\n\r\n        <ng-container *ngIf=\"msg.messageFrom == this.myuserid\" text-wrap>\r\n\r\n              <p mat-line class=\"hismessages\"  > {{msg.message}}</p>\r\n\r\n\r\n        </ng-container>\r\n\r\n      </ng-container>\r\n    </div>\r\n      <div>\r\n      <input type=\"text\" class=\"title_area\" id=\"title\" [(ngModel)]=\"chat_msg\" maxlength=\"100\" > <mat-icon style=\"float:right;margin-top:8%\" (click)=\"sendMessagechat(chat_msg)\">message</mat-icon>\r\n    </div>\r\n\r\n\r\n\r\n    </div>\r\n\r\n    <div class=\"main_screen\" [hidden]=\"!offer_view\">\r\n      <div class=\"make_offer\" *ngIf=\"this.myid != this.aduserid && this.mymatchedad == 'notmatched'\" >\r\n          <span class=\"fw-500\">\r\n            <!-- <label for=\"make-offer\" class=\"titles\" id=\"make-offer\">Make Offer</label><br>\r\n            <input type=\"number\" class=\"offer_box\" step=\"100\" required [(ngModel)]=\"make_offer\" [ngModelOptions]=\"{standalone: true}\" [value]=\"make_offer\"/><br> -->\r\n            <label for=\"make-offer\" class=\"titles_off\" id=\"make-offer\" style=\"font-family: proxr;\">Make Offer</label><br>\r\n            <input type=\"number\" class=\"offer_box\" step=\"100\" required [(ngModel)]=\"make_offer\" [ngModelOptions]=\"{standalone: true}\" [value]=\"make_offer\" style=\"font-family: proxr; font-size:200%; border-radius:7px 7px 7px 7px;\"/><br>\r\n          </span>\r\n          <button mat-stroked-button class=\"offer_but\" id=\"make-offer\" (click)=\"makeoffer(make_offer)\" style=\"font-family: proxs; background-color:#156dbf; border-radius: 7px 7px 7px 7px; color:white;\"> OFFER</button>\r\n          <button mat-stroked-button ngDefaultControl class=\"cancel\" (click)=\"canceloffer()\" style=\"font-family: proxs; border-color:#156dbf; border-radius: 7px 7px 7px 7px; color:#156dbf; margin-left:10%\">CANCEL</button>\r\n\r\n      </div>\r\n      <div class=\"make_offer\" *ngIf=\"this.offerstatus == 'pending' && this.mymatchedad == 'notmatched'\" >\r\n          <span class=\"fw-500\">\r\n            <!-- <label for=\"make-offer\" class=\"titles\" id=\"make-offer\">Make Offer</label><br>\r\n            <input type=\"number\" class=\"offer_box\" step=\"100\" required [(ngModel)]=\"make_offer\" [ngModelOptions]=\"{standalone: true}\" [value]=\"make_offer\"/><br> -->\r\n            <label for=\"make-offer\" class=\"titles_off\" id=\"make-offer\" style=\"font-family: proxr;\">Update Offer</label><br>\r\n            <input type=\"number\" class=\"offer_box\" step=\"100\" required [(ngModel)]=\"make_offer\" [ngModelOptions]=\"{standalone: true}\" [value]=\"make_offer\" style=\"font-family: proxr; font-size:200%; border-radius:7px 7px 7px 7px;\"/><br>\r\n          </span>\r\n          <button mat-stroked-button class=\"offer_but\" id=\"make-offer\" (click)=\"updateofferchat(make_offer)\" style=\"font-family: proxs; background-color:#156dbf; border-radius: 7px 7px 7px 7px; color:white;\"> OFFER</button>\r\n          <button mat-stroked-button ngDefaultControl class=\"cancel\" (click)=\"canceloffer()\" style=\"font-family: proxs; border-color:#156dbf; border-radius: 7px 7px 7px 7px; color:#156dbf; margin-left:10%\">CANCEL</button>\r\n\r\n      </div>\r\n      <div class=\"make_offer\" *ngIf=\"this.offerstatus == 'counter' && this.mymatchedad == 'notmatched'\" >\r\n          <span class=\"fw-500\">\r\n            <!-- <label for=\"make-offer\" class=\"titles\" id=\"make-offer\">Make Offer</label><br>\r\n            <input type=\"number\" class=\"offer_box\" step=\"100\" required [(ngModel)]=\"make_offer\" [ngModelOptions]=\"{standalone: true}\" [value]=\"make_offer\"/><br> -->\r\n            <label for=\"make-offer\" class=\"titles_off\" id=\"make-offer\" style=\"font-family: proxr;\">Re-Counter Offer</label><br>\r\n            <input type=\"number\" class=\"offer_box\" step=\"100\" required [(ngModel)]=\"make_offer\" [ngModelOptions]=\"{standalone: true}\" [value]=\"make_offer\" style=\"font-family: proxr; font-size:200%; border-radius:7px 7px 7px 7px;\"/><br>\r\n          </span>\r\n          <button mat-stroked-button class=\"offer_but\" id=\"make-offer\" (click)=\"updateofferchat(make_offer)\" style=\"font-family: proxs; background-color:#156dbf; border-radius: 7px 7px 7px 7px; color:white;\"> OFFER</button>\r\n          <button mat-stroked-button ngDefaultControl class=\"cancel\" (click)=\"canceloffer()\" style=\"font-family: proxs; border-color:#156dbf; border-radius: 7px 7px 7px 7px; color:#156dbf; margin-left:10%\">CANCEL</button>\r\n\r\n      </div>\r\n      <div class=\"make_offer\" *ngIf=\"this.mymatchedad == 'matchedad' \" >\r\n          <span class=\"fw-500\">\r\n            <!-- <label for=\"make-offer\" class=\"titles\" id=\"make-offer\">Make Offer</label><br>\r\n            <input type=\"number\" class=\"offer_box\" step=\"100\" required [(ngModel)]=\"make_offer\" [ngModelOptions]=\"{standalone: true}\" [value]=\"make_offer\"/><br> -->\r\n            <label for=\"make-offer\" class=\"titles_off\" id=\"make-offer\" style=\"font-family: proxr;\">Counter Offer</label><br>\r\n            <input type=\"number\" class=\"offer_box\" step=\"100\" required [(ngModel)]=\"make_offer\" [ngModelOptions]=\"{standalone: true}\" [value]=\"make_offer\" style=\"font-family: proxr; font-size:200%; border-radius:7px 7px 7px 7px;\"/><br>\r\n          </span>\r\n          <button mat-stroked-button class=\"offer_but\" id=\"make-offer\" (click)=\"counterofferchat(make_offer)\" style=\"font-family: proxs; background-color:#156dbf; border-radius: 7px 7px 7px 7px; color:white;\"> OFFER</button>\r\n          <button mat-stroked-button ngDefaultControl class=\"cancel\" (click)=\"canceloffer()\" style=\"font-family: proxs; border-color:#156dbf; border-radius: 7px 7px 7px 7px; color:#156dbf; margin-left:10%\">CANCEL</button>\r\n\r\n      </div>\r\n\r\n    </div>\r\n\r\n        <!-- <button mat-fab (click)=\"onClickUserInfo()\">\r\n  <mat-icon>person</mat-icon>\r\n</button>\r\n<div class=\"chat-container\">\r\n  <mat-card class=\"main-card\">\r\n    <mat-list class=\"chat-list\">\r\n      <mat-list-item >\r\n        <h4 mat-line>\r\n          <b>Danial</b>\r\n        </h4>\r\n        <p mat-line>\r\n          <span> I sent a message </span>\r\n        </p>\r\n\r\n      </mat-list-item>\r\n    </mat-list>\r\n    <div class=\"chat-footer-container\">\r\n      <mat-icon>message</mat-icon>\r\n      <mat-form-field class=\"chat-input\">\r\n        <input matInput\r\n               #inputMessage\r\n               maxlength=\"140\"\r\n               placeholder=\"Type your message\"\r\n               [(ngModel)]=\"messageContent\"\r\n               (keyup.enter)=\"sendMessage(messageContent)\">\r\n        <mat-hint align=\"end\">{{inputMessage.value.length}}/140</mat-hint>\r\n      </mat-form-field>\r\n    </div>\r\n  </mat-card>\r\n</div> -->\r\n      <div [hidden]= \"!acc\" class=\"acc_div\">\r\n      <div class=\"img_div\">\r\n        <img src={{this.profilePicture}} height=\"80\" width=\"80\" class=\"user_img\" style=\"border-radius:50%;\"/>\r\n        <b class=\"name\">\r\n        {{this.username}}\r\n      </b>\r\n      </div>\r\n      <span class=\"picture_area\">\r\n      <label for=\"file\">\r\n          <img src=\"assets\\images\\icons\\camera.png\" height=\"30\" width=\"30\" class=\"change_photo\"/>\r\n      </label>\r\n      <input id=\"file\" type=\"file\" [value]=\"pictures\" (change)=\"handleFileInput($event)\" multiple />\r\n    </span>\r\n    <span *ngIf=\"file != null\">\r\n      <button mat-stroked-button (click)=\"updateuserimage()\" class=\"update_photo\" style=\"border-color:#156dbf;border-radius:5px 5px 5px 5px; font-family:proxr\"> Update</button>\r\n    </span>\r\n  <!-- <button mat-stroked-button class=\"change_photo\" style=\"border-color:#156dbf;border-radius:5px 5px 5px 5px; font-family:proxr\">Change Photo</button> -->\r\n\r\n      <!-- <input id=\"file\" type=\"file\" [value]=\"pictures\" (change)=\"handleFileInput($event)\" multiple /> -->\r\n      <div class=\"for_text\">PNG or JPG, Maximum size 5MB. </div>\r\n      <div *ngFor=\"let pc of package\">\r\n      <span class=\"package\">{{pc.name}} </span>\r\n      <span class=\"upg\" [hidden]=\"!up\" (click)=\"updatepackage()\"> Upgrade</span>\r\n      <span>\r\n      <img [src]=\"pc.picture\" class=\"bar\" />\r\n    </span>\r\n    </div>\r\n      <div class=\"edit_form\" [hidden]=\"!pck\" style=\"font-size:2.5vmin\">\r\n        <span style=\"float:right;color:#156dbf\" (click)=\"canceledit()\"> Cancel<mat-icon> cancel </mat-icon></span>\r\n        <br>\r\n        <div *ngFor=\"let pac of packages\">\r\n        <button mat-button class=\"package_names\" [(ngModel)]=\"pac._id\" [ngModelOptions]=\"{standalone: true}\" (click)=\"setNewpack(pac._id)\" style=\"float:left\" required>{{pac.name}}</button>\r\n\r\n        <span>\r\n        <img [src]=\"pac.picture\" class=\"bar\" />\r\n      </span>\r\n      <div style=\"font-family:proxr;color: #342d38;\">\r\n        <b>Boosts:</b>&nbsp;{{pac.boosts}} &nbsp; <b>AddCount:</b>&nbsp;{{pac.addCount}}\r\n      </div>\r\n      </div>\r\n      <button mat-stroked-button class=\"submit_but\" style=\"border-color:#156dbf; border-radius: 7px 7px 7px 7px; color:#156dbf;\" (click)=\"updateUserPackage()\"> Update</button>\r\n      </div>\r\n      <!-- <div class=\"package\">CELX BLUE </div> -->\r\n      <!-- <div style=\"float:right;color:#156dbf\" [hidden]=\"!up\" (click)=\"updatepackage()\"> Update Package</div> -->\r\n\r\n\r\n    <div class=\"\" style=\"font-family:proxr; margin-top:1%\" [hidden]=\"!first\">\r\n\r\n      <span style=\"float:right; color:#156dbf;font-size:90%\" (click)=\"edituser()\"> Edit Info<mat-icon style=\"font-size:100%\"> edit </mat-icon></span>\r\n        <!-- <li><b>Change Password</b><span style=\"position:fixed; left:50%\"> </span></li> -->\r\n        <b style=\"position:absolute\">Name </b> <span style=\"position:absolute; left:25%\">{{this.username}} </span><br><br>\r\n\r\n        <b style=\"position:absolute; margin-top:-15px\">Email </b> <span style=\"position:absolute; left:25%; margin-top:-15px\">{{this.useremail}} </span><br><br>\r\n\r\n        <b style=\"position:absolute; margin-top:-30px\">Phone Number </b> <span style=\"position:absolute; left:25%; margin-top:-30px\">{{this.mobile}} </span><br><br>\r\n\r\n        <b style=\"position:absolute; margin-top:-45px\">Currency </b> <span style=\"position:absolute; left:25%; margin-top:-45px\">{{this.usercurrency}} </span><br><br>\r\n\r\n        <b style=\"position:absolute; margin-top:-60px\">Manage Payment Info </b> <span style=\"position:absolute; left:25%; margin-top:-60px\">{{this.defaultCard}} </span><br><br>\r\n    </div>\r\n    <div class=\"edit_form\" [hidden]=\"!user\" style=\"font-size:2.5vmin\">\r\n      <span style=\"float:right;color:#156dbf;font-size:90%\" (click)=\"canceledit()\"> Cancel<mat-icon style=\"font-size:100%\"> cancel </mat-icon></span>\r\n\r\n    <b style=\"\">Email </b> <span style=\"position:absolute; left:50%\">{{this.useremail}} </span><br><br>\r\n    <b style=\"\">Phone Number </b> <span style=\"position:absolute; left:50%\">{{this.useremail}} </span><br><br>\r\n     <b style=\"\">Name </b> <input  style=\"position:absolute; left:50%\" type=\"text\" placeholder=\"New Name\" class=\"new_name\" id=\"new_name\"[(ngModel)]=\"new_name\" [ngModelOptions]=\"{standalone: true}\" [value]=\"new_name\" required><br><br>\r\n     <b style=\"\">Currency </b>\r\n     <!-- <input  style=\"position:absolute; left:50%\" type=\"text\" placeholder=\"New Currency\" class=\"new_name\" id=\"new_currency\"[(ngModel)]=\"new_currency\" [ngModelOptions]=\"{standalone: true}\" [value]=\"new_currency\" required><br><br> -->\r\n     <mat-select style=\"width:20%;position:absolute; left:50%\" id=\"new_currency\" [(ngModel)]=\"new_currency\" [ngModelOptions]=\"{standalone: true}\" required>\r\n       <mat-option *ngFor=\"let currency of enums\" [value]=\"currency\">\r\n       {{currency}}\r\n     </mat-option>\r\n   </mat-select><br><br>\r\n     <b style=\"\">Manage Payment </b> <mat-icon style=\"position:absolute; left:50%; color:#156dbf\" (click)=\"editpayment()\"> build </mat-icon><br><br>\r\n     <b style=\"\">Change Password </b><mat-icon style=\"position:absolute; left:50%; color:#156dbf\" (click)=\"editpass()\"> build </mat-icon><br><br>\r\n\r\n\r\n     <button mat-stroked-button class=\"submit_but\" style=\"border-color:#156dbf; border-radius: 7px 7px 7px 7px; color:#156dbf;\" (click)=\"updateUser(new_name,new_currency)\"> Submit</button>\r\n\r\n    </div>\r\n\r\n      <form [formGroup]=\"passForm\" (ngSubmit)=\"onpassFormSubmit(passForm.value)\" [hidden]=\"!pass\">\r\n        <span style=\"float:right;color:#156dbf; font-size:90%\" (click)=\"canceledit()\"> Cancel<mat-icon style=\"font-size:100%\"> cancel </mat-icon></span>\r\n        <mat-form-field style=\"height:3%; width:50%\">\r\n          <!-- <label>Old Password </label> -->\r\n      <input type=\"password\" matInput placeholder=\"Old Password\" class=\"pass\" formControlName=\"old_pass\" required><br><br>\r\n      <mat-error *ngIf=\"passForm.controls.old_pass.errors?.required\" style=\"font-size:80%; \">Old pass is required</mat-error>\r\n      <mat-error *ngIf=\"passForm.controls.old_pass.hasError('minlength')\" >Minimum length not reached</mat-error>\r\n    </mat-form-field>\r\n    <mat-form-field style=\"height:3%; width:50%\">\r\n      <!-- <label>New Password </label> -->\r\n      <input type=\"password\" matInput placeholder=\"New Password\" class=\"pass\" formControlName=\"new_pass\" required><br><br>\r\n      <mat-error *ngIf=\"passForm.controls.new_pass.errors?.required\" style=\"font-size:80%; \">New Pass is Required</mat-error>\r\n      <mat-error *ngIf=\"passForm.controls.new_pass.hasError('minlength')\" >Minimum length of 6 characters</mat-error>\r\n    </mat-form-field>\r\n    <div style=\"color:red; font-family:proxs\">{{this.mismatch}}</div>\r\n    <button mat-stroked-button class=\"submit_but\" style=\"border-color:#156dbf; border-radius: 7px 7px 7px 7px; color:#156dbf;\" (click)=\"onpassFormSubmit(passForm.value)\"> Submit</button>\r\n    </form>\r\n\r\n    <div [hidden]=\"!pay\">\r\n      <span style=\"float:right;color:#156dbf\" (click)=\"canceledit()\"> Cancel<mat-icon> cancel </mat-icon></span>\r\n      <div *ngFor=\"let card of cards\">\r\n        <b style=\"\">Card Name</b> <span style=\"position:absolute; left:50%\">{{card.brand}} </span><br><br>\r\n        <button mat-stroked-button class=\"delete_but\" style=\"border-color:#156dbf; border-radius: 7px 7px 7px 7px; color:#156dbf;\" (click)=\"deletecard(card.id)\"> Delete</button>\r\n      </div>\r\n</div>\r\n\r\n    </div>\r\n\r\n        <!-- <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\" class=\"header-row mat-elevation-z1 text-muted\">\r\n            <button *ngIf=\"!sidenavOpen\" mat-icon-button (click)=\"sidenav.toggle()\">\r\n                <mat-icon>more_vert</mat-icon>\r\n            </button>\r\n            <h3>My Account</h3>\r\n        </div>\r\n        <div class=\"account-wrapper mat-elevation-z1\">\r\n            <router-outlet></router-outlet>\r\n        </div> -->\r\n    </mat-sidenav-content>\r\n</mat-sidenav-container>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/myaccs/myaccs.component.scss":
/*!****************************************************!*\
  !*** ./src/app/pages/myaccs/myaccs.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main_screen {\n  text-align: center; }\n\n.make_offer {\n  text-align: center;\n  width: 100%;\n  margin-top: 15%;\n  padding: 0%;\n  margin-left: 35%; }\n\n.titles_off {\n  font-size: 300%;\n  font-family: proxs;\n  color: #342d38; }\n\n.offer_but {\n  width: 10%;\n  margin-top: 5%;\n  font-family: proxr; }\n\n.chat-container {\n  position: fixed;\n  width: 40%;\n  height: 40%; }\n\n.chat-input {\n  padding-top: 20px;\n  width: 80%; }\n\n.chat-list {\n  overflow: auto;\n  position: fixed;\n  top: 90px;\n  left: 25px;\n  right: 25px;\n  bottom: 120px; }\n\n.chat-list-item {\n  margin-top: 2px;\n  margin-bottom: 2px;\n  border-radius: 5px;\n  background-color: #E8EAF6; }\n\n.title_area {\n  font-size: 100%;\n  font-family: proxr;\n  outline: none;\n  width: 90%;\n  padding: 12px 20px;\n  margin: 8px 0;\n  margin-left: 3%;\n  margin-top: 5%;\n  display: inline-block;\n  border: 1px solid #ccc;\n  border-radius: 8px;\n  box-sizing: border-box;\n  color: #342d38; }\n\n.chat-footer-container {\n  position: fixed;\n  bottom: 25px;\n  left: 25px;\n  right: 25px; }\n\n.account-sidenav {\n  margin-top: 2%;\n  width: 250px;\n  padding: 2px; }\n\n.account-sidenav .mat-nav-list {\n    box-sizing: border-box; }\n\n.account-sidenav .mat-nav-list .mat-list-item {\n      height: 42px;\n      font-size: 13px; }\n\n.logo {\n  margin-bottom: -2%; }\n\n.account-content {\n  min-height: 400px;\n  padding: 2px;\n  overflow: visible; }\n\n.account-content.p-left {\n    padding-left: 16px; }\n\n.account-content .header-row {\n    background: #fff;\n    padding: 0 16px;\n    height: 56px; }\n\n.account-content .account-wrapper {\n    margin-top: 16px;\n    padding: 16px;\n    background: #fff; }\n\n.funky-show-hide.ng-hide-add {\n  -webkit-transform: rotateZ(0);\n          transform: rotateZ(0);\n  -webkit-transform-origin: right;\n          transform-origin: right;\n  transition: all 0.5s ease-in-out; }\n\n.funky-show-hide.ng-hide-add.ng-hide-add-active {\n  -webkit-transform: rotateZ(-135deg);\n          transform: rotateZ(-135deg); }\n\n.funky-show-hide.ng-hide-remove {\n  -webkit-transform: rotateY(90deg);\n          transform: rotateY(90deg);\n  -webkit-transform-origin: left;\n          transform-origin: left;\n  transition: all 0.5s ease; }\n\n.funky-show-hide.ng-hide-remove.ng-hide-remove-active {\n  -webkit-transform: rotateY(0);\n          transform: rotateY(0); }\n\n.check-element {\n  border: 1px solid black;\n  opacity: 1;\n  padding: 10px; }\n\n.form_view {\n  margin: auto;\n  width: 75%;\n  margin-top: 3%; }\n\n.form_div {\n  align-items: center;\n  margin: auto;\n  width: 80%;\n  background-color: white;\n  margin-bottom: 10%; }\n\n.new_price {\n  margin-left: 40%; }\n\n.form-view {\n  width: 90%; }\n\n.inner_div {\n  margin: auto;\n  width: 90%; }\n\n.above_tab {\n  margin-top: 2%;\n  border-style: solid;\n  border-width: 1px;\n  border-color: #dedede; }\n\n.adds_view {\n  margin-top: 2%;\n  margin-bottom: 20px;\n  width: 450px;\n  box-shadow: 5px 6px 6px #bfbdc1; }\n\n.chat_view {\n  margin-top: 2%;\n  width: 450px; }\n\n.message_view {\n  margin-top: 2%;\n  width: 600px;\n  height: 500px; }\n\n.mymessages {\n  width: auto;\n  display: block;\n  font-family: proxr;\n  padding: 2%;\n  text-align: left;\n  word-wrap: break-word; }\n\n.hismessages {\n  text-align: right;\n  color: #156dbf;\n  width: auto;\n  font-family: proxr;\n  padding: 2%;\n  word-wrap: break-word; }\n\n.pics {\n  border: 1px;\n  border-style: solid;\n  border-color: black;\n  height: 5%;\n  width: 5%; }\n\n.pictures {\n  height: 135px;\n  width: 170px;\n  margin-left: -2px;\n  margin-bottom: -5px;\n  -o-object-fit: cover;\n     object-fit: cover; }\n\n.titl {\n  font-size: 4vmin;\n  text-align: center;\n  color: #5a555e;\n  position: absolute;\n  left: 15%;\n  margin-top: 10px;\n  font-weight: bold; }\n\n.price {\n  font-size: 4vmin;\n  text-align: center;\n  color: black;\n  position: absolute;\n  left: 65%;\n  margin-top: 10px;\n  font-weight: bold; }\n\n.edit {\n  font-size: 2.5vmin;\n  position: absolute;\n  left: 35%;\n  margin-top: 40px;\n  color: black;\n  font-weight: 400;\n  text-decoration: underline; }\n\n.preview {\n  font-size: 2.5vmin;\n  position: absolute;\n  left: 50%;\n  margin-top: 40px;\n  color: #173b95;\n  font-weight: 400;\n  text-decoration: underline; }\n\n.preview1 {\n  font-size: 2.5vmin;\n  position: absolute;\n  left: 15%;\n  margin-top: 40px;\n  color: #173b95;\n  font-weight: 400;\n  text-decoration: underline; }\n\n.created {\n  font-size: 2.5vmin;\n  text-align: center;\n  color: #bfbdc1;\n  position: absolute;\n  left: 15%;\n  margin-top: 90px;\n  font-weight: bold; }\n\n.msgs {\n  position: absolute;\n  left: 90%;\n  font-size: 150%;\n  margin-top: 107px;\n  color: #173b95; }\n\n.createat {\n  position: absolute;\n  left: 70%;\n  font-size: 2vmin;\n  margin-top: 107px;\n  color: #173b95; }\n\n.boost {\n  height: 25px;\n  width: 15%;\n  float: right;\n  margin-top: 17px;\n  margin-right: 7px; }\n\n.status_but {\n  width: 10%;\n  float: right;\n  margin-top: 10px;\n  margin-right: 5px;\n  text-align: center; }\n\n.status_but1 {\n  width: 10%;\n  float: right;\n  margin-top: 30px;\n  margin-right: 10px;\n  text-align: center; }\n\n.status_but2 {\n  width: 10%;\n  float: right;\n  margin-top: 80px;\n  margin-right: -88px;\n  text-align: center; }\n\n.sold_but {\n  font-family: proxr;\n  float: right;\n  margin-top: 18%;\n  margin-right: 3%;\n  border-radius: 7%; }\n\n.deactivate {\n  position: absolute;\n  left: 82%;\n  margin-top: 70px;\n  color: #f41b23;\n  font-family: proxr;\n  font-size: 60%;\n  font-style: underline;\n  text-decoration: underline; }\n\n.proceed {\n  position: absolute;\n  left: 82%;\n  margin-top: 70px;\n  color: #156dbf;\n  font-family: proxr;\n  font-size: 60%;\n  font-style: underline;\n  text-decoration: underline; }\n\n.slide {\n  position: absolute;\n  left: 80%;\n  font-size: 4vmin;\n  margin-top: 20px; }\n\n.acc_rjj {\n  height: 10%;\n  width: 10%;\n  float: right;\n  margin-top: 45px;\n  margin-right: 2%; }\n\n.tick_cross {\n  float: right;\n  margin-top: 45px;\n  margin-right: 2%;\n  background-color: #f41b23;\n  color: white; }\n\n.tick_cross1 {\n  float: right;\n  margin-top: 45px;\n  margin-right: 2%;\n  background-color: #173b95;\n  color: white; }\n\n.all-products {\n  min-height: 400px;\n  padding: 2px;\n  overflow: hidden; }\n\n.all-products.p-left {\n    padding-left: 16px; }\n\n.products-wrapper {\n  margin: 8px -8px; }\n\n.products-wrapper .col {\n    padding: 8px; }\n\n.review-order-table.mat-table {\n  display: block;\n  overflow-x: auto; }\n\n.review-order-table.mat-table .mat-row, .review-order-table.mat-table .mat-header-row {\n    display: flex;\n    border-bottom-width: 1px;\n    border-bottom-style: solid;\n    align-items: center;\n    min-height: 48px;\n    padding: 0 24px;\n    min-width: 760px; }\n\n.review-order-table.mat-table .mat-row {\n    min-height: 60px; }\n\n.review-order-table.mat-table .mat-cell, .review-order-table.mat-table .mat-header-cell {\n    flex: 1;\n    overflow: hidden;\n    word-wrap: break-word; }\n\n.review-order-table.mat-table .mat-header-cell {\n    font-size: 14px; }\n\n.review-order-table.mat-table .mat-cell img {\n    width: 60px; }\n\n.memory_icon {\n  height: 10px;\n  width: auto; }\n\n.colour_icon {\n  height: 10px;\n  width: auto; }\n\n.head {\n  font-weight: bold;\n  font-size: 140%;\n  font-family: proxs;\n  color: #342d38; }\n\n.title_p {\n  text-align: center;\n  position: absolute;\n  margin-left: 2%;\n  margin-top: 10px;\n  font-weight: bold;\n  font-size: 100%;\n  font-family: proxs;\n  color: #342d38; }\n\n.title_d {\n  position: absolute;\n  margin-left: 2%;\n  margin-top: 36px;\n  font-family: proxr;\n  font-size: 60%;\n  color: #5a555e; }\n\n.title_s {\n  position: absolute;\n  margin-left: 2%;\n  margin-top: 67px;\n  font-family: proxr;\n  font-weight: 400;\n  font-size: 70%;\n  color: #342d38; }\n\n.title_s1, .title_s .memory_icon {\n  display: inline; }\n\n.title_c {\n  position: absolute;\n  margin-left: 2%;\n  margin-top: 83px;\n  font-size: 70%;\n  font-family: proxr;\n  font-weight: 400;\n  color: #342d38; }\n\n.title_pr {\n  font-size: 130%;\n  font-family: proxs;\n  position: absolute;\n  margin-top: 106px;\n  margin-left: 8.5%; }\n\n.title_pri {\n  font-size: 130%;\n  font-family: proxs;\n  position: absolute;\n  margin-top: 106px;\n  margin-left: 14%; }\n\n.title_pkr {\n  position: absolute;\n  margin-left: 2%;\n  position: absolute;\n  font-size: 100%;\n  margin-top: 110px;\n  margin-left: 2%; }\n\n.post_but {\n  margin-top: -4%;\n  width: 10%;\n  float: right; }\n\n.submit_but {\n  width: 10%;\n  float: right; }\n\n.delete_but {\n  width: 10%;\n  float: left; }\n\n.upper {\n  font-size: 180%;\n  font-family: proxs;\n  position: absolute;\n  margin-left: 19%;\n  margin-top: 2%; }\n\n.first {\n  float: left; }\n\n.second1 {\n  float: right; }\n\n.first:active {\n  background-color: #156dbf;\n  border-radius: 7px 7px 7px 7px;\n  color: white; }\n\n.first:focus {\n  background-color: #156dbf;\n  border-radius: 7px 7px 7px 7px;\n  color: white; }\n\n.second1:active {\n  background-color: #156dbf;\n  border-radius: 7px 7px 7px 7px;\n  color: white; }\n\n.second1:focus {\n  background-color: #156dbf;\n  border-radius: 7px 7px 7px 7px;\n  color: white; }\n\n.user_img {\n  border: 3px solid;\n  border-color: #156dbf;\n  position: absolute; }\n\n.user {\n  font-size: 300%; }\n\n.name {\n  position: absolute;\n  left: 190px; }\n\n.chat_det {\n  margin-left: 20%;\n  font-family: proxr;\n  color: #342d38; }\n\n.chat_head {\n  margin-left: 20%;\n  font-size: 120%;\n  font-family: proxs;\n  color: #342d38; }\n\n.chat_title {\n  font-family: proxr;\n  margin-left: 20%;\n  color: #5a555e; }\n\n.chat_time {\n  font-family: proxr;\n  float: right;\n  color: #5a555e; }\n\n.bar {\n  height: 10px;\n  width: 100%; }\n\n.acc_div {\n  margin: auto;\n  width: 90%;\n  margin-left: -1%; }\n\n.change_photo {\n  text-align: center;\n  position: relative;\n  left: 180px;\n  margin-top: 22px; }\n\n.update_photo {\n  text-align: center;\n  position: relative;\n  left: 190px;\n  margin-top: 10px; }\n\n.package {\n  float: right;\n  margin-top: 15px;\n  font-size: 130%;\n  color: #156dbf;\n  margin-right: 8%; }\n\n.package_names {\n  font-family: proxr;\n  float: left;\n  margin-top: 10px;\n  font-size: 3vmin;\n  color: #342d38; }\n\n.package_names:active {\n  font-family: proxr;\n  float: left;\n  margin-top: 10px;\n  font-size: 3vmin;\n  color: #156dbf;\n  border-radius: 7px 7px 7px 7px;\n  border: 1px solid #156dbf; }\n\n.package_names:focus {\n  font-family: proxr;\n  float: left;\n  margin-top: 10px;\n  font-size: 3vmin;\n  color: #156dbf;\n  border-radius: 7px 7px 7px 7px;\n  border: 1px solid #156dbf; }\n\n.attributes {\n  list-style-type: none;\n  margin: 0;\n  padding: 0; }\n\n.new_name {\n  font-family: proxs; }\n\n.edit_form {\n  font-family: proxr; }\n\n.picture_area > input {\n  display: none; }\n\n.for_text {\n  font-family: proxr;\n  position: absolute;\n  left: 190px;\n  margin-top: 4px;\n  font-size: 60%; }\n\n.upg {\n  font-family: proxr;\n  font-size: 60%;\n  margin-top: 27px;\n  position: absolute;\n  right: 85px; }\n\n@media (max-width: 400px) {\n  .adds_view {\n    border-style: solid;\n    margin-top: 8%;\n    border-width: 1%;\n    border-color: #dedede;\n    margin-bottom: 20px;\n    width: 320px;\n    box-shadow: 5px 6px 6px #bfbdc1; }\n  .form_view {\n    margin-left: 6%;\n    width: 100%;\n    margin-top: 2%; }\n  .title_pr {\n    font-size: 110%;\n    font-family: proxs;\n    position: absolute;\n    margin-top: 106px;\n    margin-left: 11%; }\n  .title_pri {\n    font-size: 110%;\n    font-family: proxs;\n    position: absolute;\n    margin-top: 106px;\n    margin-left: 16%; }\n  .title_pkr {\n    position: absolute;\n    margin-left: 2%;\n    position: absolute;\n    font-size: 80%;\n    margin-top: 110px;\n    margin-left: 2%; }\n  .boost {\n    height: 25px;\n    width: 15%;\n    float: right;\n    margin-top: 17px; }\n  .logo {\n    height: 0px;\n    width: auto;\n    margin-left: -50%; }\n  .post_but {\n    margin-top: -3%;\n    width: 15%;\n    float: right;\n    margin-right: 15%; }\n  .head {\n    font-weight: bold;\n    font-size: 140%;\n    font-family: proxs;\n    color: #342d38;\n    position: absolute;\n    margin-left: -10%;\n    margin-top: -5%; }\n  .upper {\n    font-size: 180%;\n    font-family: proxs;\n    position: absolute;\n    margin-left: 1%;\n    margin-top: 7%;\n    margin-bottom: 10%; }\n  .acc_div {\n    margin: auto;\n    width: 100%;\n    margin-left: -1%; }\n  .name {\n    position: absolute;\n    left: 100px; }\n  .change_photo {\n    text-align: center;\n    position: relative;\n    left: 100px;\n    margin-top: 22px; }\n  .update_photo {\n    text-align: center;\n    position: relative;\n    left: 100px;\n    margin-top: 10px; }\n  .for_text {\n    position: absolute;\n    left: 100px;\n    margin-top: 10px; }\n  .package {\n    float: right;\n    margin-top: 20px;\n    font-size: 100%;\n    color: #156dbf;\n    margin-right: 15%; }\n  .upg {\n    font-family: proxr;\n    font-size: 60%;\n    margin-top: 27px;\n    position: absolute;\n    right: 15px; }\n  .details {\n    position: absolute;\n    left: 50%;\n    margin-top: -60px; } }\n"

/***/ }),

/***/ "./src/app/pages/myaccs/myaccs.component.ts":
/*!**************************************************!*\
  !*** ./src/app/pages/myaccs/myaccs.component.ts ***!
  \**************************************************/
/*! exports provided: MyaccsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyaccsComponent", function() { return MyaccsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../app.service */ "./src/app/app.service.ts");
/* harmony import */ var _chat_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../chat.service */ "./src/app/chat.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// const socket = io('https://celx-dev.herokuapp.com');
var MyaccsComponent = /** @class */ (function () {
    function MyaccsComponent(router, appService, chatService, formBuilder, snackBar) {
        this.router = router;
        this.appService = appService;
        this.chatService = chatService;
        this.formBuilder = formBuilder;
        this.snackBar = snackBar;
        this.sidenavOpen = true;
        this.fileToUpload = null;
        this.first = true;
        this.user = false;
        this.pass = false;
        this.adds = true;
        this.acc = false;
        this.hist_but = true;
        this.offer_but = false;
        this.boost = true;
        this.deactivate = true;
        this.chat = false;
        this.msg = false;
        this.pkr = true;
        this.mes = false;
        this.off_rc = false;
        this.status_but1 = false;
        this.pck = false;
        this.up = true;
        this.pay = false;
        this.head_h = true;
        this.head_m = false;
        this.head_o = false;
        this.head_f = false;
        this.head_he = false;
        this.head_a = false;
        this.head_acc = true;
        this.disable = true;
        this.headi = true;
        this.offer_view = false;
        this.headings = "MY ADS";
        this.myuserid = localStorage.getItem('userid');
        // socket.on('room',(chat)=>{
        //  console.log(chat.chat);
        //  localStorage.setItem("chatItem",JSON.stringify(chat.chat));
        // })
    }
    MyaccsComponent.prototype.ngDoCheck = function () {
        // console.log("****")
        //   if((JSON.parse(localStorage.getItem("chatItem")))._id){
        //     //  console.log("its a message");
        //       this.testFunction(JSON.parse(localStorage.getItem("chatItem")));
        //   }
        //  console.log(this.newmessage);
        //  JSON.parse(localStorage.getItem("chatItem"));
        //console.log("logged",x);
        // socket.on('room',(kp)=>{
        //   console.log(kp.chat.message);
        // });
    };
    MyaccsComponent.prototype.ngOnInit = function () {
        var _this = this;
        localStorage.getItem('userid');
        this.connection = this.chatService.getMessages().subscribe(function (message) {
            _this.messages.push(message);
            // console.log(messages);
            console.log(message);
        });
        // this.socketConnection();
        //  socket.on('event', function(data){console.log("evet")});
        this.showadds();
        this.getallpackages();
        this.showuser();
        this.getallenums();
        this.retreiveCustomerCards();
        // this.myaddsoffers();
        this.passForm = this.formBuilder.group({
            'old_pass': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].minLength(6)])],
            'new_pass': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].minLength(6)])]
        });
        if (window.innerWidth < 960) {
            this.sidenavOpen = false;
        }
        ;
        this.mycurrency = localStorage.getItem('currency');
    };
    MyaccsComponent.prototype.onWindowResize = function () {
        (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
    };
    MyaccsComponent.prototype.test = function () {
        console.log("test");
    };
    MyaccsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.router.events.subscribe(function (event) {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_3__["NavigationEnd"]) {
                if (window.innerWidth < 960) {
                    _this.sidenav.close();
                }
            }
        });
    };
    // socket.on('room',function(kp){
    //   console.log(kp);
    // });
    MyaccsComponent.prototype.adds_h = function () {
    };
    MyaccsComponent.prototype.mk_offr = function () {
        this.offer_view = true;
        this.msg = false;
    };
    MyaccsComponent.prototype.canceloffer = function () {
        this.offer_view = false;
        this.msg = true;
    };
    // public socketConnection(){
    //   console.log("******************"+localStorage.getItem('userid')+"****************");
    //   console.log("connecting");
    //   socket.on('connect',function(){
    //     console.log("+++++++++Conected+++++++");
    //     socket.emit('user',{user_id:localStorage.getItem('userid')});
    //   })
    // }
    MyaccsComponent.prototype.testFunction = function (chat) {
        console.log("got chat");
        var c = localStorage.getItem("chatItem");
        if (localStorage.getItem("allMessages") != null && this.mes == true) {
            var a = "}," + c + "]";
            if ((localStorage.getItem("allMessages")).indexOf("}]") > -1) {
                var x = JSON.parse(localStorage.getItem("allMessages"));
                console.log(x.length);
                x[x.length] = JSON.parse(localStorage.getItem("chatItem"));
                this.messages = x;
                // var x = (localStorage.getItem("allMessages")).replace("}]",a);
                //
                // localStorage.setItem("allMessages",x)
                // console.log("AllMessages in  : ",localStorage.getItem("allMessages"))
                // this.messages = JSON.parse(x);
            }
        }
        //    var tchat = this.messages;
        //this.messages = tchat.push(chat);
    };
    MyaccsComponent.prototype.chat_s = function () {
        this.adds = false;
        this.acc = false;
        this.hid = false;
        this.head_a = false;
        this.head_m = true;
        this.head_h = false;
        this.head_o = false;
        this.head_f = false;
        this.hist_but = false;
        this.offer_but = false;
        this.head_acc = false;
        this.chat = true;
    };
    MyaccsComponent.prototype.acc_s = function () {
        // this.headings="ACCOUNT SETTINGS";
        this.headi = false;
        this.adds = false;
        this.acc = true;
        this.hid = false;
        this.head_a = true;
        this.head_h = false;
        this.head_o = false;
        this.head_f = false;
        this.hist_but = false;
        this.offer_but = false;
        this.head_acc = false;
        this.msg = false;
        this.chat = false;
        this.offer_view = false;
    };
    MyaccsComponent.prototype.edituser = function () {
        this.user = true;
        this.first = false;
        this.pass = false;
        this.up = false;
    };
    MyaccsComponent.prototype.cancel = function () {
        this.adds = true;
        this.hid = false;
        this.pay = false;
    };
    MyaccsComponent.prototype.canceledit = function () {
        this.user = false;
        this.pass = false;
        this.first = true;
        this.pck = false;
        this.up = true;
        this.pay = false;
    };
    MyaccsComponent.prototype.editpass = function () {
        this.pass = true;
        this.user = false;
        this.first = false;
    };
    MyaccsComponent.prototype.editpayment = function () {
        this.pay = true;
        this.user = false;
        this.first = false;
    };
    MyaccsComponent.prototype.updatepackage = function () {
        this.pck = true;
        this.first = false;
        this.up = false;
    };
    MyaccsComponent.prototype.adrouter = function () {
        this.router.navigate(['/sell']);
    };
    MyaccsComponent.prototype.adrouterhome = function () {
        this.router.navigate(['/']);
    };
    MyaccsComponent.prototype.getallpackages = function () {
        var _this = this;
        this.appService.getallpackages().subscribe(function (data) {
            console.log("packages", data);
            _this.packages = data['result'];
        });
    };
    MyaccsComponent.prototype.getAllChats = function () {
        var _this = this;
        this.headings = "MESSAGES";
        this.headi = true;
        this.chat_s();
        this.msg = false;
        this.chat = true;
        var off = [];
        this.appService.getAllChats().subscribe(function (data) {
            console.log("chats", data);
            _this.chats = data['result'];
            for (var k = 0; k < data['result'].length; k++) {
                if (data['result'][k].length > 0) {
                    console.log(data['result'][k]);
                }
                _this.dateTime = new Date(data['result'][k]['dateTime']);
                _this.chat_id = data['result'][k]['chat_id'];
                _this.chatadvert = data['result'][k]['advert_id'];
                console.log(_this.chat_id);
                console.log(_this.dateTime);
                _this.hour = _this.dateTime.getHours();
                _this.minute = _this.dateTime.getMinutes();
                _this.full = _this.hour + ':' + _this.minute;
                console.log(_this.full);
                for (var m = 0; m < data['result'][k].length; m++) {
                    console.log(data['result'][k]['advert_id'][m]['_id']);
                    console.log(data['result'][k]['advert_id'][m]);
                    console.log(data['result'][k]['advert_id']);
                }
            }
        });
    };
    MyaccsComponent.prototype.getAllMessages = function (value, advertid) {
        var _this = this;
        this.msg = true;
        this.chat = false;
        console.log("====", advertid);
        console.log("****", value);
        this.chathisid = value;
        this.chatadvertid = advertid;
        // console.log(this.chatadvertid);
        //  console.log(this.chathisid);
        this.myuserid = localStorage.getItem('userid');
        console.log(this.myuserid);
        this.appService.getAllMessages(this.myuserid, this.chathisid, this.chatadvertid).subscribe(function (data) {
            console.log("allMessages : ", data);
            _this.mes = true;
            _this.messages = data['result'];
            _this.messageuserid = _this.messages[0]['messageFrom'];
            console.log(_this.messageuserid);
            localStorage.setItem("allMessages", JSON.stringify(data['result']));
            if (data['result']) {
                var finalStatus = '';
                _this.messageresult = data['result'];
                console.log(_this.messageresult);
                _this.adTitle = data['result'][0]['advert_id']['title'];
                _this.adcolor = data['result'][0]['advert_id']['color'];
                _this.adstorage = data['result'][0]['advert_id']['storage'];
                _this.adpictures = data['result'][0]['advert_id']['pictures'][0];
                // var offersMatched = [];
                var count = 0;
                _this.chatService.startchat(_this.myuserid, _this.chathisid, _this.chatadvertid);
                _this.adddetails();
                // data['result']['offers'].forEach(function(i,idx,x){
                //   if(i.user_id == localStorage.getItem("userid")){
                //     offersMatched[count] = i;
                //     count = count+1;
                //   }
                //   if(idx == x.length-1){
                //     console.log("matched offers :",offersMatched);
                //     // this.offerstatus= offersMatched;
                //     // console.log("direct",(offersMatched[0]['status']));
                //     if (offersMatched[0]['status'] == "pending"){
                //       console.log("pending");
                //       // this.adstorage = "amiii jee";
                //       this.offerstatus = "pending";
                //       console.log(this.offerstatus);
                //     }else if(offersMatched[0]['status'] == "re-counter"){
                //       console.log("re-counter");
                //       this.offerstatus = "re-counter";
                //       console.log(this.offerstatus);
                //     } else if (offersMatched[0]['status'] == "counter"){
                //       console.log("counter");
                //       this.offerstatus = "counter";
                //       console.log(this.offerstatus);
                //     } else if (offersMatched[0]['status'] == "rejected"){
                //       console.log("rejected");
                //       this.offerstatus = "rejected";
                //       console.log(this.offerstatus);
                //     } else if (offersMatched[0]['status'] == "accepted"){
                //       console.log("accepted");
                //       this.offerstatus = "accepted";
                //       console.log(this.offerstatus);
                //     }
                //
                //   }
                // })
                // this.aduserid=data['result']['user_id']['_id'];
            }
            // socket.emit('startchat',{myId:this.myuserid,hisId:this.chathisid,advert_id:this.chatadvertid});
            // console.log(this.advertinmsg);
            // console.log(this.titleinmsg);
            // console.log(this.storageinmsg);
            // console.log(this.colorinmsg);
            // for(var k=0;k<data['result'].length;k++){
            //   if(data['result'][k].length>0){
            //     console.log(data['result'][k]);
            //   }
            //   // this.messages=data['result'][k];
            //   this.messageFrom=data['result'][k]['messageFrom'];
            //   this.message=data['result'][k]['message'];
            //
            //   console.log(this.messages);
            //   console.log(this.messageFrom);
            //   console.log(this.message);
            //
            // }
        });
    };
    MyaccsComponent.prototype.adddetails = function () {
        var _this = this;
        this.appService.getProductById(this.chatadvertid).subscribe(function (data) {
            if (data['result']['user_id']['_id']) {
                _this.aduserid = data['result']['user_id']['_id'];
            }
            console.log("advertisement details", data);
            console.log(localStorage.getItem("userid"));
            var offersMatched;
            var offersNotMatched = [];
            var count = 0;
            if (data['result']['user_id']['_id'] == localStorage.getItem("userid")) {
                console.log("else if");
                // offersNotMatched[count] = data['result']['offers'];
                for (var j = 0; j < data['result']['offers'].length; j++) {
                    offersNotMatched[count] = data['result']['offers'][j];
                    console.log(data['result']['offers'][j]);
                    console.log("id from messages", _this.messageuserid);
                    console.log("zero index", data['result']['offers'][0]);
                    count = count + 1;
                    _this.offersbyseller = offersNotMatched;
                    console.log("offersNotMatched", _this.offersbyseller);
                    // this.offersNotMatchedid[count] = data['result']['offers'][j]['_id'];
                }
                //     count = count+1;
                //     // console.log("daannniiiiiiiiiiiiii");
                //     // console.log("daannniiiiiiiiiiiiii" ,offersNotMatched );
                //     if(offersNotMatched[j]['status'] == "re-counter"){
                //     this.offersNotMatchedid = offersNotMatched[j]['_id'];
                //     this.offerstatusseller = "re-counter";
                //     console.log("re-counter");
                //     // break;
                //   }
                //   if(offersNotMatched[j]['status'] == "pending"){
                //     console.log("pending");
                //     this.offersNotMatchedid = offersNotMatched[j]['_id'];
                //     this.offerstatusseller = "pending";
                //
                //     // break;
                //   }
                //   if(offersNotMatched[j]['status'] == "counter"){
                //     console.log("counter");
                //     this.offersNotMatchedid = offersNotMatched[j]['_id'];
                //     this.offerstatusseller = "counter";
                //
                //     // break;
                //   }
                //   if(offersNotMatched[j]['status'] = "rejected"){
                //     console.log("rejected");
                //     this.offersNotMatchedid = offersNotMatched[j]['_id'];
                //     this.offerstatusseller == "rejected";
                //
                //     // break;
                //   }
                //   console.log(this.offerstatusseller);
                // }
            }
            for (var i = 0; i < data['result']['offers'].length; i++) {
                console.log(i);
                console.log("do something");
                if (data['result']['offers'][i]['user_id'] == localStorage.getItem("userid")) {
                    offersMatched[count] = data['result']['offers'][i];
                    count = count + 1;
                    console.log("first if");
                }
                console.log("between ifs");
                if (_this.adidstring.indexOf(data['result']['offers'][i]['advert_id']) != -1) {
                    console.log("your id matched");
                    _this.mymatchedad = "matchedad";
                }
                else {
                    _this.mymatchedad = "notmatched";
                    console.log("your id did not matched");
                }
                if (offersMatched != '' && offersMatched != null && offersMatched != undefined) {
                    if (i == data['result']['offers'].length - 1) {
                        console.log("matched", offersMatched);
                        _this.matchedofferid = offersMatched[offersMatched.length - 1]['_id'];
                        _this.matchedofferprice = offersMatched[offersMatched.length - 1]['offered_price'];
                        console.log(_this.matchedofferid);
                        // this.offerstatus = offersMatched;
                        // console.log(this.offerstatus);
                        if (offersMatched[offersMatched.length - 1]['status'] == "pending") {
                            console.log("pending");
                            // this.adstorage = "amiii jee";
                            _this.offerstatus = "pending";
                            console.log(_this.offerstatus);
                        }
                        else if (offersMatched[offersMatched.length - 1]['status'] == "re-counter") {
                            console.log("re-counter");
                            _this.offerstatus = "re-counter";
                            console.log(_this.offerstatus);
                        }
                        else if (offersMatched[offersMatched.length - 1]['status'] == "counter") {
                            console.log("counter");
                            _this.offerstatus = "counter";
                            console.log(_this.offerstatus);
                        }
                        else if (offersMatched[offersMatched.length - 1]['status'] == "rejected") {
                            console.log("rejected");
                            _this.offerstatus = "rejected";
                            console.log(_this.offerstatus);
                        }
                        else if (offersMatched[offersMatched.length - 1]['status'] == "accepted") {
                            console.log("accepted");
                            _this.offerstatus = "accepted";
                            console.log(_this.offerstatus);
                        }
                    }
                }
            }
        });
    };
    MyaccsComponent.prototype.acceptseller = function (value) {
        var _this = this;
        // console.log(value);
        var tick = "accepted";
        var acceptedoffer = value;
        console.log(acceptedoffer);
        var count = 0;
        var sal = [];
        this.appService.accept(acceptedoffer, tick).subscribe(function (data) {
            console.log("accept_reject adds =>", data);
            // this.sale=data['result']['sail']['seller_id'];
            _this.sale_seller = data['sail']['_id'];
            console.log(_this.sale_seller);
            _this.adddetails();
            // this.appService.getsale(this.sale_seller).subscribe(data=>{
            //   sessionStorage.setItem("sellersale", JSON.stringify(data['sail']));
            //   console.log("sellersale : ",JSON.parse(sessionStorage.getItem("sellersale")));
            //   console.log(data);
            // })
        });
    };
    MyaccsComponent.prototype.rejectseller = function (value) {
        var _this = this;
        // console.log(value);
        var cross = "rejected";
        var acceptedoffer = value;
        console.log(acceptedoffer);
        var count = 0;
        var sal = [];
        this.appService.reject(acceptedoffer, cross).subscribe(function (data) {
            console.log("accept_reject adds =>", data);
            // this.sale=data['result']['sail']['seller_id'];
            _this.sale_seller = data['sail']['_id'];
            console.log(_this.sale_seller);
            _this.adddetails();
            // this.appService.getsale(this.sale_seller).subscribe(data=>{
            //   sessionStorage.setItem("sellersale", JSON.stringify(data['sail']));
            //   console.log("sellersale : ",JSON.parse(sessionStorage.getItem("sellersale")));
            //   console.log(data);
            // })
        });
    };
    MyaccsComponent.prototype.accept = function () {
        var _this = this;
        // console.log(value);
        var tick = "accepted";
        var acceptedoffer = this.matchedofferid;
        console.log(acceptedoffer);
        var count = 0;
        var sal = [];
        this.appService.accept(acceptedoffer, tick).subscribe(function (data) {
            console.log("accept_reject adds =>", data);
            // this.sale=data['result']['sail']['seller_id'];
            _this.sale_seller = data['sail']['_id'];
            console.log(_this.sale_seller);
            _this.myaddsoffers();
            // this.appService.getsale(this.sale_seller).subscribe(data=>{
            //   sessionStorage.setItem("sellersale", JSON.stringify(data['sail']));
            //   console.log("sellersale : ",JSON.parse(sessionStorage.getItem("sellersale")));
            //   console.log(data);
            // })
        });
    };
    MyaccsComponent.prototype.reject = function () {
        var _this = this;
        // console.log(value);
        var cross = "rejected";
        var acceptedoffer = this.matchedofferid;
        console.log(acceptedoffer);
        var count = 0;
        var sal = [];
        this.appService.reject(acceptedoffer, cross).subscribe(function (data) {
            console.log("accept_reject adds =>", data);
            // this.sale=data['result']['sail']['seller_id'];
            _this.sale_seller = data['sail']['_id'];
            console.log(_this.sale_seller);
            _this.myaddsoffers();
            // this.appService.getsale(this.sale_seller).subscribe(data=>{
            //   sessionStorage.setItem("sellersale", JSON.stringify(data['sail']));
            //   console.log("sellersale : ",JSON.parse(sessionStorage.getItem("sellersale")));
            //   console.log(data);
            // })
        });
    };
    MyaccsComponent.prototype.updateofferchat = function (value) {
        var _this = this;
        console.log(value);
        var updateprice = value;
        console.log(updateprice);
        console.log(this.matchedofferid);
        this.appService.updateofferchat(this.matchedofferid, updateprice).subscribe(function (data) {
            console.log(data);
            _this.canceloffer();
        });
    };
    MyaccsComponent.prototype.counterofferchat = function (value) {
        var _this = this;
        console.log(value);
        var updateprice = value;
        console.log(updateprice);
        this.appService.counterofferchat(this.chatadvertid, this.chathisid, updateprice).subscribe(function (data) {
            console.log(data);
            _this.canceloffer();
        });
    };
    MyaccsComponent.prototype.sendMessagechat = function (chat_msg) {
        this.chatService.sendMessage(this.myuserid, this.chathisid, this.chatadvertid, chat_msg);
        this.chat_msg = '';
    };
    MyaccsComponent.prototype.sendmessage = function (chat_msg) {
        console.log(chat_msg);
        // socket.emit('room',{myId:this.myuserid,hisId:this.chathisid,advert_id:this.chatadvertid,text:chat_msg});
    };
    MyaccsComponent.prototype.scmsg = function (chat) {
        this.messages[this.messages.length] = chat;
    };
    MyaccsComponent.prototype.setNewpack = function (value) {
        console.log(value);
        this.package_id = value;
    };
    MyaccsComponent.prototype.updateUserPackage = function () {
        var _this = this;
        console.log(this.package_id);
        this.appService.updateUserPackage(this.package_id).subscribe(function (data) {
            console.log(data);
            _this.snackBar.open('Package Updated', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            _this.showuser();
        });
    };
    MyaccsComponent.prototype.showuser = function () {
        var _this = this;
        this.appService.getUserDetails().subscribe(function (data) {
            console.log(data);
            _this.userdetails = data['result'];
            _this.username = data['result']['name'];
            _this.useremail = data['result']['email'];
            _this.usercurrency = data['result']['currency'];
            _this.id = data['result']['_id'];
            _this.profilePicture = data['result']['profilePicture'];
            _this.package = [data['result']['package']];
            _this.stripeID = [data['result']['stripeID']];
            console.log(_this.username);
            console.log(_this.id);
        });
    };
    MyaccsComponent.prototype.retreiveCustomerCards = function () {
        var _this = this;
        this.appService.retreiveCustomerCards().subscribe(function (data) {
            console.log(data);
            _this.cards = data['result'];
        });
    };
    MyaccsComponent.prototype.getallenums = function () {
        var _this = this;
        this.appService.getenums().subscribe(function (data) {
            console.log(data);
            _this.enums = data['result']['currency'];
        });
    };
    MyaccsComponent.prototype.deletecard = function (value) {
        var _this = this;
        console.log(value);
        this.card_id = value;
        this.appService.deletecard(this.card_id, this.stripeID).subscribe(function (data) {
            console.log(data);
            _this.snackBar.open('Deleted', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            // this.retreiveCustomerCards();
            _this.showuser();
        });
    };
    // public currencyselect(new_currency){
    //   // console.log(new_currency);
    //   this.currency= value;
    //   console.log(this.currency);
    // }
    MyaccsComponent.prototype.handleFileInput = function (event) {
        this.file = event.target.files[0];
        console.log("hassam");
        console.log(this.file);
        // if (event.target.files && event.target.files[0]) {
        //     const file = event.target.files[0];
        // }
    };
    MyaccsComponent.prototype.updateuserimage = function () {
        var _this = this;
        this.appService.uploaduserimage(this.file, this.id).subscribe(function (data) {
            console.log(data);
            _this.snackBar.open('Successfull', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            _this.showuser();
        });
    };
    MyaccsComponent.prototype.updateUser = function (new_name, new_currency) {
        var _this = this;
        if (new_currency != undefined && new_currency != null && new_currency != '') {
            this.curr_lowercase = new_currency.toUpperCase();
        }
        console.log(this.curr_lowercase, new_name);
        this.appService.updateUser(new_name, this.curr_lowercase).subscribe(function (data) {
            console.log(data);
            // localStorage.removeItem('jwt');
            localStorage.setItem('jwt', data['token']);
            console.log(localStorage.getItem('jwt'));
            _this.snackBar.open('User Details Updated', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            localStorage.removeItem('currency');
            console.log(data['user']['currency']);
            localStorage.setItem('currency', data['user']['currency']);
            _this.mycurrency = localStorage.getItem('currency');
            _this.showuser();
            _this.acc = true;
            _this.head_a = true;
            _this.user = false;
            _this.first = true;
            _this.up = true;
            // this.showadds();
        });
    };
    MyaccsComponent.prototype.onpassFormSubmit = function (values) {
        var _this = this;
        if (this.passForm.valid) {
            this.appService.changepassword(this.passForm.value.old_pass, this.passForm.value.new_pass).subscribe(function (data) {
                console.log(data);
                _this.snackBar.open('Passwords updated', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
                _this.showuser();
            }, function (err) {
                _this.mismatch = "Old Password Incorrect";
                console.log("password mismatch");
            });
        }
    };
    // public boostad(value){
    //   console.log(value);
    //   this.boostmyad=value;
    //   var boosttrue = "true";
    //   this.appService.boostad(this.boostmyad.boosttrue).subscribe(data=>{
    //     console.log("boost", data);
    //     if(data['result'] ){
    //     this.snackBar.open('Advertisement Boosted successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    //     }
    //   },err=>{
    //     this.snackBar.open('No Boosts Left!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    //   });
    // }
    MyaccsComponent.prototype.updateoffer = function (createdOffer) {
        this.offeridnew = createdOffer;
        console.log(this.offeridnew);
        this.adds = false;
        // this.hid=true;
        if (this.hid == true) {
            this.hid = false;
        }
        else {
            this.hid = true;
        }
        if (this.Edit == 'Edit') {
            this.Edit = "Submit";
        }
        else {
            this.Edit = "Edit";
        }
    };
    MyaccsComponent.prototype.deleteoffer = function (createdOffer, _id) {
        var _this = this;
        this.offeridnew = createdOffer;
        this.offeradvertid = _id;
        this.appService.removeMyCreatedOffer(this.offeradvertid, this.offeridnew).subscribe(function (data) {
            console.log(data);
            _this.snackBar.open('Offer Deleted', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            _this.offersbyme();
        });
    };
    MyaccsComponent.prototype.submitPrice = function (price) {
        console.log(this.offeridnew);
        console.log(price);
        this.appService.updateoffer(this.offeridnew, price).subscribe(function (data) {
            console.log(data);
        });
        this.hid = false;
        this.adds = true;
    };
    MyaccsComponent.prototype.showadds = function () {
        var _this = this;
        this.headings = "MY ADS";
        this.headi = true;
        this.adds = true;
        this.acc = false;
        this.boost = true;
        this.disable = true;
        this.deactivate = true;
        this.hist_but = true;
        this.offer_but = false;
        this.status_but = false;
        this.status_but1 = false;
        this.proceed = false;
        this.offer_create = false;
        this.pkr = true;
        this.off_pr = false;
        this.off_rc = false;
        this.favour_but = false;
        this.hid = false;
        this.head_h = true;
        this.head_o = false;
        this.head_f = false;
        this.head_a = false;
        this.chat = false;
        this.msg = false;
        this.offer_view = false;
        console.log("before service request");
        this.appService.myadds().subscribe(function (data) {
            console.log("my adds", data);
            _this.myadd = data['result'];
            _this.myad_id = data['result']['_id'];
            _this.mytitle = data['result']['title'];
            _this.myprice = data['result']['price'];
            _this.visible = data['result']['visible'];
            console.log("visible", _this.visible);
            for (var i = 0; i < data['result'].length; i++) {
                data['result'][i]['price'] = parseFloat(data['result'][i]['price']).toFixed(2);
                if (data['result'][i]['pictures'].length > 0) {
                    for (var j = 0; j < data['result'][i]['pictures'].length; j++) {
                        if (data['result'][i]['pictures'][j]) {
                            data['result'][i]['pictures'][j] = data['result'][i]['pictures'][j].replace(".mp4", ".jpg");
                            data['result'][i]['pictures'][j] = data['result'][i]['pictures'][j].replace(".mov", ".jpg");
                        }
                    }
                }
                _this.adidstring = _this.adidstring + data['result'][i]['_id'];
                console.log(_this.adidstring.indexOf(data['result'][i]['_id']));
                if (_this.adidstring.indexOf(data['result'][i]['_id']) != -1) {
                    //matched
                }
                else {
                    //not macthed
                }
            }
        });
    };
    MyaccsComponent.prototype.myPurchases = function () {
        var _this = this;
        this.off_pr = false;
        this.headings = "PURCHASES";
        console.log("before service request");
        this.appService.myPurchases().subscribe(function (data) {
            console.log("my purchases", data);
            if (data['result']) {
                _this.myadd = data['result'];
            }
            for (var i = 0; i < data['result'].length; i++) {
                data['result'][i]['price'] = parseFloat(data['result'][i]['price']).toFixed(2);
                if (data['result'][i]['pictures'].length > 0) {
                    for (var j = 0; j < data['result'][i]['pictures'].length; j++) {
                        if (data['result'][i]['pictures'][j]) {
                            data['result'][i]['pictures'][j] = data['result'][i]['pictures'][j].replace(".mp4", ".jpg");
                            data['result'][i]['pictures'][j] = data['result'][i]['pictures'][j].replace(".mov", ".jpg");
                        }
                    }
                }
            }
        }, function (err) {
            if (err.status == 404) {
                console.log("got error");
                _this.router.navigate(['/account']);
                _this.snackBar.open('No Purchases Yet', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
                _this.myadd = [];
            }
        });
    };
    MyaccsComponent.prototype.offersbyme = function () {
        var _this = this;
        this.headings = "OFFERS";
        this.headi = true;
        this.adds = true;
        this.acc = false;
        this.boost = false;
        this.disable = false;
        this.deactivate = false;
        this.msg = false;
        this.hist_but = false;
        this.offer_but = true;
        this.status_but = true;
        this.proceed = true;
        this.offer_create = true;
        this.pkr = false;
        this.off_pr = true;
        this.off_rc = false;
        this.favour_but = false;
        this.hid = false;
        this.status_but1 = false;
        this.head_h = false;
        this.head_o = true;
        this.head_f = false;
        this.head_a = false;
        this.msg = false;
        this.chat = false;
        this.offer_view = false;
        this.appService.offersbyme().subscribe(function (data) {
            console.log("offers by self =>", data);
            var off = [];
            if (data['result'].length > 0) {
                for (var k = 0; k < data['result'].length; k++) {
                    if (data['result'][k]['advert_id'].length > 0) {
                        console.log(data['result'][k]['advert_id']);
                    }
                    console.log(data['result'][k]['advert_id']);
                    off[k] = data['result'][k]['advert_id'];
                    off[k].status = data['result'][k].status;
                    off[k].createdOffer = data['result'][k]['_id'];
                    off[k].offered_price = parseFloat(data['result'][k].offered_price).toFixed(2);
                    off[k].sail_id = data['result'][k].sail_id;
                    if (k == data['result'].length - 1) {
                        _this.myadd = off;
                        console.log(_this.myadd);
                    }
                }
            }
            else {
                _this.myadd = [];
            }
            // this.myoffers=data['result'];
            // this.myoffersstatus=data['result']['status'];
            // this.sale=data['result']['sail_id'];
            // console.log(this.sale);
            sessionStorage.setItem("onsale", JSON.stringify(_this.sale));
            for (var i = 0; i < data['result'].length; i++) {
                data['result'][i]['price'] = parseFloat(data['result'][i]['price']).toFixed(2);
            }
        });
    };
    MyaccsComponent.prototype.myaddsoffers = function () {
        var _this = this;
        this.status_but = false;
        this.proceed = false;
        this.offer_create = false;
        this.pkr = true;
        this.off_pr = false;
        this.off_rc = true;
        this.status_but1 = false;
        var count = 0;
        this.appService.myaddsoffers().subscribe(function (data) {
            var off = [];
            if (data['result']) {
                console.log("offers on my =>", data);
                _this.myadd = data['result'];
                for (var i = 0; i < data['result'].length; i++) {
                    data['result'][i]['price'] = parseFloat(data['result'][i]['price']).toFixed(2);
                    if (data['result'][i]['pictures'].length > 0) {
                        for (var j = 0; j < data['result'][i]['pictures'].length; j++) {
                            if (data['result'][i]['pictures'][j]) {
                                data['result'][i]['pictures'][j] = data['result'][i]['pictures'][j].replace(".mp4", ".jpg");
                                data['result'][i]['pictures'][j] = data['result'][i]['pictures'][j].replace(".mov", ".jpg");
                            }
                        }
                    }
                }
                for (var k = 0; k < data['result'].length; k++) {
                    if (data['result'][k]['offers'].length > 0) {
                        var stat = false;
                        for (var m = 0; m < data['result'][k]['offers'].length; m++) {
                            console.log(data['result'][k]['offers'][m]['status']);
                            if (data['result'][k]['offers'][m]['status'] != 'pending') {
                                console.log(stat);
                                stat = true;
                            }
                            else {
                                console.log("else");
                                if (m == data['result'][k]['offers'].length - 1) {
                                    if (stat) {
                                        console.log("no");
                                    }
                                    else {
                                        console.log('yes');
                                        off[count] = data['result'][k];
                                        count = count + 1;
                                    }
                                }
                            }
                        }
                    }
                }
                _this.offerid = data['result']['offers'];
                console.log("ff", off);
                // this.myadd = off;
            }
        }, function (err) {
            // this.myadd=[];
            _this.nooffers = ("Did Not Receive any offers Yet!");
            console.log("No offers exist");
        });
    };
    MyaccsComponent.prototype.openOfferDetails = function (mm) {
        console.log("mm ", mm);
        this.status_but = false;
        this.proceed = false;
        this.offer_create = false;
        this.pkr = true;
        this.off_pr = false;
        this.off_rc = false;
        this.status_but1 = true;
        var offerFound = mm;
        var myO = mm.offers;
        for (var i = 0; i < myO.length; i++) {
            myO[i]['title'] = mm.title;
            myO[i]['price'] = mm.price;
            myO[i]['description'] = mm.description;
            myO[i]['pictures'] = mm.pictures;
            myO[i]['storage'] = mm.storage;
            myO[i]['color'] = mm.color;
            // if(data['result'][i]['description'].length>30){
            // data['result'][i]['description'] = data['result'][i]['description'].substring(0,30)+"...";
            // }
            // data['result'][i]['price'] = parseFloat(data['result'][i]['price']).toFixed(2);
            myO[i]['price'] = parseFloat(myO[i].offered_price).toFixed(2);
            if (i == myO.length - 1) {
                console.log("created : ", myO);
                this.myadd = myO;
            }
        }
        //
        // var offeredResult = [];
        // var offeredAd = mm;
        // var offer = [];
        // offer= offeredAd.offers;
        //
        // for(var i=0;i<offer.length;i++){
        //   offeredResult[i] = offeredAd;
        //   offeredResult[i].offer_id = offer[i]._id;
        //   console.log(offer[i]._id)
        //   offeredResult[i].username = offer[i].user_id.name;
        //   offeredResult[i].price = offer[i].offered_price;
        //   offeredResult[i].status = offer[i].status;
        // console.log("at ofResult : ",offeredResult[i].offer_id,offer[i]._id);
        //   if(i==offer.length-1){console.log("created for display :",offeredResult);
        //
        //     this.myadd = offeredResult;
        //
        //
        //   }
        //}
    };
    MyaccsComponent.prototype.favouriteadds = function () {
        var _this = this;
        this.headings = "FAVOURITES";
        this.headi = true;
        this.acc = false;
        this.boost = false;
        this.disable = false;
        this.deactivate = false;
        this.msg = false;
        this.hist_but = false;
        this.offer_but = false;
        this.pkr = true;
        this.off_rc = false;
        this.off_pr = false;
        this.adds = true;
        this.favour_but = true;
        this.hid = false;
        this.status_but1 = false;
        this.head_h = false;
        this.head_o = false;
        this.head_f = true;
        this.head_a = false;
        this.msg = false;
        this.chat = false;
        this.offer_view = false;
        this.appService.favouriteadds().subscribe(function (data) {
            console.log("favourit adds =>", data);
            if (data['result'].length > 0) {
                _this.myadd = data['result'];
                // this.advertid=data['result']['_id'];
            }
            else {
                _this.myadd = [];
                _this.noadds = ("Nothing Here For Now");
                console.log(_this.noadds);
            }
            for (var i = 0; i < data['result'].length; i++) {
                if (data['result'][i]['description'].length > 30) {
                    data['result'][i]['description'] = data['result'][i]['description'].substring(0, 30) + "...";
                }
                data['result'][i]['price'] = parseFloat(data['result'][i]['price']).toFixed(2);
            }
            for (var i = 0; i < data['result'].length; i++) {
                if (data['result'][i]['pictures'].length > 0) {
                    for (var j = 0; j < data['result'][i]['pictures'].length; j++) {
                        if (data['result'][i]['pictures'][j]) {
                            data['result'][i]['pictures'][j] = data['result'][i]['pictures'][j].replace(".mp4", ".jpg");
                            data['result'][i]['pictures'][j] = data['result'][i]['pictures'][j].replace(".mov", ".jpg");
                        }
                    }
                }
            }
        }, function (err) {
            // if(err.status == 404){
            //   console.log("got error");``
            //   this.router.navigate(['/account']);
            //   this.snackBar.open('No Purchases Yet', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            //   this.myadd = [];
            // }
        });
    };
    MyaccsComponent.prototype.accept_reject = function (value) {
        var _this = this;
        // console.log(value);
        var tick = "accepted";
        var acceptedoffer = value;
        console.log(acceptedoffer);
        var count = 0;
        var sal = [];
        this.appService.accept(acceptedoffer, tick).subscribe(function (data) {
            console.log("accept_reject adds =>", data);
            // this.sale=data['result']['sail']['seller_id'];
            _this.sale_seller = data['sail']['_id'];
            console.log(_this.sale_seller);
            _this.myaddsoffers();
            // this.appService.getsale(this.sale_seller).subscribe(data=>{
            //   sessionStorage.setItem("sellersale", JSON.stringify(data['sail']));
            //   console.log("sellersale : ",JSON.parse(sessionStorage.getItem("sellersale")));
            //   console.log(data);
            // })
        });
    };
    MyaccsComponent.prototype.accept_reject1 = function (offerid) {
        var cross = "rejected";
        this.appService.reject(offerid, cross).subscribe(function (data) {
            console.log("accept_reject adds =>", data);
        });
    };
    MyaccsComponent.prototype.status_seller = function (value) {
        var _this = this;
        var saleIdseller = value;
        this.appService.getsale(saleIdseller).subscribe(function (data) {
            console.log(data);
            sessionStorage.setItem("saleIdseller", JSON.stringify(data['sail']));
            _this.router.navigate(['/checkout']);
        });
    };
    MyaccsComponent.prototype.afteraccepted = function (value) {
        this.sale = value;
        console.log(this.sale);
        sessionStorage.setItem("setsail", JSON.stringify(this.sale));
        this.router.navigate(['/checkout']);
    };
    MyaccsComponent.prototype.addtofavourites = function (value) {
        var _this = this;
        this.remove = false;
        this.advertid = value;
        if (localStorage.getItem('jwt') != undefined && localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != '') {
            this.appService.removefavourites(this.advertid, this.remove).subscribe(function (data) {
                console.log(data);
                _this.favouriteadds();
            });
        }
    };
    MyaccsComponent.prototype.enabledisable = function (value) {
        var _this = this;
        this.disid = value;
        if (localStorage.getItem('jwt') != undefined && localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != '') {
            this.appService.enabledisable(this.disid).subscribe(function (data) {
                console.log(data);
                if (data['result']['visible'] == false) {
                    _this.snackBar.open('Ad Deactivated', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
                }
                else {
                    _this.snackBar.open('Ad Activated', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
                }
                _this.showadds();
            });
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('sidenav'),
        __metadata("design:type", Object)
    ], MyaccsComponent.prototype, "sidenav", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('window:resize'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MyaccsComponent.prototype, "onWindowResize", null);
    MyaccsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-account',
            template: __webpack_require__(/*! ./myaccs.component.html */ "./src/app/pages/myaccs/myaccs.component.html"),
            styles: [__webpack_require__(/*! ./myaccs.component.scss */ "./src/app/pages/myaccs/myaccs.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _app_service__WEBPACK_IMPORTED_MODULE_1__["AppService"], _chat_service__WEBPACK_IMPORTED_MODULE_2__["ChatService"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSnackBar"]])
    ], MyaccsComponent);
    return MyaccsComponent;
}());



/***/ }),

/***/ "./src/app/pages/not-found/not-found.component.html":
/*!**********************************************************!*\
  !*** ./src/app/pages/not-found/not-found.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row\" fxLayoutAlign=\"center center\" class=\"h-100\">\r\n    <div fxFlex=\"80\" fxFlex.gt-sm=\"30\" fxFlex.sm=\"60\">\r\n        <mat-card class=\"p-0 mat-elevation-z6 box\">\r\n            <div fxLayout=\"column\" fxLayoutAlign=\"center center\" class=\"bg-primary box-header\">\r\n                <mat-icon class=\"mat-icon-xlg\">error</mat-icon>\r\n                <h1 class=\"error\">404</h1>\r\n            </div>\r\n            <mat-card-content fxLayout=\"column\" fxLayoutAlign=\"end center\" class=\"box-content\">\r\n                <mat-card fxLayout=\"column\" fxLayoutAlign=\"center center\" class=\"mat-elevation-z8 box-content-inner\">\r\n                    <p class=\"box-text\">Opps, it seems that this page does not exist.</p> \r\n                    <p class=\"box-text\">If you are sure it should, search for it.</p> \r\n                    <mat-form-field class=\"w-100\">\r\n                        <input matInput placeholder=\"Enter search keyword...\">\r\n                    </mat-form-field>\r\n                </mat-card>\r\n                <div class=\"box-footer\">\r\n                    <button mat-raised-button color=\"primary\" class=\"mat-elevation-z8\" type=\"button\" (click)=\"goHome()\">\r\n                        <mat-icon>home</mat-icon>\r\n                    </button>\r\n                    <button mat-raised-button color=\"primary\" class=\"mat-elevation-z8\" type=\"button\" (click)=\"goHome()\">\r\n                        <mat-icon>search</mat-icon>\r\n                    </button>\r\n                </div>\r\n            </mat-card-content>\r\n        </mat-card>          \r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/pages/not-found/not-found.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/pages/not-found/not-found.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".box {\n  border-radius: 0; }\n  .box .box-header {\n    height: 180px; }\n  .box .box-header .error {\n      font-size: 48px;\n      margin-bottom: 12px; }\n  .box .box-content {\n    position: relative;\n    height: 180px; }\n  .box .box-content .box-content-inner {\n      position: absolute;\n      top: -34px;\n      left: 34px;\n      right: 34px;\n      height: 180px; }\n  .box .box-content .box-content-header {\n      font-size: 16px;\n      text-transform: uppercase;\n      font-weight: 500; }\n  .box .box-content .box-content-header.server-error {\n        margin-bottom: 36px; }\n  .box .box-content .box-text {\n      margin-bottom: 10px;\n      text-align: center; }\n  .box .box-content .box-text::last-child {\n        margin-bottom: 15px; }\n  .box .box-content .box-footer {\n      position: relative;\n      bottom: 16px; }\n  .box .box-content .box-footer button {\n        min-width: 70px;\n        margin: 0 2px; }\n"

/***/ }),

/***/ "./src/app/pages/not-found/not-found.component.ts":
/*!********************************************************!*\
  !*** ./src/app/pages/not-found/not-found.component.ts ***!
  \********************************************************/
/*! exports provided: NotFoundComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotFoundComponent", function() { return NotFoundComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NotFoundComponent = /** @class */ (function () {
    function NotFoundComponent(router) {
        this.router = router;
    }
    NotFoundComponent.prototype.ngOnInit = function () {
    };
    NotFoundComponent.prototype.goHome = function () {
        this.router.navigate(['/']);
    };
    NotFoundComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-not-found',
            template: __webpack_require__(/*! ./not-found.component.html */ "./src/app/pages/not-found/not-found.component.html"),
            styles: [__webpack_require__(/*! ./not-found.component.scss */ "./src/app/pages/not-found/not-found.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], NotFoundComponent);
    return NotFoundComponent;
}());



/***/ }),

/***/ "./src/app/pages/offer_details/offer_details.component.html":
/*!******************************************************************!*\
  !*** ./src/app/pages/offer_details/offer_details.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n\r\n<agm-map [(latitude)]=\"this.latitude\" [(longitude)]=\"this.longitude\" [(zoom)]=\"location.zoom\" [disableDefaultUI]=\"true\" [zoomControl]=\"true\" [(fitBounds)]='location.viewport'>\r\n  <agm-marker [(latitude)]=\"this.latitude\" [(longitude)]=\"this.longitude\" [markerDraggable]=\"location.marker.draggable\" (dragEnd)='markerDragEnd($event)'></agm-marker>\r\n\r\n\r\n<!-- <agm-circle [latitude]=\"this.latitude\" [longitude]=\"this.longitude\"\r\n  [(radius)]=\"circleRadius\"\r\n  [fillColor]=\"'blue'\"\r\n  [circleDraggable]=\"true\"\r\n  [editable]=\"true\"></agm-circle> -->\r\n</agm-map>\r\n\r\n\r\n<div class=\"container-fluid\">\r\n  <div class='row'>\r\n    <div class=\"form-group\">\r\n      <label class='col-sm-2'>Address Line 1</label>\r\n      <input class='col-sm-10' type='text' [(ngModel)]='location.address_level_1' class=\"form-control\" placeholder='Office, Apt, Home, Street'>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label class='col-sm-2'>Address Line 2</label>\r\n      <input class='col-sm-10'  [(ngModel)]='location.address_level_2' class='form-control' placeholder='City'/>\r\n    </div>\r\n\r\n    <div class=\"form-group\">\r\n      <label class='col-sm-2'>State / Province / Region</label>\r\n      <input class='col-sm-10'  [(ngModel)]='location.address_state' class='form-control' placeholder='State'>\r\n    </div>\r\n\r\n    <div class=\"form-group\">\r\n      <label class='col-sm-2'>Country</label>\r\n      <input class='col-sm-10'  [(ngModel)]='location.address_country' class='form-control' placeholder='State'>\r\n    </div>\r\n\r\n    <div class=\"form-group\">\r\n      <label class='col-sm-2'>Postal / Zip code</label>\r\n      <input class='col-sm-10'  [(ngModel)]='location.address_zip' class='form-control' placeholder='Zip'>\r\n    </div>\r\n\r\n    <button (click)='updateOnMap()' type=\"submit\" class=\"btn btn-primary\">Search</button>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"container-fluid\">\r\n  <div class='row'>\r\n    <div class=\"form-group\">\r\n      <label class='col-sm-2'>Circle radius in miles</label>\r\n        <input type='text' class='form-control' #miles  [value]='circleRadiusInMiles() | number:\"0.0-2\"'  (keyup)=\"milesToRadius(miles.value)\"/>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/offer_details/offer_details.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/pages/offer_details/offer_details.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".form_div {\n  align-items: center;\n  margin: auto;\n  width: 80%;\n  background-color: white;\n  margin-bottom: 10%; }\n\n.inner_div {\n  margin: auto;\n  width: 90%; }\n\n.above_tab {\n  margin-top: 2%;\n  border-style: solid;\n  border-width: 1px;\n  border-color: #dedede; }\n\n.adds_view {\n  border-style: solid;\n  border-width: 1%;\n  border-color: #dedede;\n  margin-bottom: 10px; }\n\n.pictures {\n  height: 100px;\n  width: 10%;\n  padding: 1%;\n  overflow: hidden; }\n\n.titl {\n  font-size: 4vmin;\n  text-align: center;\n  color: #5a555e;\n  position: absolute;\n  left: 25%;\n  margin-top: 10px;\n  font-weight: bold; }\n\n.price {\n  font-size: 4vmin;\n  text-align: center;\n  color: black;\n  position: absolute;\n  left: 65%;\n  margin-top: 10px;\n  font-weight: bold; }\n\n.deactivate {\n  font-size: 2.5vmin;\n  position: absolute;\n  left: 15%;\n  margin-top: 40px;\n  color: #f41b23;\n  font-style: underline;\n  font-weight: 400;\n  text-decoration: underline; }\n\n.edit {\n  font-size: 2.5vmin;\n  position: absolute;\n  left: 35%;\n  margin-top: 40px;\n  color: black;\n  font-weight: 400;\n  text-decoration: underline; }\n\n.preview {\n  font-size: 2.5vmin;\n  position: absolute;\n  left: 42%;\n  margin-top: 40px;\n  color: #173b95;\n  font-weight: 400;\n  text-decoration: underline; }\n\n.preview1 {\n  font-size: 2.5vmin;\n  position: absolute;\n  left: 15%;\n  margin-top: 40px;\n  color: #173b95;\n  font-weight: 400;\n  text-decoration: underline; }\n\n.created {\n  font-size: 2.5vmin;\n  text-align: center;\n  color: #bfbdc1;\n  position: absolute;\n  left: 25%;\n  margin-top: 90px;\n  font-weight: bold; }\n\n.msgs {\n  position: absolute;\n  left: 90%;\n  font-size: 4vmin;\n  margin-top: 20px;\n  color: #173b95; }\n\n.boost {\n  height: 10%;\n  width: 10%;\n  float: right;\n  margin-top: 90px; }\n\n.acc_rjj {\n  height: 10%;\n  width: 10%;\n  float: right;\n  margin-top: 45px;\n  margin-right: 2%; }\n\n.tick_cross {\n  float: right;\n  margin-top: 45px;\n  margin-right: 2%;\n  background-color: #f41b23;\n  color: white; }\n\n.tick_cross1 {\n  float: right;\n  margin-top: 45px;\n  margin-right: 2%;\n  background-color: #173b95;\n  color: white; }\n\n.all-products {\n  min-height: 400px;\n  padding: 2px;\n  overflow: hidden; }\n\n.all-products.p-left {\n    padding-left: 16px; }\n\n.products-wrapper {\n  margin: 8px -8px; }\n\n.products-wrapper .col {\n    padding: 8px; }\n\n.review-order-table.mat-table {\n  display: block;\n  overflow-x: auto; }\n\n.review-order-table.mat-table .mat-row, .review-order-table.mat-table .mat-header-row {\n    display: flex;\n    border-bottom-width: 1px;\n    border-bottom-style: solid;\n    align-items: center;\n    min-height: 48px;\n    padding: 0 24px;\n    min-width: 760px; }\n\n.review-order-table.mat-table .mat-row {\n    min-height: 60px; }\n\n.review-order-table.mat-table .mat-cell, .review-order-table.mat-table .mat-header-cell {\n    flex: 1;\n    overflow: hidden;\n    word-wrap: break-word; }\n\n.review-order-table.mat-table .mat-header-cell {\n    font-size: 14px; }\n\n.review-order-table.mat-table .mat-cell img {\n    width: 60px; }\n\n.sebm-google-map-container {\n  height: 300px; }\n"

/***/ }),

/***/ "./src/app/pages/offer_details/offer_details.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/pages/offer_details/offer_details.component.ts ***!
  \****************************************************************/
/*! exports provided: Offer_detailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Offer_detailsComponent", function() { return Offer_detailsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app.service */ "./src/app/app.service.ts");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var _agm_core_services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @agm/core/services */ "./node_modules/@agm/core/services.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_5__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';





//import { AccComponent } from './acc/acc.component';
var socket = socket_io_client__WEBPACK_IMPORTED_MODULE_5__('http://celx-dev.herokuapp.com');
var Offer_detailsComponent = /** @class */ (function () {
    // public lat:any;
    // public lng:any;
    function Offer_detailsComponent(appService, mapsApiLoader, zone, wrapper) {
        var _this = this;
        this.appService = appService;
        this.mapsApiLoader = mapsApiLoader;
        this.zone = zone;
        this.wrapper = wrapper;
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
        }
    }
    Offer_detailsComponent.prototype.ngOnInit = function () {
        this.location.marker.draggable = true;
        this.circleRadius = 200;
        socket.on('connect', function () {
            console.log("conected");
        });
        socket.on('event', function (data) { console.log("evet"); });
        // this.findMe();
        // this.tick=("accepted");
        // this.cross=("rejected");
        // //console.log(this.appService.myaddsof);
        // console.log("JSON : ",JSON.parse(sessionStorage.getItem("saved")));
        // this.myaddoffers=JSON.parse(sessionStorage.getItem("saved"));
        //
        // console.log(this.myaddoffers);
        // this.myaddoffers = this.appService.myaddsof;
    };
    Offer_detailsComponent.prototype.updateOnMap = function () {
        var full_address = this.location.address_level_1 || "";
        if (this.location.address_level_2)
            full_address = full_address + " " + this.location.address_level_2;
        if (this.location.address_state)
            full_address = full_address + " " + this.location.address_state;
        if (this.location.address_country)
            full_address = full_address + " " + this.location.address_country;
        this.findLocation(full_address);
    };
    Offer_detailsComponent.prototype.findLocation = function (address) {
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
                }
                _this.map.triggerResize();
            }
            else {
                alert("Sorry, this search produced no results.");
            }
        });
    };
    Offer_detailsComponent.prototype.markerDragEnd = function (m, $event) {
        this.location.marker.lat = m.coords.lat;
        this.location.marker.lng = m.coords.lng;
        this.findAddressByCoordinates();
    };
    Offer_detailsComponent.prototype.findAddressByCoordinates = function () {
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
    Offer_detailsComponent.prototype.decomposeAddressComponents = function (addressArray) {
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
    Offer_detailsComponent.prototype.milesToRadius = function (value) {
        this.circleRadius = value / 0.00062137;
    };
    Offer_detailsComponent.prototype.circleRadiusInMiles = function () {
        return this.circleRadius * 0.00062137;
    };
    //   showPosition(position) {
    //   this.currentLat = position.coords.latitude;
    //   this.currentLong = position.coords.longitude;
    //
    //   let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //   // this.map.panTo(location);
    //
    //   if (!this.marker) {
    //     this.marker = new google.maps.Marker({
    //       position: location,
    //       map: this.map,
    //       title: 'Got you!'
    //     });
    //   }
    //   else {
    //     this.marker.setPosition(location);
    //   }
    // }
    //
    // showTrackingPosition(position) {
    //   console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
    //   this.currentLat = position.coords.latitude;
    //   this.currentLong = position.coords.longitude;
    //
    //   let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //   // this.map.panTo(location);
    //
    //   if (!this.marker) {
    //     this.marker = new google.maps.Marker({
    //       position: location,
    //       map: this.map,
    //       title: 'Got you!'
    //     });
    //   }
    //   else {
    //     this.marker.setPosition(location);
    //   }
    // }
    //
    //   findMe() {
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //       this.showPosition(position);
    //     });
    //   } else {
    //     alert("Geolocation is not supported by this browser.");
    //   }
    // }
    Offer_detailsComponent.prototype.ngOnDestroy = function () {
        sessionStorage.removeItem('saved');
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('horizontalStepper'),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatStepper"])
    ], Offer_detailsComponent.prototype, "horizontalStepper", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('verticalStepper'),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatStepper"])
    ], Offer_detailsComponent.prototype, "verticalStepper", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_agm_core__WEBPACK_IMPORTED_MODULE_3__["AgmMap"]),
        __metadata("design:type", _agm_core__WEBPACK_IMPORTED_MODULE_3__["AgmMap"])
    ], Offer_detailsComponent.prototype, "map", void 0);
    Offer_detailsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-offer_details',
            template: __webpack_require__(/*! ./offer_details.component.html */ "./src/app/pages/offer_details/offer_details.component.html"),
            styles: [__webpack_require__(/*! ./offer_details.component.scss */ "./src/app/pages/offer_details/offer_details.component.scss")]
        }),
        __metadata("design:paramtypes", [_app_service__WEBPACK_IMPORTED_MODULE_2__["AppService"], _agm_core__WEBPACK_IMPORTED_MODULE_3__["MapsAPILoader"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"],
            _agm_core_services__WEBPACK_IMPORTED_MODULE_4__["GoogleMapsAPIWrapper"]])
    ], Offer_detailsComponent);
    return Offer_detailsComponent;
}());



/***/ }),

/***/ "./src/app/pages/pages.component.html":
/*!********************************************!*\
  !*** ./src/app/pages/pages.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-sidenav-container style=\"background-color:#FFFFFF\">\r\n\r\n    <mat-sidenav [opened]=\"false\" mode=\"over\" #sidenav class=\"sidenav mat-elevation-z6\">\r\n        <button mat-icon-button color=\"warn\" class=\"close\" (click)=\"sidenav.close()\">\r\n           <mat-icon color=\"warn\">close</mat-icon>\r\n        </button>\r\n        <div class=\"divider\"></div>\r\n        <app-sidenav-menu [menuItems]=\"sidenavMenuItems\" [menuParentId]=\"0\"></app-sidenav-menu>\r\n        <div class=\"divider\"></div>\r\n        <!-- <div class=\"text-center py-2\">\r\n            <svg class=\"social-icon\" viewBox=\"0 0 24 24\">\r\n                <path d=\"M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M18,5H15.5A3.5,3.5 0 0,0 12,8.5V11H10V14H12V21H15V14H18V11H15V9A1,1 0 0,1 16,8H18V5Z\" />\r\n            </svg>\r\n            <svg class=\"social-icon\" viewBox=\"0 0 24 24\">\r\n                <path d=\"M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M17.71,9.33C18.19,8.93 18.75,8.45 19,7.92C18.59,8.13 18.1,8.26 17.56,8.33C18.06,7.97 18.47,7.5 18.68,6.86C18.16,7.14 17.63,7.38 16.97,7.5C15.42,5.63 11.71,7.15 12.37,9.95C9.76,9.79 8.17,8.61 6.85,7.16C6.1,8.38 6.75,10.23 7.64,10.74C7.18,10.71 6.83,10.57 6.5,10.41C6.54,11.95 7.39,12.69 8.58,13.09C8.22,13.16 7.82,13.18 7.44,13.12C7.81,14.19 8.58,14.86 9.9,15C9,15.76 7.34,16.29 6,16.08C7.15,16.81 8.46,17.39 10.28,17.31C14.69,17.11 17.64,13.95 17.71,9.33Z\" />\r\n            </svg>\r\n            <svg class=\"social-icon\" viewBox=\"0 0 24 24\">\r\n                <path d=\"M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M19.5,12H18V10.5H17V12H15.5V13H17V14.5H18V13H19.5V12M9.65,11.36V12.9H12.22C12.09,13.54 11.45,14.83 9.65,14.83C8.11,14.83 6.89,13.54 6.89,12C6.89,10.46 8.11,9.17 9.65,9.17C10.55,9.17 11.13,9.56 11.45,9.88L12.67,8.72C11.9,7.95 10.87,7.5 9.65,7.5C7.14,7.5 5.15,9.5 5.15,12C5.15,14.5 7.14,16.5 9.65,16.5C12.22,16.5 13.96,14.7 13.96,12.13C13.96,11.81 13.96,11.61 13.89,11.36H9.65Z\" />\r\n            </svg>\r\n        </div> -->\r\n    </mat-sidenav>\r\n\r\n\r\n\r\n        <mat-toolbar-row fxLayoutAlign=\"space-between center\"  class=\"top-toolbar theme-container\" style=\"background-color:#156dbf; max-width:100% !important; height:40px\">\r\n            <span fxHide=\"false\" fxHide.gt-sm>\r\n                <button mat-button (click)=\"sidenav.toggle()\" class=\"sidenav-toggle\">\r\n                    <mat-icon>menu</mat-icon>\r\n                </button>\r\n            </span>\r\n            <span fxShow=\"false\" fxShow.gt-xs fxLayoutAlign=\"center center\"></span>\r\n            <span fxShow=\"false\" fxShow.gt-sm></span>\r\n            <app-top-menu></app-top-menu>\r\n        </mat-toolbar-row>\r\n\r\n\r\n  <!-- <mat-toolbar style=\"background-color:#FFFFFF\">\r\n    <mat-toolbar-row fxLayoutAlign=\"space-between center\" class=\"logo-toolbar theme-container\" style=\"background-color:#FFFFFF\">\r\n        <a class=\"logo\" routerLink=\"/\"  (click) =\"closeSubMenus()\">\r\n        <img src=\"assets/images/icons/logo.png\" height=80 style=\"margin-left:100%\"/>\r\n      </a>\r\n        <div fxFlex fxFlexOffset.gt-sm=\"10\" fxShow=\"false\" fxShow.gt-sm>\r\n            <form method=\"get\"  class=\"search-form\" fxLayout=\"row\" style=\"border: 1px solid; border-color:#cccccc; border-radius:15px 15px 15px 15px; margin-left:90px; width:60%;\">\r\n\r\n                <input type=\"text\" placeholder=\"Type to search...\" fxFlex>\r\n                <button mat-mini-fab (click)=\"search()\" type=\"button\" class=\"search-btn mat-elevation-z0 text-muted\">\r\n                    <mat-icon>search</mat-icon>\r\n                </button>\r\n            </form>\r\n        </div>\r\n\r\n\r\n\r\n        <div fxFlexOffset=\"10\" fxLayout=\"row\" fxLayoutAlign=\"center center\">\r\n            <div fxLayoutAlign=\"center center\" fxHide=\"false\" fxHide.gt-sm>\r\n                <button mat-icon-button [matMenuTriggerFor]=\"searchMenu\" #searchMenuTrigger=\"matMenuTrigger\" class=\"search-toggle-btn\">\r\n                    <mat-icon class=\"mat-icon-lg\">search</mat-icon>\r\n                </button>\r\n                <mat-menu #searchMenu=\"matMenu\" [overlapTrigger]=\"false\" xPosition=\"before\" class=\"search-dropdown mat-elevation-z8\">\r\n                    <form method=\"get\" fxFlex class=\"search-form\">\r\n                        <button mat-raised-button [matMenuTriggerFor]=\"categories2Menu\" #categories2MenuTrigger=\"matMenuTrigger\" type=\"button\" class=\"mat-elevation-z0 categories text-muted\" (click)=\"stopClickPropagate($event)\">{{category?.name}}<mat-icon>arrow_drop_down</mat-icon></button>\r\n                        <mat-menu #categories2Menu=\"matMenu\" [overlapTrigger]=\"false\" xPosition=\"before\" class=\"categories-dropdown\">\r\n                            <span (mouseleave)=\"categories2MenuTrigger.closeMenu()\">\r\n                                <app-category-list [categories]=\"categories\" [categoryParentId]=\"0\" (change)=\"changeCategory($event)\"></app-category-list>\r\n                            </span>\r\n                        </mat-menu>\r\n                        <input type=\"text\" placeholder=\"Type to search...\" fxFlex (click)=\"stopClickPropagate($event)\">\r\n                        <button mat-mini-fab (click)=\"search()\" type=\"button\" class=\"search-btn mat-elevation-z0 text-muted\">\r\n                            <mat-icon>search</mat-icon>\r\n                        </button>\r\n                    </form>\r\n                </mat-menu>\r\n            </div>\r\n\r\n        </div>\r\n\r\n    </mat-toolbar-row>\r\n  </mat-toolbar> -->\r\n\r\n\r\n\r\n    <app-menu fxShow=\"false\" fxShow.gt-sm></app-menu>\r\n\r\n\r\n    <div class=\"theme-container main\">\r\n        <!-- <app-breadcrumb></app-breadcrumb> -->\r\n        <router-outlet></router-outlet>\r\n    </div>\r\n\r\n\r\n    <app-options></app-options>\r\n\r\n    <!-- <app-footer></app-footer> -->\r\n\r\n    <div *ngIf=\"showBackToTop\" fxLayout=\"row\" fxLayoutAlign=\"center center\" class=\"back-to-top transition\" (click)=\"scrollToTop()\">\r\n        <mat-icon>arrow_upward</mat-icon>\r\n    </div>\r\n\r\n\r\n </mat-sidenav-container>\r\n"

/***/ }),

/***/ "./src/app/pages/pages.component.scss":
/*!********************************************!*\
  !*** ./src/app/pages/pages.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main {\n  min-height: 400px;\n  min-height: calc(100vh - 288px);\n  padding: 16px; }\n\n.sidenav {\n  width: 250px;\n  padding: 8px 16px;\n  position: fixed; }\n\n.sidenav .close {\n    margin-left: 178px; }\n\n.sidenav .divider {\n    margin: 8px 0; }\n\n.cart-items-count {\n  position: absolute;\n  top: -3px;\n  left: 26px;\n  background: #f44336;\n  height: 18px;\n  width: 18px;\n  line-height: 18px;\n  border-radius: 50%;\n  font-size: 11px; }\n\n.clas {\n  background-image: url('logo.png');\n  height: 20%;\n  width: 20%; }\n"

/***/ }),

/***/ "./src/app/pages/pages.component.ts":
/*!******************************************!*\
  !*** ./src/app/pages/pages.component.ts ***!
  \******************************************/
/*! exports provided: PagesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagesComponent", function() { return PagesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../app.settings */ "./src/app/app.settings.ts");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../app.service */ "./src/app/app.service.ts");
/* harmony import */ var _theme_components_sidenav_menu_sidenav_menu_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../theme/components/sidenav-menu/sidenav-menu.service */ "./src/app/theme/components/sidenav-menu/sidenav-menu.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PagesComponent = /** @class */ (function () {
    function PagesComponent(appSettings, appService, sidenavMenuService, router) {
        this.appSettings = appSettings;
        this.appService = appService;
        this.sidenavMenuService = sidenavMenuService;
        this.router = router;
        this.showBackToTop = false;
        this.settings = this.appSettings.settings;
    }
    PagesComponent.prototype.ngOnInit = function () {
        this.getCategories();
        this.sidenavMenuItems = this.sidenavMenuService.getSidenavMenuItems();
    };
    PagesComponent.prototype.getCategories = function () {
        var _this = this;
        this.appService.getCategories().subscribe(function (data) {
            _this.categories = data;
            _this.category = data[0];
            _this.appService.Data.categories = data;
        });
    };
    PagesComponent.prototype.changeCategory = function (event) {
        if (event.target) {
            this.category = this.categories.filter(function (category) { return category.name == event.target.innerText; })[0];
        }
        if (window.innerWidth < 960) {
            this.stopClickPropagate(event);
        }
    };
    PagesComponent.prototype.remove = function (product) {
        var index = this.appService.Data.cartList.indexOf(product);
        if (index !== -1) {
            this.appService.Data.cartList.splice(index, 1);
            this.appService.Data.totalPrice = this.appService.Data.totalPrice - product.newPrice;
        }
    };
    PagesComponent.prototype.clear = function () {
        this.appService.Data.cartList.length = 0;
    };
    PagesComponent.prototype.changeTheme = function (theme) {
        this.settings.theme = theme;
    };
    PagesComponent.prototype.stopClickPropagate = function (event) {
        event.stopPropagation();
        event.preventDefault();
    };
    PagesComponent.prototype.search = function () { };
    PagesComponent.prototype.scrollToTop = function () {
        var scrollDuration = 200;
        var scrollStep = -window.pageYOffset / (scrollDuration / 20);
        var scrollInterval = setInterval(function () {
            if (window.pageYOffset != 0) {
                window.scrollBy(0, scrollStep);
            }
            else {
                clearInterval(scrollInterval);
            }
        }, 10);
        if (window.innerWidth <= 768) {
            setTimeout(function () { window.scrollTo(0, 0); });
        }
    };
    PagesComponent.prototype.onWindowScroll = function ($event) {
        ($event.target.documentElement.scrollTop > 300) ? this.showBackToTop = true : this.showBackToTop = false;
    };
    PagesComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.router.events.subscribe(function (event) {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"]) {
                _this.sidenav.close();
            }
        });
        this.sidenavMenuService.expandActiveSubMenu(this.sidenavMenuService.getSidenavMenuItems());
    };
    PagesComponent.prototype.closeSubMenus = function () {
        if (window.innerWidth < 960) {
            this.sidenavMenuService.closeAllSubMenus();
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('sidenav'),
        __metadata("design:type", Object)
    ], PagesComponent.prototype, "sidenav", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('window:scroll', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], PagesComponent.prototype, "onWindowScroll", null);
    PagesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-pages',
            template: __webpack_require__(/*! ./pages.component.html */ "./src/app/pages/pages.component.html"),
            styles: [__webpack_require__(/*! ./pages.component.scss */ "./src/app/pages/pages.component.scss")],
            providers: [_theme_components_sidenav_menu_sidenav_menu_service__WEBPACK_IMPORTED_MODULE_4__["SidenavMenuService"]]
        }),
        __metadata("design:paramtypes", [_app_settings__WEBPACK_IMPORTED_MODULE_2__["AppSettings"],
            _app_service__WEBPACK_IMPORTED_MODULE_3__["AppService"],
            _theme_components_sidenav_menu_sidenav_menu_service__WEBPACK_IMPORTED_MODULE_4__["SidenavMenuService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], PagesComponent);
    return PagesComponent;
}());



/***/ }),

/***/ "./src/app/pages/products/product-map.component.html":
/*!***********************************************************!*\
  !*** ./src/app/pages/products/product-map.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"controls\">\r\n    <button mat-mini-fab color=\"primary\" class=\"zoom-in\" (click)=\"zoomIn()\"><mat-icon>zoom_in</mat-icon></button>\r\n    <button mat-mini-fab color=\"primary\" class=\"zoom-out\" (click)=\"zoomOut()\"><mat-icon>zoom_out</mat-icon></button>\r\n    <button mat-mini-fab color=\"warn\" class=\"close\" (click)=\"close()\"><mat-icon>close</mat-icon></button>\r\n</div>\r\n<div mat-dialog-content>\r\n    <div class=\"viewer\">\r\n        <img [src]=\"image\" #zoomImage>\r\n    </div>\r\n</div> -->\r\n<mat-dialog-content>\r\nMy favorite animal is:\r\n<h1 mat-dialog-title>Favorite Animal</h1>\r\n<div mat-dialog-content>\r\n  My favorite animal is:\r\n  <ul>\r\n    <li>\r\n      <span *ngIf=\"data.animal === 'panda'\">&#10003;</span> Panda\r\n    </li>\r\n    <li>\r\n      <span *ngIf=\"data.animal === 'unicorn'\">&#10003;</span> Unicorn\r\n    </li>\r\n    <li>\r\n      <span *ngIf=\"data.animal === 'lion'\">&#10003;</span> Lion\r\n    </li>\r\n  </ul>\r\n</div>\r\n</mat-dialog-content>\t\r\n"

/***/ }),

/***/ "./src/app/pages/products/product-map.component.scss":
/*!***********************************************************!*\
  !*** ./src/app/pages/products/product-map.component.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".zoom-dialog .mat-dialog-container {\n  overflow: visible !important; }\n  .zoom-dialog .mat-dialog-container .controls {\n    position: relative; }\n  .zoom-dialog .mat-dialog-container .controls button {\n      position: absolute;\n      top: -44px; }\n  .zoom-dialog .mat-dialog-container .controls .zoom-in {\n      right: 44px; }\n  .zoom-dialog .mat-dialog-container .controls .zoom-out {\n      right: 0; }\n  .zoom-dialog .mat-dialog-container .controls .close {\n      right: -44px; }\n  .zoom-dialog .mat-dialog-container .viewer {\n    width: 100%;\n    text-align: center; }\n  .zoom-dialog .mat-dialog-container .viewer img {\n      max-width: 60%; }\n"

/***/ }),

/***/ "./src/app/pages/products/product-map.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/pages/products/product-map.component.ts ***!
  \*********************************************************/
/*! exports provided: ProductMapComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductMapComponent", function() { return ProductMapComponent; });
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


var ProductMapComponent = /** @class */ (function () {
    // @ViewChild('zoomImage') zoomImage;
    function ProductMapComponent(dialogRef, image) {
        this.dialogRef = dialogRef;
        this.image = image;
        this.count = 10;
        this.maxWidth = 60;
    }
    ProductMapComponent.prototype.ngOnInit = function () { };
    ProductMapComponent.prototype.close = function () {
        this.dialogRef.close();
    };
    ProductMapComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-product-map',
            template: __webpack_require__(/*! ./product-map.component.html */ "./src/app/pages/products/product-map.component.html"),
            styles: [__webpack_require__(/*! ./product-map.component.scss */ "./src/app/pages/products/product-map.component.scss")],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], ProductMapComponent);
    return ProductMapComponent;
}());



/***/ }),

/***/ "./src/app/pages/sell/sell/sell.component.html":
/*!*****************************************************!*\
  !*** ./src/app/pages/sell/sell/sell.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  sell works!\n</p>\n<router-outlet> </router-outlet>\n"

/***/ }),

/***/ "./src/app/pages/sell/sell/sell.component.scss":
/*!*****************************************************!*\
  !*** ./src/app/pages/sell/sell/sell.component.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/sell/sell/sell.component.ts":
/*!***************************************************!*\
  !*** ./src/app/pages/sell/sell/sell.component.ts ***!
  \***************************************************/
/*! exports provided: SellComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SellComponent", function() { return SellComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SellComponent = /** @class */ (function () {
    function SellComponent(router, forma) {
        this.router = router;
    }
    SellComponent.prototype.ngOnInit = function () {
    };
    SellComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sell',
            template: __webpack_require__(/*! ./sell.component.html */ "./src/app/pages/sell/sell/sell.component.html"),
            styles: [__webpack_require__(/*! ./sell.component.scss */ "./src/app/pages/sell/sell/sell.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]])
    ], SellComponent);
    return SellComponent;
}());



/***/ }),

/***/ "./src/app/pages/sell1/sell1.component.html":
/*!**************************************************!*\
  !*** ./src/app/pages/sell1/sell1.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<mat-sidenav-container style=\"background-color:white\">\r\n  <mat-toolbar-row fxLayoutAlign=\"space-between center\"  class=\"top-toolbar theme-container\" style=\"background-color:#156dbf; max-width:100% !important; height:40px\" >\r\n      <span fxHide=\"false\" fxHide.gt-sm>\r\n          <button mat-button (click)=\"sidenav.toggle()\" class=\"sidenav-toggle\">\r\n              <mat-icon>menu</mat-icon>\r\n          </button>\r\n      </span>\r\n      <span fxShow=\"false\" fxShow.gt-xs fxLayoutAlign=\"center center\"></span>\r\n      <span fxShow=\"false\" fxShow.gt-sm></span>\r\n      <app-top-menu style=\"margin-right:1%\"></app-top-menu>\r\n  </mat-toolbar-row>\r\n\r\n<app-menu fxShow=\"false\" fxShow.gt-sm></app-menu>\r\n\r\n\r\n<div class=\"theme-container main\">\r\n    <router-outlet></router-outlet>\r\n</div>\r\n<!-- <a class=\"logo\" routerLink=\"/\"  (click) =\"closeSubMenus()\">\r\n  <span style=\"font-size:60%; font-family: proxs; color:#342d38;\"> Back To Home</span>\r\n\r\n<img src=\"\\assets\\images\\icons\\logo.png\" class=\"logo\"/>\r\n</a> -->\r\n<div class=\"form_div\">\r\n  <div class=\"inner_div\">\r\n    <span>\r\n    <a routerLink=\"/\"  (click) =\"closeSubMenus()\">\r\n      <span class=\"log\" style=\"font-size:140%; font-family: proxs; color:#342d38; margin-left:5%; margin-bottom:-6%\" > Back To Home</span>\r\n    <!-- <img src=\"\\assets\\images\\icons\\logo.png\" class=\"logo\"/> -->\r\n    </a>\r\n    <div class=\"titles_s\"> {{this.heading}}</div>\r\n  </span>\r\n    <!-- <img src=\"\\assets\\images\\Untitled-1_0000_SUBMIT-AN-AD.png\" class=\"sub\"/> -->\r\n\r\n\r\n<form [hidden]=\"!fhid\" style=\"margin-top:3%\">\r\n  <mat-vertical-stepper [linear]=\"isLinear\" #stepper>\r\n    <mat-step>\r\n        <ng-template matStepLabel>Necessary Requirements</ng-template>\r\n  <label for=\"title\" class=\"titles\" id=\"title\">Ad Title</label>\r\n    <input type=\"text\" class=\"title_area\" id=\"title\" maxlength=\"100\" #ti_m=\"ngModel\" [(ngModel)]=\"title_1\" [ngModelOptions]=\"{standalone: true}\" [value]=\"title\" required> &nbsp; <span style=\"color:red\">{{this.invalid}}</span>\r\n    <!-- <div *ngIf=\"ti_m.invalid\" style=\"color: red\">*</div> -->\r\n    <p class=\"hint1\">Max 100 characters.</p>\r\n  <label for=\"category\" class=\"titles\" id=\"categ\">Category</label><br>\r\n    <mat-select class=\"category_area\" id=\"categ\" #m_t=\"ngModel\" [(ngModel)]=\"category_1\" [ngModelOptions]=\"{standalone: true}\" required>\r\n      <mat-option *ngFor=\"let category of categories\"  [value]=\"category.name\">\r\n        <img [src]=\"category.image\" class=\"images\">\r\n                {{category.name}}\r\n      </mat-option>\r\n    </mat-select>&nbsp; <span style=\"color:red\">{{this.invalid}}</span>\r\n    <!-- <div *ngIf=\"m_t.invalid\" style=\"color: red\">*</div> -->\r\n    <p class=\"hint1\">Mobile Phones Tablets e.t.c.</p>\r\n\r\n    <mat-grid-list cols=\"2\" rowHeight=\"8:0.5\">\r\n      <mat-grid-tile>\r\n    <label for=\"brands\" class=\"titles1\" id=\"brands\">Brands</label>\r\n    </mat-grid-tile>\r\n    <mat-grid-tile>\r\n      <label for=\"device\" class=\"titles1\" id=\"device\">Device Model</label><br>\r\n    </mat-grid-tile>\r\n    </mat-grid-list>\r\n\r\n        <mat-grid-list cols=\"2\" rowHeight=\"5:1\">\r\n          <mat-grid-tile>\r\n  <mat-select class=\"brands\" id=\"brands\" #br_m=\"ngModel\" [(ngModel)]=\"brand_1\" [ngModelOptions]=\"{standalone: true}\"(ngModelChange)=\"setNewBrand($event)\" required>\r\n        <mat-option *ngFor=\"let brand of brands\" [value]=\"brand\">\r\n          <img [src]=\"brand.picture\" class=\"images\" align=\"Middle\">\r\n        {{brand.brandName}}\r\n        </mat-option>\r\n        <mat-option (click)=\"addnew()\">\r\n          Other\r\n        </mat-option>\r\n      </mat-select>&nbsp; <span style=\"color:red\">{{this.invalid}}</span>\r\n      <!-- <div *ngIf=\"br_m.invalid\" style=\"color: red\">*</div> -->\r\n\r\n    </mat-grid-tile>\r\n      <mat-grid-tile>\r\n    <mat-select class=\"device\" id=\"device\" #de_m=\"ngModel\" [(ngModel)]=\"mobile_1\" [ngModelOptions]=\"{standalone: true}\" required>\r\n      <mat-option *ngFor=\"let mobile of mobiles\" [value]=\"mobile._id\" >\r\n      {{mobile.DeviceName}}\r\n    </mat-option>\r\n        </mat-select>&nbsp; <span style=\"color:red\">{{this.invalid}}</span>\r\n        <!-- <div *ngIf=\"de_m.invalid\" style=\"color: red\">*</div> -->\r\n      </mat-grid-tile>\r\n      </mat-grid-list>\r\n\r\n\r\n<mat-grid-list cols=\"2\" rowHeight=\"8:0.5\">\r\n  <mat-grid-tile>\r\n<p class=\"hint1\">Apple, Samsung e.t.c</p>\r\n</mat-grid-tile>\r\n<mat-grid-tile>\r\n<p class=\"hint1\">Mobile Phones, Tablets e.t.c.</p>\r\n</mat-grid-tile>\r\n</mat-grid-list>\r\n<div [hidden]=\"!newbr\">\r\n  <label for=\"newbrand\" class=\"titles\" id=\"price\">Cannot Find Your Brand ? </label><br>\r\n<input type=\"text\" placeholder=\"Add Brand\" class=\"condition_area\" id=\"new_brand\" maxlength=\"14\" [(ngModel)]=\"new_brand\" [ngModelOptions]=\"{standalone: true}\" [value]=\"new_brand\" required>\r\n<button mat-raised-button class=\"brand_but\" (click)=\"createbrand(new_brand)\" style=\"background-color:#156dbf; border-radius: 7px 7px 7px 7px;color:white;\"> Add Brand</button>\r\n</div>\r\n  <label for=\"price\" class=\"titles\" id=\"price\">Price</label><br>\r\n  <input type=\"number\" class=\"price_box\" step=\"100\" min=\"1\" required #co_m=\"ngModel\" [(ngModel)]=\"price_1\" [ngModelOptions]=\"{standalone: true}\" [value]=\"price\"/> &nbsp; <span style=\"color:red\">{{this.invalid}}</span><br>\r\n  <!-- <div *ngIf=\"co_m.invalid\" style=\"color: red\">*</div> -->\r\n\r\n  <label for=\"description\" class=\"titles\" id=\"description\">Ad Description</label><br>\r\n  <textarea matInput rows=\"4\" cols=\"50\" class=\"description\" maxlength=\"3000\" #d_m=\"ngModel\" [(ngModel)]=\"description_1\" [ngModelOptions]=\"{standalone: true}\" [value]=\"description\"> required </textarea> &nbsp; <span style=\"color:red\">{{this.invalid}}</span>\r\n  <!-- <div *ngIf=\"d_m.invalid\" style=\"color: red\">*</div> -->\r\n  <p class=\"hint1\">Max 3000 Characters</p>\r\n\r\n  <mat-grid-list cols=\"2\" rowHeight=\"8:0.5\">\r\n    <mat-grid-tile>\r\n  <label for=\"color\" class=\"titles1\" id=\"color\">Color</label>\r\n  </mat-grid-tile>\r\n  <mat-grid-tile>\r\n    <label for=\"storage\" class=\"titles1\" id=\"storage\">Storage</label><br>\r\n  </mat-grid-tile>\r\n  </mat-grid-list>\r\n\r\n\r\n  <mat-grid-list cols=\"2\" rowHeight=\"5:1\">\r\n  <mat-grid-tile>\r\n  <mat-select class=\"color_area\" id=\"color\" #c_m=\"ngModel\" [(ngModel)]=\"color_1\" [ngModelOptions]=\"{standalone: true}\" required>\r\n  <mat-option *ngFor=\"let color of colors\" [value]=\"color\">\r\n  {{color}}\r\n  </mat-option>\r\n  </mat-select> &nbsp; <span style=\"color:red\">{{this.invalid}}</span>\r\n  <!-- <div *ngIf=\"c_m.invalid\" style=\"color: red\">*</div> -->\r\n\r\n\r\n  </mat-grid-tile>\r\n  <mat-grid-tile>\r\n  <mat-select class=\"storage_area\" id=\"storage\" #s_m=\"ngModel\" [(ngModel)]=\"store_1\" [ngModelOptions]=\"{standalone: true}\" required>\r\n  <mat-option *ngFor=\"let storage of storage\" [value]='storage+\" GB\"' >\r\n  {{storage}} GB\r\n  </mat-option>\r\n  </mat-select> &nbsp; <span style=\"color:red\">{{this.invalid}}</span>\r\n  <!-- <div *ngIf=\"s_m.invalid\" style=\"color: red\">*</div> -->\r\n\r\n  </mat-grid-tile>\r\n  </mat-grid-list>\r\n\r\n  <label for=\"IMEI\" class=\"titles\" id=\"IMEI\">IMEI</label><br>\r\n  <input matInput type=\"number\" min=\"0\" rows=\"1\" class=\"imi\" maxlength=\"14\" minlength=\"14\" [(ngModel)]=\"imei_nu\" [ngModelOptions]=\"{standalone: true}\" [value]=\"IMEI\" required> &nbsp; <span style=\"color:red\">{{this.imei_not}}</span>\r\n  <!-- <mat-error *ngIf=\"IMEI.('minLength')\" style=\"font-size:130%;\">Password is required</mat-error> -->\r\n  <p class=\"hint1\">Minimum 14 characters. (optional)</p>\r\n\r\n\r\n  <mat-grid-list cols=\"2\" rowHeight=\"8:0.5\">\r\n    <mat-grid-tile>\r\n  <label for=\"condition\" class=\"titles1\" id=\"condition\">Condition</label>\r\n  </mat-grid-tile>\r\n  <mat-grid-tile>\r\n    <label for=\"ag\" class=\"titles1\" id=\"ag\">Age</label><br>\r\n  </mat-grid-tile>\r\n  </mat-grid-list>\r\n\r\n\r\n  <mat-grid-list cols=\"2\" rowHeight=\"5:1\">\r\n  <mat-grid-tile>\r\n  <mat-select class=\"color_area\" id=\"condition\" #c_m=\"ngModel\" [(ngModel)]=\"condition_1\" [ngModelOptions]=\"{standalone: true}\" required>\r\n  <mat-option *ngFor=\"let condition of condition\" [value]=\"condition._id\">\r\n  {{condition.title}}\r\n  </mat-option>\r\n  </mat-select> &nbsp; <span style=\"color:red\">{{this.invalid}}</span>\r\n  <!-- <div *ngIf=\"c_m.invalid\" style=\"color: red\">*</div> -->\r\n\r\n\r\n  </mat-grid-tile>\r\n  <mat-grid-tile>\r\n  <mat-select class=\"color_area\" id=\"ag\" [(ngModel)]=\"ag_1\" [ngModelOptions]=\"{standalone: true}\" required>\r\n  <mat-option *ngFor=\"let ag of age\" [value]=\"ag.count\" >\r\n  {{ag.name}}\r\n  </mat-option>\r\n  </mat-select> &nbsp; <span style=\"color:red\">{{this.invalid}}</span>\r\n  <!-- <div *ngIf=\"s_m.invalid\" style=\"color: red\">*</div> -->\r\n\r\n  </mat-grid-tile>\r\n  </mat-grid-list>\r\n\r\n  <!-- <label for=\"condition\" class=\"titles\" id=\"condition\">Condition</label><br>\r\n  <mat-select class=\"condition_area\" id=\"condition\" name=\"condition\" #c_m=\"ngModel\" [(ngModel)]=\"condition_1\" [ngModelOptions]=\"{standalone: true}\" required>\r\n  <mat-option *ngFor=\"let condition of condition\"  [value]=\"condition._id\">\r\n  {{condition.title}}\r\n  </mat-option>\r\n  </mat-select>\r\n\r\n  <br><label for=\"ag\" class=\"titles\" id=\"ag\">Age</label><br>\r\n  <mat-select class=\"condition_area\" id=\"ag\" name=\"ag\" [(ngModel)]=\"ag_1\" [ngModelOptions]=\"{standalone: true}\" required>\r\n  <mat-option *ngFor=\"let ag of age\" (click)=\"selectage(ag.count)\" [value]=\"ag.count\">\r\n  {{ag.name}}\r\n  </mat-option>\r\n  </mat-select> -->\r\n\r\n\r\n  <!-- <div *ngIf=\"c_m.invalid\" style=\"color: red\">*</div> -->\r\n\r\n\r\n  <div class=\"picture_area\">\r\n    <label class=\"titles\">Device Details</label><br>\r\n    <label for=\"file\">\r\n        <img src=\"assets\\images\\Untitled-1_0003_Layer-1.png\" class=\"fle\"/>\r\n    </label>\r\n\r\n    <input id=\"file\" type=\"file\" [value]=\"pictures\" (change)=\"handleFileInput($event)\" multiple />\r\n  </div>\r\n  <div class=\"picture_view\">\r\n    <img id=\"blah\" class=\"picture_view\" [src]=\"imageSrc || 'http://placehold.it/180'\" alt=\"your image\" />\r\n  </div>\r\n\r\n  <p class=\"hint1\">Ads with Photos Sell Faster</p>\r\n</mat-step>\r\n\r\n  <mat-step>\r\n    <ng-template matStepLabel>Functional or Physical (optional)</ng-template>\r\n  <label class=\"titles\">Does the Mobile Switch on ? &nbsp; &nbsp; </label>\r\n  <label class=\"container\" for=\"switch\" id=\"switch\">\r\n  <mat-checkbox class=\"checkmark\" color=\"warn\" [(ngModel)]=\"checksw\" name=\"chc\" ng-true-value = 'false'\r\n    ng-false-value='true' (ngModelChange)=\"switchcheck(checksw)\"> </mat-checkbox>\r\n  </label>\r\n  <p class=\"hint1\">Should be able to make and receive calls</p><br>\r\n\r\n  <label for=\"f&pcon\" class=\"titles\" id=\"f&pcon\">Functional or Physical Condition</label><br>\r\n  <p class=\"hint1\">Please Tick/Untick Checkboxes</p>\r\n  <div *ngFor=\"let issue of issues\" >\r\n  <mat-checkbox class=\"f&p_con\" color=\"warn\" [(ngModel)]=\"issue.checked\" name=\"checkis\" [value]=\"issue._id\" (ngModelChange)=\"checkboxissues(issue._id)\">\r\n  <label for=\"f&pcon\" class=\"hint1\" id=\"f&pcon\">\r\n  {{issue.description}}\r\n  </label>\r\n  </mat-checkbox>\r\n  </div>\r\n  </mat-step>\r\n  <mat-step>\r\n    <ng-template matStepLabel>Accessories (optional)</ng-template>\r\n  <label for=\"access\" class=\"titles\" id=\"access\">Available Accessories</label><br>\r\n  <p class=\"hint1\">Please Tick/Untick Checkboxes</p>\r\n  <div *ngFor=\"let accessory of accessories\">\r\n    <mat-checkbox class=\"f&p_con\" color=\"warn\" [(ngModel)]=\"accessory.checked\" name=\"check\" [value]=\"accessory._id\" (ngModelChange)=\"checkBoxChange(accessory._id)\">\r\n    <label for=\"f&pcon\" class=\"hint1\" id=\"f&pcon\">\r\n    {{accessory.title}}\r\n    </label>\r\n    </mat-checkbox>\r\n  </div>\r\n</mat-step>\r\n</mat-vertical-stepper>\r\n<img src=\"\\assets\\images\\Untitled-1_0002_POST-YOUR-AD.png\" (click)=\"submit(title_1,category_1,brand_1,mobile_1,price_1,description_1,color_1,store_1,imei_nu,condition_1,ag_1,pictures_1,accessory_1)\" class=\"post\"/>\r\n\r\n</form>\r\n\r\n\r\n\r\n\r\n\r\n\r\n<!-- <form [formGroup]=\"passForm\" (ngSubmit)=\"onsellFormSubmit(sellForm.value)\" [hidden]=\"!fhid\" >\r\n  <mat-vertical-stepper [linear]=\"isLinear\" #stepper>\r\n    <mat-step>\r\n        <ng-template matStepLabel>Necessary Requirements</ng-template>\r\n        <label for=\"title\" class=\"titles\" id=\"title\">Ad Title</label>\r\n        <mat-form-field class=\"w-100 mt-2\">\r\n          <input matInput placeholder=\"\" class=\"form_area\" formControlName=\"title\" required>\r\n          <mat-error *ngIf=\"sellForm.controls.title.errors?.required\">Title is required</mat-error>\r\n        </mat-form-field>\r\n    <p class=\"hint1\">Max 100 characters.</p>\r\n\r\n  <label for=\"category\" class=\"titles\" id=\"categ\">Category</label><br>\r\n  <mat-form-field style=\"width:45%\">\r\n    <mat-select  id=\"categ\" required>\r\n      <mat-option *ngFor=\"let category of categories\" [value]=\"category.name\" formControlName=\"category\">\r\n        <img [src]=\"category.image\" class=\"images\">\r\n                {{category.name}}\r\n      </mat-option>\r\n    </mat-select>\r\n    <mat-error *ngIf=\"sellForm.controls.category.errors?.required\">Category is required</mat-error>\r\n  </mat-form-field>\r\n    <p class=\"hint1\">Mobile Phones Tablets e.t.c.</p>\r\n\r\n    <mat-grid-list cols=\"2\" rowHeight=\"8:0.5\">\r\n      <mat-grid-tile>\r\n    <label for=\"brands\" class=\"titles1\" id=\"brands\">Brands</label>\r\n    </mat-grid-tile>\r\n    <mat-grid-tile>\r\n      <label for=\"device\" class=\"titles1\" id=\"device\">Device Model</label><br>\r\n    </mat-grid-tile>\r\n    </mat-grid-list>\r\n\r\n        <mat-grid-list cols=\"2\" rowHeight=\"5:1\">\r\n          <mat-grid-tile>\r\n\r\n      <mat-form-field style=\"width:90%\">\r\n        <mat-select  id=\"brands\" (ngModelChange)=\"setNewBrand($event)\" required>\r\n          <mat-option *ngFor=\"let brand of brands\" [value]=\"brand\" formControlName=\"brand\">\r\n            <img [src]=\"brand.picture\" class=\"images\" align=\"Middle\">\r\n                    {{brand.brandName}}\r\n          </mat-option>\r\n        </mat-select>\r\n        <mat-error *ngIf=\"sellForm.controls.brand.errors?.required\">Brand is required</mat-error>\r\n      </mat-form-field>\r\n\r\n    </mat-grid-tile>\r\n      <mat-grid-tile>\r\n\r\n        <mat-form-field style=\"width:90%\">\r\n          <mat-select  id=\"device\" required>\r\n            <mat-option *ngFor=\"let mobile of mobiles\" [value]=\"mobile.id\" formControlName=\"mobile\">\r\n                      {{mobile.DeviceName}}\r\n            </mat-option>\r\n          </mat-select>\r\n          <mat-error *ngIf=\"sellForm.controls.mobile.errors?.required\">Mobile is required</mat-error>\r\n        </mat-form-field>\r\n      </mat-grid-tile>\r\n      </mat-grid-list>\r\n\r\n\r\n<mat-grid-list cols=\"2\" rowHeight=\"8:0.5\">\r\n  <mat-grid-tile>\r\n<p class=\"hint1\">Apple, Samsung e.t.c</p>\r\n</mat-grid-tile>\r\n<mat-grid-tile>\r\n<p class=\"hint1\">Mobile Phones, Tablets e.t.c.</p>\r\n</mat-grid-tile>\r\n</mat-grid-list>\r\n<div>\r\n  <label for=\"newbrand\" class=\"titles\" id=\"price\">Cannot Find Your Brand ? </label><br>\r\n<input type=\"text\" placeholder=\"Add Brand\" class=\"condition_area\" id=\"new_brand\" maxlength=\"14\" [(ngModel)]=\"new_brand\" [ngModelOptions]=\"{standalone: true}\" [value]=\"new_brand\" required>\r\n<button mat-raised-button class=\"brand_but\" (click)=\"createbrand(new_brand)\" style=\"background-color:#156dbf; border-radius: 7px 7px 7px 7px;color:white;\" (click)=\"adrouter()\"> Add Brand</button>\r\n</div><br>\r\n  <label for=\"price\" class=\"titles\" id=\"price\">Price</label><br>\r\n  <mat-form-field style=\"width:45%\">\r\n    <input matInput placeholder=\"\" type=\"number\" step=\"100\" formControlName=\"price\" [value]=\"price\" required>\r\n    <mat-error *ngIf=\"sellForm.controls.price.errors?.required\">Price is required</mat-error>\r\n  </mat-form-field><br>\r\n\r\n\r\n  <label for=\"description\" class=\"titles\" id=\"description\">Ad Description</label><br>\r\n  <textarea matInput rows=\"4\" cols=\"50\" class=\"description\" maxlength=\"3000\" [(ngModel)]=\"description_1\" [ngModelOptions]=\"{standalone: true}\" [value]=\"description\"> required </textarea>\r\n  <p class=\"hint1\">Max 3000 Characters</p>\r\n\r\n  <mat-grid-list cols=\"2\" rowHeight=\"8:0.5\">\r\n    <mat-grid-tile>\r\n  <label for=\"color\" class=\"titles1\" id=\"color\">Color</label>\r\n  </mat-grid-tile>\r\n  <mat-grid-tile>\r\n    <label for=\"storage\" class=\"titles1\" id=\"storage\">Storage</label><br>\r\n  </mat-grid-tile>\r\n  </mat-grid-list>\r\n\r\n\r\n  <mat-grid-list cols=\"2\" rowHeight=\"5:1\">\r\n  <mat-grid-tile>\r\n  <mat-select class=\"color_area\" id=\"color\" [(ngModel)]=\"color_1\" [ngModelOptions]=\"{standalone: true}\" required>\r\n  <mat-option *ngFor=\"let color of colors\" [value]=\"color\">\r\n  {{color}}\r\n  </mat-option>\r\n  </mat-select>\r\n\r\n  </mat-grid-tile>\r\n  <mat-grid-tile>\r\n  <mat-select class=\"storage_area\" id=\"storage\" [(ngModel)]=\"store_1\" [ngModelOptions]=\"{standalone: true}\" required>\r\n  <mat-option *ngFor=\"let storage of storage\" [value]='storage+\" GB\"' >\r\n  {{storage}} GB\r\n  </mat-option>\r\n  </mat-select>\r\n  </mat-grid-tile>\r\n  </mat-grid-list>\r\n\r\n  <label for=\"condition\" class=\"titles\" id=\"condition\">Condition</label><br>\r\n  <mat-select class=\"condition_area\" id=\"condition\" name=\"condition\" [(ngModel)]=\"condition_1\" [ngModelOptions]=\"{standalone: true}\" required>\r\n  <mat-option *ngFor=\"let condition of condition\"  [value]=\"condition._id\">\r\n  {{condition.title}}\r\n  </mat-option>\r\n  </mat-select>\r\n\r\n  <div class=\"picture_area\">\r\n    <label class=\"titles\">Device Details</label><br>\r\n    <label for=\"file\">\r\n        <img src=\"assets\\images\\Untitled-1_0003_Layer-1.png\" class=\"fle\"/>\r\n    </label>\r\n\r\n    <input id=\"file\" type=\"file\" [value]=\"pictures\" (change)=\"handleFileInput($event)\" multiple />\r\n  </div>\r\n  <div class=\"picture_view\">\r\n    <img id=\"blah\" class=\"picture_view\" [src]=\"imageSrc || 'http://placehold.it/180'\" alt=\"your image\" />\r\n  </div>\r\n\r\n  <p class=\"hint1\">Ads with Photos Sell Faster</p>\r\n</mat-step>\r\n\r\n  <mat-step>\r\n    <ng-template matStepLabel>Functional or Physical (optional)</ng-template>\r\n  <label class=\"titles\">Does the Mobile Switch on ?</label>\r\n  <label class=\"container\" for=\"switch\" id=\"switch\">\r\n  <mat-checkbox class=\"checkmark\" color=\"warn\" [(ngModel)]=\"checksw\" name=\"chc\" ng-true-value = 'false'\r\n    ng-false-value='true' (ngModelChange)=\"switchcheck(checksw)\"> </mat-checkbox>\r\n  </label>\r\n  <p class=\"hint1\">Should be able to make and receive calls</p><br>\r\n\r\n  <label for=\"f&pcon\" class=\"titles\" id=\"f&pcon\">Functional or Physical Condition</label><br>\r\n  <p class=\"hint1\">Please Tick/Untick Checkboxes</p>\r\n  <div *ngFor=\"let issue of issues\" >\r\n  <mat-checkbox class=\"f&p_con\" color=\"warn\" [(ngModel)]=\"issue.checked\" name=\"checkis\" [value]=\"issue._id\" (ngModelChange)=\"checkboxissues(issue._id)\">\r\n  <label for=\"f&pcon\" class=\"hint1\" id=\"f&pcon\">\r\n  {{issue.description}}\r\n  </label>\r\n  </mat-checkbox>\r\n  </div>\r\n  </mat-step>\r\n  <mat-step>\r\n    <ng-template matStepLabel>Accessories (optional)</ng-template>\r\n  <label for=\"access\" class=\"titles\" id=\"access\">Available Accessories</label><br>\r\n  <p class=\"hint1\">Please Tick/Untick Checkboxes</p>\r\n  <div *ngFor=\"let accessory of accessories\">\r\n    <mat-checkbox class=\"f&p_con\" color=\"warn\" [(ngModel)]=\"accessory.checked\" name=\"check\" [value]=\"accessory._id\" (ngModelChange)=\"checkBoxChange(accessory._id)\">\r\n    <label for=\"f&pcon\" class=\"hint1\" id=\"f&pcon\">\r\n    {{accessory.title}}\r\n    </label>\r\n    </mat-checkbox>\r\n  </div>\r\n</mat-step>\r\n</mat-vertical-stepper>\r\n<img src=\"\\assets\\images\\Untitled-1_0002_POST-YOUR-AD.png\" (click)=\"submit(title_1,category_1,brand_1,mobile_1,price_1,description_1,color_1,store_1,condition_1,pictures_1,accessory_1)\" class=\"post\"/>\r\n\r\n</form> -->\r\n\r\n\r\n\r\n\r\n\r\n<div [hidden]=\"!confhid\">\r\n\r\n<div class=\"cnfirm\" *ngFor=\"let myad of pic_view\" >\r\n  <div class=\"img_div\">\r\n    <img [src]=\"myad.pictures[0]\" height=\"300\" width=\"300\" class=\"pictures\"/>\r\n  </div>\r\n  <b style=\"position:absolute; font-family:proxs; font-size:150%\">Title </b> <span style=\"position:absolute; left:50%; font-family:proxs\">{{myad.title}} </span><br><br>\r\n  <b style=\"position:absolute; font-family:proxs; font-size:150%\">Brand Name </b> <span style=\"position:absolute; left:50%; font-family:proxs\">{{myad.brandName}} </span><br><br>\r\n  <b style=\"position:absolute; font-family:proxs; font-size:150% \">Description </b> <span style=\"position:absolute; left:50%; font-family:proxs\">{{myad.description}} </span><br><br>\r\n  <b style=\"position:absolute; font-family:proxs;font-size:150%\">Price </b> <span style=\"position:absolute; left:50%; font-family:proxs\">{{myad.price}} </span><br><br>\r\n  <b style=\"position:absolute; font-family:proxs; font-size:150%\">Color </b> <span style=\"position:absolute; left:50%; font-family:proxs\">{{myad.color}} </span><br><br>\r\n  <b style=\"position:absolute; font-family:proxs; font-size:150%\">Storage </b> <span style=\"position:absolute; left:50%; font-family:proxs\">{{myad.storage}} </span><br><br>\r\n  <b style=\"position:absolute; font-family:proxs; font-size:150%\">Condition </b> <span style=\"position:absolute; left:50%; font-family:proxs\">{{myad.condition.title}} </span><br><br>\r\n\r\n  <b style=\"position:absolute; font-family:proxs; font-size:150%\">Physical Conditions </b><br>\r\n  <div *ngFor=\"let ad of myad.physicalIssues\" >\r\n  <span style=\"position:absolute; left:50%; font-family:proxs\">{{ad.title}} <mat-icon style=\"color:#156dbf; float:left\"> done </mat-icon> </span> <br><br>\r\n</div><br>\r\n\r\n<b style=\"position:absolute; font-family:proxs; font-size:150%\">Accessories</b>\r\n<div *ngFor=\"let ab of myad.accessories\" >\r\n   <span style=\"position:absolute; left:50%; font-family:proxs\">{{ab.title}} <mat-icon style=\"color:#156dbf;float:left\"> done </mat-icon> </span> <br><br>\r\n</div>\r\n<div>\r\n  <button mat-stroked-button (click)=\"verify_add()\" style=\"border-color:#156dbf;border-radius:5px 5px 5px 5px; font-family:proxr\" class=\"post1\">Confirm Add</button>\r\n\r\n</div>\r\n\r\n\r\n</div>\r\n\r\n</div>\r\n\r\n<div [hidden]=\"!hid\" style=\"margin-top:5%; \">\r\n  <!-- <button mat-raised-button class=\"skip_but\" (click)=\"skiploc()\" type=\"submit\" style=\"border-color:#156dbf; border-radius: 7px 7px 7px 7px;color:#156dbf;\"> Skip </button> -->\r\n  <div class=\"skip_but\" (click)=\"skiploc()\" type=\"submit\" style=\"color:#156dbf;\"> Skip  </div>\r\n\r\n  <!-- <div fxLayout=\"row wrap\" style=\" margin-bottom:5%\"> -->\r\n  <!-- <div fxFlex=\"100\" fxFlex.gt-md=\"50\" fxFlex.md=\"50\" fxFlex.sm=\"50\"> -->\r\n\r\n  <div class=\"container-fluid\" style=\"margin-top:1%; margin-left:10%\"  >\r\n    <div class='row'>\r\n      <div class=\"form-group\">\r\n        <!-- <label class='titles' style=\"text-align:center\">City</label><br> -->\r\n        <input class='title_area1' (change)=\"updateOnMap()\" placeholder=\"Enter City\" [(ngModel)]='location.address_level_2'/>\r\n      </div><br>\r\n\r\n    </div>\r\n  </div>\r\n\r\n<div style=\"box-shadow:5px 6px 6px #bfbdc1; margin-left:30%; width:40%\">\r\n  <agm-map [(latitude)]=\"this.latitude\" [(longitude)]=\"this.longitude\" [(zoom)]=\"location.zoom\" [disableDefaultUI]=\"true\" [zoomControl]=\"true\" [(fitBounds)]='location.viewport' >\r\n    <agm-marker [(latitude)]=\"this.latitude\" [(longitude)]=\"this.longitude\" [markerDraggable]=\"location.marker.draggable\" (dragEnd)='markerDragEnd($event)' ></agm-marker>\r\n\r\n\r\n  <!-- <agm-circle [latitude]=\"this.latitude\" [longitude]=\"this.longitude\"\r\n    [(radius)]=\"circleRadius\"\r\n    [fillColor]=\"'blue'\"\r\n    [circleDraggable]=\"true\"\r\n    [editable]=\"true\"></agm-circle> -->\r\n  </agm-map>\r\n\r\n</div>\r\n<!-- </div> -->\r\n\r\n  <!-- <div fxFlex=\"100\" fxFlex.gt-md=\"50\" fxFlex.md=\"50\"  fxFlex.sm=\"50\" ngClass.gt-sm=\" m-0\" ngClass.sm=\"mt-2\" ngClass.xs=\"mt-2\" style=\"font-family: proxr;\"> -->\r\n\r\n\r\n\r\n  <div style=\"text-align:center; margin-top:3%;\">\r\n    <button mat-raised-button (click)=\"advertlocation()\" type=\"submit\" style=\"border:1px solid; border-color:#156dbf; color:#156dbf; border-radius: 7px 7px 7px 7px;font-size:150%; height:60%; padding-top: 0.5%;padding-bottom: 0.5%; width:15%\"> Update </button>\r\n\r\n  </div>\r\n\r\n<!-- </div> -->\r\n<!-- </div> -->\r\n\r\n\r\n</div>\r\n\r\n</div>\r\n<!-- <img src=\"\\assets\\images\\cam.png\" (click)=\"uploadImage(file)\" class=\"post\"/> -->\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n<!--\r\n<mat-vertical-stepper [linear]=\"isLinear\" #stepper>\r\n<mat-step>\r\n<button mat-button matStepperNext>Next</button> </mat-step>\r\n<mat-step><ng-template matStepLabel>Fill out your name</ng-template> </mat-step>\r\n<mat-step><ng-template matStepLabel>ahahahah</ng-template></mat-step>\r\n</mat-vertical-stepper>\r\n<mat-select class=\"brnds\" placeholder=\"Accessories\" multiple  >\r\n  <mat-option *ngFor=\"let accessory of accessories\" [value]=\"accessory\" >\r\n  <img [src]=\"accessory.image\">\r\n  {{accessory.title}}\r\n</mat-option>\r\n</mat-select>\r\n<mat-select class=\"brnds\" placeholder=\"Any Issues ?\" multiple  >\r\n  <mat-option *ngFor=\"let issue of issues\" [value]=\"issue\" >\r\n  <img [src]=\"issue.image\">\r\n  {{issue.description}}\r\n</mat-option>\r\n</mat-select>\r\n\r\n  <div fxLayout=\"row\" fxFlex=\"100\" fxFlex.gt-sm=\"25\">\r\n  </div>\r\n  <div fxLayout=\"row\" fxFlex=\"100\" fxFlex.gt-sm=\"25\">\r\n  </div>\r\n  <div fxLayout=\"row\" fxFlex=\"100\" fxFlex.gt-sm=\"25\">\r\n  </div>\r\n  <div fxLayout=\"row\" fxFlex=\"100\" fxFlex.gt-sm=\"25\">\r\n  <label>Your Desired Price</label>\r\n  <input type=\"number\" placeholder=\"Price in:\" step=\"100\" />\r\n</div>\r\n<div fxLayout=\"row\">\r\n  <mat-form-field>\r\n  <textarea matInput placeholder=\"Add Your Description\"></textarea>\r\n</mat-form-field>\r\n  </div>\r\n  <div>\r\n    <input type=\"file\" multiple>\r\n    <label for=\"file\"> Select Image </label>\r\n    <input type=\"file\" Id=\"file\"\r\n    (ngModelChange)=\"handleFileInput($event.target.files)\"/>\r\n    <img [src]=\"url\" height=\"200\"> <br/>\r\n  </div>\r\n  <select class=\"brnds\" placeholder=\"Select Brand\" >\r\n  <option *ngFor=\"let brand of brands\" [value]=\"brand\" (ngSubmit)=\"rbrands()\">\r\n  {{brand.brandName}}\r\n</option>\r\n</select> -->\r\n\r\n<app-options></app-options>\r\n\r\n<!-- <app-footer></app-footer> -->\r\n\r\n<div *ngIf=\"showBackToTop\" fxLayout=\"row\" fxLayoutAlign=\"center center\" class=\"back-to-top transition\" (click)=\"scrollToTop()\">\r\n    <mat-icon>arrow_upward</mat-icon>\r\n</div>\r\n\r\n\r\n</mat-sidenav-container>\r\n"

/***/ }),

/***/ "./src/app/pages/sell1/sell1.component.scss":
/*!**************************************************!*\
  !*** ./src/app/pages/sell1/sell1.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".logo {\n  display: block;\n  margin: auto;\n  margin-top: 3%;\n  height: 120px; }\n\n.sub {\n  display: block;\n  margin: auto;\n  text-align: center;\n  margin-top: 5%; }\n\n.post {\n  float: right;\n  margin-right: -5%;\n  margin-top: 2%;\n  height: 20%;\n  width: 20%; }\n\n.post1 {\n  margin-bottom: 5%;\n  float: right;\n  margin-right: -5%;\n  width: 20%; }\n\n.form_div {\n  align-items: center;\n  margin: auto;\n  width: 90%;\n  margin-bottom: 10%; }\n\n.inner_div {\n  margin: auto;\n  margin-top: 5%;\n  width: 80%; }\n\n.titles {\n  font-size: 150%;\n  font-family: proxs;\n  color: #342d38; }\n\n.titles_s {\n  font-size: 200%;\n  text-align: center;\n  margin-top: -2%;\n  font-family: proxs;\n  color: #342d38; }\n\n.titles1 {\n  text-align: left;\n  width: 100%;\n  font-size: 150%;\n  font-family: proxs;\n  color: #342d38; }\n\n.titles2 {\n  text-align: left;\n  width: 100%;\n  font-size: 150%;\n  font-family: proxs;\n  position: fixed;\n  color: #342d38; }\n\n.hint1 {\n  text-align: left;\n  width: 100%;\n  font-family: proxs;\n  font-size: 100%;\n  color: #AAAAAA; }\n\n.images {\n  height: 8%;\n  width: 8%; }\n\n.options {\n  display: inline; }\n\n.test {\n  display: inline;\n  margin-top: 0px; }\n\n.title_area {\n  font-size: 100%;\n  font-family: proxr;\n  outline: none;\n  width: 100%;\n  padding: 12px 20px;\n  margin: 8px 0;\n  display: inline-block;\n  border: 1px solid #ccc;\n  border-radius: 8px;\n  box-sizing: border-box;\n  color: #342d38; }\n\n.title_area1 {\n  font-size: 100%;\n  font-family: proxr;\n  outline: none;\n  width: 30%;\n  padding: 12px 20px;\n  display: inline-block;\n  border: 1px solid #ccc;\n  border-radius: 8px;\n  box-sizing: border-box;\n  color: #342d38;\n  margin-left: 30%;\n  text-align: left; }\n\n.category_area {\n  font-size: 100%;\n  font-family: proxr;\n  width: 49.5%;\n  background-color: white;\n  padding: 12px 20px;\n  margin: 8px 0;\n  display: inline-block;\n  border: 1px solid #ccc;\n  border-radius: 8px;\n  box-sizing: border-box;\n  color: #342d38; }\n\n.categor {\n  font-size: 100%;\n  font-family: proxr;\n  width: 49.5%;\n  display: inline-block;\n  color: #342d38; }\n\n.brands {\n  font-size: 100%;\n  font-family: proxr;\n  width: 99%;\n  background-color: white;\n  padding: 12px 20px;\n  margin: 8px 0;\n  float: left;\n  display: inline-block;\n  border: 1px solid #ccc;\n  border-radius: 8px;\n  box-sizing: border-box;\n  color: #342d38; }\n\n.device {\n  font-size: 100%;\n  font-family: proxr;\n  width: 99%;\n  float: right;\n  background-color: white;\n  padding: 12px 20px;\n  margin: 8px 0;\n  display: inline-block;\n  border: 1px solid #ccc;\n  border-radius: 8px;\n  box-sizing: border-box;\n  color: #342d38; }\n\n.price_box {\n  font-size: 100%;\n  font-family: proxr;\n  width: 50%;\n  background-color: white;\n  padding: 12px 20px;\n  margin: 8px 0;\n  display: inline-block;\n  border: 1px solid #ccc;\n  border-radius: 8px;\n  box-sizing: border-box;\n  color: #342d38; }\n\n.description {\n  font-size: 100%;\n  font-family: proxr;\n  width: 100%;\n  background-color: white;\n  padding: 12px 20px;\n  margin: 8px 0;\n  display: inline-block;\n  border: 1px solid #ccc;\n  border-radius: 8px;\n  box-sizing: border-box;\n  color: #342d38; }\n\n.imi {\n  font-size: 100%;\n  font-family: proxr;\n  width: 50%;\n  background-color: white;\n  padding: 12px 20px;\n  margin: 8px 0;\n  display: inline-block;\n  border: 1px solid #ccc;\n  border-radius: 8px;\n  box-sizing: border-box;\n  color: #342d38; }\n\n.storage_area {\n  font-size: 100%;\n  font-family: proxr;\n  width: 99%;\n  background-color: white;\n  padding: 12px 20px;\n  margin: 8px 0;\n  float: left;\n  display: inline-block;\n  border: 1px solid #ccc;\n  border-radius: 8px;\n  box-sizing: border-box;\n  color: #342d38; }\n\n.color_area {\n  font-size: 100%;\n  font-family: proxr;\n  width: 99%;\n  float: right;\n  background-color: white;\n  padding: 12px 20px;\n  margin: 8px 0;\n  display: inline-block;\n  border: 1px solid #ccc;\n  border-radius: 8px;\n  box-sizing: border-box;\n  color: #342d38; }\n\n.condition_area {\n  font-family: proxr;\n  font-size: 100%;\n  width: 50%;\n  background-color: white;\n  padding: 12px 20px;\n  margin: 8px 0;\n  display: inline-block;\n  border: 1px solid #ccc;\n  border-radius: 8px;\n  box-sizing: border-box;\n  color: #342d38; }\n\n.picture_area > input {\n  display: none; }\n\n.picture_view {\n  height: 20%;\n  width: 30%; }\n\n.brand_but {\n  float: right;\n  font-family: proxr; }\n\n.fle {\n  height: 70px; }\n\n.brnds {\n  font-size: 150%; }\n\n.review-order-table.mat-table {\n  display: block;\n  overflow-x: auto; }\n\n.review-order-table.mat-table .mat-row, .review-order-table.mat-table .mat-header-row {\n    display: flex;\n    border-bottom-width: 1px;\n    border-bottom-style: solid;\n    align-items: center;\n    min-height: 48px;\n    padding: 0 24px;\n    min-width: 760px; }\n\n.review-order-table.mat-table .mat-row {\n    min-height: 60px; }\n\n.review-order-table.mat-table .mat-cell, .review-order-table.mat-table .mat-header-cell {\n    flex: 1;\n    overflow: hidden;\n    word-wrap: break-word; }\n\n.review-order-table.mat-table .mat-header-cell {\n    font-size: 14px; }\n\n.review-order-table.mat-table .mat-cell img {\n    width: 60px; }\n\n.cnfirm {\n  margin-top: 5%;\n  margin-bottom: 5%; }\n\n.skip_but {\n  float: right;\n  margin-right: 5%;\n  font-size: 120%;\n  margin-top: -12%; }\n\n.pictures {\n  height: 200px;\n  width: 130px;\n  float: right;\n  border: 3px solid;\n  border-color: #156dbf;\n  padding: 1%;\n  overflow: hidden; }\n\n.sebm-google-map-container {\n  height: 300px;\n  text-align: center; }\n"

/***/ }),

/***/ "./src/app/pages/sell1/sell1.component.ts":
/*!************************************************!*\
  !*** ./src/app/pages/sell1/sell1.component.ts ***!
  \************************************************/
/*! exports provided: Sell1Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sell1Component", function() { return Sell1Component; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app.service */ "./src/app/app.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var _agm_core_services__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @agm/core/services */ "./node_modules/@agm/core/services.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';







var Sell1Component = /** @class */ (function () {
    function Sell1Component(router, appService, snackBar, mapsApiLoader, formBuilder, zone, wrapper) {
        var _this = this;
        this.router = router;
        this.appService = appService;
        this.snackBar = snackBar;
        this.mapsApiLoader = mapsApiLoader;
        this.formBuilder = formBuilder;
        this.zone = zone;
        this.wrapper = wrapper;
        this.url = '';
        this.SelectedList = [];
        this.accessoriesArray = [];
        this.issuesArray = [];
        this.switchArray = [];
        this.fileToUpload = null;
        // public age = ["Brand New", "Less Than a Year", "1 Year", "2 Years","3 Years","4 Years","5 Years","6 Years","7 Years","Greater Than 7"];
        this.agenumeric = ["-1", "0", "1", "2", "3", "4", "5", "6", "7", "8"];
        this.age = [
            { "name": "Brand New", "count": -1 },
            { "name": "Less Than a Year", "count": 0 },
            { "name": "1 Year", "count": 1 },
            { "name": "2 Years", "count": 2 },
            { "name": "3 Years", "count": 3 },
            { "name": "4 Years", "count": 4 },
            { "name": "5 Years", "count": 5 },
            { "name": "6 Years", "count": 6 },
            { "name": "7 Years", "count": 7 },
            { "name": "Greater Than 7", "count": 8 },
        ];
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
        this.hid = false;
        this.confhid = false;
        this.fhid = true;
        this.newbr = false;
        this.heading = "SUBMIT AN AD";
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
        }
    }
    Sell1Component.prototype.ngOnInit = function () {
        this.location.marker.draggable = true;
        this.circleRadius = 200;
        this.getbrands();
        this.getallenums();
        this.addAccessories();
        this.addissues();
        this.phoneCondition();
        console.log(this.age);
        console.log(this.agenumeric);
        this.sellForm = this.formBuilder.group({
            'title': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            'category': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            'brand': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            'mobile': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            'price': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            'description': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            'color': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            'storage': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            'condition': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]
        });
    };
    Sell1Component.prototype.selectage = function (value) {
        console.log(value);
        // console.log(this.age[0]);
        // console.log(this.age[8]);
        // console.log(this.age[5]);
    };
    //   this.appService.Data.cartList.forEach(product=>{
    //     this.grandTotal += product.newPrice;
    //   });
    //   this.countries = this.appService.getCountries();
    //   this.months = this.appService.getMonths();
    //   this.years = this.appService.getYears();
    //   this.deliveryMethods = this.appService.getDeliveryMethods();
    //   this.billingForm = this.formBuilder.group({
    //     firstName: ['', Validators.required],
    //     lastName: ['', Validators.required],
    //     middleName: '',
    //     company: '',
    //     email: ['', Validators.required],
    //     phone: ['', Validators.required],
    //     country: ['', Validators.required],
    //     city: ['', Validators.required],
    //     state: '',
    //     zip: ['', Validators.required],
    //     address: ['', Validators.required]
    //   });
    //   this.deliveryForm = this.formBuilder.group({
    //     deliveryMethod: [this.deliveryMethods[0], Validators.required]
    //   });
    //   this.paymentForm = this.formBuilder.group({
    //     cardHolderName: ['', Validators.required],
    //     cardNumber: ['', Validators.required],
    //     expiredMonth: ['', Validators.required],
    //     expiredYear: ['', Validators.required],
    //     cvv: ['', Validators.required]
    //   });
    // }
    //
    // public placeOrder(){
    //   this.horizontalStepper._steps.forEach(step => step.editable = false);
    //   this.verticalStepper._steps.forEach(step => step.editable = false);
    //   this.appService.Data.cartList.length = 0;
    // public getAllBrands(){
    //   this.appService.getbrand().subscribe(data=>{
    //     console.log(data);
    //     //this.products = data['result'];
    //     if(data['success'] ){
    //     //this.brands=data['result']
    //     //this.brandName=data['result']['brandName'];
    //       // console.log(this.brandName)
    //       console.log(localStorage.getItem('jwt'))
    //     }
    //   },err=>{
    //     console.log(err);
    //   });
    //
    //
    // }
    Sell1Component.prototype.skiploc = function () {
        this.hid = false;
        this.confhid = true;
        this.fhid = false;
    };
    Sell1Component.prototype.addnew = function () {
        this.newbr = true;
    };
    Sell1Component.prototype.getbrands = function () {
        var _this = this;
        this.appService.getbrand().subscribe(function (data) {
            //console.log(localStorage.getItem('jwt'))
            console.log(data);
            _this.brands = data['result'];
            _this.brandName = data['result']['brandName'];
            _this.brandId = data['result']['_id'];
            // this.id=data['result'];
            //console.log(this.brandName);
        });
    };
    Sell1Component.prototype.getallenums = function () {
        var _this = this;
        this.appService.getenums().subscribe(function (data) {
            console.log(data);
            _this.enums = data['result'];
            _this.colors = data['result']['color'];
            console.log(data['result']['color']);
            _this.categories = data['result']['category'];
            _this.storage = data['result']['storage'];
            _this.colorcode = data['result']['colorHex'];
        });
    };
    Sell1Component.prototype.addAccessories = function () {
        var _this = this;
        this.appService.addAccessories().subscribe(function (data) {
            console.log(data);
            _this.accessories = data['result'];
        });
    };
    Sell1Component.prototype.addissues = function () {
        var _this = this;
        this.appService.addissues().subscribe(function (data) {
            console.log(data);
            _this.issues = data['result'];
        });
    };
    Sell1Component.prototype.phoneCondition = function () {
        var _this = this;
        this.appService.phone_condition().subscribe(function (data) {
            console.log(data);
            _this.condition = data['result'];
        });
    };
    // public mobileCondition(){
    //   this.appService.phoneCondition().subscribe(data=>{
    //     console.log(data);
    //     this.phone=data['result'];
    //   })
    // }
    // }
    // public getmobiles(){
    //   var id:any;
    //   this.appService.getmobiles(this.brandId).subscribe(data=>{
    //     console.log(data);
    //     this.mobiles=data['result'];
    //   })
    // }
    Sell1Component.prototype.setNewBrand = function (brand) {
        var _this = this;
        // var myobjects={
        // _id:brand._id
        // }
        console.log(brand._id);
        this.appService.getmobiles(brand._id).subscribe(function (data) {
            console.log(data);
            _this.mobiles = data['result'];
            _this.DeviceName = data['result']['DeviceName'];
        });
    };
    Sell1Component.prototype.checkBoxChange = function (value) {
        console.log(value);
        if (this.accessoriesArray.indexOf(value) == -1) {
            this.accessoriesArray.push(value);
        }
        else {
            if (this.accessoriesArray.length == 1) {
                this.accessoriesArray = [];
                console.log(this.accessoriesArray);
            }
            else {
                this.accessoriesArray.splice(value, 1);
                console.log(this.accessoriesArray);
            }
        }
    };
    Sell1Component.prototype.checkboxissues = function (value) {
        console.log(value);
        if (this.issuesArray.indexOf(value) == -1) {
            this.issuesArray.push(value);
            //console.log(this.issuesArray);
        }
        else {
            if (this.issuesArray.length == 1) {
                this.issuesArray = [];
                console.log(this.issuesArray);
            }
            else {
                this.issuesArray.splice(value, 1);
                console.log(this.issuesArray);
            }
        }
    };
    Sell1Component.prototype.switchcheck = function (value) {
        console.log(value);
        this.switchonoff = value;
        console.log(this.switchonoff);
        // if(this.switchArray.indexOf(value)==-1){
        //   this.switchArray.push("true");
        //   console.log(this.switchArray);
        // }else{
        //   if(this.switchArray.length == 1){
        //     this.switchArray.push("false");
        //     console.log(this.switchArray);
        //   }else{
        //       this.switchArray.splice(value, 1);
        //       console.log(this.switchArray);
        //   }
        // }
    };
    Sell1Component.prototype.handleFileInput = function (event) {
        var _this = this;
        this.file = event.target.files[0];
        console.log("hassam");
        console.log(this.file);
        if (event.target.files && event.target.files[0]) {
            var file = event.target.files[0];
            var reader_1 = new FileReader();
            reader_1.onload = function (e) { return _this.imageSrc = reader_1.result; };
            reader_1.readAsDataURL(file);
        }
    };
    Sell1Component.prototype.uploaduserimage = function () {
    };
    Sell1Component.prototype.submit = function (title_1, category_1, brand_1, mobile_1, price_1, description_1, color_1, store_1, imei_nu, condition_1, ag_1) {
        var _this = this;
        var imei;
        // console.log(imei_nu.length);
        if (imei_nu == null && imei_nu == undefined && imei_nu == '') {
            imei = '';
            console.log(imei);
        }
        else if (imei_nu != null && imei_nu != undefined && imei_nu != '') {
            if (imei_nu.toString().length == 14) {
                imei = imei_nu;
                console.log(imei);
            }
        }
        else {
            this.imei_not = "Min & Max of 14 characters";
            console.log(this.imei_not);
        }
        console.log(title_1, category_1, brand_1, mobile_1, price_1, description_1, color_1, store_1, imei, condition_1, ag_1);
        if (title_1 != null && category_1 != null && brand_1 != null && mobile_1 != null && price_1 != null && description_1 != null && color_1 != null && store_1 != null && condition_1 != null && ag_1 != null
            && title_1 != undefined && category_1 != undefined && brand_1 != undefined && mobile_1 != undefined && price_1 != undefined && description_1 != undefined && color_1 != undefined && store_1 != undefined && condition_1 != undefined && ag_1 != undefined
            && title_1 != '' && category_1 != '' && brand_1 != '' && mobile_1 != '' && price_1 != '' && description_1 != '' && color_1 != '' && store_1 != '' && condition_1 != '' && ag_1 != '') {
            this.appService.placeAdd(title_1, category_1, brand_1, mobile_1, price_1, description_1, color_1, store_1, imei, this.switchonoff, condition_1, ag_1, this.accessoriesArray, this.issuesArray).subscribe(function (data) {
                console.log("Data => ", data);
                _this.view = data['result'];
                _this.hid = true;
                _this.confhid = false;
                _this.fhid = false;
                _this.heading = "UPDATE LOCATION";
                if (data['result'] && _this.file != null && _this.file != undefined && _this.file != '') {
                    console.log("success");
                    _this.appService.uploadImage(_this.file, data['result']['_id']).subscribe(function (data1) {
                        _this.pic_view = [data1['result']];
                        _this.advert_id = data['result']['_id'];
                        console.log(_this.advert_id);
                        console.log(_this.latitude);
                        console.log(_this.longitude);
                    });
                }
                else {
                    _this.pic_view = [data['result']];
                }
            }, function (err) {
                if (err.status === 406) {
                    _this.snackBar.open('Adds Limit Reached, Upgrade Package', '×', { panelClass: 'success', verticalPosition: 'bottom', duration: 3000 });
                    console.log("addslimit reached");
                    _this.accrouter();
                }
            });
        }
        else {
            this.snackBar.open('Complete the empty fields', '×', { panelClass: 'success', verticalPosition: 'top', duration: 30000 });
            this.invalid = "*";
        }
        //   console.log(title_1,category_1,brand_1,mobile_1,price_1,description_1,color_1,store_1,condition_1);
        // this.appService.placeAdd(title_1,category_1,brand_1,mobile_1,price_1,description_1,color_1,store_1,this.switchonoff,condition_1,this.accessoriesArray,this.issuesArray).subscribe(data=>{
        // console.log("Data => ",data)
        // this.view=data['result'];
        // if(data['result'] ){
        //   this.hid=true;
        //   this.fhid=false;
        //   console.log("success");
        //   this.appService.uploadImage(this.file,data['result']['_id']).subscribe(data1=>{
        //     console.log(data1);
        //     this.pic_view=[data1['result']];
        //     this.advert_id=data['result']['_id'];
        //     //this.router.navigate(['/products']);
        //   });
        // }
        //
        // },err=>{
        //   console.log("wrong");
        // });
    };
    Sell1Component.prototype.accrouter = function () {
        this.router.navigate(['/account']);
    };
    Sell1Component.prototype.verify_add = function () {
        var _this = this;
        this.appService.verify_add(this.advert_id).subscribe(function (data) {
            console.log(data);
            if (data['result']) {
                _this.snackBar.open('Add Posted', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
                _this.router.navigate(['/products']);
            }
        });
    };
    Sell1Component.prototype.createbrand = function (value) {
        this.newbrand = value;
        console.log(this.newbrand);
        if (value != undefined && value != null && value != '') {
            this.appService.createbrand(this.newbrand).subscribe(function (data) {
                console.log(data);
            });
        }
    };
    //Map section start
    Sell1Component.prototype.updateOnMap = function () {
        var full_address = this.location.address_level_1 || "";
        if (this.location.address_level_2)
            full_address = full_address + " " + this.location.address_level_2;
        if (this.location.address_state)
            full_address = full_address + " " + this.location.address_state;
        if (this.location.address_country)
            full_address = full_address + " " + this.location.address_country;
        this.findLocation(full_address);
    };
    Sell1Component.prototype.findLocation = function (address) {
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
                }
                _this.map.triggerResize();
            }
            else {
                alert("Sorry, this search produced no results.");
            }
        });
        // var bounds = this.map.getBounds();
        //     var areaBounds = {
        //      north: this.location.viewport.getNorthEast().lat(),
        //      south: this.location.viewport.getSouthWest().lat(),
        //      east: getNorthEast().lng(),
        //      west: getSouthWest().lng()
        // };
        // console.log(areaBounds);
        var map = new google.maps.Map();
        var rectangle = new google.maps.Rectangle({
            bounds: map.getBounds()
        });
        var bounds = rectangle.getBounds();
        var swLat = map.getBounds().getSouthWest().lat();
        var swLng = map.getBounds().getSouthWest().lng();
        var neLat = map.getBounds().getNorthEast().lat();
        var neLng = map.getBounds().getNorthEast().lng();
        console.log('swLat: ' + swLat);
        console.log('swLng: ' + swLng);
        console.log('neLat: ' + neLat);
        console.log('neLng: ' + neLng);
    };
    Sell1Component.prototype.markerDragEnd = function (m, $event) {
        this.location.marker.lat = m.coords.lat;
        this.location.marker.lng = m.coords.lng;
        this.findAddressByCoordinates();
        // this.updateOnMap();
    };
    Sell1Component.prototype.findAddressByCoordinates = function () {
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
    Sell1Component.prototype.decomposeAddressComponents = function (addressArray) {
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
    Sell1Component.prototype.milesToRadius = function (value) {
        this.circleRadius = value / 0.00062137;
    };
    Sell1Component.prototype.circleRadiusInMiles = function () {
        return this.circleRadius * 0.00062137;
    };
    Sell1Component.prototype.advertlocation = function () {
        var _this = this;
        this.updateOnMap();
        this.heading = "CONFIRM YOUR AD";
        console.log(this.longitude);
        console.log(this.latitude);
        if (this.advert_id != null && this.advert_id != undefined && this.advert_id != '' &&
            this.latitude != null && this.latitude != undefined && this.latitude != ''
            && this.longitude != null && this.longitude != undefined && this.longitude != '') {
            this.appService.advertlocation(this.advert_id, this.latitude, this.longitude).subscribe(function (data) {
                console.log(data);
                if (data['result']) {
                    _this.hid = false;
                    _this.confhid = true;
                    _this.fhid = false;
                }
            });
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('horizontalStepper'),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatStepper"])
    ], Sell1Component.prototype, "horizontalStepper", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('verticalStepper'),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatStepper"])
    ], Sell1Component.prototype, "verticalStepper", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_agm_core__WEBPACK_IMPORTED_MODULE_5__["AgmMap"]),
        __metadata("design:type", _agm_core__WEBPACK_IMPORTED_MODULE_5__["AgmMap"])
    ], Sell1Component.prototype, "map", void 0);
    Sell1Component = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sell1',
            template: __webpack_require__(/*! ./sell1.component.html */ "./src/app/pages/sell1/sell1.component.html"),
            styles: [__webpack_require__(/*! ./sell1.component.scss */ "./src/app/pages/sell1/sell1.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _app_service__WEBPACK_IMPORTED_MODULE_2__["AppService"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBar"], _agm_core__WEBPACK_IMPORTED_MODULE_5__["MapsAPILoader"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"],
            _agm_core_services__WEBPACK_IMPORTED_MODULE_6__["GoogleMapsAPIWrapper"]])
    ], Sell1Component);
    return Sell1Component;
}());



/***/ }),

/***/ "./src/app/pages/sig/sig.component.html":
/*!**********************************************!*\
  !*** ./src/app/pages/sig/sig.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<!-- <div class=\"form_div\">\r\n  <div class=\"inner_div\"> -->\r\n<div style=\"padding:10%; font-family:proxr\">\r\n  <img src=\"/assets/images/icons/logowhite.png\" (click)=\"adrouter()\" fxFlex.gt-sm=\"50\" fxShow.sm=\"false\" fxHide fxShow.gt-sm fxHide.sm height=200 class=\"logo\"/>\r\n  <span style=\"font-family:proxs; color:#ffffff;font-size:150%; margin-left:-20%;\" fxFlex.gt-sm=\"50\" fxShow.sm=\"false\" fxHide fxShow.gt-sm fxHide.sm>\r\n    World's Top Mobile Market\r\n  </span>\r\n<mat-card class=\"matCard\">\r\n      <form [formGroup]=\"loginForm\" (ngSubmit)=\"onLoginFormSubmit(loginForm.value)\" [hidden]=\"!si\">\r\n        <span class=\"text-muted text-center\" style=\"font-size:150%;text-align:center;margin-left:25%;margin-right:20%;font-weight:400;\"><u style=\"color:#156dbf;\">LOGIN TO CELX</u></span>\r\n          <mat-form-field class=\"w-100 mt-1\" style=\" font-size:100%;\">\r\n              <img src=\"/assets/images/icons/email.png\" height=10/>\r\n              <input matInput placeholder=\"&nbsp; &nbsp; &nbsp; Email Address\" style=\"font-size:100%;\" formControlName=\"email\" required>\r\n              <mat-error *ngIf=\"loginForm.controls.email.errors?.required\" style=\"font-size:100%; \">Email is required</mat-error>\r\n              <mat-error *ngIf=\"loginForm.controls.email.hasError('invalidEmail')\" >Invalid email address</mat-error>\r\n          </mat-form-field>\r\n          <mat-form-field class=\"w-100\" style=\"font-size:100%;\">\r\n            <img src=\"/assets/images/icons/password.png\" height=10/>\r\n              <input matInput placeholder=\"&nbsp; &nbsp; &nbsp; Password\" type=\"password\" style=\"font-size:100%;\" formControlName=\"password\" required>\r\n              <mat-error *ngIf=\"loginForm.controls.password.errors?.required\" style=\"font-size:100%;\">Password is required</mat-error>\r\n              <mat-error *ngIf=\"loginForm.controls.password.hasError('minlength')\">Password isn't long enough, minimum of 6 characters</mat-error>\r\n          </mat-form-field>\r\n          {{this.mismatch}}\r\n          <div class=\"text-center mt-2\">\r\n            </div>\r\n              <div class=\"\">\r\n          <button mat-stroked-button  style=\"border-color:#156dbf;border-radius:15px 15px 15px 15px; width:60%;margin-left:20%;margin-top:-8%;\" (click)=\"onLoginFormSubmit(loginForm.value)\">\r\n                  <b style=\"color:#156dbf\">Sign in</b>\r\n              </button>\r\n          </div>\r\n          <div class=\"text-center mt-2\" >\r\n            <span style=\"margin-left:30%;font-family:proxs;color:#DDDDDD\" (click) = \"forgotPassword()\">Forgot Password?</span>\r\n      </div>\r\n      <div class=\"text-center mt-2\">\r\n        <span style=\"margin-left:20%;\"><i>Don't have an account?</i> <u><b style=\"color:#156dbf\" (click)=\"signup()\">Signup</b></u></span>\r\n  </div>\r\n\r\n  </form>\r\n\r\n<div [hidden]=\"!su\">\r\n  <form [formGroup]=\"registerForm\" (ngSubmit)=\"onRegisterFormSubmit(registerForm.value)\" >\r\n    <span class=\"text-muted text-center\" style=\"font-size:150%;text-align:center;margin-left:35%;margin-right:20%;font-weight:400;\"><u style=\"color:#156dbf;\">SIGN UP</u></span>\r\n      <mat-form-field class=\"w-100 mt-2\" style=\"height:5%; font-size:100%;\">\r\n        <input matInput placeholder=\"Full Name\" style=\"font-size:120%;\" formControlName=\"name\" required>\r\n        <mat-error *ngIf=\"registerForm.controls.name.errors?.required\">Full Name is required</mat-error>\r\n        <mat-error *ngIf=\"registerForm.controls.name.hasError('minlength')\">Full Name isn't long enough, minimum of 3 characters</mat-error>\r\n      </mat-form-field>\r\n      <mat-form-field class=\"w-100 mt-1\" style=\"height:5%; font-size:100%;\">\r\n          <input matInput placeholder=\"Email\" style=\"font-size:120%;\" formControlName=\"email1\" required>\r\n          <mat-error *ngIf=\"registerForm.controls.email1.errors?.required\">Email is required</mat-error>\r\n          <mat-error *ngIf=\"registerForm.controls.email1.hasError('invalidEmail')\">Invalid email address</mat-error>\r\n      </mat-form-field>\r\n      <mat-form-field class=\"w-100 mt-1\" style=\"height:5%; font-size:100%;\">\r\n          <input matInput placeholder=\"Password\" type=\"password\" style=\"font-size:120%;\" formControlName=\"password\" type=\"password\" minlength=\"6\" required>\r\n          <mat-error *ngIf=\"registerForm.controls.password.errors?.required\">Password is required</mat-error>\r\n          <mat-error *ngIf=\"registerForm.controls.password.hasError('minlength')\">Password isn't long enough, minimum of 6 characters</mat-error>\r\n      </mat-form-field>\r\n      <mat-form-field class=\"w-100 mt-1\" style=\"height:5%; font-size:100%;\">\r\n        <input matInput placeholder=\"Confirm Password\" type=\"password\" style=\"font-size:120%;\" formControlName=\"confirmPassword\" type=\"password\" required>\r\n        <mat-error *ngIf=\"registerForm.controls.confirmPassword.errors?.required\">Confirm Password is required</mat-error>\r\n        <mat-error *ngIf=\"registerForm.controls.confirmPassword.hasError('mismatchedPasswords')\">Passwords do not match</mat-error>\r\n      </mat-form-field>\r\n      <mat-form-field class=\"w-100 mt-2\" style=\"height:5%; font-size:100%;\">\r\n        <input matInput placeholder=\"Mobile Number\" style=\"font-size:120%;\" formControlName=\"mobile_number\" required>\r\n        <mat-error *ngIf=\"registerForm.controls.mobile_number.errors?.required\">Mobile Number is required</mat-error>\r\n        <mat-error *ngIf=\"registerForm.controls.mobile_number.hasError('minlength')\">Phone Number is Not Valid</mat-error>\r\n      </mat-form-field>\r\n<span style=\"color:#cc0000; font-size: 70%;\"> {{this.invalidformat}} </span>\r\n\r\n\r\n\r\n      <div class=\"text-center mt-2\">\r\n        <div id=\"recaptcha-container\"></div>\r\n        <br>\r\n  <button mat-stroked-button  style=\"border-color:#156dbf;border-radius:15px 15px 15px 15px; width:60%;margin-left:20%;\" (click)=\"onRegisterFormSubmit(registerForm.value)\">\r\n          <b style=\"color:#156dbf\">Sign Up</b>\r\n      </button>\r\n  <div class=\"text-center mt-2\">\r\n    <span style=\"margin-left:20%;\"><i>Already have an account?</i> <u><b style=\"color:#156dbf\" (click)=\"signin()\">Signin</b></u></span>\r\n</div>\r\n  </div>\r\n  </form>\r\n</div>\r\n\r\n\r\n  <!-- <div [hidden]=\"user\"> -->\r\n\r\n<!-- <label for=\"phone\">Phone Number</label><br>\r\n<input type=\"text\" [(ngModel)]=\"yourphone\"  class=\"input\" placeholder=\"Phone Number\" > -->\r\n\r\n<!-- <div id=\"recaptcha-container\"></div>\r\n\r\n<button (click)=\"sendLoginCode(phonenumber)\">SMS Text Login Code</button>\r\n\r\n\r\n</div> -->\r\n<!-- *ngIf=\"windowRef.confirmationResult\" -->\r\n<div [hidden]=\"!verifyscreen\">\r\n<!-- <h3 for=\"code\">VERIFY NUMBER</h3><br> -->\r\n<!-- <input type=\"text\" name=\"code\" [(ngModel)]=\"verificationCode\"  class=\"input\" placeholder=\"Verification Code\" > -->\r\n<form [formGroup]=\"VerificationForm\">\r\n<span class=\"text-muted text-center\" for=\"code\" style=\"font-size:150%;text-align:center;margin-left:20%;margin-right:20%;font-weight:400;\"><u style=\"color:#156dbf;\">VERIFY NUMBER</u></span>\r\n  <mat-form-field class=\"w-100 mt-2\" style=\"height:5%; font-size:100%;\">\r\n    <input matInput placeholder=\"Verification Code\" name=\"code\" class=\"input\" style=\"font-size:120%;\" formControlName=\"vcode\" required>\r\n    <mat-error *ngIf=\"VerificationForm.controls.vcode.hasError('minlength')\">Code isn't long enough, minimum of 6 characters</mat-error>\r\n\r\n  </mat-form-field>\r\n  <span style=\"color:#cc0000; font-size: 70%;\"> {{this.invalidformat}} </span>\r\n</form>\r\n\r\n<!-- <input type=\"text\" name=\"code\" [(ngModel)]=\"verificationCode\"> -->\r\n\r\n<!-- <button (click)=\"verifyLoginCode()\">Verify</button> -->\r\n<button mat-stroked-button  style=\"border-color:#156dbf;border-radius:15px 15px 15px 15px; width:60%;margin-left:20%;\" (click)=\"verifyLoginCode(VerificationForm.value)\">\r\n        <b style=\"color:#156dbf\">Verify</b>\r\n    </button>\r\n</div>\r\n\r\n\r\n<div [hidden]=\"!numexist\">\r\n<form [formGroup]=\"NewNumForm\">\r\n  <span class=\"text-muted text-center\" for=\"code\" style=\"font-size:150%;text-align:center;margin-left:20%;margin-right:20%;font-weight:400;\"><u style=\"color:#156dbf;\">VERIFY NUMBER</u></span>\r\n  <div id=\"recaptcha-container\"></div>\r\n  <mat-form-field class=\"w-100 mt-2\" style=\"height:5%; font-size:100%;\">\r\n    <input matInput placeholder=\"Mobile Number\" style=\"font-size:120%;\" formControlName=\"mobile_number11\" required>\r\n    <mat-error *ngIf=\"NewNumForm.controls.mobile_number11.errors?.required\">Mobile Number is required</mat-error>\r\n    <mat-error *ngIf=\"NewNumForm.controls.mobile_number11.hasError('minlength')\">Phone Number is Not Valid</mat-error>\r\n  </mat-form-field>\r\n  {{this.invalidformat}}\r\n  <button mat-stroked-button  style=\"border-color:#156dbf;border-radius:15px 15px 15px 15px; width:60%;margin-left:20%;\" (click)=\"sendLoginCode(NewNumForm.value)\">\r\n          <b style=\"color:#156dbf\">Send Code</b>\r\n      </button>\r\n\r\n  <mat-form-field class=\"w-100 mt-2\" style=\"height:5%; font-size:100%;\">\r\n    <input matInput placeholder=\"Verification Code\" name=\"code\" class=\"input\" style=\"font-size:120%;\" formControlName=\"vcode11\" required>\r\n    <mat-error *ngIf=\"NewNumForm.controls.vcode11.hasError('minlength')\">Code isn't long enough, minimum of 6 characters</mat-error>\r\n\r\n  </mat-form-field>\r\n</form>\r\n\r\n\r\n<button mat-stroked-button  style=\"border-color:#156dbf;border-radius:15px 15px 15px 15px; width:60%;margin-left:20%;\" (click)=\"verifyLoginCodeNewNum(NewNumForm.value)\">\r\n        <b style=\"color:#156dbf\">Verify</b>\r\n    </button>\r\n</div>\r\n\r\n<!-- <div *ngIf=\"user\">\r\nYou have successfully logged in with your phone number!\r\n\r\nUserId: {{ user?.uid }}\r\n\r\n</div> -->\r\n\r\n\r\n  <form [formGroup]=\"forgotForm\" (ngSubmit)=\"onforgetFormSubmit(forgotForm.value)\" [hidden]=\"!fp\">\r\n    <span class=\"text-muted text-center\" style=\"font-size:150%;text-align:center;margin-left:20%;margin-right:10%;font-weight:400;\"><u style=\"color:#156dbf;\">FORGOT PASSWORD</u></span>\r\n      <mat-form-field class=\"w-100 mt-2\" style=\"height:5%; font-size:100%;\">\r\n          <img src=\"/assets/images/icons/email.png\" height=10/>\r\n          <input matInput placeholder=\" &nbsp; &nbsp; &nbsp; email address\" style=\"font-size:120%; padding-left:2%;\" formControlName=\"email\" required>\r\n          <mat-error *ngIf=\"forgotForm.controls.email.errors?.required\" style=\"font-size:130%; \">Email is required</mat-error>\r\n          <mat-error *ngIf=\"forgotForm.controls.email.hasError('invalidEmail')\" >Invalid email address</mat-error>\r\n      </mat-form-field>\r\n\r\n      <div class=\"text-center mt-2\">\r\n        </div>\r\n          <div class=\"text-center mt-2\">\r\n      <button mat-stroked-button  style=\"border-color:#156dbf;border-radius:15px 15px 15px 15px; width:60%;margin-left:20%;\" (click)=\"onforgotFormSubmit(forgotForm.value)\">\r\n              <b style=\"color:#156dbf\">Submit</b>\r\n          </button>\r\n      </div>\r\n  <div class=\"text-center mt-2\">\r\n    <span style=\"margin-left:20%;\"><i>Have an other account?</i> <u><b style=\"color:#156dbf\" (click)=\"signin()\">Signin</b></u></span>\r\n</div>\r\n\r\n</form>\r\n\r\n</mat-card>\r\n\r\n</div>\r\n<div class=\"prox_r\" style=\"text-align:center; color:#ffffff; font-size:100%; margin-top:90px\">\r\n  Copyright Protected (c) 2018\r\n</div>\r\n\r\n<!-- </div>\r\n</div> -->\r\n"

/***/ }),

/***/ "./src/app/pages/sig/sig.component.scss":
/*!**********************************************!*\
  !*** ./src/app/pages/sig/sig.component.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".auth {\n  white-space: nowrap;\n  padding: 7px 14px;\n  font-weight: 500; }\n\n.mat-card {\n  float: right; }\n\n.logo {\n  margin-left: 20%;\n  margin-top: 2%;\n  margin-bottom: 5%; }\n\n.matCard {\n  padding: 3%;\n  width: 300px;\n  margin-right: 40px;\n  border-radius: 4%; }\n\n.form_div {\n  margin: auto;\n  width: 95%; }\n\n.inner_div {\n  margin: auto;\n  width: 85%; }\n"

/***/ }),

/***/ "./src/app/pages/sig/sig.component.ts":
/*!********************************************!*\
  !*** ./src/app/pages/sig/sig.component.ts ***!
  \********************************************/
/*! exports provided: SigComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SigComponent", function() { return SigComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _theme_utils_app_validators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../theme/utils/app-validators */ "./src/app/theme/utils/app-validators.ts");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../app.service */ "./src/app/app.service.ts");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.cjs.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _window_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../window.service */ "./src/app/window.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var SigComponent = /** @class */ (function () {
    function SigComponent(win, formBuilder, router, snackBar, services, renderer) {
        this.win = win;
        this.formBuilder = formBuilder;
        this.router = router;
        this.snackBar = snackBar;
        this.services = services;
        this.renderer = renderer;
        this.renderer.setStyle(document.body, 'background-color', '#156dbf');
        this.si = true;
        this.fp = false;
        this.su = false;
        this.sendcode = true;
        this.verifynsignup = false;
        this.verifyscreen = false;
        this.numexist = false;
    }
    SigComponent.prototype.ngOnInit = function () {
        this.VerificationForm = this.formBuilder.group({
            'vcode': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(6)])]
        });
        this.loginForm = this.formBuilder.group({
            'email': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _theme_utils_app_validators__WEBPACK_IMPORTED_MODULE_4__["emailValidator"]])],
            'password': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(3)])]
        });
        this.forgotForm = this.formBuilder.group({
            'email': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _theme_utils_app_validators__WEBPACK_IMPORTED_MODULE_4__["emailValidator"]])]
        });
        this.NewNumForm = this.formBuilder.group({
            'mobile_number11': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            'vcode11': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(6)])]
        });
        this.registerForm = this.formBuilder.group({
            'name': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(3)])],
            'email1': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _theme_utils_app_validators__WEBPACK_IMPORTED_MODULE_4__["emailValidator"]])],
            'password': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            'confirmPassword': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            // 'user_name': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            // 'country_name': ['', Validators.required],
            'mobile_number': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
        }, { validator: Object(_theme_utils_app_validators__WEBPACK_IMPORTED_MODULE_4__["matchingPasswords"])('password', 'confirmPassword') });
        this.windowRef = this.win.windowRef;
        this.windowRef.recaptchaVerifier = new firebase__WEBPACK_IMPORTED_MODULE_6__["auth"].RecaptchaVerifier('recaptcha-container');
        this.windowRef.recaptchaVerifier.render();
    };
    Object.defineProperty(SigComponent.prototype, "e164", {
        get: function () {
            var num = this.country + this.area + this.prefix + this.line;
            return "+" + num;
        },
        enumerable: true,
        configurable: true
    });
    SigComponent.prototype.onLoginFormSubmit = function (values) {
        var _this = this;
        if (this.loginForm.valid) {
            //this.router.navigate(['/']);
            console.log("in signIn component");
            console.log(this.loginForm.value);
            this.services.login1(this.loginForm.value.email, this.loginForm.value.password).subscribe(function (data) {
                console.log("Data => ", data);
                if (data['success']) {
                    localStorage.setItem('jwt', data['token']);
                    localStorage.setItem('name', data['user']['name']);
                    localStorage.setItem('currency', data['user']['currency']);
                    localStorage.setItem('userid', data['user']['_id']);
                    console.log(localStorage.getItem('jwt'));
                    _this.router.navigate(['/products']);
                }
            }, function (err) {
                _this.mismatch = "Email or Password Incorrect";
                console.log("password mismatch");
            });
            //  console.log("Data in services : ",x);
        }
    };
    SigComponent.prototype.onforgotFormSubmit = function (values) {
        if (this.forgotForm.valid) {
            //this.router.navigate(['/']);
            console.log("in signIn component");
            console.log(this.forgotForm.value);
        }
    };
    SigComponent.prototype.onRegisterFormSubmit = function (values) {
        var _this = this;
        if (this.registerForm.valid) {
            console.log("registering valid");
            console.log(this.registerForm.value);
            this.services.register1(this.registerForm.value.name, this.registerForm.value.email1, this.registerForm.value.password).subscribe(function (data) {
                console.log("Data => ", data);
                localStorage.setItem('jwtr', data['token']);
                //  if(data['success'] ){
                // localStorage.setItem('jwt',data['token']);
                // console.log(localStorage.getItem('jwt'))
                if (data['user']) {
                    var appVerifier = _this.windowRef.recaptchaVerifier;
                    var num = _this.registerForm.value.mobile_number;
                    console.log(num);
                    firebase__WEBPACK_IMPORTED_MODULE_6__["auth"]().signInWithPhoneNumber(num, appVerifier)
                        .then(function (result) {
                        console.log(result);
                        _this.windowRef.confirmationResult = result;
                        if (result) {
                            _this.services.checkmobile(_this.registerForm.value.mobile_number).subscribe(function (data3) {
                                console.log("check mbile", data3);
                                _this.snackBar.open('Number Already Exists', '×', { panelClass: 'success', verticalPosition: 'top', duration: 5000 });
                                _this.numexist = true;
                            }, function (err) {
                                _this.snackBar.open('Verify Your Number to Proceed', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
                                _this.verifyscreen = true;
                                _this.su = false;
                            });
                        }
                    })
                        .catch(function (error) {
                        _this.invalidformat = "Invalid Format";
                        console.log(error);
                    });
                }
            }, function (err) {
                // this.snackBar.open('Email Already Exists', '×', { panelClass: 'success', verticalPosition: 'top', duration: 5000 });
                console.log("something went wrong");
            });
        }
    };
    SigComponent.prototype.sendLoginCode = function (yourphone) {
        var _this = this;
        if (this.NewNumForm.valid) {
            this.services.checkmobile(this.NewNumForm.value.mobile_number11).subscribe(function (data3) {
                console.log("check mbile", data3);
                _this.snackBar.open('Number Already Exists', '×', { panelClass: 'success', verticalPosition: 'top', duration: 5000 });
            }, function (err) {
                _this.snackBar.open('Verify Your Number to Proceed', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
                _this.su = false;
                var appVerifier = _this.windowRef.recaptchaVerifier;
                var num = _this.NewNumForm.value.mobile_number11;
                var num = yourphone;
                console.log(num);
                firebase__WEBPACK_IMPORTED_MODULE_6__["auth"]().signInWithPhoneNumber(num, appVerifier)
                    .then(function (result) {
                    console.log(result);
                    _this.windowRef.confirmationResult = result;
                })
                    .catch(function (error) { return console.log(error); });
            });
        }
    };
    SigComponent.prototype.verifyLoginCodeNewNum = function (values) {
        var _this = this;
        if (this.NewNumForm.valid) {
            this.windowRef.confirmationResult
                .confirm(this.NewNumForm.value.vcode11)
                .then(function (result) {
                _this.user = result.user;
                _this.verifyscreen = false;
                _this.su = false;
                _this.si = true;
                _this.snackBar.open('Account Registered! Please Login', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            })
                .catch(function (error) {
                console.log(error, "Incorrect code entered?");
            });
        }
    };
    SigComponent.prototype.verifyLoginCode = function (values) {
        var _this = this;
        if (this.VerificationForm.valid) {
            console.log(this.VerificationForm.value.vcode);
            this.windowRef.confirmationResult
                .confirm(this.VerificationForm.value.vcode)
                .then(function (result) {
                console.log(_this.VerificationForm.value.vcode);
                _this.smsVerification = true;
                console.log(_this.registerForm.value.mobile_number, _this.smsVerification);
                console.log(result);
                _this.user = result.user;
                _this.verifyscreen = false;
                _this.su = false;
                _this.si = true;
                _this.snackBar.open('Account Registered! Please Login', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
                _this.services.updateUserinregister(_this.registerForm.value.mobile_number, _this.smsVerification).subscribe(function (data) {
                    console.log(data);
                });
            })
                .catch(function (error) { return console.log(error, "Incorrect code entered?"); });
            this.invalidformat = "Incorrect code entered";
        }
    };
    SigComponent.prototype.signup = function () {
        this.si = false;
        this.su = true;
        this.fp = false;
    };
    SigComponent.prototype.signin = function () {
        this.si = true;
        this.su = false;
        this.fp = false;
    };
    SigComponent.prototype.forgotPassword = function () {
        this.fp = true;
        this.su = false;
        this.si = false;
    };
    SigComponent.prototype.adrouter = function () {
        this.router.navigate(['/products']);
    };
    SigComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sig',
            template: __webpack_require__(/*! ./sig.component.html */ "./src/app/pages/sig/sig.component.html"),
            styles: [__webpack_require__(/*! ./sig.component.scss */ "./src/app/pages/sig/sig.component.scss")]
        }),
        __metadata("design:paramtypes", [_window_service__WEBPACK_IMPORTED_MODULE_7__["WindowService"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"], _app_service__WEBPACK_IMPORTED_MODULE_5__["AppService"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]])
    ], SigComponent);
    return SigComponent;
}());



/***/ }),

/***/ "./src/app/post/post.component.html":
/*!******************************************!*\
  !*** ./src/app/post/post.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  post works!\n</p>\n"

/***/ }),

/***/ "./src/app/post/post.component.scss":
/*!******************************************!*\
  !*** ./src/app/post/post.component.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/post/post.component.ts":
/*!****************************************!*\
  !*** ./src/app/post/post.component.ts ***!
  \****************************************/
/*! exports provided: PostComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostComponent", function() { return PostComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { SharedModule } from '../../shared/shared.module';


var PostComponent = /** @class */ (function () {
    function PostComponent(router, formBuilder) {
        this.router = router;
        this.formBuilder = formBuilder;
    }
    PostComponent.prototype.ngOnInit = function () {
    };
    PostComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-post',
            template: __webpack_require__(/*! ./post.component.html */ "./src/app/post/post.component.html"),
            styles: [__webpack_require__(/*! ./post.component.scss */ "./src/app/post/post.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]])
    ], PostComponent);
    return PostComponent;
}());



/***/ }),

/***/ "./src/app/shared/banners/banners.component.html":
/*!*******************************************************!*\
  !*** ./src/app/shared/banners/banners.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"banners-container\" fxLayout=\"column\" fxLayout.gt-sm=\"row\" *ngIf=\"banners.length > 0\">\r\n    <div fxLayout=\"row\" fxLayout.gt-sm=\"column\" fxLayout.xs=\"column\" fxFlex=\"100\" fxFlex.gt-sm=\"40\">\r\n        <div class=\"banner\" fxFlex=\"50\" fxFlex.gt-sm=\"67\" [ngStyle]=\"getBgImage(0)\">\r\n            <div class=\"info\" fxLayoutAlign=\"start start\">\r\n                <div class=\"px-2\" fxLayout=\"column\" fxLayoutAlign=\"center center\">\r\n                    <h1 class=\"title\">{{getBanner(0).title}}</h1>\r\n                    <h3 class=\"subtitle\">{{getBanner(0).subtitle}}</h3>\r\n                    <a [routerLink]=\"['/products']\" mat-raised-button color=\"primary\" class=\"mt-2\">Shop now</a>\r\n                </div> \r\n            </div> \r\n        </div>\r\n        <div fxLayout=\"row\" fxFlex=\"50\" fxFlex.gt-sm=\"33\">\r\n            <div class=\"banner\" fxFlex [ngStyle]=\"getBgImage(1)\">\r\n                <div class=\"info\" fxLayoutAlign=\"center center\">\r\n                    <div class=\"px-2\" fxLayout=\"column\" fxLayoutAlign=\"end center\">\r\n                      <h2 class=\"title\">{{getBanner(1).title}}</h2>\r\n                      <h4 class=\"subtitle\">{{getBanner(1).subtitle}}</h4>\r\n                      <a [routerLink]=\"['/products']\" mat-raised-button color=\"primary\" class=\"mt-2\">Shop now</a>\r\n                    </div> \r\n                </div> \r\n            </div>\r\n            <div class=\"banner\" fxFlex [ngStyle]=\"getBgImage(2)\">\r\n                <div class=\"info\" fxFlex fxLayoutAlign=\"center center\">\r\n                    <div class=\"px-2\" fxLayout=\"column\" fxLayoutAlign=\"end center\">\r\n                      <h2 class=\"title\">{{getBanner(2).title}}</h2>\r\n                      <h4 class=\"subtitle\">{{getBanner(2).subtitle}}</h4>\r\n                      <a [routerLink]=\"['/products']\" mat-raised-button color=\"primary\" class=\"mt-2\">Shop now</a>\r\n                    </div> \r\n                </div> \r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div fxLayout=\"row\" fxLayout.gt-sm=\"column\" fxLayout.xs=\"column\" fxFlex=\"100\" fxFlex.gt-sm=\"60\">\r\n        <div fxLayout=\"row\" fxFlexOrder=\"2\" fxFlexOrder.gt-sm=\"1\" fxFlex=\"50\" fxFlex.gt-sm=\"33\">\r\n            <div class=\"banner\" fxFlex [ngStyle]=\"getBgImage(3)\">\r\n                <div class=\"info\" fxLayoutAlign=\"space-around center\">\r\n                    <div class=\"px-2\" fxLayout=\"column\" fxLayoutAlign=\"end center\">\r\n                      <h2 class=\"title\">{{getBanner(3).title}}</h2>\r\n                      <h4 class=\"subtitle\">{{getBanner(3).subtitle}}</h4>\r\n                      <a [routerLink]=\"['/products']\" mat-raised-button color=\"primary\" class=\"mt-2\">Shop now</a>\r\n                    </div>                    \r\n                </div>\r\n            </div>\r\n            <div class=\"banner\" fxFlex [ngStyle]=\"getBgImage(4)\">\r\n                <div class=\"info\" fxLayoutAlign=\"center center\">\r\n                    <div class=\"px-2\" fxLayout=\"column\" fxLayoutAlign=\"end center\">\r\n                      <h2 class=\"title\">{{getBanner(4).title}}</h2>\r\n                      <h4 class=\"subtitle\">{{getBanner(4).subtitle}}</h4>\r\n                      <a [routerLink]=\"['/products']\" mat-raised-button color=\"primary\" class=\"mt-2\">Shop now</a>\r\n                    </div>\r\n                </div> \r\n            </div>\r\n        </div>\r\n        <div class=\"banner\" fxFlexOrder=\"1\" fxFlexOrder.gt-sm=\"2\" fxFlex=\"50\" fxFlex.gt-sm=\"67\" [ngStyle]=\"getBgImage(5)\">\r\n            <div class=\"info\" fxLayout=\"column\" fxLayoutAlign=\"center end\">\r\n                <div class=\"px-2\" fxLayout=\"column\" fxLayoutAlign=\"center center\">\r\n                  <h1 class=\"title\">{{getBanner(5).title}}</h1>\r\n                  <h3 class=\"subtitle\">{{getBanner(5).subtitle}}</h3>\r\n                  <a [routerLink]=\"['/products']\" mat-raised-button color=\"primary\" class=\"mt-2\">Shop now</a>\r\n                </div>\r\n            </div> \r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/shared/banners/banners.component.scss":
/*!*******************************************************!*\
  !*** ./src/app/shared/banners/banners.component.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".banners-container {\n  margin: 22px -8px; }\n  .banners-container .banner {\n    position: relative;\n    margin: 8px;\n    padding: 0;\n    background-repeat: no-repeat;\n    background-size: cover;\n    background-position: center;\n    overflow: hidden;\n    transition: 0.15s ease-in; }\n  .banners-container .banner .info {\n      height: 100%;\n      width: 100%;\n      background: rgba(0, 0, 0, 0.4);\n      color: #fff;\n      padding: 90px 0;\n      transition: 0.15s ease-in; }\n  .banners-container .banner .info h1 {\n        font-size: 36px; }\n  .banners-container .banner .info .title {\n        font-weight: 500;\n        text-align: center; }\n  .banners-container .banner .info .subtitle {\n        font-weight: normal;\n        font-style: italic;\n        text-align: center; }\n  .banners-container .banner:hover .info {\n      background: rgba(0, 0, 0, 0.7); }\n  @media (max-width: 959px) {\n  .banners-container .banner .info {\n    padding: 30px 0px; }\n    .banners-container .banner .info h1 {\n      font-size: 24px; }\n    .banners-container .banner .info h2 {\n      font-size: 16px; }\n    .banners-container .banner .info h3 {\n      font-size: 14px; } }\n"

/***/ }),

/***/ "./src/app/shared/banners/banners.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/shared/banners/banners.component.ts ***!
  \*****************************************************/
/*! exports provided: BannersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BannersComponent", function() { return BannersComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BannersComponent = /** @class */ (function () {
    function BannersComponent() {
        this.banners = [];
    }
    BannersComponent.prototype.ngOnInit = function () { };
    BannersComponent.prototype.getBanner = function (index) {
        return this.banners[index];
    };
    BannersComponent.prototype.getBgImage = function (index) {
        var bgImage = {
            'background-image': index != null ? "url(" + this.banners[index].image + ")" : "url(https://via.placeholder.com/600x400/ff0000/fff/)"
        };
        return bgImage;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('banners'),
        __metadata("design:type", Array)
    ], BannersComponent.prototype, "banners", void 0);
    BannersComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-banners',
            template: __webpack_require__(/*! ./banners.component.html */ "./src/app/shared/banners/banners.component.html"),
            styles: [__webpack_require__(/*! ./banners.component.scss */ "./src/app/shared/banners/banners.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], BannersComponent);
    return BannersComponent;
}());



/***/ }),

/***/ "./src/app/shared/brands-carousel/brands-carousel.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/shared/brands-carousel/brands-carousel.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"brands-carousel\">\r\n    <div class=\"swiper-container h-100\" [swiper]=\"config\">\r\n        <div class=\"swiper-wrapper h-100\">      \r\n            <div *ngFor=\"let brand of brands\" class=\"swiper-slide\">\r\n                <div class=\"p-0\">\r\n                    <a [routerLink]=\"['/brands', brand.name]\" class=\"brand-item\">\r\n                        <img [attr.data-src]=\"brand.image\" class=\"swiper-lazy\">\r\n                    </a>\r\n                    <div class=\"swiper-lazy-preloader\"></div>\r\n                </div>\r\n            </div>\r\n        </div> \r\n        <button mat-icon-button class=\"swiper-button-prev swipe-arrow\"><mat-icon>keyboard_arrow_left</mat-icon></button>\r\n        <button mat-icon-button class=\"swiper-button-next swipe-arrow\"><mat-icon>keyboard_arrow_right</mat-icon></button> \r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/shared/brands-carousel/brands-carousel.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/shared/brands-carousel/brands-carousel.component.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".brands-carousel {\n  background: rgba(0, 0, 0, 0.03);\n  position: relative;\n  padding: 8px 0;\n  margin-top: 30px;\n  margin-bottom: 20px; }\n  .brands-carousel .swiper-container {\n    padding: 8px 2px;\n    margin: 0 14px; }\n  .brands-carousel .swiper-container .brand-item {\n      height: 80px;\n      padding: 16px;\n      display: flex;\n      align-items: center; }\n  .brands-carousel .swiper-container .brand-item img {\n        max-width: 100%;\n        max-height: 100%;\n        margin: 0 auto; }\n  .brands-carousel .swiper-button-prev {\n    left: -10px; }\n  .brands-carousel .swiper-button-next {\n    right: -10px; }\n"

/***/ }),

/***/ "./src/app/shared/brands-carousel/brands-carousel.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/shared/brands-carousel/brands-carousel.component.ts ***!
  \*********************************************************************/
/*! exports provided: BrandsCarouselComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrandsCarouselComponent", function() { return BrandsCarouselComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BrandsCarouselComponent = /** @class */ (function () {
    function BrandsCarouselComponent() {
        this.brands = [];
        this.config = {};
    }
    BrandsCarouselComponent.prototype.ngAfterViewInit = function () {
        this.config = {
            slidesPerView: 7,
            spaceBetween: 16,
            keyboard: true,
            navigation: true,
            pagination: false,
            grabCursor: true,
            loop: true,
            preloadImages: false,
            lazy: true,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false
            },
            speed: 500,
            effect: "slide",
            breakpoints: {
                320: {
                    slidesPerView: 1
                },
                480: {
                    slidesPerView: 2
                },
                600: {
                    slidesPerView: 3,
                },
                960: {
                    slidesPerView: 4,
                },
                1280: {
                    slidesPerView: 5,
                },
                1500: {
                    slidesPerView: 6,
                }
            }
        };
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('brands'),
        __metadata("design:type", Array)
    ], BrandsCarouselComponent.prototype, "brands", void 0);
    BrandsCarouselComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-brands-carousel',
            template: __webpack_require__(/*! ./brands-carousel.component.html */ "./src/app/shared/brands-carousel/brands-carousel.component.html"),
            styles: [__webpack_require__(/*! ./brands-carousel.component.scss */ "./src/app/shared/brands-carousel/brands-carousel.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], BrandsCarouselComponent);
    return BrandsCarouselComponent;
}());



/***/ }),

/***/ "./src/app/shared/category-list/category-list.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/shared/category-list/category-list.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngFor=\"let category of mainCategories\">\r\n    <button mat-menu-item (click)=\"changeCategory($event)\">\r\n        <span>{{category.name}}</span>\r\n    </button>\r\n     <div *ngIf=\"category.hasSubCategory\" class=\"sub-category\">\r\n        <app-category-list [categories]=\"categories\" [categoryParentId]=\"category.id\" (change)=\"changeCategory($event)\"></app-category-list>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/shared/category-list/category-list.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/shared/category-list/category-list.component.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/shared/category-list/category-list.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/shared/category-list/category-list.component.ts ***!
  \*****************************************************************/
/*! exports provided: CategoryListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryListComponent", function() { return CategoryListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CategoryListComponent = /** @class */ (function () {
    function CategoryListComponent() {
        this.change = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    CategoryListComponent.prototype.ngDoCheck = function () {
        var _this = this;
        if (this.categories && !this.mainCategories) {
            this.mainCategories = this.categories.filter(function (category) { return category.parentId == _this.categoryParentId; });
        }
    };
    CategoryListComponent.prototype.stopClickPropagate = function (event) {
        if (window.innerWidth < 960) {
            event.stopPropagation();
            event.preventDefault();
        }
    };
    CategoryListComponent.prototype.changeCategory = function (event) {
        this.change.emit(event);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], CategoryListComponent.prototype, "categories", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], CategoryListComponent.prototype, "categoryParentId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], CategoryListComponent.prototype, "change", void 0);
    CategoryListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-category-list',
            template: __webpack_require__(/*! ./category-list.component.html */ "./src/app/shared/category-list/category-list.component.html"),
            styles: [__webpack_require__(/*! ./category-list.component.scss */ "./src/app/shared/category-list/category-list.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], CategoryListComponent);
    return CategoryListComponent;
}());



/***/ }),

/***/ "./src/app/shared/controls/controls.component.html":
/*!*********************************************************!*\
  !*** ./src/app/shared/controls/controls.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row\" fxLayout.xs=\"column\" [fxLayoutAlign]=\"align\" class=\"text-muted\">\r\n    <div *ngIf=\"product?.availibilityCount > 0 && (type=='all' || type=='wish')\">\r\n        <span *ngIf=\"type!='wish'\" class=\"fw-500\">Quantity:</span>\r\n        <button mat-icon-button matTooltip=\"Remove\" (click)=\"decrement()\"><mat-icon>remove</mat-icon></button>\r\n        <span> {{count}} </span>\r\n        <button mat-icon-button matTooltip=\"Add\" (click)=\"increment()\"><mat-icon>add</mat-icon></button>\r\n    </div>\r\n    <!-- <div *ngIf=\"type!='wish'\">\r\n        <button mat-icon-button matTooltip=\"Add to Favourites\" (click)=\"addToWishList(product)\"><mat-icon>favorite</mat-icon></button>\r\n        <button mat-icon-button matTooltip=\"Add to cart\" *ngIf=\"product?.availibilityCount > 0\" (click)=\"addToCart(product)\"><mat-icon>shopping_cart</mat-icon></button>\r\n        <button mat-icon-button matTooltip=\"Add to compare\" (click)=\"addToCompare(product)\"><mat-icon>compare</mat-icon></button>\r\n        <button *ngIf=\"type!='all'\" mat-icon-button matTooltip=\"Quick view\" (click)=\"openProductDialog(product)\"><mat-icon>remove_red_eye</mat-icon></button>\r\n    </div> -->\r\n</div>\r\n<div *ngIf=\"product?.availibilityCount == 0 && type=='all'\" class=\"bg-warn p-1 mt-2\">\r\n    Sorry, this item is unavailable. Please choose a different one.\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/shared/controls/controls.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/shared/controls/controls.component.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/shared/controls/controls.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/shared/controls/controls.component.ts ***!
  \*******************************************************/
/*! exports provided: ControlsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ControlsComponent", function() { return ControlsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app.service */ "./src/app/app.service.ts");
/* harmony import */ var _app_models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../app.models */ "./src/app/app.models.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ControlsComponent = /** @class */ (function () {
    function ControlsComponent(appService, snackBar) {
        this.appService = appService;
        this.snackBar = snackBar;
        this.onOpenProductDialog = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onQuantityChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.count = 1;
        this.align = 'center center';
    }
    ControlsComponent.prototype.ngOnInit = function () {
        if (this.product) {
            // console.log(this.product);
        }
        this.layoutAlign();
    };
    ControlsComponent.prototype.layoutAlign = function () {
        if (this.type == 'all') {
            this.align = 'space-between center';
        }
        else if (this.type == 'wish') {
            this.align = 'start center';
        }
        else {
            this.align = 'center center';
        }
    };
    ControlsComponent.prototype.increment = function (count) {
        if (this.count < this.product.availibilityCount) {
            this.count++;
            var obj = {
                productId: this.product.id,
                soldQuantity: this.count,
                total: this.count * this.product.newPrice
            };
            this.changeQuantity(obj);
        }
        else {
            this.snackBar.open('You can not choose more items than available. In stock ' + this.count + ' items.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        }
    };
    ControlsComponent.prototype.decrement = function (count) {
        if (this.count > 1) {
            this.count--;
            var obj = {
                productId: this.product.id,
                soldQuantity: this.count,
                total: this.count * this.product.newPrice
            };
            this.changeQuantity(obj);
        }
    };
    ControlsComponent.prototype.addToCompare = function (product) {
        this.appService.addToCompare(product);
    };
    ControlsComponent.prototype.addToWishList = function (product) {
        this.appService.addToWishList(product);
    };
    ControlsComponent.prototype.addToCart = function (product) {
        this.appService.addToCart(product);
    };
    ControlsComponent.prototype.openProductDialog = function (event) {
        this.onOpenProductDialog.emit(event);
    };
    ControlsComponent.prototype.changeQuantity = function (value) {
        this.onQuantityChange.emit(value);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _app_models__WEBPACK_IMPORTED_MODULE_3__["Product"])
    ], ControlsComponent.prototype, "product", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], ControlsComponent.prototype, "type", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], ControlsComponent.prototype, "onOpenProductDialog", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], ControlsComponent.prototype, "onQuantityChange", void 0);
    ControlsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-controls',
            template: __webpack_require__(/*! ./controls.component.html */ "./src/app/shared/controls/controls.component.html"),
            styles: [__webpack_require__(/*! ./controls.component.scss */ "./src/app/shared/controls/controls.component.scss")]
        }),
        __metadata("design:paramtypes", [_app_service__WEBPACK_IMPORTED_MODULE_2__["AppService"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBar"]])
    ], ControlsComponent);
    return ControlsComponent;
}());



/***/ }),

/***/ "./src/app/shared/main-carousel/main-carousel.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/shared/main-carousel/main-carousel.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-slider\">\r\n  <div class=\"swiper-container h-100\" [swiper]=\"config\">\r\n    <div class=\"swiper-wrapper h-100\">      \r\n      <div *ngFor=\"let slide of slides\" class=\"swiper-slide\">\r\n        <div [attr.data-background]=\"slide.image\" class=\"slide-item swiper-lazy\">\r\n            <div class=\"swiper-lazy-preloader swiper-lazy-preloader-white\"></div>\r\n            <div class=\"mask\"></div>  \r\n            <div fxLayout=\"column\" fxLayoutAlign=\"center center\" class=\"content\">\r\n              <h1>{{slide.title}}</h1>\r\n              <h3>{{slide.subtitle}}</h3>\r\n              <button mat-raised-button color=\"primary\">Shop now</button>\r\n            </div> \r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"swiper-pagination white\"></div>\r\n    <button mat-mini-fab color=\"primary\" class=\"swiper-button-prev swipe-arrow\"><mat-icon>keyboard_arrow_left</mat-icon></button>\r\n    <button mat-mini-fab color=\"primary\" class=\"swiper-button-next swipe-arrow\"><mat-icon>keyboard_arrow_right</mat-icon></button>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/shared/main-carousel/main-carousel.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/shared/main-carousel/main-carousel.component.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-slider {\n  height: 500px;\n  margin-top: 14px; }\n  .main-slider .slide-item {\n    height: 100%;\n    background-size: cover;\n    background-position: center; }\n  .main-slider .slide-item .content {\n      height: 100%;\n      position: relative;\n      z-index: 9; }\n  .main-slider .slide-item .content h1 {\n        font-size: 48px;\n        text-align: center;\n        color: #fff;\n        text-transform: uppercase;\n        letter-spacing: 3px; }\n  .main-slider .slide-item .content h3 {\n        font-size: 36px;\n        text-align: center;\n        color: #fff;\n        margin-bottom: 30px;\n        font-weight: 300;\n        letter-spacing: 2px; }\n  .main-slider .slide-item .mask {\n      opacity: 0.6;\n      width: 100%;\n      height: 100%;\n      position: absolute;\n      overflow: hidden;\n      z-index: 0;\n      background-color: rgba(0, 0, 0, 0.8); }\n  .main-slider .swiper-lazy-preloader {\n    top: 18%; }\n  @media (max-width: 575px) {\n  .main-slider {\n    height: 280px; }\n    .main-slider .slide-item .content h1 {\n      font-size: 24px;\n      letter-spacing: 3px; }\n    .main-slider .slide-item .content h3 {\n      font-size: 18px;\n      margin-bottom: 10px;\n      letter-spacing: 2px; } }\n  @media (min-width: 576px) and (max-width: 767px) {\n  .main-slider {\n    height: 320px; }\n    .main-slider .slide-item .content h1 {\n      font-size: 36px;\n      letter-spacing: 3px; }\n    .main-slider .slide-item .content h3 {\n      font-size: 24px;\n      margin-bottom: 20px;\n      letter-spacing: 2px; } }\n"

/***/ }),

/***/ "./src/app/shared/main-carousel/main-carousel.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/shared/main-carousel/main-carousel.component.ts ***!
  \*****************************************************************/
/*! exports provided: MainCarouselComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainCarouselComponent", function() { return MainCarouselComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MainCarouselComponent = /** @class */ (function () {
    function MainCarouselComponent() {
        this.slides = [];
        this.config = {};
        this.pagination = {
            el: '.swiper-pagination',
            clickable: true
        };
    }
    MainCarouselComponent.prototype.ngOnInit = function () { };
    MainCarouselComponent.prototype.ngAfterViewInit = function () {
        this.config = {
            slidesPerView: 1,
            spaceBetween: 0,
            keyboard: true,
            navigation: true,
            pagination: this.pagination,
            grabCursor: true,
            loop: false,
            preloadImages: false,
            lazy: true,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false
            },
            speed: 500,
            effect: "slide"
        };
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('slides'),
        __metadata("design:type", Array)
    ], MainCarouselComponent.prototype, "slides", void 0);
    MainCarouselComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-main-carousel',
            template: __webpack_require__(/*! ./main-carousel.component.html */ "./src/app/shared/main-carousel/main-carousel.component.html"),
            styles: [__webpack_require__(/*! ./main-carousel.component.scss */ "./src/app/shared/main-carousel/main-carousel.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], MainCarouselComponent);
    return MainCarouselComponent;
}());



/***/ }),

/***/ "./src/app/shared/products-carousel/product-dialog/product-dialog.component.html":
/*!***************************************************************************************!*\
  !*** ./src/app/shared/products-carousel/product-dialog/product-dialog.component.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"close-btn-outer\">\r\n    <button mat-mini-fab color=\"warn\" (click)=\"close()\"><mat-icon>close</mat-icon></button>\r\n</div>\r\n<div mat-dialog-content>\r\n    <div fxLayout=\"row wrap\">\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"50\"> \r\n            <div class=\"swiper-container h-100\" [swiper]=\"config\">\r\n                <div class=\"swiper-wrapper\">      \r\n                    <div *ngFor=\"let image of product.images\" class=\"swiper-slide\">\r\n                        <img [attr.data-src]=\"image.medium\" class=\"swiper-lazy\"/>\r\n                        <div class=\"swiper-lazy-preloader\"></div>\r\n                    </div>\r\n                </div>\r\n                <button mat-icon-button class=\"swiper-button-prev swipe-arrow\"><mat-icon>keyboard_arrow_left</mat-icon></button>\r\n                <button mat-icon-button class=\"swiper-button-next swipe-arrow\"><mat-icon>keyboard_arrow_right</mat-icon></button>\r\n            </div>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"50\" ngClass.gt-sm=\"px-2 m-0\" ngClass.sm=\"mt-2\" ngClass.xs=\"mt-2\"> \r\n            <h2>{{product.name}}</h2>\r\n            <div class=\"py-1 lh\">\r\n                <p><span class=\"text-muted fw-500\">Category: </span><span>{{ ( appService.Data.categories | filterById : product.categoryId )?.name }}</span></p>\r\n                <p><span class=\"text-muted fw-500\">Availibility: </span><span>{{ (product.availibilityCount > 0) ? 'In stock':'Unavailable'}}</span></p>\r\n            </div>                 \r\n            <div class=\"py-1\">\r\n                <app-rating [ratingsCount]=\"product.ratingsCount\" [ratingsValue]=\"product.ratingsValue\" [direction]=\"'row'\"></app-rating>\r\n            </div>\r\n            <p class=\"py-1 text-muted lh\">{{product.description}}</p>\r\n            <div fxLayoutAlign=\"end center\" class=\"text-muted\">                 \r\n                 <button [mat-dialog-close]=\"product\" mat-icon-button matTooltip=\"View full details\"><mat-icon>arrow_forward</mat-icon></button>               \r\n            </div>              \r\n            <div class=\"divider\"></div>\r\n            <h2 class=\"mt-2 new-price\">${{product.newPrice}}</h2>\r\n            <app-controls [product]=\"product\" [type]=\"'all'\"></app-controls>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/shared/products-carousel/product-dialog/product-dialog.component.scss":
/*!***************************************************************************************!*\
  !*** ./src/app/shared/products-carousel/product-dialog/product-dialog.component.scss ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".product-dialog .mat-dialog-container {\n  overflow: visible !important; }\n  .product-dialog .mat-dialog-container .close-btn-outer {\n    position: relative; }\n  .product-dialog .mat-dialog-container .close-btn-outer button {\n      position: absolute;\n      right: -44px;\n      top: -44px; }\n  .product-dialog .mat-dialog-container .swiper-slide {\n    text-align: center; }\n  .product-dialog .mat-dialog-container .swiper-slide img {\n      max-width: 100%; }\n"

/***/ }),

/***/ "./src/app/shared/products-carousel/product-dialog/product-dialog.component.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/shared/products-carousel/product-dialog/product-dialog.component.ts ***!
  \*************************************************************************************/
/*! exports provided: ProductDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductDialogComponent", function() { return ProductDialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../app.service */ "./src/app/app.service.ts");
/* harmony import */ var _app_models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../app.models */ "./src/app/app.models.ts");
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




var ProductDialogComponent = /** @class */ (function () {
    function ProductDialogComponent(appService, dialogRef, product) {
        this.appService = appService;
        this.dialogRef = dialogRef;
        this.product = product;
        this.config = {};
    }
    ProductDialogComponent.prototype.ngOnInit = function () { };
    ProductDialogComponent.prototype.ngAfterViewInit = function () {
        this.config = {
            slidesPerView: 1,
            spaceBetween: 0,
            keyboard: true,
            navigation: true,
            pagination: false,
            grabCursor: true,
            loop: false,
            preloadImages: false,
            lazy: true,
            effect: "fade",
            fadeEffect: {
                crossFade: true
            }
        };
    };
    ProductDialogComponent.prototype.close = function () {
        this.dialogRef.close();
    };
    ProductDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-product-dialog',
            template: __webpack_require__(/*! ./product-dialog.component.html */ "./src/app/shared/products-carousel/product-dialog/product-dialog.component.html"),
            styles: [__webpack_require__(/*! ./product-dialog.component.scss */ "./src/app/shared/products-carousel/product-dialog/product-dialog.component.scss")],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        }),
        __param(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_app_service__WEBPACK_IMPORTED_MODULE_2__["AppService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"],
            _app_models__WEBPACK_IMPORTED_MODULE_3__["Product"]])
    ], ProductDialogComponent);
    return ProductDialogComponent;
}());



/***/ }),

/***/ "./src/app/shared/products-carousel/products-carousel.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/shared/products-carousel/products-carousel.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"products\" class=\"swiper-container\" [swiper]=\"config\">\r\n    <div class=\"swiper-wrapper h-100\">      \r\n        <div *ngFor=\"let product of products\" class=\"swiper-slide\">\r\n            <mat-card class=\"product-item\">\r\n                <mat-chip-list *ngIf=\"product.discount\">\r\n                    <mat-chip color=\"warn\" selected=\"true\">{{product.discount}}% OFF</mat-chip>\r\n                </mat-chip-list>\r\n                <a [routerLink]=\"['/products', product.id, product.name]\" class=\"image-link\">\r\n                    <img [attr.data-src]=\"product.images[0].medium\" class=\"swiper-lazy\"/>\r\n                    <div class=\"swiper-lazy-preloader\"></div>\r\n                </a>\r\n                <h4 class=\"category text-muted\">{{ ( appService.Data.categories | filterById : product.categoryId )?.name }}</h4>                                                                     \r\n                <a [routerLink]=\"['/products', product.id, product.name]\" class=\"title text-truncate\">\r\n                    {{product.name}}\r\n                </a>\r\n                <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\" class=\"prices\">\r\n                    <div fxLayout=\"column\" fxLayoutAlign=\"center start\">\r\n                        <p class=\"old-price text-muted\"><span *ngIf=\"product.oldPrice\">${{product.oldPrice | number : '1.2-2'}}</span></p>\r\n                        <p class=\"new-price\">${{product.newPrice | number : '1.2-2'}}</p>\r\n                    </div>\r\n                    <app-rating [ratingsCount]=\"product.ratingsCount\" [ratingsValue]=\"product.ratingsValue\" [direction]=\"'column'\"></app-rating>\r\n                </div>                            \r\n                <div class=\"divider mt-2\"></div>\r\n                <div class=\"icons\">\r\n                    <app-controls [product]=\"product\" (onOpenProductDialog)=\"openProductDialog(product)\"></app-controls>\r\n                </div>\r\n            </mat-card>\r\n        </div>\r\n    </div>\r\n    <button mat-mini-fab class=\"swiper-button-prev swipe-arrow\"><mat-icon>keyboard_arrow_left</mat-icon></button>\r\n    <button mat-mini-fab class=\"swiper-button-next swipe-arrow\"><mat-icon>keyboard_arrow_right</mat-icon></button> \r\n</div>"

/***/ }),

/***/ "./src/app/shared/products-carousel/products-carousel.component.scss":
/*!***************************************************************************!*\
  !*** ./src/app/shared/products-carousel/products-carousel.component.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".swiper-container {\n  padding: 16px 2px 2px 2px; }\n  .swiper-container .swiper-slide {\n    text-align: center; }\n  .swiper-button-next.swiper-button-disabled,\n.swiper-button-prev.swiper-button-disabled {\n  pointer-events: auto; }\n"

/***/ }),

/***/ "./src/app/shared/products-carousel/products-carousel.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/shared/products-carousel/products-carousel.component.ts ***!
  \*************************************************************************/
/*! exports provided: ProductsCarouselComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductsCarouselComponent", function() { return ProductsCarouselComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _product_dialog_product_dialog_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./product-dialog/product-dialog.component */ "./src/app/shared/products-carousel/product-dialog/product-dialog.component.ts");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../app.service */ "./src/app/app.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProductsCarouselComponent = /** @class */ (function () {
    function ProductsCarouselComponent(appService, dialog, router) {
        this.appService = appService;
        this.dialog = dialog;
        this.router = router;
        this.products = [];
        this.config = {};
    }
    ProductsCarouselComponent.prototype.ngOnInit = function () {
    };
    ProductsCarouselComponent.prototype.ngAfterViewInit = function () {
        this.config = {
            observer: true,
            slidesPerView: 6,
            spaceBetween: 16,
            keyboard: true,
            navigation: true,
            pagination: false,
            grabCursor: true,
            loop: false,
            preloadImages: false,
            lazy: true,
            breakpoints: {
                480: {
                    slidesPerView: 1
                },
                740: {
                    slidesPerView: 2,
                },
                960: {
                    slidesPerView: 3,
                },
                1280: {
                    slidesPerView: 4,
                },
                1500: {
                    slidesPerView: 5,
                }
            }
        };
    };
    ProductsCarouselComponent.prototype.openProductDialog = function (product) {
        var _this = this;
        var dialogRef = this.dialog.open(_product_dialog_product_dialog_component__WEBPACK_IMPORTED_MODULE_3__["ProductDialogComponent"], {
            data: product,
            panelClass: 'product-dialog'
        });
        dialogRef.afterClosed().subscribe(function (product) {
            if (product) {
                _this.router.navigate(['/products', product.id, product.name]);
            }
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('products'),
        __metadata("design:type", Array)
    ], ProductsCarouselComponent.prototype, "products", void 0);
    ProductsCarouselComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-products-carousel',
            template: __webpack_require__(/*! ./products-carousel.component.html */ "./src/app/shared/products-carousel/products-carousel.component.html"),
            styles: [__webpack_require__(/*! ./products-carousel.component.scss */ "./src/app/shared/products-carousel/products-carousel.component.scss")]
        }),
        __metadata("design:paramtypes", [_app_service__WEBPACK_IMPORTED_MODULE_4__["AppService"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], ProductsCarouselComponent);
    return ProductsCarouselComponent;
}());



/***/ }),

/***/ "./src/app/shared/rating/rating.component.html":
/*!*****************************************************!*\
  !*** ./src/app/shared/rating/rating.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div [fxLayout]=\"direction\" [fxLayoutAlign]=\"(direction == 'row') ? 'start center' : 'center end'\">    \r\n    <div class=\"ratings\">        \r\n         <mat-icon *ngFor=\"let star of stars; let i=index;\" class=\"mat-icon-xs\" (click)=\"rate(i)\">{{star}}</mat-icon>\r\n    </div>\r\n    <p class=\"ratings-count text-muted\">{{ratingsCount}} ratings</p>\r\n</div>"

/***/ }),

/***/ "./src/app/shared/rating/rating.component.scss":
/*!*****************************************************!*\
  !*** ./src/app/shared/rating/rating.component.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".ratings {\n  color: #fbc02d; }\n\n.ratings-count {\n  margin-left: 12px;\n  font-weight: 500; }\n"

/***/ }),

/***/ "./src/app/shared/rating/rating.component.ts":
/*!***************************************************!*\
  !*** ./src/app/shared/rating/rating.component.ts ***!
  \***************************************************/
/*! exports provided: RatingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RatingComponent", function() { return RatingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var RatingComponent = /** @class */ (function () {
    function RatingComponent() {
    }
    RatingComponent.prototype.ngDoCheck = function () {
        if (this.ratingsCount && this.ratingsValue && !this.avg) {
            this.calculateAvgValue();
        }
    };
    RatingComponent.prototype.rate = function (value) {
        // value = (value + 1)*20;
        // this.ratingsCount++;
        // this.ratingsValue = this.ratingsValue + value;
        // this.calculateAvgValue();
    };
    RatingComponent.prototype.calculateAvgValue = function () {
        this.avg = this.ratingsValue / this.ratingsCount;
        switch (true) {
            case this.avg > 0 && this.avg < 20: {
                this.stars = ['star_half', 'star_border', 'star_border', 'star_border', 'star_border'];
                break;
            }
            case this.avg == 20: {
                this.stars = ['star', 'star_border', 'star_border', 'star_border', 'star_border'];
                break;
            }
            case this.avg > 20 && this.avg < 40: {
                this.stars = ['star', 'star_half', 'star_border', 'star_border', 'star_border'];
                break;
            }
            case this.avg == 40: {
                this.stars = ['star', 'star', 'star_border', 'star_border', 'star_border'];
                break;
            }
            case this.avg > 40 && this.avg < 60: {
                this.stars = ['star', 'star', 'star_half', 'star_border', 'star_border'];
                break;
            }
            case this.avg == 60: {
                this.stars = ['star', 'star', 'star', 'star_border', 'star_border'];
                break;
            }
            case this.avg > 60 && this.avg < 80: {
                this.stars = ['star', 'star', 'star', 'star_half', 'star_border'];
                break;
            }
            case this.avg == 80: {
                this.stars = ['star', 'star', 'star', 'star', 'star_border'];
                break;
            }
            case this.avg > 80 && this.avg < 100: {
                this.stars = ['star', 'star', 'star', 'star', 'star_half'];
                break;
            }
            case this.avg >= 100: {
                this.stars = ['star', 'star', 'star', 'star', 'star'];
                break;
            }
            default: {
                this.stars = ['star_border', 'star_border', 'star_border', 'star_border', 'star_border'];
                break;
            }
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], RatingComponent.prototype, "ratingsCount", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], RatingComponent.prototype, "ratingsValue", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], RatingComponent.prototype, "direction", void 0);
    RatingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-rating',
            template: __webpack_require__(/*! ./rating.component.html */ "./src/app/shared/rating/rating.component.html"),
            styles: [__webpack_require__(/*! ./rating.component.scss */ "./src/app/shared/rating/rating.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], RatingComponent);
    return RatingComponent;
}());



/***/ }),

/***/ "./src/app/shared/shared.module.ts":
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_swiper_wrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-swiper-wrapper */ "./node_modules/ngx-swiper-wrapper/dist/ngx-swiper-wrapper.es5.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-perfect-scrollbar */ "./node_modules/ngx-perfect-scrollbar/dist/ngx-perfect-scrollbar.es5.js");
/* harmony import */ var _theme_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../theme/pipes/pipes.module */ "./src/app/theme/pipes/pipes.module.ts");
/* harmony import */ var _rating_rating_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rating/rating.component */ "./src/app/shared/rating/rating.component.ts");
/* harmony import */ var _controls_controls_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./controls/controls.component */ "./src/app/shared/controls/controls.component.ts");
/* harmony import */ var _main_carousel_main_carousel_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./main-carousel/main-carousel.component */ "./src/app/shared/main-carousel/main-carousel.component.ts");
/* harmony import */ var _brands_carousel_brands_carousel_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./brands-carousel/brands-carousel.component */ "./src/app/shared/brands-carousel/brands-carousel.component.ts");
/* harmony import */ var _products_carousel_products_carousel_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./products-carousel/products-carousel.component */ "./src/app/shared/products-carousel/products-carousel.component.ts");
/* harmony import */ var _products_carousel_product_dialog_product_dialog_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./products-carousel/product-dialog/product-dialog.component */ "./src/app/shared/products-carousel/product-dialog/product-dialog.component.ts");
/* harmony import */ var _banners_banners_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./banners/banners.component */ "./src/app/shared/banners/banners.component.ts");
/* harmony import */ var _category_list_category_list_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./category-list/category-list.component */ "./src/app/shared/category-list/category-list.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var DEFAULT_PERFECT_SCROLLBAR_CONFIG = {
    wheelPropagation: true,
    suppressScrollX: true
};







// import { ProductMapComponent } from '../pages/products/product-map/product-map.component';


var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"],
                ngx_swiper_wrapper__WEBPACK_IMPORTED_MODULE_3__["SwiperModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__["FlexLayoutModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatAutocompleteModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatButtonToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatChipsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatExpansionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatGridListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatNativeDateModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatProgressBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatRadioModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatRippleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSliderModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSlideToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTooltipModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatStepperModule"],
                ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_6__["PerfectScrollbarModule"],
                _theme_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_7__["PipesModule"]
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"],
                ngx_swiper_wrapper__WEBPACK_IMPORTED_MODULE_3__["SwiperModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__["FlexLayoutModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatAutocompleteModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatButtonToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatChipsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatExpansionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatGridListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatNativeDateModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatProgressBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatRadioModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatRippleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSliderModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSlideToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTooltipModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatStepperModule"],
                ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_6__["PerfectScrollbarModule"],
                _theme_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_7__["PipesModule"],
                _rating_rating_component__WEBPACK_IMPORTED_MODULE_8__["RatingComponent"],
                _controls_controls_component__WEBPACK_IMPORTED_MODULE_9__["ControlsComponent"],
                _main_carousel_main_carousel_component__WEBPACK_IMPORTED_MODULE_10__["MainCarouselComponent"],
                _brands_carousel_brands_carousel_component__WEBPACK_IMPORTED_MODULE_11__["BrandsCarouselComponent"],
                _products_carousel_products_carousel_component__WEBPACK_IMPORTED_MODULE_12__["ProductsCarouselComponent"],
                _products_carousel_product_dialog_product_dialog_component__WEBPACK_IMPORTED_MODULE_13__["ProductDialogComponent"],
                // ProductMapComponent,
                _banners_banners_component__WEBPACK_IMPORTED_MODULE_14__["BannersComponent"],
                _category_list_category_list_component__WEBPACK_IMPORTED_MODULE_15__["CategoryListComponent"]
            ],
            declarations: [
                _rating_rating_component__WEBPACK_IMPORTED_MODULE_8__["RatingComponent"],
                _controls_controls_component__WEBPACK_IMPORTED_MODULE_9__["ControlsComponent"],
                _main_carousel_main_carousel_component__WEBPACK_IMPORTED_MODULE_10__["MainCarouselComponent"],
                _brands_carousel_brands_carousel_component__WEBPACK_IMPORTED_MODULE_11__["BrandsCarouselComponent"],
                _products_carousel_products_carousel_component__WEBPACK_IMPORTED_MODULE_12__["ProductsCarouselComponent"],
                _products_carousel_product_dialog_product_dialog_component__WEBPACK_IMPORTED_MODULE_13__["ProductDialogComponent"],
                // ProductMapComponent,
                _banners_banners_component__WEBPACK_IMPORTED_MODULE_14__["BannersComponent"],
                _category_list_category_list_component__WEBPACK_IMPORTED_MODULE_15__["CategoryListComponent"]
            ],
            entryComponents: [
                _products_carousel_product_dialog_product_dialog_component__WEBPACK_IMPORTED_MODULE_13__["ProductDialogComponent"],
            ],
            providers: [
                { provide: ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_6__["PERFECT_SCROLLBAR_CONFIG"], useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
            ]
        })
    ], SharedModule);
    return SharedModule;
}());



/***/ }),

/***/ "./src/app/theme/components/breadcrumb/breadcrumb.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/theme/components/breadcrumb/breadcrumb.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row wrap\" *ngIf=\"router.url != '/'\">\r\n    <div fxFlex=\"100\">\r\n        <mat-card fxLayout=\"row\" class=\"breadcrumb light-block\">\r\n            <a *ngIf=\"router.url != '/'\" routerLink=\"/\" class=\"breadcrumb-item\" fxLayout=\"row\" fxLayoutAlign=\"start center\" (click)=\"closeSubMenus()\">\r\n                <mat-icon>home</mat-icon>\r\n                <span class=\"breadcrumb-title\">Homepage</span>\r\n            </a>\r\n            <div *ngFor=\"let breadcrumb of breadcrumbs; let i = index;\" class=\"breadcrumb-item\" fxLayout=\"row\" fxLayoutAlign=\"start center\">                 \r\n                <a [hidden]=\"i == (breadcrumbs.length - 1)\" [routerLink]=\"[breadcrumb.url]\">{{breadcrumb.name}}</a>   \r\n                <span [hidden]=\"i != (breadcrumbs.length - 1)\" class=\"breadcrumb-title active\"><b>{{breadcrumb.name}}</b></span>\r\n            </div> \r\n        </mat-card>\r\n    </div> \r\n</div>\r\n\r\n"

/***/ }),

/***/ "./src/app/theme/components/breadcrumb/breadcrumb.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/theme/components/breadcrumb/breadcrumb.component.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@charset \"UTF-8\";\n.breadcrumb {\n  padding: 8px 0;\n  box-shadow: none;\n  margin-bottom: 16px; }\n.breadcrumb a, .breadcrumb span {\n    font-size: 13px;\n    text-decoration: none;\n    color: inherit; }\n.breadcrumb .mat-icon {\n    font-size: 20px;\n    height: 20px;\n    width: 20px;\n    padding: 0 6px;\n    opacity: 0.7; }\n.breadcrumb .breadcrumb-title.active {\n    text-transform: uppercase; }\n.breadcrumb .breadcrumb-item + .breadcrumb-item:before {\n    display: inline-block;\n    padding-right: .5rem;\n    padding-left: .5rem;\n    content: \"»\"; }\n"

/***/ }),

/***/ "./src/app/theme/components/breadcrumb/breadcrumb.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/theme/components/breadcrumb/breadcrumb.component.ts ***!
  \*********************************************************************/
/*! exports provided: BreadcrumbComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BreadcrumbComponent", function() { return BreadcrumbComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _app_settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../app.settings */ "./src/app/app.settings.ts");
/* harmony import */ var _theme_components_sidenav_menu_sidenav_menu_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../theme/components/sidenav-menu/sidenav-menu.service */ "./src/app/theme/components/sidenav-menu/sidenav-menu.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BreadcrumbComponent = /** @class */ (function () {
    function BreadcrumbComponent(appSettings, router, activatedRoute, title, sidenavMenuService) {
        var _this = this;
        this.appSettings = appSettings;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.title = title;
        this.sidenavMenuService = sidenavMenuService;
        this.breadcrumbs = [];
        this.settings = this.appSettings.settings;
        this.router.events.subscribe(function (event) {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"]) {
                _this.breadcrumbs = [];
                _this.parseRoute(_this.router.routerState.snapshot.root);
                _this.pageTitle = "";
                _this.breadcrumbs.forEach(function (breadcrumb) {
                    _this.pageTitle += ' > ' + breadcrumb.name;
                });
                _this.title.setTitle(_this.settings.name + _this.pageTitle);
            }
        });
    }
    BreadcrumbComponent.prototype.parseRoute = function (node) {
        if (node.data['breadcrumb']) {
            if (node.url.length) {
                var urlSegments_1 = [];
                node.pathFromRoot.forEach(function (routerState) {
                    urlSegments_1 = urlSegments_1.concat(routerState.url);
                });
                var url = urlSegments_1.map(function (urlSegment) {
                    return urlSegment.path;
                }).join('/');
                if (node.params.name) {
                    this.breadcrumbs.push({
                        name: node.params.name,
                        url: '/' + url
                    });
                }
                else {
                    this.breadcrumbs.push({
                        name: node.data['breadcrumb'],
                        url: '/' + url
                    });
                }
            }
        }
        if (node.firstChild) {
            this.parseRoute(node.firstChild);
        }
    };
    BreadcrumbComponent.prototype.closeSubMenus = function () {
        if (window.innerWidth < 960) {
            this.sidenavMenuService.closeAllSubMenus();
        }
    };
    BreadcrumbComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-breadcrumb',
            template: __webpack_require__(/*! ./breadcrumb.component.html */ "./src/app/theme/components/breadcrumb/breadcrumb.component.html"),
            styles: [__webpack_require__(/*! ./breadcrumb.component.scss */ "./src/app/theme/components/breadcrumb/breadcrumb.component.scss")],
            providers: [_theme_components_sidenav_menu_sidenav_menu_service__WEBPACK_IMPORTED_MODULE_4__["SidenavMenuService"]]
        }),
        __metadata("design:paramtypes", [_app_settings__WEBPACK_IMPORTED_MODULE_3__["AppSettings"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["Title"],
            _theme_components_sidenav_menu_sidenav_menu_service__WEBPACK_IMPORTED_MODULE_4__["SidenavMenuService"]])
    ], BreadcrumbComponent);
    return BreadcrumbComponent;
}());



/***/ }),

/***/ "./src/app/theme/components/footer/footer.component.html":
/*!***************************************************************!*\
  !*** ./src/app/theme/components/footer/footer.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<footer class=\"bg-primary footer\">\r\n    <!-- <div fxLayout=\"column\" fxLayout.gt-sm=\"row wrap\" fxLayoutAlign=\"center center\" class=\"border-bottom-mute subscribe-block theme-container\">\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"40\" fxLayout=\"column\" fxLayoutAlign=\"center center\">\r\n            <h1 class=\"fw-500\">Subscribe our Newsletter</h1>\r\n            <h3 class=\"fw-300 secondary-color\">Stay up to date with our latest new and products</h3>\r\n        </div>\r\n        <form method=\"get\" class=\"subscribe-search-form\" fxLayout=\"row\" fxFlex=\"100\" fxFlex.gt-sm=\"42.4\" ngClass.sm=\"mt-2\" ngClass.xs=\"mt-2\">\r\n            <input type=\"text\" placeholder=\"Your email address...\" fxFlex>\r\n            <button mat-raised-button color=\"accent\" (click)=\"subscribe()\" type=\"button\" class=\"mat-elevation-z0 text-muted\">Subscribe</button>\r\n        </form>\r\n    </div>\r\n    <div fxLayout=\"row wrap\" fxLayoutAlign=\"space-between\" class=\"py-3 border-bottom-mute theme-container\">\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"20\" fxFlex.sm=\"40\">\r\n            <h3 class=\"col-title\">USEFUL LINKS</h3>\r\n            <p class=\"mt-2\"><a routerLink=\"/accounts\" class=\"link secondary-color\">My Account</a></p>\r\n            <p class=\"mt-1\"><a routerLink=\"/contact\" class=\"link secondary-color\">Contact</a></p>\r\n            <p class=\"mt-1\"><a routerLink=\"/compare\" class=\"link secondary-color\">Compare</a></p>\r\n            <p class=\"mt-1\"><a routerLink=\"/wishlist\" class=\"link secondary-color\">Wishlist</a></p>\r\n            <p class=\"mt-1\"><a routerLink=\"/checkout\" class=\"link secondary-color\">Checkout</a></p>\r\n            <p class=\"mt-1\"><a href=\"javascript:void(0);\" class=\"link secondary-color\">FAQ</a></p>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"30\" fxFlex.sm=\"60\" ngClass.xs=\"mt-2\">\r\n            <h3 class=\"col-title\">CONTACT INFORMATION</h3>\r\n            <p fxLayout=\"row\" fxLayoutAlign=\"start center\" class=\"mt-2 secondary-color\">\r\n                <mat-icon class=\"mr-1\">location_on</mat-icon>\r\n                <span>SOFIT, Bahria Town, Rawalpindi</span>\r\n            </p>\r\n            <p fxLayout=\"row\" fxLayoutAlign=\"start center\" class=\"mt-1 secondary-color\">\r\n                <mat-icon class=\"mr-1\">call</mat-icon>\r\n                <span>(051) 5400439 </span>\r\n            </p>\r\n            <p fxLayout=\"row\" fxLayoutAlign=\"start center\" class=\"mt-1 secondary-color\">\r\n                <mat-icon class=\"mr-1\">mail_outline</mat-icon>\r\n                <span>info@sofittech.com</span>\r\n            </p>\r\n            <p fxLayout=\"row\" fxLayoutAlign=\"start center\" class=\"mt-1 secondary-color\">\r\n                <mat-icon class=\"mr-1\">schedule</mat-icon>\r\n                <span>Mon - Fri / 10:00AM - 6:00PM</span>\r\n            </p>\r\n            <p fxLayout=\"row\" fxLayoutAlign=\"start center\" class=\"mt-1 secondary-color\">\r\n                <mat-icon class=\"mr-1\">directions</mat-icon>\r\n                <a href=\"javascript:void(0);\" class=\"link secondary-color\">Get directions</a>\r\n            </p>\r\n            <p fxLayout=\"row\" fxLayoutAlign=\"start center\" class=\"mt-1 secondary-color\">\r\n                <mat-icon class=\"mr-1\">directions_bus</mat-icon>\r\n                <span>Routes to us</span>\r\n            </p>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"50\" ngClass.sm=\"mt-2\" ngClass.xs=\"mt-2\">\r\n            <agm-map [latitude]=\"lat\" [longitude]=\"lng\" [zoom]=\"zoom\" [mapTypeControl]=\"true\">\r\n                <agm-marker [latitude]=\"lat\" [longitude]=\"lng\" [markerDraggable]=\"true\"></agm-marker>\r\n            </agm-map>\r\n        </div>\r\n    </div> -->\r\n    <div fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"space-between center\" class=\"prox_r\" style=\"text-align:center; color:#ffffff; font-size:100%\">\r\n        <p >Copyright Protected (c) 2018</p>\r\n        <!-- <p>Designed & Developed by <a mat-button href=\"http://themeseason.com/\" target=\"_blank\">SOFIT</a></p> -->\r\n    </div>\r\n</footer>\r\n"

/***/ }),

/***/ "./src/app/theme/components/footer/footer.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/theme/components/footer/footer.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".footer {\n  min-height: 100px;\n  padding: 16px 16px 0; }\n  .footer .subscribe-block {\n    padding: 16px 0 32px 0;\n    text-align: center; }\n  .footer .subscribe-block h1, .footer .subscribe-block h3 {\n      line-height: 1; }\n  .footer .subscribe-block h1 {\n      margin-bottom: 6px; }\n  .footer .subscribe-block .subscribe-search-form {\n      height: 50px;\n      padding: 0 16px; }\n  .footer .subscribe-block .subscribe-search-form input[type=text] {\n        border: 0;\n        outline: none;\n        padding: 0 25px;\n        font-size: 16px; }\n  .footer .subscribe-block .subscribe-search-form button {\n        font-size: 16px;\n        padding: 0 24px;\n        border-radius: 0; }\n  .footer .col-title {\n    font-weight: 600; }\n  .footer .mat-icon {\n    height: 21px;\n    line-height: 21px; }\n  .footer .link {\n    text-decoration: none; }\n  .footer .link:hover {\n      text-decoration: underline; }\n  .footer .copyright {\n    font-size: 13px;\n    font-weight: 300; }\n  @media (max-width: 575px) {\n  .footer .subscribe-block .subscribe-search-form {\n    height: 40px;\n    margin-top: 16px; }\n    .footer .subscribe-block .subscribe-search-form input[type=text] {\n      padding: 0 8px;\n      font-size: 14px; }\n    .footer .subscribe-block .subscribe-search-form button {\n      font-size: 14px;\n      padding: 0 16px; } }\n  @media (min-width: 576px) and (max-width: 767px) {\n  .footer .subscribe-block .subscribe-search-form {\n    margin-top: 16px; } }\n  .sebm-google-map-container {\n  height: 220px; }\n"

/***/ }),

/***/ "./src/app/theme/components/footer/footer.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/theme/components/footer/footer.component.ts ***!
  \*************************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
        this.lat = 33.6957;
        this.lng = -73.0113;
        this.zoom = 12;
    }
    FooterComponent.prototype.ngOnInit = function () { };
    FooterComponent.prototype.subscribe = function () { };
    FooterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/theme/components/footer/footer.component.html"),
            styles: [__webpack_require__(/*! ./footer.component.scss */ "./src/app/theme/components/footer/footer.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/theme/components/menu/menu.component.html":
/*!***********************************************************!*\
  !*** ./src/app/theme/components/menu/menu.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <mat-toolbar class=\"top-navbar mat-elevation-z2\" fxLayoutAlign=\"center center\">\r\n    <a mat-button routerLink=\"/\" routerLinkActive=\"horizontal-active-link\" [routerLinkActiveOptions]=\"{exact:true}\">Home</a>\r\n    <a mat-button [matMenuTriggerFor]=\"menu\" (click)=\"openMegaMenu()\">Fashion<mat-icon class=\"caret\">arrow_drop_down</mat-icon></a>\r\n    <mat-menu #menu=\"matMenu\" [overlapTrigger]=\"false\" class=\"mega-menu app-dropdown\">\r\n        <div fxLayout=\"row wrap\">\r\n            <div fxFlex=\"20\" fxLayout=\"column\" class=\"p-1\">\r\n                <a mat-menu-item routerLink=\"/\"><b>WOMEN</b></a>\r\n                <mat-divider></mat-divider>\r\n                <a mat-menu-item routerLink=\"/\">Dresses & Skirts</a>\r\n                <a mat-menu-item routerLink=\"/\">Jackets</a>\r\n                <a mat-menu-item routerLink=\"/\">Tops & Blouses</a>\r\n                <a mat-menu-item routerLink=\"/\">Shoes & Boots</a>\r\n                <a mat-menu-item routerLink=\"/\">Knitwear</a>\r\n            </div>\r\n            <div fxFlex=\"20\" class=\"p-1\">\r\n                <a mat-menu-item routerLink=\"/\"><b>MEN</b></a>\r\n                <mat-divider></mat-divider>\r\n                <button mat-menu-item>T-shirts & Polos</button>\r\n                <button mat-menu-item>Shoes & Boots</button>\r\n                <button mat-menu-item>Jeans</button>\r\n                <button mat-menu-item>Coats</button>\r\n            </div>\r\n            <div fxFlex=\"20\" class=\"p-1\">\r\n                <a mat-menu-item routerLink=\"/\"><b>KIDS</b></a>\r\n                <mat-divider></mat-divider>\r\n                <button mat-menu-item>Top</button>\r\n                <button mat-menu-item>Pants & Shorts</button>\r\n                <button mat-menu-item>Dresses</button>\r\n                <button mat-menu-item>Skirts</button>\r\n                <button mat-menu-item>Set & Body</button>\r\n            </div>\r\n            <div fxFlex=\"20\" class=\"p-1\">\r\n                <a mat-menu-item routerLink=\"/\"><b>ACCESSORIES</b></a>\r\n                <mat-divider></mat-divider>\r\n                <button mat-menu-item>Watches</button>\r\n                <button mat-menu-item>Bags & Wallet</button>\r\n                <button mat-menu-item>Sunglasses</button>\r\n                <button mat-menu-item>Belts & Hats</button>\r\n            </div>\r\n            <div fxFlex=\"20\" class=\"p-1\">\r\n                <mat-card class=\"mega-menu-widget p-0\">\r\n                    <mat-chip-list>\r\n                        <mat-chip color=\"warn\" selected=\"true\">50% OFF</mat-chip>\r\n                    </mat-chip-list>\r\n                    <button mat-raised-button color=\"primary\">Shop now</button>\r\n                    <img src=\"assets/images/others/mega_menu_img.png\" alt=\"\" class=\"w-100\">\r\n                </mat-card>\r\n            </div>\r\n        </div>\r\n\r\n    </mat-menu>\r\n\r\n    <a mat-button [routerLink]=\"['/products', 'jewellery']\" routerLinkActive=\"horizontal-active-link\" [routerLinkActiveOptions]=\"{exact:true}\">Jewellery</a>\r\n    <a mat-button [routerLink]=\"['/products', 'electronics']\" routerLinkActive=\"horizontal-active-link\" [routerLinkActiveOptions]=\"{exact:true}\">Electronics</a>\r\n    <a mat-button [routerLink]=\"['/products', 'sports']\" routerLinkActive=\"horizontal-active-link\" [routerLinkActiveOptions]=\"{exact:true}\">Sports</a>\r\n    <a mat-button [routerLink]=\"['/products', 'motors']\" routerLinkActive=\"horizontal-active-link\" [routerLinkActiveOptions]=\"{exact:true}\">Motors</a>\r\n\r\n    <a mat-button [matMenuTriggerFor]=\"animals\">Pages<mat-icon class=\"caret\">arrow_drop_down</mat-icon></a>\r\n    <mat-menu #animals=\"matMenu\" [overlapTrigger]=\"false\" class=\"app-dropdown\">\r\n        <a mat-menu-item routerLink=\"/products\" routerLinkActive=\"horizontal-active-link\" [routerLinkActiveOptions]=\"{exact:true}\">All products</a>\r\n        <a mat-menu-item [routerLink]=\"['/products', '2', 'PC All-in-One']\" routerLinkActive=\"horizontal-active-link\" [routerLinkActiveOptions]=\"{exact:true}\">Product detail</a>\r\n        <a mat-menu-item routerLink=\"/contact\" routerLinkActive=\"horizontal-active-link\" [routerLinkActiveOptions]=\"{exact:true}\">Contact</a>\r\n        <a mat-menu-item routerLink=\"/sign-in\">Sign in</a>\r\n        <a mat-menu-item routerLink=\"/404\">404 Error</a>\r\n        <a mat-menu-item [matMenuTriggerFor]=\"others\">Others</a>\r\n    </mat-menu>\r\n\r\n    <mat-menu #others=\"matMenu\" class=\"app-dropdown\">\r\n        <a mat-menu-item href=\"http://themeseason.com\" target=\"_blank\">External Link</a>\r\n        <a mat-menu-item>Menu item</a>\r\n        <a mat-menu-item>Menu item</a>\r\n        <a mat-menu-item>Menu item</a>\r\n    </mat-menu>\r\n\r\n    <a mat-button routerLink=\"/contact\" routerLinkActive=\"horizontal-active-link\" [routerLinkActiveOptions]=\"{exact:true}\">Contact</a>\r\n\r\n</mat-toolbar>\r\n -->\r\n"

/***/ }),

/***/ "./src/app/theme/components/menu/menu.component.scss":
/*!***********************************************************!*\
  !*** ./src/app/theme/components/menu/menu.component.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/theme/components/menu/menu.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/theme/components/menu/menu.component.ts ***!
  \*********************************************************/
/*! exports provided: MenuComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuComponent", function() { return MenuComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MenuComponent = /** @class */ (function () {
    function MenuComponent() {
    }
    MenuComponent.prototype.ngOnInit = function () { };
    MenuComponent.prototype.openMegaMenu = function () {
        var pane = document.getElementsByClassName('cdk-overlay-pane');
        [].forEach.call(pane, function (el) {
            if (el.children.length > 0) {
                if (el.children[0].classList.contains('mega-menu')) {
                    el.classList.add('mega-menu-pane');
                }
            }
        });
    };
    MenuComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-menu',
            template: __webpack_require__(/*! ./menu.component.html */ "./src/app/theme/components/menu/menu.component.html"),
            styles: [__webpack_require__(/*! ./menu.component.scss */ "./src/app/theme/components/menu/menu.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], MenuComponent);
    return MenuComponent;
}());



/***/ }),

/***/ "./src/app/theme/components/options/options.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/theme/components/options/options.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"options transition\" [ngClass]=\"{'show': showOptions}\">\r\n    <button mat-raised-button (click)=\"showOptions = !showOptions\" class=\"options-icon mat-elevation-z0\">\r\n        <mat-icon>palette</mat-icon>\r\n    </button>\r\n    <mat-card fxLayout=\"column\" fxLayoutAlign=\"space-between start\">\r\n        <span class=\"skin-icon green\" (click)=\"changeTheme('green')\"></span>\r\n        <span class=\"skin-icon blue\" (click)=\"changeTheme('blue')\"></span>\r\n        <span class=\"skin-icon red\" (click)=\"changeTheme('red')\"></span>\r\n        <span class=\"skin-icon pink\" (click)=\"changeTheme('pink')\"></span>\r\n        <span class=\"skin-icon purple\" (click)=\"changeTheme('purple')\"></span>\r\n        <span class=\"skin-icon grey\" (click)=\"changeTheme('grey')\"></span>\r\n    </mat-card>\r\n</div> -->\r\n"

/***/ }),

/***/ "./src/app/theme/components/options/options.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/theme/components/options/options.component.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".options {\n  width: 60px;\n  height: 250px;\n  position: fixed;\n  top: 100px;\n  right: -62px;\n  z-index: 9999; }\n  .options .options-icon {\n    padding: 0;\n    position: absolute;\n    top: 12px;\n    left: -36px;\n    min-width: 38px;\n    z-index: 1;\n    box-shadow: -2px 3px 1px -2px rgba(0, 0, 0, 0.2), -2px 2px 2px 0 rgba(0, 0, 0, 0.14), -2px 1px 5px 0 rgba(0, 0, 0, 0.12); }\n  .options .mat-card {\n    position: absolute;\n    padding: 14px;\n    width: 100%;\n    height: 100%; }\n  .options.show {\n    right: -2px; }\n  .options .skin-icon {\n    width: 32px;\n    height: 32px;\n    cursor: pointer; }\n  .options .skin-icon.green {\n      background-color: #689f38; }\n  .options .skin-icon.blue {\n      background-color: #1976d2; }\n  .options .skin-icon.red {\n      background-color: #d32f2f; }\n  .options .skin-icon.pink {\n      background-color: #c2185b; }\n  .options .skin-icon.purple {\n      background-color: #7b1fa2; }\n  .options .skin-icon.grey {\n      background-color: #455a64; }\n"

/***/ }),

/***/ "./src/app/theme/components/options/options.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/theme/components/options/options.component.ts ***!
  \***************************************************************/
/*! exports provided: OptionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OptionsComponent", function() { return OptionsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../app.settings */ "./src/app/app.settings.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var OptionsComponent = /** @class */ (function () {
    function OptionsComponent(appSettings) {
        this.appSettings = appSettings;
        this.showOptions = false;
        this.settings = this.appSettings.settings;
    }
    OptionsComponent.prototype.changeTheme = function (theme) {
        this.settings.theme = theme;
    };
    OptionsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-options',
            template: __webpack_require__(/*! ./options.component.html */ "./src/app/theme/components/options/options.component.html"),
            styles: [__webpack_require__(/*! ./options.component.scss */ "./src/app/theme/components/options/options.component.scss")]
        }),
        __metadata("design:paramtypes", [_app_settings__WEBPACK_IMPORTED_MODULE_1__["AppSettings"]])
    ], OptionsComponent);
    return OptionsComponent;
}());



/***/ }),

/***/ "./src/app/theme/components/sidenav-menu/sidenav-menu.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/theme/components/sidenav-menu/sidenav-menu.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngFor=\"let menu of parentMenu\" class=\"menu-item\">\r\n    <a *ngIf=\"menu.routerLink && !menu.hasSubMenu\" mat-button\r\n        fxLayout=\"row\" fxLayoutAlign=\"start center\"\r\n        [routerLink]=\"[menu.routerLink]\" routerLinkActive=\"active-link\" [routerLinkActiveOptions]=\"{exact:true}\"        \r\n        (click)=\"onClick(menu.id)\" [id]=\"'menu-item-'+menu.id\">\r\n        <span class=\"menu-title\">{{menu.title}}</span>\r\n    </a>\r\n    <a *ngIf=\"menu.href && !menu.subMenu\" mat-button \r\n        fxLayout=\"row\" fxLayoutAlign=\"start center\"\r\n        [attr.href]=\"menu.href || ''\" [attr.target]=\"menu.target || ''\"       \r\n        (click)=\"onClick(menu.id)\" [id]=\"'menu-item-'+menu.id\">\r\n        <span class=\"menu-title\">{{menu.title}}</span>\r\n    </a>\r\n    <a *ngIf=\"menu.hasSubMenu\" mat-button \r\n        fxLayout=\"row\" fxLayoutAlign=\"start center\"       \r\n        (click)=\"onClick(menu.id)\" [id]=\"'menu-item-'+menu.id\">\r\n        <span class=\"menu-title\">{{menu.title}}</span>\r\n        <mat-icon class=\"menu-expand-icon transition-2\">arrow_drop_down</mat-icon>\r\n    </a>\r\n\r\n    <div *ngIf=\"menu.hasSubMenu\" class=\"sub-menu\" [id]=\"'sub-menu-'+menu.id\">\r\n        <app-sidenav-menu [menuItems]=\"menuItems\" [menuParentId]=\"menu.id\"></app-sidenav-menu>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/theme/components/sidenav-menu/sidenav-menu.component.scss":
/*!***************************************************************************!*\
  !*** ./src/app/theme/components/sidenav-menu/sidenav-menu.component.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".menu-expand-icon {\n  position: absolute;\n  right: 10px;\n  top: 10px; }\n\n.menu-item .mat-button {\n  width: 100%;\n  font-weight: 400;\n  text-transform: uppercase; }\n\n.menu-item .mat-button.expanded .menu-expand-icon {\n    -webkit-transform: rotate(180deg);\n    transform: rotate(180deg); }\n\n.menu-item .mat-button-wrapper {\n  padding-left: 16px; }\n\n.sub-menu {\n  max-height: 0;\n  overflow: hidden;\n  transition: max-height 0.25s ease-out; }\n\n.sub-menu .sub-menu .mat-button {\n    padding-left: 56px; }\n\n.sub-menu .sub-menu .sub-menu .mat-button {\n    padding-left: 76px; }\n\n.sub-menu .sub-menu .sub-menu .sub-menu .mat-button {\n    padding-left: 96px; }\n\n.sub-menu .sub-menu .sub-menu .sub-menu .sub-menu .mat-button {\n    padding-left: 116px; }\n\n.sub-menu .sub-menu .sub-menu .sub-menu .sub-menu .sub-menu .mat-button {\n    padding-left: 136px; }\n\n.sub-menu .sub-menu .sub-menu .sub-menu .sub-menu .sub-menu .sub-menu .mat-button {\n    padding-left: 156px; }\n\n.sub-menu .sub-menu .sub-menu .sub-menu .sub-menu .sub-menu .sub-menu .sub-menu .mat-button {\n    padding-left: 176px; }\n\n.sub-menu .sub-menu .sub-menu .sub-menu .sub-menu .sub-menu .sub-menu .sub-menu .sub-menu .mat-button {\n    padding-left: 196px; }\n\n.sub-menu .sub-menu .sub-menu .sub-menu .sub-menu .sub-menu .sub-menu .sub-menu .sub-menu .sub-menu .mat-button {\n    padding-left: 216px; }\n\n.sub-menu .mat-button {\n    padding-left: 36px; }\n\n.sub-menu.show {\n    max-height: 500px;\n    transition: max-height 0.25s ease-in; }\n"

/***/ }),

/***/ "./src/app/theme/components/sidenav-menu/sidenav-menu.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/theme/components/sidenav-menu/sidenav-menu.component.ts ***!
  \*************************************************************************/
/*! exports provided: SidenavMenuComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidenavMenuComponent", function() { return SidenavMenuComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _sidenav_menu_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sidenav-menu.service */ "./src/app/theme/components/sidenav-menu/sidenav-menu.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SidenavMenuComponent = /** @class */ (function () {
    function SidenavMenuComponent(sidenavMenuService) {
        this.sidenavMenuService = sidenavMenuService;
    }
    SidenavMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parentMenu = this.menuItems.filter(function (item) { return item.parentId == _this.menuParentId; });
    };
    SidenavMenuComponent.prototype.onClick = function (menuId) {
        this.sidenavMenuService.toggleMenuItem(menuId);
        this.sidenavMenuService.closeOtherSubMenus(this.menuItems, menuId);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('menuItems'),
        __metadata("design:type", Object)
    ], SidenavMenuComponent.prototype, "menuItems", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('menuParentId'),
        __metadata("design:type", Object)
    ], SidenavMenuComponent.prototype, "menuParentId", void 0);
    SidenavMenuComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sidenav-menu',
            template: __webpack_require__(/*! ./sidenav-menu.component.html */ "./src/app/theme/components/sidenav-menu/sidenav-menu.component.html"),
            styles: [__webpack_require__(/*! ./sidenav-menu.component.scss */ "./src/app/theme/components/sidenav-menu/sidenav-menu.component.scss")],
            providers: [_sidenav_menu_service__WEBPACK_IMPORTED_MODULE_1__["SidenavMenuService"]]
        }),
        __metadata("design:paramtypes", [_sidenav_menu_service__WEBPACK_IMPORTED_MODULE_1__["SidenavMenuService"]])
    ], SidenavMenuComponent);
    return SidenavMenuComponent;
}());



/***/ }),

/***/ "./src/app/theme/components/sidenav-menu/sidenav-menu.service.ts":
/*!***********************************************************************!*\
  !*** ./src/app/theme/components/sidenav-menu/sidenav-menu.service.ts ***!
  \***********************************************************************/
/*! exports provided: SidenavMenuService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidenavMenuService", function() { return SidenavMenuService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _sidenav_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sidenav-menu */ "./src/app/theme/components/sidenav-menu/sidenav-menu.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SidenavMenuService = /** @class */ (function () {
    function SidenavMenuService(location, router) {
        this.location = location;
        this.router = router;
    }
    SidenavMenuService.prototype.getSidenavMenuItems = function () {
        return _sidenav_menu__WEBPACK_IMPORTED_MODULE_3__["sidenavMenuItems"];
    };
    SidenavMenuService.prototype.expandActiveSubMenu = function (menu) {
        var url = this.location.path();
        var routerLink = decodeURIComponent(url);
        var activeMenuItem = menu.filter(function (item) { return item.routerLink === routerLink; });
        if (activeMenuItem[0]) {
            var menuItem_1 = activeMenuItem[0];
            while (menuItem_1.parentId != 0) {
                var parentMenuItem = menu.filter(function (item) { return item.id == menuItem_1.parentId; })[0];
                menuItem_1 = parentMenuItem;
                this.toggleMenuItem(menuItem_1.id);
            }
        }
    };
    SidenavMenuService.prototype.toggleMenuItem = function (menuId) {
        var menuItem = document.getElementById('menu-item-' + menuId);
        var subMenu = document.getElementById('sub-menu-' + menuId);
        if (subMenu) {
            if (subMenu.classList.contains('show')) {
                subMenu.classList.remove('show');
                menuItem.classList.remove('expanded');
            }
            else {
                subMenu.classList.add('show');
                menuItem.classList.add('expanded');
            }
        }
    };
    SidenavMenuService.prototype.closeOtherSubMenus = function (menu, menuId) {
        var currentMenuItem = menu.filter(function (item) { return item.id == menuId; })[0];
        menu.forEach(function (item) {
            if ((item.id != menuId && item.parentId == currentMenuItem.parentId) || (currentMenuItem.parentId == 0 && item.id != menuId)) {
                var subMenu = document.getElementById('sub-menu-' + item.id);
                var menuItem = document.getElementById('menu-item-' + item.id);
                if (subMenu) {
                    if (subMenu.classList.contains('show')) {
                        subMenu.classList.remove('show');
                        menuItem.classList.remove('expanded');
                    }
                }
            }
        });
    };
    SidenavMenuService.prototype.closeAllSubMenus = function () {
        _sidenav_menu__WEBPACK_IMPORTED_MODULE_3__["sidenavMenuItems"].forEach(function (item) {
            var subMenu = document.getElementById('sub-menu-' + item.id);
            var menuItem = document.getElementById('menu-item-' + item.id);
            if (subMenu) {
                if (subMenu.classList.contains('show')) {
                    subMenu.classList.remove('show');
                    menuItem.classList.remove('expanded');
                }
            }
        });
    };
    SidenavMenuService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], SidenavMenuService);
    return SidenavMenuService;
}());



/***/ }),

/***/ "./src/app/theme/components/sidenav-menu/sidenav-menu.ts":
/*!***************************************************************!*\
  !*** ./src/app/theme/components/sidenav-menu/sidenav-menu.ts ***!
  \***************************************************************/
/*! exports provided: sidenavMenuItems */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sidenavMenuItems", function() { return sidenavMenuItems; });
var sidenavMenuItems = [];


/***/ }),

/***/ "./src/app/theme/components/top-menu/top-menu.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/theme/components/top-menu/top-menu.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"top-menu\">\r\n\r\n    <!-- <a mat-button [matMenuTriggerFor]=\"currencyMenu\" #currencyMenuTrigger=\"matMenuTrigger\">\r\n        {{currency}}<mat-icon class=\"mat-icon-sm caret\">arrow_drop_down</mat-icon>\r\n    </a>\r\n    <mat-menu #currencyMenu=\"matMenu\" [overlapTrigger]=\"false\" xPosition=\"before\" class=\"app-dropdown\">\r\n        <span (mouseleave)=\"currencyMenuTrigger.closeMenu()\">\r\n            <button mat-menu-item *ngFor=\"let cur of currencies\" (click)=\"changeCurrency(cur)\">\r\n                <span>{{cur}}</span>\r\n            </button>\r\n        </span>\r\n    </mat-menu>\r\n\r\n    <a mat-button [matMenuTriggerFor]=\"langMenu\" #langMenuTrigger=\"matMenuTrigger\">\r\n        <img [src]=\"flag.image\" width=\"18\">\r\n        <span fxShow=\"false\" fxShow.gt-sm class=\"flag-menu-title\">{{flag.name}}</span>\r\n        <mat-icon class=\"mat-icon-sm caret\">arrow_drop_down</mat-icon>\r\n    </a>\r\n    <mat-menu #langMenu=\"matMenu\" [overlapTrigger]=\"false\" xPosition=\"before\" class=\"app-dropdown\">\r\n        <span (mouseleave)=\"langMenuTrigger.closeMenu()\">\r\n            <button mat-menu-item *ngFor=\"let flag of flags\" (click)=\"changeLang(flag)\">\r\n                <img [src]=\"flag.image\" width=\"18\"> {{flag.name}}\r\n            </button>\r\n        </span>\r\n    </mat-menu> -->\r\n\r\n    <!-- <span fxShow=\"false\" fxShow.gt-sm>\r\n        <a mat-button routerLink=\"/sell\">Post Ad</a>\r\n        <a mat-button routerLink=\"/wishlist\">Wishlist ({{appService.Data.wishList.length}})</a>\r\n    </span> -->\r\n\r\n    <a mat-button [matMenuTriggerFor]=\"accountMenu\" #accountMenuTrigger=\"matMenuTrigger\" style=\"font-family:proxr\">\r\n      <img src={{this.profilePicture}} height=\"20\" width=\"20\" class=\"user_img\" style=\"border-radius:50%; margin-right:10%;\"/>\r\n        <span fxShow=\"false\" style=\"margin-right:5%\" fxShow.gt-sm>account</span>\r\n    </a>\r\n    <mat-menu #accountMenu=\"matMenu\" [overlapTrigger]=\"false\" xPosition=\"before\" class=\"app-dropdown account\" style=\"font-family:proxr\">\r\n        <span (mouseleave)=\"accountMenuTrigger.closeMenu()\">\r\n            <div fxLayout=\"row\" fxLayoutAlign=\"space-around center\" class=\"user-info\">\r\n              <div class=\"img_div\">\r\n                <img src={{this.profilePicture}} height=\"70\" width=\"70\" class=\"user_img\" style=\"border-radius:50%;\"/>\r\n              </div>\r\n                <!-- <img src=\"assets/images/others/user.jpg\" alt=\"user-image\" width=\"50\"> -->\r\n                <b>{{this.name}}<br>\r\n                  <!-- <small><mat-icon class=\"mat-icon-xs\">star</mat-icon>)</small> -->\r\n                </b>\r\n            </div>\r\n            <div class=\"divider\"></div>\r\n            <span mat-menu-item (click)=\"adrouter()\">\r\n                <mat-icon class=\"mat-icon-sm\">settings</mat-icon>\r\n                <span  style=\"font-family:proxr\">Account Settings</span>\r\n            </span>\r\n            <!-- <a mat-menu-item routerLink=\"/compare\" fxHide=\"false\" fxHide.gt-sm>\r\n                <mat-icon class=\"mat-icon-sm\">compare</mat-icon>\r\n                <span>Compare ({{appService.Data.compareList.length}})</span>\r\n            </a>\r\n            <a mat-menu-item routerLink=\"/wishlist\" fxHide=\"false\" fxHide.gt-sm>\r\n                <mat-icon class=\"mat-icon-sm\">favorite</mat-icon>\r\n                <span>Wishlist ({{appService.Data.wishList.length}})</span>\r\n            </a> -->\r\n            <!-- <a mat-menu-item routerLink=\"/\">\r\n                <mat-icon class=\"mat-icon-sm\">lock</mat-icon>\r\n                <span>Lock screen</span>\r\n            </a> -->\r\n            <!-- <a mat-menu-item routerLink=\"/\">\r\n                <mat-icon class=\"mat-icon-sm\">help</mat-icon>\r\n                <span>Help</span>\r\n            </a> -->\r\n            <div class=\"divider\"></div>\r\n            <span mat-menu-item (click)=\"sign_out()\">\r\n                <mat-icon class=\"mat-icon-sm\">power_settings_new</mat-icon>\r\n                <span >Sign Out</span>\r\n            </span>\r\n        </span>\r\n    </mat-menu>\r\n\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/theme/components/top-menu/top-menu.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/theme/components/top-menu/top-menu.component.ts ***!
  \*****************************************************************/
/*! exports provided: TopMenuComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TopMenuComponent", function() { return TopMenuComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../app.service */ "./src/app/app.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TopMenuComponent = /** @class */ (function () {
    function TopMenuComponent(appService, router) {
        this.appService = appService;
        this.router = router;
        this.currencies = ['USD', 'EUR'];
        this.flags = [
            { name: 'English', image: 'assets/images/flags/gb.svg' },
            { name: 'German', image: 'assets/images/flags/de.svg' },
            { name: 'French', image: 'assets/images/flags/fr.svg' },
            { name: 'Russian', image: 'assets/images/flags/ru.svg' },
            { name: 'Turkish', image: 'assets/images/flags/tr.svg' }
        ];
    }
    TopMenuComponent.prototype.ngOnInit = function () {
        this.currency = this.currencies[0];
        this.flag = this.flags[0];
        this.name = localStorage.getItem('name');
        this.showuser();
    };
    TopMenuComponent.prototype.changeCurrency = function (currency) {
        this.currency = currency;
    };
    TopMenuComponent.prototype.changeLang = function (flag) {
        this.flag = flag;
    };
    TopMenuComponent.prototype.showuser = function () {
        var _this = this;
        this.appService.getUserDetails().subscribe(function (data) {
            // console.log(data);
            _this.profilePicture = data['result']['profilePicture'];
        });
    };
    TopMenuComponent.prototype.sign_out = function () {
        localStorage.removeItem('jwt');
        localStorage.removeItem('userid');
        localStorage.removeItem('name');
        localStorage.removeItem('currency');
        localStorage.clear();
        this.router.navigate(['/sign-in']);
    };
    TopMenuComponent.prototype.adrouter = function () {
        if (localStorage.getItem('jwt') != undefined && localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != '') {
            this.router.navigate(['/account']);
        }
        else {
            this.router.navigate(['/sign-in']);
        }
    };
    TopMenuComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-top-menu',
            template: __webpack_require__(/*! ./top-menu.component.html */ "./src/app/theme/components/top-menu/top-menu.component.html")
        }),
        __metadata("design:paramtypes", [_app_service__WEBPACK_IMPORTED_MODULE_1__["AppService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], TopMenuComponent);
    return TopMenuComponent;
}());



/***/ }),

/***/ "./src/app/theme/pipes/brand-search.pipe.ts":
/*!**************************************************!*\
  !*** ./src/app/theme/pipes/brand-search.pipe.ts ***!
  \**************************************************/
/*! exports provided: BrandSearchPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrandSearchPipe", function() { return BrandSearchPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var BrandSearchPipe = /** @class */ (function () {
    function BrandSearchPipe() {
    }
    BrandSearchPipe.prototype.transform = function (brands, args) {
        var searchText = new RegExp(args, 'ig');
        if (brands) {
            return brands.filter(function (brand) {
                if (brand.name) {
                    return brand.name.search(searchText) !== -1;
                }
            });
        }
    };
    BrandSearchPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({ name: 'brandSearchPipe', pure: false })
    ], BrandSearchPipe);
    return BrandSearchPipe;
}());



/***/ }),

/***/ "./src/app/theme/pipes/filter-brands.pipe.ts":
/*!***************************************************!*\
  !*** ./src/app/theme/pipes/filter-brands.pipe.ts ***!
  \***************************************************/
/*! exports provided: FilterBrandsPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterBrandsPipe", function() { return FilterBrandsPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FilterBrandsPipe = /** @class */ (function () {
    function FilterBrandsPipe() {
    }
    FilterBrandsPipe.prototype.transform = function (brands, firstLetter) {
        if (firstLetter == 'all') {
            return brands;
        }
        else {
            return brands.filter(function (brand) { return brand.name.charAt(0) == firstLetter.toLowerCase(); });
        }
    };
    FilterBrandsPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'filterBrands'
        })
    ], FilterBrandsPipe);
    return FilterBrandsPipe;
}());



/***/ }),

/***/ "./src/app/theme/pipes/filter-by-id.pipe.ts":
/*!**************************************************!*\
  !*** ./src/app/theme/pipes/filter-by-id.pipe.ts ***!
  \**************************************************/
/*! exports provided: FilterByIdPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterByIdPipe", function() { return FilterByIdPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FilterByIdPipe = /** @class */ (function () {
    function FilterByIdPipe() {
    }
    FilterByIdPipe.prototype.transform = function (items, id) {
        return items.filter(function (item) { return item.id == id; })[0];
    };
    FilterByIdPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'filterById'
        })
    ], FilterByIdPipe);
    return FilterByIdPipe;
}());



/***/ }),

/***/ "./src/app/theme/pipes/pipes.module.ts":
/*!*********************************************!*\
  !*** ./src/app/theme/pipes/pipes.module.ts ***!
  \*********************************************/
/*! exports provided: PipesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PipesModule", function() { return PipesModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _filter_by_id_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./filter-by-id.pipe */ "./src/app/theme/pipes/filter-by-id.pipe.ts");
/* harmony import */ var _filter_brands_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./filter-brands.pipe */ "./src/app/theme/pipes/filter-brands.pipe.ts");
/* harmony import */ var _brand_search_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./brand-search.pipe */ "./src/app/theme/pipes/brand-search.pipe.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var PipesModule = /** @class */ (function () {
    function PipesModule() {
    }
    PipesModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]
            ],
            declarations: [
                _filter_by_id_pipe__WEBPACK_IMPORTED_MODULE_2__["FilterByIdPipe"],
                _filter_brands_pipe__WEBPACK_IMPORTED_MODULE_3__["FilterBrandsPipe"],
                _brand_search_pipe__WEBPACK_IMPORTED_MODULE_4__["BrandSearchPipe"]
            ],
            exports: [
                _filter_by_id_pipe__WEBPACK_IMPORTED_MODULE_2__["FilterByIdPipe"],
                _filter_brands_pipe__WEBPACK_IMPORTED_MODULE_3__["FilterBrandsPipe"],
                _brand_search_pipe__WEBPACK_IMPORTED_MODULE_4__["BrandSearchPipe"]
            ]
        })
    ], PipesModule);
    return PipesModule;
}());



/***/ }),

/***/ "./src/app/theme/utils/app-interceptor.ts":
/*!************************************************!*\
  !*** ./src/app/theme/utils/app-interceptor.ts ***!
  \************************************************/
/*! exports provided: AppInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppInterceptor", function() { return AppInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/ngx-spinner.umd.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ngx_spinner__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var rxjs_add_operator_do__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/operator/do */ "./node_modules/rxjs-compat/_esm5/add/operator/do.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppInterceptor = /** @class */ (function () {
    function AppInterceptor(spinner) {
        this.spinner = spinner;
    }
    AppInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        this.spinner.show();
        return next.handle(req).do(function (event) {
            if (event instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpResponse"]) {
                _this.spinner.hide();
            }
        }, function (err) {
            _this.spinner.hide();
            if (err instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpErrorResponse"]) {
                var started = Date.now();
                var elapsed = Date.now() - started;
                console.log("Request for " + req.urlWithParams + " failed after " + elapsed + " ms.");
                // debugger;
            }
        });
    };
    AppInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerService"]])
    ], AppInterceptor);
    return AppInterceptor;
}());



/***/ }),

/***/ "./src/app/theme/utils/app-validators.ts":
/*!***********************************************!*\
  !*** ./src/app/theme/utils/app-validators.ts ***!
  \***********************************************/
/*! exports provided: emailValidator, matchingPasswords */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emailValidator", function() { return emailValidator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "matchingPasswords", function() { return matchingPasswords; });
function emailValidator(control) {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (control.value && !emailRegexp.test(control.value)) {
        return { invalidEmail: true };
    }
}
function matchingPasswords(passwordKey, passwordConfirmationKey) {
    return function (group) {
        var password = group.controls[passwordKey];
        var passwordConfirmation = group.controls[passwordConfirmationKey];
        if (password.value !== passwordConfirmation.value) {
            return passwordConfirmation.setErrors({ mismatchedPasswords: true });
        }
    };
}


/***/ }),

/***/ "./src/app/theme/utils/custom-overlay-container.ts":
/*!*********************************************************!*\
  !*** ./src/app/theme/utils/custom-overlay-container.ts ***!
  \*********************************************************/
/*! exports provided: CustomOverlayContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomOverlayContainer", function() { return CustomOverlayContainer; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/overlay */ "./node_modules/@angular/cdk/esm5/overlay.es5.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var CustomOverlayContainer = /** @class */ (function (_super) {
    __extends(CustomOverlayContainer, _super);
    function CustomOverlayContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomOverlayContainer.prototype._createContainer = function () {
        var container = document.createElement('div');
        container.classList.add('cdk-overlay-container');
        document.getElementById('app').appendChild(container);
        this._containerElement = container;
    };
    CustomOverlayContainer = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], CustomOverlayContainer);
    return CustomOverlayContainer;
}(_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__["OverlayContainer"]));



/***/ }),

/***/ "./src/app/window.service.ts":
/*!***********************************!*\
  !*** ./src/app/window.service.ts ***!
  \***********************************/
/*! exports provided: WindowService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WindowService", function() { return WindowService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var WindowService = /** @class */ (function () {
    function WindowService() {
    }
    Object.defineProperty(WindowService.prototype, "windowRef", {
        get: function () {
            return window;
        },
        enumerable: true,
        configurable: true
    });
    WindowService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], WindowService);
    return WindowService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyAmJXP-luQXB68lchXN2Wm9oe40MuxzHHI",
        authDomain: "celx-c64f9.firebaseapp.com",
        databaseURL: "https://celx-c64f9.firebaseio.com",
        projectId: "celx-c64f9",
        storageBucket: "celx-c64f9.appspot.com",
        messagingSenderId: "947615458866"
    }
};
//firebase.initializeApp();


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\Sofit\Angular 6\Cellx_web\celx-angular\src\main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map