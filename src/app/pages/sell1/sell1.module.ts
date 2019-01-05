import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
//import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { Sell1Component } from './sell1.component';

export const routes = [
  { path: '', component: Sell1Component, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    //ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    Sell1Component
  ]
  // providers: [
  //   FormBuilder
  // ]
})
export class Sell1Module { }
