import { Component, OnInit,Inject, ViewChild,NgZone, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog,MAT_DIALOG_DATA,MatDialogRef } from '@angular/material';
import { ProductDialogComponent } from '../../shared/products-carousel/product-dialog/product-dialog.component';
import { AppService } from '../../app.service';
import { Product, Category } from "../../app.models";
import { Renderer2 } from '@angular/core';
import { ChatService } from '../../chat.service';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ProductMapComponent } from './product-map/product-map.component';


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
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  @ViewChild(AgmMap) map: AgmMap;


  geocoder:any;

  public sidenavOpen:boolean = true;
  private sub: any;
  public viewType: string = 'grid';
  public viewCol: number = 33.3;
  public counts = [12, 24, 36];
  public count:any;
  public sortings = ['Sort by Default', 'Best match', 'Lowest first', 'Highest first'];
  public sort:any;
  public products: Array<Product> = [];
  public brands=[];
  public priceRange = "Price Range";
  public priceFrom_1: 0;
  public placeHolder = "/assets/images/icons/logo.png";
  //public colors = ["#5C6BC0","#66BB6A","#EF5350","#BA68C8","#FF4081","#9575CD","#90CAF9","#B2DFDB","#DCE775","#FFD740","#00E676","#FBC02D","#FF7043","#F5F5F5","#000000"];
  public colors=[];
  public selectedcolor=[];
  public price=[];
  public brandName = "";
  public dtype = 'Device Type';
  public brandId = "";
  public storages=[];
  public selectedstorage=[];
  public sizes = ["S","M","L","XL","2XL","32","36","38","46","52","13.3\"","15.4\"","17\"","21\"","23.4\""];
  public page:any;
  public filters:any[];
  public conditions:any[];
  public conditionsarray=[];
  public brandsArray=[];
  public categoryArray=[];
  public categories=[];
  public priceTo:any;
  public priceFrom:any;
  public storag:any;
  public col:any;
  public bran:any;
  public st:any;
  public web:boolean;
  public filter_color:any[];
  public category_image_1:any[];
  public category_image_2:any[];
  public category_image_3:any[];
  public category_name_1:any[];
  public category_name_2:any[];
  public category_name_3:any[];
  public c1:any;
  public c2:any;
  public c3:any;
  public ads:any;

  public brand1:any[];
  public brand2:any[];
  public backupProducts:any[];
  title = 'app';
  public data2 = "";
  public mycurrency:any;
  public changedpirce:any[];
  public categorySearch= "";
  public brandSelected = "Brands";

  public circleRadius:number;
  public currentLat:any;
  public currentLong:any;
  public marker:any;
  public latitude:any;
  public longitude:any;
  public hidemain:any;
  public searchmap:any;
  public myid:any;
  public addsuserids:any;
  public isFavourite:any;
  public advertid:any;
  public add:any;
  public remove:any;


  constructor(private activatedRoute: ActivatedRoute, public appService:AppService, public dialog: MatDialog, private router: Router, private renderer: Renderer2, private chat: ChatService,
    public mapsApiLoader: MapsAPILoader,public formBuilder: FormBuilder,private zone: NgZone,
    private wrapper: GoogleMapsAPIWrapper) {
    this.renderer.setStyle(document.body, 'background-color', '#FFFFFF');
    this.backupProducts = [];
    this.c1=false;
    this.c2=false;
    this.c3=false;
    this.hidemain=true;
    this.searchmap=false;
    this.priceTo=0;
    this.priceFrom = 0;
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
// var bounds = getCurrentPosition.getBounds();
// var NECorner = bounds.getNorthEast();
// var SWCorner = bounds.getSouthWest();
// console.log(NECorner);
// console.log(SWCorner);
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

    this.count = this.counts[0];
    this.sort = this.sortings[0];
    this.sub = this.activatedRoute.params.subscribe(params => {
    });
    if(window.innerWidth < 960){
      this.sidenavOpen = false;
    };
    if(window.innerWidth < 1280){
      this.viewCol = 33.3;
    };
    this.mycurrency= localStorage.getItem('currency');
    this.getbrands();
    this.getAllProducts();
    this.getallenums();
    this.phoneCondition();
    this.newbrands();
    this.myid = localStorage.getItem('userid');


    // this.chat.messages.subscribe(msg => {
    //   console.log(msg);
    // })

  }

  // openDialog(): void{
  //   const dialogRef =this.dialog.open(ProductMapComponent, {
  //     data: {
  //       animal: 'panda',
  //     }
  //   });
  // }
  public openmap(){
    this.hidemain=false;
    this.searchmap=true;
  }

  public onsearch(value){
    var count = 0;
    var searchingData = [];
    if(this.backupProducts.length==0){
      this.backupProducts = this.products;
    }
    var dataProducts = this.backupProducts;
    for(var i=0;i<dataProducts.length;i++){
      if((dataProducts[i].title).toLowerCase().indexOf(value.toLowerCase())!=-1 || dataProducts[i].description.toLowerCase().indexOf(value.toLowerCase())!=-1 ){
        searchingData[count] = dataProducts[i];
        count = count+1;
      }
      if(i == dataProducts.length-1){
        this.products = searchingData;
         this.ads=this.products.length;
      }
    }
  }
  public select_image(value){

  }
  public pricefrom(value){
    this.priceFrom = value;

    if(value == '' || value == null || value == 'null' && !value){
      this.products = this.backupProducts ;
      if(this.priceTo!='' && this.priceFrom!=''){
        this.priceRange = "Price ("+this.priceFrom+" to "+this.priceTo+")";
      }else if(this.priceFrom!=''){
        this.priceRange = "Price ( "+this.priceFrom+" )";
      }else if(this.priceTo!=''){
        this.priceRange = "Price ( "+this.priceTo+" )";
      }else{
        this.priceRange = "Price Range";
      }
    }else{
      if(this.priceTo!='' && this.priceFrom!=''){
        this.priceRange = "Price ("+this.priceFrom+" to "+this.priceTo+")";
      }else if(this.priceFrom!=''){
        this.priceRange = "Price ( "+this.priceFrom+" )";
      }else if(this.priceTo!=''){
        this.priceRange = "Price ( "+this.priceTo+" )";
      }else{
        this.priceRange = "Price Range";
      }
      var searchedData = [];
      var count = 0;
      var categorySearchFinal = [];
      if(this.backupProducts.length==0){
        this.backupProducts = this.products;
      }
      var searchData = this.backupProducts;
      var categorySearchData = this.backupProducts;
      if(this.priceFrom>-1 && this.priceTo>-1){
        if(parseInt(this.priceFrom)<parseInt(this.priceTo)){
          if(this.categorySearch!=''){
            for(var j = 0;j<categorySearchData.length;j++){
              if(categorySearchData[j].type == value || (parseFloat(categorySearchData[j].price)<parseInt(this.priceFrom) && parseFloat(categorySearchData[j].price)>parseInt(this.priceTo))){
                categorySearchFinal[count] = categorySearchData[j];
                count = count+1;
              }
              if(j == categorySearchData.length-1){
                this.products = categorySearchFinal;
                 this.ads=this.products.length;
              }
            }
          }else{
            for(var i=0;i<searchData.length;i++){
              if(parseFloat(searchData[i].price)<parseInt(this.priceFrom) && parseFloat(searchData[i].price)>parseInt(this.priceTo)){
                searchedData[count] = searchData[i];
                count = count+1;
              }if(i==searchData.length-1){
                this.products = searchedData; this.ads=this.products.length;
              }
            }
          }
        }else{
          if(this.categorySearch!=''){
            for(var j = 0;j<categorySearchData.length;j++){
              if(categorySearchData[j].type == value || (parseFloat(categorySearchData[j].price)<parseInt(this.priceFrom) && parseFloat(categorySearchData[j].price)>parseInt(this.priceTo))){
                categorySearchFinal[count] = categorySearchData[j];
                count = count+1;
              }
              if(j == categorySearchData.length-1){
                this.products = categorySearchFinal;
                 this.ads=this.products.length;
              }
            }
          }else{
            for(var i=0;i<searchData.length;i++){
              if(parseFloat(searchData[i].price)<parseInt(this.priceFrom) && parseFloat(searchData[i].price)>parseInt(this.priceTo)){
                searchedData[count] = searchData[i];
                count = count+1;
              }if(i==searchData.length-1){
                this.products = searchedData;
                 this.ads=this.products.length;
              }
            }
          }
        }
      }
    }
  }
  public priceto(value){
    this.priceTo = value;
    if(value == '' || value == null || value == 'null' && !value){
      this.products = this.backupProducts;
      if(this.priceTo!='' && this.priceFrom!=''){
        this.priceRange = "Price ("+this.priceFrom+" to "+this.priceTo+")";
      }else if(this.priceFrom!=''){
        this.priceRange = "Price ( "+this.priceFrom+" )";
      }else if(this.priceTo!=''){
        this.priceRange = "Price ( "+this.priceTo+" )";
      }else{
        this.priceRange = "Price Range";
      }
    }else{
      var searchedData = [];
      var count = 0;
      var categorySearchFinal = [];
      if(this.backupProducts.length==0){
        this.backupProducts = this.products;
      }
      var searchData = this.backupProducts;
      var categorySearchData = this.backupProducts;
      if(this.priceFrom>-1 && this.priceTo>-1){
        if(parseInt(this.priceFrom)<parseInt(this.priceTo)){
          if(this.categorySearch!=''){
            for(var j = 0;j<categorySearchData.length;j++){
              if(categorySearchData[j].type == value || (parseFloat(categorySearchData[j].price)>parseInt(this.priceFrom) && parseFloat(categorySearchData[j].price)<parseInt(this.priceTo))){
                categorySearchFinal[count] = categorySearchData[j];
                count = count+1;
              }
              if(j == categorySearchData.length-1){
                this.products = categorySearchFinal;
                 this.ads=this.products.length;
              }
            }
          }else{
            for(var i=0;i<searchData.length;i++){
              if(parseFloat(searchData[i].price)>parseInt(this.priceFrom) && parseFloat(searchData[i].price)<parseInt(this.priceTo)){
                searchedData[count] = searchData[i];
                count = count+1;
              }if(i==searchData.length-1){
                this.products = searchedData;
                 this.ads=this.products.length;
              }
            }
          }
        }else{
          if(this.categorySearch!=''){
            for(var j = 0;j<categorySearchData.length;j++){
              if(categorySearchData[j].type == value || (parseFloat(categorySearchData[j].price)>parseInt(this.priceFrom) && parseFloat(categorySearchData[j].price)<parseInt(this.priceTo))){
                categorySearchFinal[count] = categorySearchData[j];
                count = count+1;
              }
              if(j == categorySearchData.length-1){
                this.products = categorySearchFinal;
                 this.ads=this.products.length;
              }
            }
          }else{
            for(var i=0;i<searchData.length;i++){
              if(parseFloat(searchData[i].price)>parseInt(this.priceFrom) && parseFloat(searchData[i].price)<parseInt(this.priceTo)){
                searchedData[count] = searchData[i];
                count = count+1;
              }if(i==searchData.length-1){
                this.products = searchedData;
                 this.ads=this.products.length;
              }
            }
          }
        }
      }
    }
    if(this.priceTo!='' && this.priceFrom!=''){

      this.priceRange = "Price ("+this.priceFrom+" to "+this.priceTo+")";
    }else if(this.priceFrom!=''){
      this.priceRange = "Price ( "+this.priceFrom+" )";
    }else if(this.priceTo!=''){
      this.priceRange = "Price ( "+this.priceTo+" )";
    }else{
      this.priceRange = "Price Range";
    }
  }

  // public filtersearch(tablet_image,mobile_image,acc_image,brand1,brand2,priceFrom,priceTo){
  //
  // }
  public getAllProducts(){
  this.web=true;
  this.appService.getProducts(localStorage.getItem('userid'),this.web,this.mycurrency).subscribe(data=>{
    console.log(data);


    for(var i=0;i<data['result'].length;i++){

      if(data['result'][i]['title'].length>13){
            data['result'][i]['title'] = data['result'][i]['title'].substring(0,13)+"...";
      }
      if(data['result'][i]['description'].length>50){
              data['result'][i]['description'] = data['result'][i]['description'].substring(0,50)+"...";
      }
      if(data['result'][i]['pictures']!=undefined && data['result'][i]['pictures'].length>0)
      {  var x =data['result'][i]['pictures'][0].replace("/upload/","/upload/c_fill,h_150,w_100/");
      data['result'][i]['pictures'][0] = x;}
      data['result'][i]['price'] = parseFloat(data['result'][i]['price']).toFixed(2);
      if(i == data['result'].length-1){
        // console.log(i);
        this.products = data['result'];

         this.ads=this.products.length;
         // this.aduserid=data['result']['user_id']['_id'];


            for(var i=0;i<data['result'].length;i++){
              if(data['result'][i]['pictures'].length>0){
                for(var j=0;j<data['result'][i]['pictures'].length;j++){

                  if(data['result'][i]['pictures'][j]){
                    data['result'][i]['pictures'][j] = data['result'][i]['pictures'][j].replace(".mp4" , ".jpg");
                 data['result'][i]['pictures'][j] = data['result'][i]['pictures'][j].replace(".mov" , ".jpg");
              }
        //      var digitsprice=data['result'][0]['price'];
      }

    }
//     if(data['result'][i]['user_id']){
//       // console.log("user iddd'''ssssssssssss", data['result'][i]['user_id']);
//       this.addsuserids = data['result'][i]['user_id']['_id'];
//       console.log(this.addsuserids);
//       console.log(this.myid);
// }
// if(data['result'][i]){
//   this.isFavourite = data['result'][i]['isFavourite'];
//   console.log(this.isFavourite);
//
// }

  }


    //for show more product
    // for (var index = 0; index < 3; index++) {
    //   this.products = this.products.concat(this.products);
    // }
  }
}
  });
}
// public getfavouriteid(value){
//   console.log(value);
//   localStorage.setItem('favourite',value);
//   console.log(localStorage.getItem('favourite'));
// }
// public getfilfav(){
//   this.appService.getFilters().subscribe(data=>{
//     console.log(data);
//   });
// }
public addtofavourites(Favourite,_id){
  this.add=true;
  this.remove=false;
  this.isFavourite = Favourite;
  this.advertid = _id;
  console.log(this.isFavourite);
  console.log(this.advertid);
  console.log(localStorage.getItem('jwt'));
  if(!this.isFavourite && localStorage.getItem('jwt') != undefined && localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != '' ){
    console.log("1111")
    console.log(this.advertid,this.add)
  this.appService.addtofavourites(this.advertid,this.add).subscribe(data=>{
    console.log(data);
    console.log("success");
    console.log(this.advertid);
    // this.isFavourite='true';
  })
}
if(this.isFavourite && localStorage.getItem('jwt') != undefined && localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != '' ){
  console.log(this.advertid,this.remove)
this.appService.removefavourites(this.advertid,this.remove).subscribe(data=>{
  console.log(data);
  console.log("removed");
  console.log(this.advertid);
  // this.isFavourite='false';
})
}

}

public submit(priceFrom_1,priceTo_1):void{
// this.storag =this.selectedstorage +",";
this.web= true;
console.log(this.web);
if(this.selectedstorage.length !== 0){
  this.storag =this.selectedstorage.join(" GB,") +" GB";
  console.log(this.storag);

}
else{
  this.storag=this.selectedstorage;
  console.log(this.storag);
}
this.col=this.selectedcolor.join();
this.bran=this.brandsArray.join();
// this.col = this.selectedcolor+",";
// this.bran = this.brandsArray+",";
console.log(this.storag);
console.log(this.col);
console.log(this.bran);
console.log(this.categoryArray,priceFrom_1,priceTo_1,this.selectedcolor,this.storag,this.conditionsarray,this.bran);
//  if (localStorage.getItem('userid').length !== 0){
this.appService.getFilters(this.categoryArray,priceFrom_1,priceTo_1,this.col,this.storag,this.conditionsarray,this.bran,localStorage.getItem('userid')).subscribe(data=>{
console.log(data);
this.products = data['result'];
});
// }
// else {
//   this.appService.getFilters(this.categoryArray,priceFrom_1,priceTo_1,this.col,this.storag,this.conditionsarray,this.bran,localStorage.getItem('userid')).subscribe(data=>{
//     console.log(data);
//     this.products = data['result'];
//   });
// }
}
// public getFilters(){
//   this.appService.getFilters().subscribe(data=>{
//     this.filters = data['result'];
//   });
// }
public getallenums(){
this.appService.getenums().subscribe(data=>{
  console.log(data);
  this.colors=data['result']['color'];
  this.categories=data['result']['category'];
  this.price=data['result']['price'];
  this.storages=data['result']['storage'];
  this.category_image_1=data['result']['category'][0]['image'];
  this.category_name_1=data['result']['category'][0]['name'];
  this.category_image_2=data['result']['category'][1]['image'];
  this.category_name_2=data['result']['category'][1]['name'];
  this.category_image_3=data['result']['category'][2]['image'];
  this.category_name_3=data['result']['category'][2]['name'];
})
}
public phoneCondition(){
  this.appService.phone_condition().subscribe(data=>{
    console.log(data);
    this.conditions=data['result'];
  })
}
public checkconditions(value){
  console.log(value);
  if(this.conditionsarray.indexOf(value)==-1){
    this.conditionsarray.push(value);
    //console.log(this.issuesArray);
  }else{
  if(this.conditionsarray.length == 1){
    this.conditionsarray = [];
    console.log(this.conditionsarray);
  }else{
    this.conditionsarray.splice(value, 1);
    console.log(this.conditionsarray);
  }
}
}
public newbrands(){
  this.appService.getbrand().subscribe(data=>{
    console.log(data);
    this.brands=data['result'];
    var brr=[];
    this.brands=data['result'];
    brr=this.brands;
    console.log(brr);
    this.brand2 = brr.slice(0, (brr.length/2));
    this.brand1 = brr.slice(brr.length/2, brr.length);
    console.log(this.brand1);
    console.log(this.brand2);
    this.brandName=data['result']['brandName'];
    this.brandId=data['result']['_id'];

  })
}
public getbrands(){
  // this.appService.getbrand().subscribe(data=>{
  //   console.log(data);
  //   var brr=[];
  //   // this.brands=data['result'];
  //   // brr=this.brands;
  //   // console.log("BRR, ",brr.length,brr)
  //   // this.brand1 = brr.splice(0, (brr.length/2)-1,brr);
  //   // this.brand2 = brr.splice(brr.length/2, brr.length,brr);
  //   // console.log(this.brand1);
  //   // console.log(this.brand2);
  //   this.brandName=data['result']['brandName'];
  //   this.brandId=data['result']['_id'];
  // })
}
public checkbrand(value){
  var count = 0;

  if(this.brandsArray.indexOf(value)==-1){
    this.brandsArray.push(value);
    if(this.backupProducts.length == 0){
      this.backupProducts = this.products;
    }
    var totalAds = this.backupProducts;
    var finalSearchAds = [];
    if(this.brandsArray.length > 0){
      for(var i=0;i<totalAds.length-1;i++){
        for(var j = 0;j<this.brandsArray.length;j++){
          if(this.brandsArray[j] == totalAds[i].brandName){
            finalSearchAds[count] = totalAds[i];
            count = count+1;
          }
        }
      }
      this.products = finalSearchAds;
       this.ads=this.products.length;

    }
  }else{
    if(this.brandsArray.length == 1){
      this.brandsArray = [];
      this.products = this.backupProducts;
      this.ads=this.products.length;

    }else{

      if(this.brandsArray.length > 0){
      this.brandsArray.splice(value, 1);
        var totalAds = this.backupProducts;
        var finalSearchAds = [];
        for(var i=0;i<totalAds.length-1;i++){
          for(var j = 0;j<this.brandsArray.length;j++){
            if(this.brandsArray[j] == totalAds[i].brandName){
              finalSearchAds[count] = totalAds[i];
              count = count+1;
              this.ads=this.products.length;

            }
          }
        }
        this.ads=this.products.length;

        this.products = finalSearchAds;
         this.ads=this.products.length;
      }else{
        this.products = this.backupProducts;
      }
    }
  }
  console.log("array length = ",this.brandsArray.length)
  if(this.brandsArray.length==1){
    this.brandSelected = "Brand"+"( "+this.brandsArray[0]+")"
  }else if(this.brandsArray.length>1){
    this.brandSelected = "Brands"+"("+this.brandsArray[0]+" and "+(this.brandsArray.length-1)+" more )"
  }else if(this.brandsArray.length==0){
    this.brandSelected = "Brands";
  }else{
    this.brandSelected = "Brands";
  }
}

public checkcategory(value){
  console.log(value);
  if(this.categoryArray.indexOf(value)==-1){
    this.categoryArray.push(value);
    //console.log(this.issuesArray);
  }else{
  if(this.categoryArray.length == 1){
    this.categoryArray = [];
    console.log(this.categoryArray);
  }else{
    this.brandsArray.splice(value, 1);
    console.log(this.categoryArray);
  }
}
}
public colorpick(value){
  console.log(value);
  if(this.selectedcolor.indexOf(value)==-1){
    this.selectedcolor.push(value);
    //console.log(this.issuesArray);
  }else{
  if(this.selectedcolor.length == 1){
    this.selectedcolor = [];
    console.log(this.selectedcolor);
  }else{
    this.selectedcolor.splice(value, 1);
    console.log(this.selectedcolor);
  }
}
}
public storagepick(value){
  console.log(value);
  if(this.selectedstorage.indexOf(value)==-1){
    this.selectedstorage.push(value);
    //console.log(this.issuesArray);
  }else{
  if(this.selectedstorage.length == 1){
    this.selectedstorage = [];
    console.log(this.selectedstorage);
  }else{
    this.selectedstorage.splice(value, 1);
    console.log(this.selectedstorage);
  }
}
}
// public colorpick(value){
//   console.log(value);
//   this.selectedcolor.push(value);
//   console.log(selectedcolor);
// }



public getCategories(){
  if(this.appService.Data.categories.length == 0) {
    this.appService.getCategories().subscribe(data => {
      this.categories = data;
      this.appService.Data.categories = data;
    });
  }
  else{
    this.categories = this.appService.Data.categories;
  }
}

// public getBrands(){
//   this.brands = this.appService.getBrands();
// }

ngOnDestroy() {
  this.sub.unsubscribe();
}

@HostListener('window:resize')
public onWindowResize():void {
  (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
  (window.innerWidth < 1280) ? this.viewCol = 33.3 : this.viewCol = 33.3;
}

public changeCount(count){
  this.count = count;
  // this.getAllProducts();
}

public changeSorting(sort){
  this.sort = sort;
}

public changeViewType(viewType, viewCol){
  this.viewType = viewType;
  this.viewCol = viewCol;
}

public openProductDialog(product){
  let dialogRef = this.dialog.open(ProductDialogComponent, {
    data: product,
    panelClass: 'product-dialog'
  });
  dialogRef.afterClosed().subscribe(product => {
    if(product){

      this.router.navigate(['/products/', JSON.stringify(product.id), product.title]);
    }
  });
}

public onPageChanged(event){
  this.page = event;
  // this.getAllProducts();
  window.scrollTo(0,0);
}

public onChangeCategory(event){
  if(event.target){
    this.router.navigate(['/products', event.target.innerText.toLowerCase()]);
  }
}
public adrouter(){
  if(localStorage.getItem('jwt') != undefined && localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != '' ){
  this.router.navigate(['/sell']);
}
else{
  this.router.navigate(['/sign-in']);
}
}

// public same(){
//   for(var i; i<1000; i++){
//     let x= i.toString;
//     if(x.length ==2){
//       x[0]=x[2]
//       console.log(x)f
//     }
//
//   }
// }
public category1(value){
this.c2=false;
this.c3=false;
this.c1=true;
var count = 0;
var categorySearchData = [];
var categorySearchFinal = [];
if(this.categorySearch == "" || this.categorySearch != value){
  this.categorySearch = value;
  if(this.backupProducts.length == 0){
    this.backupProducts = this.products;
            this.dtype = "Device Type" + " ("+value+")";


  }
  categorySearchData = this.backupProducts;
  for(var i = 0;i<categorySearchData.length;i++){
    if(categorySearchData[i].type == value){
      categorySearchFinal[count] = categorySearchData[i];
      count = count+1;
    }
    if(i == categorySearchData.length-1){
      this.products = categorySearchFinal;
      this.ads=this.products.length;
        this.dtype = "Device Type" + " ("+value+")";
    }
  }
}else if(this.categorySearch == value){
  this.categorySearch = "";
  this.products = this.backupProducts;
  this.c1=false;
  this.ads=this.products.length;
          this.dtype = "Device Type" + " ("+value+")";
}
}
public category2(value){
  this.c1=false;
  this.c3=false;
  this.c2=true;
  var count = 0;
  var categorySearchData = [];
  var categorySearchFinal = [];
  if(this.categorySearch == "" || this.categorySearch != value){
    this.categorySearch = value;
    if(this.backupProducts.length == 0){
      this.backupProducts = this.products;
      this.dtype = "Device Type" + " ("+value+")";
    }
    categorySearchData = this.backupProducts;
    for(var i = 0;i<categorySearchData.length;i++){
      if(categorySearchData[i].type == value){
        categorySearchFinal[count] = categorySearchData[i];
        count = count+1;
      }
      if(i == categorySearchData.length-1){
        this.products = categorySearchFinal;
        this.ads=this.products.length;
        this.dtype = "Device Type" + " ("+value+")";
      }
    }
  }else if(this.categorySearch == value){
    this.categorySearch = "";
    this.products = this.backupProducts;
    this.c2=false;
    this.ads=this.products.length;
    this.dtype = "Device Type" + " ("+value+")";

  }
}
public category3(value){
  this.dtype = "Device Type" + " ("+value+")";
  this.c1=false;
  this.c2=false;
  this.c3=true;
  var count = 0;
  var categorySearchData = [];
  var categorySearchFinal = [];
  if(this.categorySearch == "" || this.categorySearch != value){
    this.categorySearch = value;
    if(this.backupProducts.length == 0){
      this.backupProducts = this.products;
    }
    categorySearchData = this.backupProducts;
    for(var i = 0;i<categorySearchData.length;i++){
      if(categorySearchData[i].type == value){
        categorySearchFinal[count] = categorySearchData[i];
        count = count+1;
      }
      if(i == categorySearchData.length-1){
        this.products = categorySearchFinal;
        this.ads=this.products.length;
      }
    }
  }else if(this.categorySearch == value){
    this.categorySearch = "";
    this.products = this.backupProducts;
    this.c3=false;
    this.ads=this.products.length;

  }
}

//map section

public updateOnMap(location) {
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
            // let northeast = {
            //   latitude: this.location.marker.lat + this.location.marker.latitudeDelta / 2,
            //   longitude: this.location.marker.lng + this.location.marker.longitudeDelta / 2,
            // }
            // , southwest = {
            //   latitude: this.location.marker.lat - this.location.marker.latitudeDelta / 2,
            //   longitude: this.location.marker.lng - this.location.marker.longitudeDelta / 2,
            // };
            //
            // console.log("locations" ,this.location.marker, northeast, southwest);
          }

          this.map.triggerResize()
        } else {
          alert("Sorry, this search produced no results.");
        }
      })
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
      this.updateOnMap("abc");
    //   this.heading="CONFIRM YOUR AD";
      console.log(this.longitude);
      console.log(this.latitude);
    //
    //   if(this.advert_id != null && this.advert_id != undefined && this.advert_id != '' &&
    // this.latitude != null && this.latitude != undefined && this.latitude != ''
    // && this.longitude != null && this.longitude != undefined && this.longitude != ''){
    //         this.appService.advertlocation(this.advert_id,this.latitude,this.longitude).subscribe(data=>{
    //           console.log(data);
    //           if(data['result']){
    //             this.hid=false;
    //             this.confhid=true;
    //             this.fhid=false;
    //           }
    //
    //         })
    //       }
          }

}


// @Component({
//   selector: 'app-product-map',
//   templateUrl: './product-map.component.html',
//   // styleUrls: ['./product-map/product-map.component.scss'],
//   // encapsulation: ViewEncapsulation.None
// })
// export class ProductMapComponent {
//   constructor(
//     public dialogRef: MatDialogRef<ProductMapComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: Location) {}
// }
