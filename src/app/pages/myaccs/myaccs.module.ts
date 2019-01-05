import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { MyaccsComponent } from './myaccs.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { InformationComponent } from './information/information.component';
// import { AddressesComponent } from './addresses/addresses.component';
// import { OrdersComponent } from './orders/orders.component';

export const routes = [
  { path: '', component: MyaccsComponent, pathMatch: 'full' }
];
// export const routes = [
//   {
//       path: '',
//       component: MyaccountComponent, children: [
//           { path: 'dashboard', component: DashboardComponent, data: {  breadcrumb: 'Dashboard' } },
//           { path: 'information', component: InformationComponent, data: {  breadcrumb: 'Information' } },
//           { path: 'addresses', component: AddressesComponent, data: {  breadcrumb: 'Addresses' } },
//           { path: 'orders', component: OrdersComponent, data: {  breadcrumb: 'Orders' } }
//       ]
//   }
// ];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    MyaccsComponent
  ]
})
export class MyaccsModule { }
