import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { SellComponent } from './sell/sell.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// export const routes = [
//   { path: '', component: SellComponent, pathMatch: 'full' }
// ];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule, FormsModule
  ],
  //declarations: [SellComponent]
})
export class SellModule { }
