import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AgmCoreModule,GoogleMapsAPIWrapper } from '@agm/core';
// import { FileSelectDirective } from 'ng2-file-upload';
//import { AngularFileUploaderModule } from "angular-file-uploader";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { WindowService } from './window.service';
import * as firebase from "firebase";
import { RecaptchaModule } from 'ng-recaptcha';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';

import { environment } from '../environments/environment';

import { OverlayContainer } from '@angular/cdk/overlay';
import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PostComponent } from './post/post.component';
import { Sell1Component } from './pages/sell1/sell1.component';
import { SigComponent } from './pages/sig/sig.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { Offer_detailsComponent } from './pages/offer_details/offer_details.component';
import { MyaccsComponent } from './pages/myaccs/myaccs.component';
import { ProductMapComponent } from './pages/products/product-map.component';


//import { AccComponent } from './pages/accounts/acc/acc.component';

import { SellComponent } from './pages/sell/sell/sell.component';
import { TopMenuComponent } from './theme/components/top-menu/top-menu.component';
import { MenuComponent } from './theme/components/menu/menu.component';
import { SidenavMenuComponent } from './theme/components/sidenav-menu/sidenav-menu.component';
import { BreadcrumbComponent } from './theme/components/breadcrumb/breadcrumb.component';

import { AppSettings } from './app.settings';
import { AppService } from './app.service';
import { AppInterceptor } from './theme/utils/app-interceptor';
import { OptionsComponent } from './theme/components/options/options.component';
import { FooterComponent } from './theme/components/footer/footer.component';
import { MapComponent } from './map/map.component';

export const firebaseConfig = {
    apiKey: "AIzaSyAmJXP-luQXB68lchXN2Wm9oe40MuxzHHI",
    authDomain: "celx-c64f9.firebaseapp.com",
    databaseURL: "https://celx-c64f9.firebaseio.com",
    projectId: "celx-c64f9",
    storageBucket: "celx-c64f9.appspot.com",
    messagingSenderId: "947615458866"
};
firebase.initializeApp(firebaseConfig)

@NgModule({
   imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RecaptchaModule.forRoot(),
    //RecaptchaFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    // AngularFireDatabaseModule, // for database
    NgxSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAmJXP-luQXB68lchXN2Wm9oe40MuxzHHI'
    }),
    SharedModule,
    routing
  ],
  declarations: [
    AppComponent,
    // FileSelectDirective,
    PagesComponent,
    NotFoundComponent,
    SellComponent,
    SigComponent,
    MyaccsComponent,
    PostComponent,
    Sell1Component,
    AccountsComponent,
    Offer_detailsComponent,
    TopMenuComponent,
    MenuComponent,
    SidenavMenuComponent,
    BreadcrumbComponent,
    OptionsComponent,
    FooterComponent,
    MapComponent,
    ProductMapComponent
  ],
  entryComponents:[
    ProductMapComponent,
  ],
  providers: [
    AppSettings,
    ProductMapComponent,
    MatBottomSheet,
    GoogleMapsAPIWrapper,
    AppService,
    { provide: OverlayContainer, useClass: CustomOverlayContainer },
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
