(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app-pages-checkout-checkout-module"],{

/***/ "./src/app/pages/checkout/checkout.component.html":
/*!********************************************************!*\
  !*** ./src/app/pages/checkout/checkout.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar style=\"background-color:#FFFFFF\">\r\n  <mat-toolbar-row fxLayoutAlign=\"space-between center\" class=\"logo-toolbar theme-container\" style=\"background-color:#FFFFFF\">\r\n      <a class=\"logo\" routerLink=\"/\"  (click) =\"closeSubMenus()\">\r\n      <img src=\"assets/images/icons/logo.png\" height=80 style=\"margin-left:100%\"/>\r\n    </a>\r\n\r\n  </mat-toolbar-row>\r\n</mat-toolbar>\r\n\r\n\r\n  <div label=\"Billing address\" [hidden]=\"!billing\">\r\n    <form [formGroup]=\"billingForm\">\r\n      <div fxLayout=\"row wrap\">\r\n        <div fxFlex=\"100\" fxLayout=\"column\" fxLayoutAlign=\"start start\" class=\"p-1\">\r\n          <span class=\"text-muted\"> Billing Address</span>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n              <input matInput placeholder=\"First name\" formControlName=\"firstName\" required>\r\n              <!-- <mat-error *ngIf=\"billingForm.controls.firstName.errors?.required\">First name is required</mat-error> -->\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n              <input matInput placeholder=\"Last name\" formControlName=\"lastName\" required>\r\n              <!-- <mat-error *ngIf=\"billingForm.controls.lastName.errors?.required\">Last name is required</mat-error> -->\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n              <input matInput placeholder=\"Middle Name/Initial\" formControlName=\"middleName\">\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n              <input matInput placeholder=\"Company\" formControlName=\"company\">\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n              <input matInput placeholder=\"Email\" formControlName=\"email\" required>\r\n              <mat-error *ngIf=\"billingForm.controls.email.errors?.required\">Email is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n              <input type=\"number\" matInput placeholder=\"Phone\" formControlName=\"phone\" required>\r\n              <mat-error *ngIf=\"billingForm.controls.phone.errors?.required\">Phone is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"25\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n            <mat-select placeholder=\"Country\" formControlName=\"country\" required>\r\n              <mat-option *ngFor=\"let country of countries\" [value]=\"country.name\">\r\n                  {{country.name}}\r\n              </mat-option>\r\n            </mat-select>\r\n            <!-- <mat-error *ngIf=\"billingForm.controls.country.errors?.required\">Country is required</mat-error> -->\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"25\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n              <input matInput placeholder=\"City\" formControlName=\"city\" required>\r\n              <!-- <mat-error *ngIf=\"billingForm.controls.city.errors?.required\">City is required</mat-error> -->\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"25\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n              <input matInput placeholder=\"State/Province\" formControlName=\"state\">\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"25\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n              <input type=\"number\" matInput placeholder=\"Zip/Postal Code\" formControlName=\"zip\" required>\r\n              <!-- <mat-error *ngIf=\"billingForm.controls.zip.errors?.required\">Zip/Postal Code is required</mat-error> -->\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n              <input matInput placeholder=\"Address (street, apartment, suite, unit etc.)\" formControlName=\"address\" required>\r\n              <!-- <mat-error *ngIf=\"billingForm.controls.address.errors?.required\">Address is required</mat-error> -->\r\n          </mat-form-field>\r\n        </div>\r\n      </div>\r\n      <div fxLayout=\"row\" fxLayoutAlign=\"center center\" class=\"mt-2 p-1\">\r\n        <button mat-mini-fab color=\"primary\" style=\"background-color:white; border: 1px solid; border-color:#156dbf\" matTooltip=\"Next\" matTooltipPosition=\"after\" (click)=\"enteraddress()\"><mat-icon style=\"color:#156dbf; \">navigate_next</mat-icon></button>\r\n      </div>\r\n    </form>\r\n  </div>\r\n\r\n  <div label=\"Add Card\" [hidden]=\"!newcard\">\r\n    <form [formGroup]=\"addcardForm\">\r\n      <div fxLayout=\"row wrap\">\r\n        <div fxFlex=\"100\" fxLayout=\"column\" fxLayoutAlign=\"start start\" class=\"p-1\">\r\n          <span class=\"text-muted\">Add New Credit Card</span>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"50\" class=\"px-1\">\r\n\r\n          <mat-form-field class=\"w-100\">\r\n            <mat-select placeholder=\"Your Country\" formControlName=\"Country\" required>\r\n              <mat-option *ngFor=\"let country of countries\" [value]=\"country.name\">\r\n                  {{country.name}}\r\n              </mat-option>\r\n            </mat-select>\r\n              <mat-error *ngIf=\"addcardForm.controls.Country.errors?.required\">Card holder name is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"50\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n              <input type=\"number\" matInput placeholder=\"Card Number\" formControlName=\"cardNumber\" maxlength=\"16\" required>\r\n              <mat-error *ngIf=\"addcardForm.controls.cardNumber.hasError('minlength')\">Card Number isn't valid, minimum of 16 characters</mat-error>\r\n              <mat-error *ngIf=\"addcardForm.controls.cardNumber.errors?.required\">Card number is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"50\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n              <input matInput placeholder=\"address country\" formControlName=\"addresscountry\" required>\r\n              <mat-error *ngIf=\"addcardForm.controls.addresscountry.errors?.required\">Card holder name name is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"50\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n              <input matInput placeholder=\"address zip\" formControlName=\"addresszip\" required>\r\n              <mat-error *ngIf=\"addcardForm.controls.addresszip.errors?.required\">Card number is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n            <mat-select placeholder=\"Expiry month\" formControlName=\"ExpiryMonth\" required>\r\n              <mat-option *ngFor=\"let month of months\" [value]=\"month.value\">\r\n                  {{month.name}}\r\n              </mat-option>\r\n            </mat-select>\r\n            <mat-error *ngIf=\"addcardForm.controls.ExpiryMonth.errors?.required\">Expired month is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n            <mat-select placeholder=\"Expiry year\" formControlName=\"ExpiryYear\" required>\r\n              <mat-option *ngFor=\"let year of years\" [value]=\"year.value\">\r\n                  {{year.name}}\r\n              </mat-option>\r\n            </mat-select>\r\n            <mat-error *ngIf=\"addcardForm.controls.ExpiryYear.errors?.required\">Expired year is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n              <input type=\"number\" matInput placeholder=\"CSV\" formControlName=\"csv\" maxlength=\"3\" required>\r\n              <mat-error *ngIf=\"addcardForm.controls.csv.errors?.required\">CSV is required</mat-error>\r\n              <mat-error *ngIf=\"addcardForm.controls.csv.hasError('minlength')\">CSV isn't valid, minimum of 3 characters</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n      </div>\r\n      <div fxLayout=\"row\" fxLayoutAlign=\"center center\" class=\"mt-2 p-1\">\r\n        <button mat-mini-fab style=\"background-color:white; border: 1px solid; border-color:#156dbf\" matTooltip=\"Submit\" class=\"mr-1\" (click)=\"add_card(addcardForm.value)\"><mat-icon style=\"color:#156dbf\">payment</mat-icon></button>\r\n      </div>\r\n    </form>\r\n\r\n</div>\r\n\r\n  <div label=\"Payment method\" [hidden]=\"!payment\">\r\n\r\n    <form [formGroup]=\"paymentForm\">\r\n      <div fxLayout=\"row wrap\">\r\n\r\n        <div fxFlex=\"100\" fxLayout=\"column\" fxLayoutAlign=\"start start\" class=\"p-1\">\r\n          <div fxFlex=\"100\" fxLayout=\"column\" fxLayoutAlign=\"start start\">\r\n            <span class=\"text-muted\">Don't Have a Card ?</span>\r\n            <button class=\"add_card_but\" mat-raised-button style=\"background-color:white; color:#156dbf; border: 1px solid; border-color:#156dbf\" (click)=\"showcard()\">Add Card</button>\r\n          </div>\r\n\r\n          <!-- <div fxLayout=\"row\" fxLayoutAlign=\"center center\" class=\"mt-2 p-1\">\r\n          </div> -->\r\n          <span class=\"text-muted\">Credit Card</span>\r\n          <mat-form-field class=\"w-100\">\r\n            <mat-select placeholder=\"Select Card\" formControlName=\"Card\" required>\r\n              <mat-option *ngFor=\"let card of cards\"  [value]=\"card.id\">\r\n                <img [src]=\"card.image\" class=\"images\">\r\n                        {{card.brand}}\r\n              </mat-option>\r\n            </mat-select>\r\n            <mat-error *ngIf=\"paymentForm.controls.Card.errors?.required\">Card required</mat-error>\r\n          </mat-form-field>\r\n          <!-- <img src=\"assets/images/others/card-icon.png\" alt=\"\"> -->\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"50\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n              <input type=\"number\" matInput placeholder=\"Amount\" formControlName=\"Amount\" required>\r\n              <mat-error *ngIf=\"paymentForm.controls.Amount.errors?.required\">Amount required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n            <mat-select placeholder=\"Expired month\" formControlName=\"expiredMonth\" required>\r\n              <mat-option *ngFor=\"let month of months\" [value]=\"month.value\">\r\n                  {{month.name}}\r\n              </mat-option>\r\n            </mat-select>\r\n            <mat-error *ngIf=\"paymentForm.controls.expiredMonth.errors?.required\">Expired month is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n            <mat-select placeholder=\"Expired year\" formControlName=\"expiredYear\" required>\r\n              <mat-option *ngFor=\"let year of years\" [value]=\"year.name\">\r\n                  {{year.name}}\r\n              </mat-option>\r\n            </mat-select>\r\n            <mat-error *ngIf=\"paymentForm.controls.expiredYear.errors?.required\">Expired year is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n              <input matInput placeholder=\"Currency\" formControlName=\"currency\" required>\r\n              <mat-error *ngIf=\"paymentForm.controls.currency.errors?.required\">Currency is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n      </div>\r\n      <div fxLayout=\"row\" fxLayoutAlign=\"center center\" class=\"mt-2 p-1\">\r\n        <!-- <button mat-mini-fab matStepperPrevious color=\"primary\" matTooltip=\"Back\" matTooltipPosition=\"before\" class=\"mr-1\"><mat-icon>expand_less</mat-icon></button> -->\r\n        <button mat-mini-fab style=\"background-color:white; border: 1px solid; border-color:#156dbf\" matTooltip=\"Next\" matTooltipPosition=\"after\" (click)=\"makepayment(paymentForm.value)\"><mat-icon style=\"color:#156dbf\">navigate_next</mat-icon></button>\r\n      </div>\r\n    </form>\r\n\r\n  </div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n  <div label=\"Delivery method\" [hidden]=\"!deliver\">\r\n    <form [formGroup]=\"deliveryForm\" class=\"p-2\">\r\n      <div fxLayout=\"row wrap\">\r\n        <div fxFlex=\"100\" fxLayout=\"column\" fxLayoutAlign=\"start start\" class=\"p-1\">\r\n          <span class=\"text-muted\"> Delivery Method</span>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"50\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n              <input matInput placeholder=\"By Name of\" formControlName=\"senderName\" required>\r\n              <mat-error *ngIf=\"deliveryForm.controls.senderName.errors?.required\">Sender name is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"50\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n              <input matInput placeholder=\"Courier Service Name\" formControlName=\"courier\" required>\r\n              <mat-error *ngIf=\"deliveryForm.controls.courier.errors?.required\">Courier service name is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n              <input matInput placeholder=\"Tracking Id\" formControlName=\"track\" required>\r\n              <mat-error *ngIf=\"deliveryForm.controls.track.errors?.required\">Tracking ID is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n      </div>\r\n      <div fxLayout=\"row\" fxLayoutAlign=\"center center\" class=\"mt-2 p-1\">\r\n        <button mat-mini-fab style=\"background-color:white; border: 1px solid; border-color:#156dbf\" matTooltip=\"Next\" matTooltipPosition=\"after\" (click)=\"entercourier()\"><mat-icon style=\"color:#156dbf\">navigate_next</mat-icon></button>\r\n      </div>\r\n      <!-- <mat-radio-group formControlName=\"deliveryMethod\" fxLayout=\"column\" fxLayoutAlign=\"center\" required name=\"methods\">\r\n        <mat-radio-button *ngFor=\"let method of deliveryMethods\" color=\"primary\" [value]=\"method\" class=\"mt-1\"><b>{{method.name}}</b> {{method.desc}}</mat-radio-button>\r\n      </mat-radio-group>\r\n      <div fxLayout=\"row\" fxLayoutAlign=\"center center\" class=\"mt-2 p-1\">\r\n        <button mat-mini-fab matStepperPrevious color=\"primary\" matTooltip=\"Back\" matTooltipPosition=\"before\" class=\"mr-1\"><mat-icon>expand_less</mat-icon></button>\r\n        <button mat-mini-fab matStepperNext color=\"primary\" matTooltip=\"Next\" matTooltipPosition=\"after\"><mat-icon>expand_more</mat-icon></button>\r\n      </div> -->\r\n    </form>\r\n  </div>\r\n  <!-- <mat-step [stepControl]=\"paymentForm\" label=\"Payment method\">\r\n    <form [formGroup]=\"paymentForm\">\r\n      <div fxLayout=\"row wrap\">\r\n        <div fxFlex=\"100\" fxLayout=\"column\" fxLayoutAlign=\"start start\" class=\"p-1\">\r\n          <span class=\"text-muted\">Credit Card</span>\r\n          <img src=\"assets/images/others/card-icon.png\" alt=\"\">\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"50\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n              <input matInput placeholder=\"Card holder name\" formControlName=\"cardHolderName\" required>\r\n              <mat-error *ngIf=\"paymentForm.controls.cardHolderName.errors?.required\">Card holder name name is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"50\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n              <input matInput placeholder=\"Card number\" formControlName=\"cardNumber\" required>\r\n              <mat-error *ngIf=\"paymentForm.controls.cardNumber.errors?.required\">Card number is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n            <mat-select placeholder=\"Expired month\" formControlName=\"expiredMonth\" required>\r\n              <mat-option *ngFor=\"let month of months\" [value]=\"month.value\">\r\n                  {{month.name}}\r\n              </mat-option>\r\n            </mat-select>\r\n            <mat-error *ngIf=\"paymentForm.controls.expiredMonth.errors?.required\">Expired month is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n            <mat-select placeholder=\"Expired year\" formControlName=\"expiredYear\" required>\r\n              <mat-option *ngFor=\"let year of years\" [value]=\"year\">\r\n                  {{year}}\r\n              </mat-option>\r\n            </mat-select>\r\n            <mat-error *ngIf=\"paymentForm.controls.expiredYear.errors?.required\">Expired year is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n              <input matInput placeholder=\"CVV\" formControlName=\"cvv\" required>\r\n              <mat-error *ngIf=\"paymentForm.controls.cvv.errors?.required\">CVV is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n      </div>\r\n      <div fxLayout=\"row\" fxLayoutAlign=\"center center\" class=\"mt-2 p-1\">\r\n        <button mat-mini-fab matStepperPrevious color=\"primary\" matTooltip=\"Back\" matTooltipPosition=\"before\" class=\"mr-1\"><mat-icon>navigate_before</mat-icon></button>\r\n        <button mat-mini-fab matStepperNext color=\"primary\" matTooltip=\"Next\" matTooltipPosition=\"after\"><mat-icon>navigate_next</mat-icon></button>\r\n      </div>\r\n    </form>\r\n  </mat-step> -->\r\n\r\n\r\n\r\n\r\n  <div label=\"Confirmation\" [hidden]=\"!confirm\">\r\n    <div fxLayout=\"column\" fxLayoutAlign=\"center center\" class=\"p-2 text-center\">\r\n      <button mat-fab style=\"background-color:#156dbf; \" (click)=\"confirmdelivery()\"><mat-icon style=\"color:white\">check</mat-icon></button>\r\n      <h2 class=\"py-2\">Check! If your order has been processed</h2>\r\n      <p class=\"text-muted\">Thank You for shopping with Celx</p>\r\n    </div>\r\n    <div fxLayout=\"row\" fxLayoutAlign=\"center center\" class=\"mt-2 p-1\">\r\n      <a [routerLink]=\"['/']\" mat-raised-button style=\"background-color:white; color:#156dbf; border: 1px solid; border-color:#156dbf\">Return to Shop</a>\r\n    </div>\r\n\r\n  </div>\r\n\r\n  <div label=\"For Buyer\" [hidden]=\"!buyer\">\r\n    <div fxLayout=\"column\" fxLayoutAlign=\"center center\" class=\"p-2 text-center\">\r\n      <h2 class=\"py-2\">Waiting For Courier Departure</h2>\r\n      <!-- <p class=\"text-muted\">Thank You for shopping with Celx</p> -->\r\n    </div>\r\n    <div fxLayout=\"row\" fxLayoutAlign=\"center center\" class=\"mt-2 p-1\">\r\n      <a [routerLink]=\"['/']\" mat-raised-button style=\"background-color:white; color:#156dbf; border: 1px solid; border-color:#156dbf\">Return to Shop</a>\r\n    </div>\r\n\r\n  </div>\r\n\r\n  <div label=\"For Seller\" [hidden]=\"!seller\">\r\n    <div fxLayout=\"column\" fxLayoutAlign=\"center center\" class=\"p-2 text-center\">\r\n      <h2 class=\"py-2\">Waiting For Address or Payment</h2>\r\n      <!-- <p class=\"text-muted\">Thank You for shopping with Celx</p> -->\r\n    </div>\r\n    <div fxLayout=\"row\" fxLayoutAlign=\"center center\" class=\"mt-2 p-1\">\r\n      <a [routerLink]=\"['/']\" mat-raised-button style=\"background-color:white; color:#156dbf; border: 1px solid; border-color:#156dbf\">Return to Shop</a>\r\n    </div>\r\n\r\n  </div>\r\n  <div label=\"For Seller\" [hidden]=\"!receive\">\r\n    <div fxLayout=\"column\" fxLayoutAlign=\"center center\" class=\"p-2 text-center\">\r\n      <h2 class=\"py-2\">Courier successfully delivered.</h2>\r\n      <!-- <p class=\"text-muted\">Thank You for shopping with Celx</p> -->\r\n    </div>\r\n    <div fxLayout=\"row\" fxLayoutAlign=\"center center\" class=\"mt-2 p-1\">\r\n      <a [routerLink]=\"['/']\" mat-raised-button style=\"background-color:white; color:#156dbf; border: 1px solid; border-color:#156dbf\">Return to Shop</a>\r\n    </div>\r\n\r\n  </div>\r\n\r\n\r\n\r\n\r\n<!-- <mat-vertical-stepper #verticalStepper linear=\"true\" class=\"mat-elevation-z2\" fxHide=\"false\" fxHide.gt-sm>\r\n  <mat-step [stepControl]=\"billingForm\" label=\"Billing address\">\r\n    <form [formGroup]=\"billingForm\">\r\n      <div fxLayout=\"row wrap\">\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n              <input matInput placeholder=\"First name\" formControlName=\"firstName\" required>\r\n              <mat-error *ngIf=\"billingForm.controls.firstName.errors?.required\">First name is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n              <input matInput placeholder=\"Last name\" formControlName=\"lastName\" required>\r\n              <mat-error *ngIf=\"billingForm.controls.lastName.errors?.required\">Last name is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n              <input matInput placeholder=\"Middle Name/Initial\" formControlName=\"middleName\">\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n              <input matInput placeholder=\"Company\" formControlName=\"company\">\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n              <input matInput placeholder=\"Email\" formControlName=\"email\" required>\r\n              <mat-error *ngIf=\"billingForm.controls.email.errors?.required\">Email is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"33.3\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n              <input matInput placeholder=\"Phone\" formControlName=\"phone\" required>\r\n              <mat-error *ngIf=\"billingForm.controls.phone.errors?.required\">Phone is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"25\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n            <mat-select placeholder=\"Country\" formControlName=\"country\" required>\r\n              <mat-option *ngFor=\"let country of countries\" [value]=\"country\">\r\n                  {{country.name}}\r\n              </mat-option>\r\n            </mat-select>\r\n            <mat-error *ngIf=\"billingForm.controls.country.errors?.required\">Country is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"25\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n              <input matInput placeholder=\"City\" formControlName=\"city\" required>\r\n              <mat-error *ngIf=\"billingForm.controls.city.errors?.required\">City is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"25\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n              <input matInput placeholder=\"State/Province\" formControlName=\"state\">\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" fxFlex.gt-sm=\"25\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n              <input matInput placeholder=\"Zip/Postal Code\" formControlName=\"zip\" required>\r\n              <mat-error *ngIf=\"billingForm.controls.zip.errors?.required\">Zip/Postal Code is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxFlex=\"100\" class=\"px-1\">\r\n          <mat-form-field class=\"w-100\">\r\n              <input matInput placeholder=\"Address (street, apartment, suite, unit etc.)\" formControlName=\"address\" required>\r\n              <mat-error *ngIf=\"billingForm.controls.address.errors?.required\">Address is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n      </div>\r\n      <div fxLayout=\"row\" fxLayoutAlign=\"center center\" class=\"mt-2 p-1\">\r\n        <button mat-mini-fab matStepperNext color=\"primary\" matTooltip=\"Next\" matTooltipPosition=\"after\"><mat-icon>expand_more</mat-icon></button>\r\n      </div>\r\n    </form>\r\n  </mat-step>\r\n\r\n\r\n  <mat-step label=\"Review Order\">\r\n\r\n  </mat-step>\r\n\r\n\r\n\r\n\r\n  <mat-step label=\"Confirmation\">\r\n    <div fxLayout=\"column\" fxLayoutAlign=\"center center\" class=\"p-2 text-center\">\r\n      <button mat-fab color=\"primary\" click=\"confirm()\"><mat-icon>check</mat-icon></button>\r\n      <h2 class=\"py-2\">Check! If Your processed</h2>\r\n      <p class=\"text-muted lh\">Thank You For Shopping With Us.</p>\r\n    </div>\r\n    <div fxLayout=\"row\" fxLayoutAlign=\"center center\" class=\"mt-2 p-1\">\r\n      <a [routerLink]=\"['/']\" mat-raised-button color=\"primary\">Return to Shop</a>\r\n    </div>\r\n  </mat-step>\r\n\r\n\r\n</mat-vertical-stepper> -->\r\n"

/***/ }),

/***/ "./src/app/pages/checkout/checkout.component.scss":
/*!********************************************************!*\
  !*** ./src/app/pages/checkout/checkout.component.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".review-order-table.mat-table {\n  display: block;\n  overflow-x: auto; }\n  .review-order-table.mat-table .mat-row, .review-order-table.mat-table .mat-header-row {\n    display: flex;\n    border-bottom-width: 1px;\n    border-bottom-style: solid;\n    align-items: center;\n    min-height: 48px;\n    padding: 0 24px;\n    min-width: 760px; }\n  .review-order-table.mat-table .mat-row {\n    min-height: 60px; }\n  .review-order-table.mat-table .mat-cell, .review-order-table.mat-table .mat-header-cell {\n    flex: 1;\n    overflow: hidden;\n    word-wrap: break-word; }\n  .review-order-table.mat-table .mat-header-cell {\n    font-size: 14px; }\n  .review-order-table.mat-table .mat-cell img {\n    width: 60px; }\n  .add_card_but {\n  float: right;\n  margin-top: 10%;\n  margin-bottom: 10%; }\n"

/***/ }),

/***/ "./src/app/pages/checkout/checkout.component.ts":
/*!******************************************************!*\
  !*** ./src/app/pages/checkout/checkout.component.ts ***!
  \******************************************************/
/*! exports provided: CheckoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckoutComponent", function() { return CheckoutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../app.service */ "./src/app/app.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CheckoutComponent = /** @class */ (function () {
    function CheckoutComponent(appService, formBuilder, snackBar) {
        this.appService = appService;
        this.formBuilder = formBuilder;
        this.snackBar = snackBar;
        this.countries = [];
        this.months = [];
        this.years = [];
        this.deliveryMethods = [];
        this.grandTotal = 0;
        this.billing = false;
        this.newcard = false;
        this.payment = false;
        this.deliver = false;
        this.confirm = false;
        this.buyer = false;
        this.seller = false;
        this.receive = false;
    }
    CheckoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        //this.add_card();
        this.retreiveCustomerCards();
        this.appService.Data.cartList.forEach(function (product) {
            _this.grandTotal += product.newPrice;
        });
        this.countries = this.appService.getCountries();
        this.months = this.appService.getMonths();
        this.years = this.appService.getYears();
        this.deliveryMethods = this.appService.getDeliveryMethods();
        this.billingForm = this.formBuilder.group({
            firstName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            lastName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            middleName: '',
            company: '',
            email: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            phone: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            country: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            city: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            state: '',
            zip: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            address: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
        this.addcardForm = this.formBuilder.group({
            Country: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            cardNumber: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(16)])],
            addresscountry: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            addresszip: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            ExpiryMonth: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            ExpiryYear: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            csv: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(3)])]
        });
        this.deliveryForm = this.formBuilder.group({
            // deliveryMethod: [this.deliveryMethods[0], Validators.required],
            senderName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            courier: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            track: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
        });
        this.paymentForm = this.formBuilder.group({
            Amount: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            // adv_id: ['', Validators.required],
            Card: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            expiredMonth: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            expiredYear: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            currency: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
        this.saleid = JSON.parse(sessionStorage.getItem("setsail")); //buyer
        this.sellersaleid = JSON.parse(sessionStorage.getItem("saleIdseller")); // seller
        this.sale();
        this.getsaleseller();
        this.retreiveCustomerCards();
        // console.log(this.advert_id);
    };
    CheckoutComponent.prototype.ngOnDestroy = function () {
        sessionStorage.removeItem('setsail');
        sessionStorage.removeItem('saleIdseller');
    };
    CheckoutComponent.prototype.placeOrder = function () {
        this.horizontalStepper._steps.forEach(function (step) { return step.editable = false; });
        this.verticalStepper._steps.forEach(function (step) { return step.editable = false; });
        this.appService.Data.cartList.length = 0;
    };
    CheckoutComponent.prototype.showcard = function () {
        this.newcard = true;
        this.payment = false;
    };
    // public add_card(){
    //   this.appService.add_card().subscribe(data=>{
    //     console.log("add cards=>", data);
    //     //this.myfavourite=data['result'];
    // })
    // }
    // public retreiveCustomerCards(){
    //   this.appService.retreiveCustomerCards().subscribe(data=>{
    //     console.log("existing cards=>", data);
    //     //this.myfavourite=data['result'];
    // })
    // }
    CheckoutComponent.prototype.sale = function () {
        var _this = this;
        var adv = [];
        // var adv._id=[];
        // this.sellersaleid=[];
        this.appService.getsale(this.saleid).subscribe(function (data) {
            _this.sailstatus = data['sail'];
            _this.status = data['sail']['status'];
            adv = data['sail'];
            //  console.log(data.length);
            //  for (var i=0; i<data.length; i++){
            _this.adverts = data['sail']['advert_id']['_id'];
            //  }
            if (data['sail']['status'] === "address pending") {
                console.log("address pending");
                _this.billing = true;
            }
            else if (data['sail']['status'] === "payment pending") {
                console.log("payment pending");
                _this.payment = true;
            }
            else if (data['sail']['status'] === "departer pending") {
                _this.buyer = true;
            }
            else if (data['sail']['status'] === "departed") {
                _this.confirm = true;
            }
            else if (data['sail']['status'] === "received") {
                _this.receive = true;
            }
            console.log(_this.adverts);
            console.log(_this.sailstatus);
            console.log("in sale", data);
        });
    };
    CheckoutComponent.prototype.getsaleseller = function () {
        var _this = this;
        // this.saleid=[];
        this.appService.getsaleseller(this.sellersaleid).subscribe(function (data) {
            console.log("seller sale", data);
            if (data['sail']['status'] === "address pending") {
                console.log("address pending");
                _this.seller = true;
            }
            else if (data['sail']['status'] === "payment pending") {
                console.log("payment pending");
                _this.seller = true;
            }
            else if (data['sail']['status'] === "departer pending") {
                _this.deliver = true;
            }
            else if (data['sail']['status'] === "received") {
                _this.receive = true;
            }
        });
    };
    CheckoutComponent.prototype.enteraddress = function () {
        var _this = this;
        console.log(this.billingForm.value.address);
        if (this.billingForm.valid) {
            this.appService.enteraddress(this.saleid, this.billingForm.value.address).subscribe(function (data) {
                console.log(data);
                if (data['sail']) {
                    _this.snackBar.open('Address added successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
                    _this.billing = false;
                    _this.payment = true;
                }
            }, function (err) {
                _this.snackBar.open('Invalid Cardentials!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            });
        }
    };
    CheckoutComponent.prototype.add_card = function (values) {
        var _this = this;
        if (this.addcardForm.valid) {
            this.appService.add_card(this.addcardForm.value.ExpiryMonth, this.addcardForm.value.ExpiryYear, this.addcardForm.value.Country, this.addcardForm.value.addresscountry, this.addcardForm.value.addresszip, this.addcardForm.value.cardNumber, this.addcardForm.value.csv).subscribe(function (data) {
                console.log("Data => ", data);
                if (data['Card']) {
                    _this.snackBar.open('Card created successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
                    _this.newcard = false;
                    _this.payment = true;
                    _this.makepayment(values);
                }
            }, function (err) {
                _this.snackBar.open('Invalid Cardentials!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            });
        }
    };
    CheckoutComponent.prototype.retreiveCustomerCards = function () {
        var _this = this;
        this.appService.retreiveCustomerCards().subscribe(function (data) {
            console.log("User Card ", data);
            _this.cards = data['result'];
            console.log(_this.cards);
        });
    };
    CheckoutComponent.prototype.makepayment = function (values) {
        var _this = this;
        this.curr_lowercase = this.paymentForm.value.currency.toLowerCase();
        console.log(this.adverts, this.paymentForm.value.Amount, this.curr_lowercase, this.paymentForm.value.Card);
        if (this.paymentForm.valid) {
            this.appService.makePaymentWithCard(this.adverts, this.paymentForm.value.Amount, this.curr_lowercase, this.paymentForm.value.Card).subscribe(function (data) {
                console.log(data);
                _this.final = data['final'];
                if (data['final']) {
                    _this.snackBar.open('Payment made!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
                    _this.payment = false;
                    _this.buyer = true;
                }
            }, function (err) {
                _this.snackBar.open('Invalid Cardentials!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            });
        }
    };
    CheckoutComponent.prototype.entercourier = function (values) {
        var _this = this;
        if (this.deliveryForm.valid) {
            this.appService.addcourierinfo(this.sellersaleid, this.deliveryForm.value.courier, this.deliveryForm.value.track).subscribe(function (data) {
                console.log(data);
                _this.departsail = data['sail'];
                if (data['sail']) {
                    _this.snackBar.open('Courier details sent!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
                    _this.deliver = false;
                }
            }, function (err) {
                _this.snackBar.open('Invalid Cardentials!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            });
        }
    };
    CheckoutComponent.prototype.confirmdelivery = function () {
        this.confirmstatus = "received";
        this.appService.confirmdelivery(this.saleid, this.confirmstatus).subscribe(function (data) {
            console.log(data);
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('horizontalStepper'),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatStepper"])
    ], CheckoutComponent.prototype, "horizontalStepper", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('verticalStepper'),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatStepper"])
    ], CheckoutComponent.prototype, "verticalStepper", void 0);
    CheckoutComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-checkout',
            template: __webpack_require__(/*! ./checkout.component.html */ "./src/app/pages/checkout/checkout.component.html"),
            styles: [__webpack_require__(/*! ./checkout.component.scss */ "./src/app/pages/checkout/checkout.component.scss")]
        }),
        __metadata("design:paramtypes", [_app_service__WEBPACK_IMPORTED_MODULE_3__["AppService"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSnackBar"]])
    ], CheckoutComponent);
    return CheckoutComponent;
}());



/***/ }),

/***/ "./src/app/pages/checkout/checkout.module.ts":
/*!***************************************************!*\
  !*** ./src/app/pages/checkout/checkout.module.ts ***!
  \***************************************************/
/*! exports provided: routes, CheckoutModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckoutModule", function() { return CheckoutModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _checkout_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./checkout.component */ "./src/app/pages/checkout/checkout.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var routes = [
    { path: '', component: _checkout_component__WEBPACK_IMPORTED_MODULE_5__["CheckoutComponent"], pathMatch: 'full' }
];
var CheckoutModule = /** @class */ (function () {
    function CheckoutModule() {
    }
    CheckoutModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"]
            ],
            declarations: [
                _checkout_component__WEBPACK_IMPORTED_MODULE_5__["CheckoutComponent"]
            ]
        })
    ], CheckoutModule);
    return CheckoutModule;
}());



/***/ })

}]);
//# sourceMappingURL=app-pages-checkout-checkout-module.js.map