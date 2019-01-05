import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
//import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { Offer_detailsComponent } from './offer_details.component';
// import io from 'socket.io-client';
//import { AccComponent } from './acc/acc.component';
// import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
const socket = io('http://celx-dev.herokuapp.com');

export const routes = [
  { path: '', component: Offer_detailsComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations:[
    Offer_detailsComponent
  ],
})

export class Offer_detailsModule { }
//export class Offer_detailsComponent { }
