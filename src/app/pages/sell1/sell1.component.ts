import { Component, OnInit, ViewChild,NgZone } from '@angular/core';
//import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { Data, AppService } from '../../app.service';
import { MatSnackBar } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';



declare var google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  address_level_1?:string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  marker?: Marker;
}


@Component({
  selector: 'app-sell1',
  templateUrl: './sell1.component.html',
  styleUrls: ['./sell1.component.scss']
})
export class Sell1Component implements OnInit {
  @ViewChild('horizontalStepper') horizontalStepper: MatStepper;
  @ViewChild('verticalStepper') verticalStepper: MatStepper;
  @ViewChild(AgmMap) map: AgmMap;


    geocoder:any;

    sellForm: FormGroup;

    public brands:any[];
    public mobiles:any[];
    public enums:any[];
    public categories:any[];
    public colorcode:any[];
    public Colorhex:any[];
    public mobileID:any;
    public brandId:any;
    public brandName:any;
    public selectedbrand:string;
    public DeviceName:any;
    public url='';
    //fileToUpload: File = null;
    public phone:any;
    public title:string;
    public price:any;
    public colors:string[];
    public storage:any[];
    public description:string[];
    public condition:string[];
    public issues:string[];
    public accessories:string[];
    public isVerified:boolean;
    //public check: boolean=false;
    public selectedaccessories: any[];
    public SelectedList=[];
    public accessoriesArray=[];
    public issuesArray=[];
    public switchArray=[];
    public imageUrl : string;
    public fileToUpload : File=null;
    public file: any;
    public advert_id:any;
    public switchonoff:string[];
    imageSrc: string;
    public newbrand:any[];
    public view:any[];
    public pic_view:any[];
    public hid:any;
    public fhid:any;
    public circleRadius:number;
    public currentLat:any;
    public currentLong:any;
    public marker:any;
    public latitude:any;
    public longitude:any;
    public confhid:any;
    public heading:any;
    public invalid:any;
    public newbr:any;
    public imei_not:any;
    // public age = ["Brand New", "Less Than a Year", "1 Year", "2 Years","3 Years","4 Years","5 Years","6 Years","7 Years","Greater Than 7"];
    public agenumeric = ["-1", "0", "1", "2","3","4","5","6","7","8"];
    public age = [
    {"name":"Brand New", "count": -1},
    {"name":"Less Than a Year", "count": 0},
    {"name":"1 Year", "count":1},
    {"name":"2 Years", "count":2},
    {"name":"3 Years", "count":3},
    {"name":"4 Years", "count":4},
    {"name":"5 Years", "count":5},
    {"name":"6 Years", "count":6},
    {"name":"7 Years", "count":7},
    {"name":"Greater Than 7", "count":8},
];


  constructor(public router:Router,public appService:AppService,public snackBar: MatSnackBar,public mapsApiLoader: MapsAPILoader,public formBuilder: FormBuilder,private zone: NgZone,
  private wrapper: GoogleMapsAPIWrapper) {
    this.hid=false;
    this.confhid=false;
    this.fhid=true;
    this.newbr=false;
    this.heading="SUBMIT AN AD";

    this.mapsApiLoader = mapsApiLoader;
this.zone = zone;
this.wrapper = wrapper;
this.mapsApiLoader.load().then(() => {
this.geocoder = new google.maps.Geocoder();

});

if (navigator)
{
navigator.geolocation.getCurrentPosition( pos => {
this.longitude = pos.coords.longitude;
this.latitude = pos.coords.latitude;
console.log(this.latitude);
console.log(this.longitude);
});
}
   }

   public location:Location = {
     lat: parseFloat(this.latitude),
     lng: parseFloat(this.longitude),
     marker: {
       lat: parseFloat(this.latitude),
       lng: parseFloat(this.longitude),
       draggable: true
     },
     zoom: 15
   };

  ngOnInit() {
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
      'title': ['', Validators.required],
      'category': ['', Validators.required],
      'brand': ['', Validators.required],
      'mobile': ['', Validators.required],
      'price': ['', Validators.required],
      'description': ['', Validators.required],
      'color': ['', Validators.required],
      'storage': ['', Validators.required],
      'condition': ['', Validators.required]
    });
      }
      public selectage(value){
        console.log(value);

        // console.log(this.age[0]);
        // console.log(this.age[8]);
        // console.log(this.age[5]);
      }
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
  public skiploc(){
  this.hid=false;
  this.confhid=true;
  this.fhid=false;
}
public addnew(){
  this.newbr=true;
}

  public getbrands(){
    this.appService.getbrand().subscribe(data=>{
      //console.log(localStorage.getItem('jwt'))
      console.log(data);
      this.brands=data['result'];
      this.brandName=data['result']['brandName'];
      this.brandId=data['result']['_id'];
      // this.id=data['result'];
      //console.log(this.brandName);
    })
  }
  public getallenums(){
    this.appService.getenums().subscribe(data=>{
      console.log(data);
      this.enums=data['result'];
      this.colors=data['result']['color'];
      console.log(data['result']['color']);
      this.categories=data['result']['category'];
      this.storage=data['result']['storage'];
      this.colorcode=data['result']['colorHex'];
    })
  }
  public addAccessories(){
    this.appService.addAccessories().subscribe(data=>{
      console.log(data);
      this.accessories=data['result'];
    })
  }
  public addissues(){
    this.appService.addissues().subscribe(data=>{
      console.log(data);
      this.issues=data['result'];
    })
  }
  public phoneCondition(){
    this.appService.phone_condition().subscribe(data=>{
      console.log(data);
      this.condition=data['result'];
    })
  }
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

  public setNewBrand(brand){
  // var myobjects={
  // _id:brand._id
  // }
  console.log(brand._id);
    this.appService.getmobiles(brand._id).subscribe(data=>{

    console.log(data);
    this.mobiles=data['result'];
    this.DeviceName=data['result']['DeviceName'];

  })
}

public checkBoxChange(value){
  console.log(value);
if(this.accessoriesArray.indexOf(value)==-1){
  this.accessoriesArray.push(value);
}else{
  if(this.accessoriesArray.length == 1){
    this.accessoriesArray = [];
    console.log(this.accessoriesArray);
  }else{
      this.accessoriesArray.splice(value, 1);
      console.log(this.accessoriesArray);
  }
}
}

public checkboxissues(value){
  console.log(value);
if(this.issuesArray.indexOf(value)==-1){
  this.issuesArray.push(value);
  //console.log(this.issuesArray);
}else{
  if(this.issuesArray.length == 1){
    this.issuesArray = [];
    console.log(this.issuesArray);
  }else{
      this.issuesArray.splice(value, 1);
      console.log(this.issuesArray);
  }
}
}
public switchcheck(value){
  console.log(value);
  this.switchonoff=value;
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
}
public handleFileInput(event) {
  this.file = event.target.files[0];
  console.log("hassam");
  console.log(this.file);
  if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
  }
}
public uploaduserimage(){

}

  public submit(title_1,category_1,brand_1,mobile_1,price_1,description_1,color_1,store_1,imei_nu,condition_1,ag_1):void {
    var imei:'';
    // console.log(imei_nu.length);
    if(imei_nu == null && imei_nu == undefined && imei_nu == ''){
      imei = '';
      console.log(imei);
    }else if(imei_nu != null && imei_nu != undefined && imei_nu != '' ){
      if(imei_nu.toString().length == 14){
      imei = imei_nu;
      console.log(imei);
    }
    }
    else{
      this.imei_not = "Min & Max of 14 characters";
      console.log(this.imei_not);

    }

    console.log(title_1,category_1,brand_1,mobile_1,price_1,description_1,color_1,store_1,imei,condition_1,ag_1);
    if(title_1 != null && category_1 != null && brand_1 != null && mobile_1 !=null && price_1 != null && description_1 != null && color_1 != null && store_1 != null && condition_1 != null && ag_1 != null
    && title_1 != undefined && category_1 != undefined  && brand_1 != undefined  && mobile_1 !=undefined  && price_1 != undefined  && description_1 != undefined  && color_1 != undefined  && store_1 != undefined  && condition_1 != undefined && ag_1 != undefined
    && title_1 != '' && category_1 != ''  && brand_1 != ''  && mobile_1 !=''  && price_1 != ''  && description_1 != ''  && color_1 != ''  && store_1 != ''  && condition_1 != '' && ag_1 != ''){
      this.appService.placeAdd(title_1,category_1,brand_1,mobile_1,price_1,description_1,color_1,store_1,imei,this.switchonoff,condition_1,ag_1,this.accessoriesArray,this.issuesArray).subscribe(data=>{
      console.log("Data => ",data)
      this.view=data['result'];
        this.hid=true;
        this.confhid=false;
        this.fhid=false;
        this.heading="UPDATE LOCATION";
      if(data['result'] && this.file != null && this.file != undefined && this.file != ''){
        console.log("success");
        this.appService.uploadImage(this.file,data['result']['_id']).subscribe(data1=>{
          this.pic_view=[data1['result']];
          this.advert_id=data['result']['_id'];
          console.log(this.advert_id);
          console.log(this.latitude);
          console.log(this.longitude);
        })
      }else{
        this.pic_view=[data['result']];
      }
    },err=>{
      if(err.status === 406){
        this.snackBar.open('Adds Limit Reached, Upgrade Package', '×', { panelClass: 'success', verticalPosition: 'bottom', duration: 3000 });
      console.log("addslimit reached");
      this.accrouter();
    }

    })
    }else{
      this.snackBar.open('Complete the empty fields', '×', { panelClass: 'success', verticalPosition: 'top', duration: 30000 });
      this.invalid= "*";
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

  }
  public accrouter(){
    this.router.navigate(['/account']);
  }
  public verify_add(){
    this.appService.verify_add(this.advert_id).subscribe(data=>{
      console.log(data);
      if(data['result']){
        this.snackBar.open('Add Posted', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.router.navigate(['/products']);
      }

    })
  }


  public createbrand(value){
    this.newbrand=value;
    console.log(this.newbrand);
    if(value != undefined && value != null && value != ''){
    this.appService.createbrand(this.newbrand).subscribe(data=>{
      console.log(data);
    })
  }
  }

//Map section start

  updateOnMap() {
      let full_address:string = this.location.address_level_1 || ""
      if (this.location.address_level_2) full_address = full_address + " " + this.location.address_level_2
      if (this.location.address_state) full_address = full_address + " " + this.location.address_state
      if (this.location.address_country) full_address = full_address + " " + this.location.address_country

      this.findLocation(full_address);
    }


    findLocation(address) {
        if (!this.geocoder) this.geocoder = new google.maps.Geocoder()
        this.geocoder.geocode({
          'address': address
        }, (results, status) => {
          console.log(results);
          if (status == google.maps.GeocoderStatus.OK) {
            for (var i = 0; i < results[0].address_components.length; i++) {
              let types = results[0].address_components[i].types

              if (types.indexOf('locality') != -1) {
                this.location.address_level_2 = results[0].address_components[i].long_name
              }
              if (types.indexOf('country') != -1) {
                this.location.address_country = results[0].address_components[i].long_name
              }
              if (types.indexOf('postal_code') != -1) {
                this.location.address_zip = results[0].address_components[i].long_name
              }
              if (types.indexOf('administrative_area_level_1') != -1) {
                this.location.address_state = results[0].address_components[i].long_name
              }
            }

            if (results[0].geometry.location) {
              this.location.lat = results[0].geometry.location.lat();
              this.location.lng = results[0].geometry.location.lng();
              this.location.marker.lat = results[0].geometry.location.lat();
              this.latitude =this.location.marker.lat;
              console.log(this.latitude);
              this.location.marker.lng = results[0].geometry.location.lng();
              this.longitude= this.location.marker.lng;
              console.log(this.longitude);
              this.location.marker.draggable = true;
              this.location.viewport = results[0].geometry.viewport;
            }

            this.map.triggerResize()
          } else {
            alert("Sorry, this search produced no results.");
          }
        })
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
            })
            var bounds = rectangle.getBounds();
    var swLat = map.getBounds().getSouthWest().lat();
        var swLng = map.getBounds().getSouthWest().lng();
        var neLat = map.getBounds().getNorthEast().lat();
        var neLng = map.getBounds().getNorthEast().lng();
        console.log('swLat: ' + swLat);
        console.log('swLng: ' + swLng);
        console.log('neLat: ' + neLat);
        console.log('neLng: ' + neLng);
      }
      markerDragEnd(m: any, $event: any) {
     this.location.marker.lat = m.coords.lat;
     this.location.marker.lng = m.coords.lng;
     this.findAddressByCoordinates();
     // this.updateOnMap();

    }

    findAddressByCoordinates() {
        this.geocoder.geocode({
          'location': {
            lat: this.location.marker.lat,
            lng: this.location.marker.lng
          }
        }, (results, status) => {
          this.decomposeAddressComponents(results);
        })
      }

    decomposeAddressComponents(addressArray) {
      if (addressArray.length == 0) return false;
      let address = addressArray[0].address_components;

      for(let element of address) {
        if (element.length == 0 && !element['types']) continue

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
    }
    milesToRadius(value) {
         this.circleRadius = value / 0.00062137;
      }

      circleRadiusInMiles() {
        return this.circleRadius * 0.00062137;
      }

public advertlocation(){
  this.updateOnMap();
  this.heading="CONFIRM YOUR AD";
  console.log(this.longitude);
  console.log(this.latitude);

  if(this.advert_id != null && this.advert_id != undefined && this.advert_id != '' &&
this.latitude != null && this.latitude != undefined && this.latitude != ''
&& this.longitude != null && this.longitude != undefined && this.longitude != ''){
        this.appService.advertlocation(this.advert_id,this.latitude,this.longitude).subscribe(data=>{
          console.log(data);
          if(data['result']){
            this.hid=false;
            this.confhid=true;
            this.fhid=false;
          }

        })
      }
      }
  // public onsellFormSubmit(values:Object):void {
  //   if (this.passForm.valid) {
  //     this.appService.changepassword(this.passForm.value.old_pass,this.passForm.value.new_pass).subscribe(data=>{
  //       console.log(data);
  //       this.snackBar.open('Passwords updated', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
  //     },err=>{
  //       this.mismatch="Old Password Incorrect";
  //       console.log("password mismatch");
  //   })
  //   }
  // }

  // public checks(){
  //   console.log(this.addissues());
  // }

}
