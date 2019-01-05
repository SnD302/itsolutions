import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,ActivatedRoute } from '@angular/router';
//import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AccountsComponent } from './accounts.component';
//import { AccComponent } from './acc/acc.component';
// import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';

export const routes = [
  { path: '', component: AccountsComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ActivatedRoute,
    //ReactiveFormsModule,
    SharedModule
  //  NgbModalModule
  ],
  declarations: [
    AccountsComponent,
    //AccComponent,
    //MatBottomSheet
  ],
  entryComponents:[
    //MatBottomSheet
  ],
  //exports: [ AccComponent ]
  // providers: [
  //   FormBuilder
  // ]
})
export class AccountsModule { }
