import { Component, OnInit, ViewChild } from '@angular/core';
//import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { Data, AppService } from '../../app.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';


//import { AccComponent } from './acc/acc.component';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  @ViewChild('horizontalStepper') horizontalStepper: MatStepper;
  @ViewChild('verticalStepper') verticalStepper: MatStepper;

  title = 'JavaSampleApproach';
  description = 'Angular-Firebase Demo';

  itemValue = '';
  public mytitle:any[];
  public myprice:any[];
  public myadd:any[];
  public myaddoffers:any[];
  public myoffers:any[];
  public myfavourite:any[];
  public nooffers:any;
  public tick:any;
  public cross:any;
  public offerid:any[];
  public status:any[];
  public offers:any[];
  public sale:any[];
  public selectedid:any[];
  public sailstatus:any[];
  public acceptedsale:any[];
  public sellid:any[];
  public myaddaccepted:any[];
  public boost:string;
  public myad_id:any[];
  public myoffersstatus:any[];
  public prc:any[];
  public Edit :any;
  public hid:any;
  public offeridnew:any;
  //items: Observable<any[]>;


  constructor(public appService:AppService,public dialog: MatDialog,private bottomSheet: MatBottomSheet,public router:Router,public snackBar: MatSnackBar) {
  //  this.items = db.list('items').valueChanges();
  this.Edit = "Edit";
  this.hid=true;
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


  ngOnInit() {
    this.showadds();
    this.myaddsoffers();
    this.myaddsoffersaccepted();
    this.offersbyme();
    this.favouriteadds();
    this.tick=("accepted");
    this.cross=("rejected");
    this.adverthistory();
    console.log("in on in it");
    //this.accept_reject();

}
// public openBottomSheet(): void {
//   this.bottomSheet.open(AccComponent);
// }


  public showadds(){
    console.log("before service request");
    this.appService.myadds().subscribe(data=>{
    console.log("my adds", data);
    this.myadd=data['result'];
    this.myad_id=data['result']['_id'];
    this.mytitle=data['result']['title'];
    this.myprice=data['result']['price'];
  })
}
  public myaddsoffers(){
    var count = 0;
    this.appService.myaddsoffers().subscribe(data=>{
      var off=[];
      if(data['result'] ){
        console.log("offers on my =>", data);
        for(var k=0;k<data['result'].length;k++){

//            off[k]  = data['result'][k]['offers'];
if(data['result'][k]['offers'].length>0){
var stat = false;
for(var m=0;m<data['result'][k]['offers'].length;m++){
  console.log(data['result'][k]['offers'][m]['status'])
  if(data['result'][k]['offers'][m]['status']!='pending'){
    console.log(stat);
    stat = true;
  }else{
    console.log("else");
    if(m == data['result'][k]['offers'].length-1){
      if(stat){
        console.log("no")
      }else{
        console.log('yes')
        off[count] = data['result'][k];
        count = count+1;
      }
    }
  }

}
}
        }
        this.offerid=data['result']['offers'];
//        off =data['result']['offers'];
        console.log("ff",off);
        this.myaddoffers = off;

      }
    },err=>{
      this.nooffers= ("Did Not Receive any offers Yet!");
      console.log("No offers exist");
    });
  }

  public myaddsoffersaccepted(){
    var count = 0;
    this.appService.myaddsoffers().subscribe(data=>{
      var off=[];
      if(data['result'] ){
        console.log("offers on my =>", data);
        for(var k=0;k<data['result'].length;k++){

//            off[k]  = data['result'][k]['offers'];
if(data['result'][k]['offers'].length>0){
var stat = false;
for(var m=0;m<data['result'][k]['offers'].length;m++){
  //console.log(data['result'][k]['offers'][m]['status'])
  if(data['result'][k]['offers'][m]['status']!='accepted'){
    //console.log(stat);
    stat = true;
  }else{
    //console.log("else");
    if(m == data['result'][k]['offers'].length-1){
      if(stat){
        //console.log("no")
      }else{
        //console.log('yes')
        off[count] = data['result'][k];
        count = count+1;
      }
    }
  }

}
}
        }
        //this.offerid=data['result']['offers'];
//        off =data['result']['offers'];
        console.log("ff",off);
        this.myaddaccepted = off;
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
    },err=>{
      this.nooffers= ("Did Not Receive any offers Yet!");
      console.log("No offers exist");
    });
  }
  public offersbyme(){
    this.appService.offersbyme().subscribe(data=>{
      console.log("offers by self =>", data);
      this.myoffers=data['result'];
      this.myoffersstatus=data['result']['status'];
      this.sale=data['result']['sail_id'];
      console.log(this.sale);
      sessionStorage.setItem("onsale",JSON.stringify(this.sale));
    //   if(data['result']['status'] = 'accepted'){
    //   this.appService.getsale(data['result']['sail_id']).subscribe(data=>{
    //     console.log("in sale",data);
    //   })
    // }
    })
  }

  // public getsale(){
  //   this.appService.getsale().subscribe(data=>{
  //
  // }
  public favouriteadds(){
    this.appService.favouriteadds().subscribe(data=>{
      console.log("favourit adds =>", data);
  })
}

public accept_reject(tick,offerid){
  console.log(offerid)
  this.appService.accept(offerid,this.tick).subscribe(data=>{
    console.log("accept_reject adds =>", data);
    //this.myfavourite=data['result'];
})
}
public accept_reject1(offerid,cross){

  this.appService.reject(this.offerid,this.cross).subscribe(data=>{
    console.log("accept_reject adds =>", data);
    //this.myfavourite=data['result'];
})
}

public clickoff(){
  //this.appService.myaddsof = this.myaddoffers;
  //console.log("saved: ",this.appService.myaddsof);
  sessionStorage.setItem("saved",JSON.stringify(this.myaddoffers));
}

public afteraccepted(value){
this.sale= value;
console.log(this.sale);
sessionStorage.setItem("setsail", JSON.stringify(this.sale));
this.router.navigate(['/checkout']);
}

public afteracceptedsell(value){
  this.sellid=value;
  sessionStorage.setItem("sellersaleid", JSON.stringify(this.sellid));
  this.router.navigate(['/checkout']);
}

public adverthistory(){
  this.appService.adverthistory().subscribe(data=>{
    console.log("advertisement history", data);

  });
}

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

public slide_ad(value){
  console.log(value);

}

public updateoffer(id){
  this.offeridnew = id;
  if(this.hid == true){
      this.hid = false;
  }else{
  this.hid = true;
  }

  if(this.Edit == 'Edit'){
  this.Edit = "Submit";
}else{
    this.Edit = "Edit";
}

}

submitPrice(price){
  if(this.hid == true){
      this.hid = false;
  }else{
    console.log(this.offeridnew);
    console.log(price);
    this.appService.updateoffer(this.offeridnew,price).subscribe(data=>{
      console.log(data);
      this.offersbyme();
    })
  this.hid = true;
  }
}
}


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
