import { Component, OnInit, ViewChild,NgZone } from '@angular/core';
//import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { Data, AppService } from '../../app.service';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
import  * as io from 'socket.io-client';
//import { AccComponent } from './acc/acc.component';


const socket = io('http://celx-dev.herokuapp.com');
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
  selector: 'app-offer_details',
  templateUrl: './offer_details.component.html',
  styleUrls: ['./offer_details.component.scss']
})
export class Offer_detailsComponent implements OnInit {
  @ViewChild('horizontalStepper') horizontalStepper: MatStepper;
  @ViewChild('verticalStepper') verticalStepper: MatStepper;
  @ViewChild(AgmMap) map: AgmMap;

  geocoder:any;

  public myaddoffers:any[];
  public tick:any;
  public cross:any;
  public sale:any[];
  public sellersale:any[];
  public circleRadius:number;
  public currentLat:any;
  public currentLong:any;
  public marker:any;
  public latitude:any;
  public longitude:any;
  // public lat:any;
  // public lng:any;



  constructor(public appService:AppService,public mapsApiLoader: MapsAPILoader,
              private zone: NgZone,
              private wrapper: GoogleMapsAPIWrapper) {
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
socket.on('connect', function(){
console.log("conected")});
socket.on('event', function(data){console.log("evet")});

    // this.findMe();

    // this.tick=("accepted");
    // this.cross=("rejected");
    // //console.log(this.appService.myaddsof);
    // console.log("JSON : ",JSON.parse(sessionStorage.getItem("saved")));
    // this.myaddoffers=JSON.parse(sessionStorage.getItem("saved"));
    //
    // console.log(this.myaddoffers);
    // this.myaddoffers = this.appService.myaddsof;
}


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
    }
    markerDragEnd(m: any, $event: any) {
   this.location.marker.lat = m.coords.lat;
   this.location.marker.lng = m.coords.lng;
   this.findAddressByCoordinates();
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


  //   showPosition(position) {
  //   this.currentLat = position.coords.latitude;
  //   this.currentLong = position.coords.longitude;
  //
  //   let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  //   // this.map.panTo(location);
  //
  //   if (!this.marker) {
  //     this.marker = new google.maps.Marker({
  //       position: location,
  //       map: this.map,
  //       title: 'Got you!'
  //     });
  //   }
  //   else {
  //     this.marker.setPosition(location);
  //   }
  // }
  //
  // showTrackingPosition(position) {
  //   console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
  //   this.currentLat = position.coords.latitude;
  //   this.currentLong = position.coords.longitude;
  //
  //   let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  //   // this.map.panTo(location);
  //
  //   if (!this.marker) {
  //     this.marker = new google.maps.Marker({
  //       position: location,
  //       map: this.map,
  //       title: 'Got you!'
  //     });
  //   }
  //   else {
  //     this.marker.setPosition(location);
  //   }
  // }
  //
  //   findMe() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.showPosition(position);
  //     });
  //   } else {
  //     alert("Geolocation is not supported by this browser.");
  //   }
  // }



ngOnDestroy(){
  sessionStorage.removeItem('saved');
}



// public accept_reject(tick,offerid){
//   var count=0;
//   var sal=[];
//   console.log(offerid)
//   this.appService.accept(offerid,this.tick).subscribe(data=>{
//     console.log("accept_reject adds =>", data);
//     //this.sale=data['result']['sail']['seller_id'];
//     this.sale=data['sail']['_id'];
//     console.log(this.sale);
//     sessionStorage.removeItem('saved');
//     this.appService.getsale(this.sale).subscribe(data=>{
//       sessionStorage.setItem("sellersale", JSON.stringify(data['sail']));
//       console.log("sellersale : ",JSON.parse(sessionStorage.getItem("sellersale")));
//       console.log(data);
//     })
//
//     //this.myfavourite=data['result'];
// })
// }
//
// public accept_reject1(offerid,cross){
//
//   this.appService.reject(offerid,this.cross).subscribe(data=>{
//     console.log("accept_reject adds =>", data);
//     //this.myfavourite=data['result'];
// })
// }
}
