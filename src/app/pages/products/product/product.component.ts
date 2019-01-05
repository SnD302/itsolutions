import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { SwiperConfigInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import { Data, AppService } from '../../../app.service';
import { Product } from "../../../app.models";
import { emailValidator } from '../../../theme/utils/app-validators';
import { ProductZoomComponent } from './product-zoom/product-zoom.component';
import { MatSnackBar } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @ViewChild('zoomViewer') zoomViewer;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;
  public config: SwiperConfigInterface={};
  public product: Product;
  public image: any;
  public zoomImage: any;
  private sub: any;
  public physicalIssues: any;
  public contact : any;
  public form: FormGroup;
  public condition:any;
  public createdAt :any;
  public accessories : any;
  public deviceName : any;
  public alert_types :any
  public announced :any
  public battery_c :any
  public bluetooth :any
  public card_slot :any
  public dimensions :any
  public edge :any
  public gps :any
  public name:any;
  public profilePic:any;
  public conditionTitle:any;
  public games :any
  public java :any
  public messaging :any
  public loudspeaker_ :any
  public phonebook :any
  public radio :any
  public sim :any
  public stand_by :any
  public status :any
  public talk_time :any
  public technology :any
  public type :any
  public wlan :any
  public advertid:any;
  public add:boolean;
  public remove:boolean;
  public price:any;
  public offers:any;
  // public condition:any;
  public mycurrency:any;
  public relatedProducts: Array<Product>;
  public myid:any;
  public aduserid:any;
  public isFavourite:any;
  public created:any;
  public month:any;
  public day:any;
  public year:any;
  public full:any;
  public brandName:any;
  public profilePicture:any;
  public main:any;
  public top:any;
  public frm:any;
  public report_type:any;
  public age:any;
  public offersuserid:any;
  public boostmyad:any;
  public boosted:any;
  public boosttrue:any;
  public boostfalse:any;
  public deviceDetailscheck:any;

  constructor(public router:Router,public appService:AppService, private activatedRoute: ActivatedRoute, public dialog: MatDialog, public formBuilder: FormBuilder,public snackBar: MatSnackBar) {
  this.main=false;
  this.top=true;
  this.frm=true;
 }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.getProductById(params['id']);
      this.isFavourite=params['name'];
  //    console.log(this.isFavourite);
      console.log("***********",this.isFavourite);
    });
    this.form = this.formBuilder.group({
      'review': [null, Validators.required],
      'name': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': [null, Validators.compose([Validators.required, emailValidator])]
    });
    //this.getRelatedProducts();
    this.mycurrency= localStorage.getItem('currency');
    this.myid=localStorage.getItem('userid');
    // this.isFavourite=localStorage.getItem('favourite');
    // console.log(this.isFavourite);


  }

  ngAfterViewInit(){
    this.config = {
      observer: false,
      slidesPerView: 4,
      spaceBetween: 10,
      keyboard: true,
      navigation: true,
      pagination: false,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 2
        },
        600: {
          slidesPerView: 3,
        }
      }
    }
  }

  public getProductById(id){
    console.log("ID : ",id);
    this.appService.getProductById(id).subscribe(data=>{
      console.log(data);
    //   for(var i=0;i<data['result'].length;i++){
    //   data['result'][i]['price'] = parseFloat(data['result'][i]['price']).toFixed(2);
    // }
      if(data['result']){




    data['result']['offers'].forEach(function(j,jdy,y){
      if(j.user_id == localStorage.getItem('userid')){
        data['result']['offered'] = true;
        console.log("True");
        if(jdy == y.length-1){
          console.log("Changed Data = ",data['result']);

        }
      }else{
          console.log("Not True");

        if(jdy == y.length-1){
          console.log("Changed Data = ",data['result']);
        }
      }
    })






      this.price =parseFloat(data['result']['price']).toFixed(2);
      this.aduserid=data['result']['user_id']['_id'];
      console.log(this.aduserid);
      this.advertid=data['result']['_id'];
      this.boosted=data['result']['boosted'];
      this.age=data['result']['age'];
      this.product = data['result'];
      if(data['result']['deviceDetails']){
      var deviceDetails = data['result']['deviceDetails'];
      this.deviceDetailscheck = data['result']['deviceDetails'];
      this.alert_types = deviceDetails['alert_types'];
      this.announced = deviceDetails['announced'];
      this.battery_c = deviceDetails['battery_c'];
      this.bluetooth = deviceDetails['bluetooth'];
      this.card_slot = deviceDetails['card_slot'];
      this.dimensions = deviceDetails['dimensions'];
      this.edge = deviceDetails['edge'];
      this.gps = deviceDetails['gps'];
      this.games = deviceDetails['games'];
      this.java = deviceDetails['java'];
      this.messaging = deviceDetails['messaging'];
      this.loudspeaker_ = deviceDetails['loudspeaker_'];
      this.phonebook = deviceDetails['phonebook'];
      this.radio = deviceDetails['radio'];
      this.sim = deviceDetails['sim'];
      this.stand_by = deviceDetails['stand_by'];
      this.status = deviceDetails['status'];
      this.talk_time = deviceDetails['talk_time'];
      this.technology = deviceDetails['technology'];
      this.type = deviceDetails['type'];
      this.wlan = deviceDetails['wlan'];
      this.deviceName = data['result']['deviceDetails']['DeviceName'];

    }
    if(data['result']['condition']){
      this.condition = data['result']['condition']['title'];
      this.condition = data['result']['condition']['condition'];
      this.conditionTitle = data['result']['condition']['title'];
    }
    if(data['result']['physicalIssues']){
      this.physicalIssues = data['result']['physicalIssues'];
    }
    if(data['result']['accessories']){
      this.accessories = data['result']['accessories'];
    }
    if(data['result']['offered']){
      this.offers= data['result']['offered'];
   }
      this.createdAt = new Date(data['result']['createdAt']);
      this.month =this.createdAt.getMonth();
      this.day =this.createdAt.getDate();
      this.year =this.createdAt.getFullYear();
      this.full = this.month + '/' + this.day + '/' + this.year;
      // console.log(this.createdAt);

      this.contact = data['result']['user_id']['mobile'];
      this.image = data['result']['pictures'][0];
     this.brandName = data['result']['brandName'];
      this.name = data['result']['user_id']['name'];
      this.profilePicture= data['result']['user_id']['profilePicture'];
      this.profilePic = data['result']['user_id']['profilePicUrl'];
      this.zoomImage = data['result']['pictures'][0];

      if(this.type.length>30){
            this.type = this.type.substring(0,30)+"...";
      }
      if(this.messaging.length>30){
            this.messaging = this.messaging.substring(0,30)+"...";
      }
      if(this.alert_types.length>30){
            this.alert_types = this.alert_types.substring(0,30)+"...";
      }
      if(this.gps.length>30){
            this.gps = this.gps.substring(0,30)+"...";
      }



    }
      setTimeout(() => {
        this.config.observer = true;
       // this.directiveRef.setIndex(0);
      });
    });
  }
  public makeoffer(make_offer){
    console.log(make_offer);
    console.log(this.advertid);
    if(localStorage.getItem('jwt') != undefined && localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != '' ){
      this.appService.makeoffer(this.advertid,make_offer).subscribe(data=>{
      console.log("Data => ",data)
      this.snackBar.open('Offer Made', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      this.main=false;
      this.frm=true;
      this.top=true;
      })
  }
else{
  this.snackBar.open('Please login first', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
  this.router.navigate(['/sign-in']);
}
  }


  public addtofavourites(){
    this.add=true;
    this.remove=false;
    console.log(this.isFavourite)
    if(this.isFavourite == 'false' && localStorage.getItem('jwt') != undefined && localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != '' ){
    this.appService.addtofavourites(this.advertid,this.add).subscribe(data=>{
      console.log(data);
      console.log("success");
      console.log(this.advertid);
      this.isFavourite='true';
    })
  }
  if(this.isFavourite == 'true' && localStorage.getItem('jwt') != undefined && localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != '' ){
  this.appService.removefavourites(this.advertid,this.remove).subscribe(data=>{
    console.log(data);
    console.log("removed");
    console.log(this.advertid);
    this.isFavourite='false';
  })
}

  }

  // public getRelatedProducts(){
  //   this.appService.getProducts().subscribe(data => {
  //   //  this.relatedProducts = data;
  //   })
  // }

  public selectImage(image){
    this.image = image;
    this.zoomImage = image;
  }

  public onMouseMove(e){
    if(window.innerWidth >= 1280){
      var image, offsetX, offsetY, x, y, zoomer;
      image = e.currentTarget;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      x = offsetX/image.offsetWidth*100;
      y = offsetY/image.offsetHeight*100;
      zoomer = this.zoomViewer.nativeElement.children[0];
      if(zoomer){
        zoomer.style.backgroundPosition = x + '% ' + y + '%';
        zoomer.style.display = "block";
        zoomer.style.height = image.height + 'px';
        zoomer.style.width = image.width + 'px';
      }
    }
  }

  public onMouseLeave(event){
    this.zoomViewer.nativeElement.children[0].style.display = "none";
  }

  public openZoomViewer(){
    this.dialog.open(ProductZoomComponent, {
      data: this.zoomImage,
      panelClass: 'zoom-dialog'
    });
  }
  public buy(){
    this.main=true;
    this.frm=false;
    this.top=false;
  }
  public cancel(){
    this.main=false;
    this.frm=true;
    this.top=true;
  }
  public report_fake(){
    this.report_type="flag as fake";
    if(localStorage.getItem('jwt') != undefined && localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != '' ){
      this.appService.report(this.advertid,this.report_type).subscribe(data=>{
      console.log("Data => ",data)
      this.snackBar.open('Reported', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      })
  }
else{
  this.snackBar.open('Please login first', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
  this.router.navigate(['/sign-in']);
}
  }
  public report_sold(){
    this.report_type="flag as sold";
    if(localStorage.getItem('jwt') != undefined && localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != '' ){
      this.appService.report(this.advertid,this.report_type).subscribe(data=>{
      console.log("Data => ",data)
      this.snackBar.open('Reported', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      })
  }
else{
  this.snackBar.open('Please login first', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
  this.router.navigate(['/sign-in']);
}

  }
  public report_review(){
    this.report_type="needs review";
    if(localStorage.getItem('jwt') != undefined && localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != '' ){
      this.appService.report(this.advertid,this.report_type).subscribe(data=>{
      console.log("Data => ",data)
      this.snackBar.open('Reported', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      })
  }
else{
  this.snackBar.open('Please login first', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
  this.router.navigate(['/sign-in']);
}

  }

  public boostad(value){
    console.log(value);
    this.boostmyad=value;
    this.boosttrue="true";
    this.appService.boostad(this.boostmyad,this.boosttrue).subscribe(data=>{
      console.log("boost", data);
      if(data['result'] ){
      this.snackBar.open('Advertisement Boosted successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      }
    },err=>{
      this.snackBar.open('Invalid Task!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    });
  }
  public removeboost(value){
    console.log(value);
    this.boostmyad=value;
    this.boosttrue="false";
    this.appService.boostad(this.boostmyad,this.boosttrue).subscribe(data=>{
      console.log("boost", data);
      if(data['result'] ){
      this.snackBar.open('Advertisement Boosted successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      }
    },err=>{
      this.snackBar.open('Invalid Task!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    });
  }

//   public report(){
//     if(localStorage.getItem('jwt') != undefined && localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != '' ){
//       this.appService.report(this.advertid).subscribe(data=>{
//       console.log("Data => ",data)
//       this.snackBar.open('Reported', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
//       })
//   }
// else{
//   this.snackBar.open('Please login first', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
//   this.router.navigate(['/sign-in']);
// }
//   }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public onSubmit(values:Object):void {
    if (this.form.valid) {
      //email sent
    }
  }

}
