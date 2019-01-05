import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './components/Home/HomePage';
import AdScreen from './components/AdScreen/AdScreen';
import PostAd from './components/PostAd/PostAd';
import EditAd from './components/EditAd/EditAd';
import LoginPage from './components/Login/LoginPage';
import AdminLoginPage from './components/AdminLogin/AdminLoginPage';
import AdminDashBoard from './components/Dashboard/AdminDashBoard';
import AccountSettings from './components/AccountSettings/AccountSettings';
import Verification from './components/Verification/Verification';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import socketIOClient from 'socket.io-client'
import { Observable } from 'rxjs/Observable';
// import { socketStore, socketContext } from 'reactjs-socket.io';
// const { Provider } = socketContext;
// const host = socketStore('https://celx-dev.herokuapp.com')



 var url = require('url');


import EventBus from 'eventing-bus';


const fetch = require('node-fetch');
const urlObj = url.parse(document.location.href, true);
const port = "" ;
const api_url = "https://celx-dev.herokuapp.com";
const token = localStorage.getItem('JWT')



class App extends Component {
  searchjson= [];
  loading = false

  constructor(props) {
    super(props);

    this.loading = false

    this.port = process.env.PORT;

    this.state = {
      endpoint: 'https://celx-dev.herokuapp.com' // this is where we are connecting to with sockets
      }
    if (urlObj.hostname.indexOf("localhost") > -1)
    {

      port = ":1338"
      this.port = ":1338"
    }
    else
    {

      port = ""
      this.port = ""
    }

    console.log("this.PORT", this.port);
    console.log("PORT", port);

    EventBus.on("getAds", this.getAds.bind(this));
    EventBus.on("getEnums", this.getEnums.bind(this));
    EventBus.on("getBrands", this.getBrands.bind(this));
    EventBus.on("getAdDetails", this.getAdDetails.bind(this));

    EventBus.on("getMobileSpecs", this.getMobileSpecs.bind(this));
    EventBus.on("getAccessories", this.getAccessories.bind(this));
    EventBus.on("searchFilters", this.searchFilters.bind(this));
    EventBus.on("searchLocation", this.searchLocation.bind(this));
    EventBus.on("searchKeyword", this.searchKeyword.bind(this));
    EventBus.on("getConditions", this.getConditions.bind(this));
    EventBus.on("getPhysical", this.getPhysical.bind(this));

    EventBus.on("makeoffer", this.makeoffer.bind(this));
    EventBus.on("updateoffer", this.updateoffer.bind(this));
    EventBus.on("counter_offer", this.counter_offer.bind(this));
    EventBus.on("accept_reject", this.accept_reject.bind(this));
    // EventBus.on("getMessages", this.getMessages.bind(this));


    EventBus.on("makeboost", this.makeboost.bind(this));
    EventBus.on("removeboost", this.removeboost.bind(this));
    EventBus.on("add_remove_favourite", this.add_remove_favourite.bind(this));
    EventBus.on("enableDisableAdd", this.enableDisableAdd.bind(this));


    EventBus.on("showLoading", this.showLoading.bind(this));
    EventBus.on("stopLoading", this.stopLoading.bind(this));

    // EventBus.on("sendmessage", this.sendmessage.bind(this));
    // EventBus.on("startchat", this.startchat.bind(this));
    // this.getMessages();
  }

  socketConnection(){
  const socket = socketIOClient(this.state.endpoint)
  console.log("******************"+localStorage.getItem('userid')+"****************");
  console.log("connecting");
  socket.on('connect',function(){
    console.log("+++++++++Conected+++++++");
    socket.emit('user',{user_id:localStorage.getItem('userid')});
    })
  }

  showLoading(msg){
    this.loading = true

    this.setState((state, props) => {
    return {counter: state.counter + props.step};
    })
  }

  stopLoading(msg){
    this.loading = false

    if (msg != undefined)
    {alert(msg)}

    this.setState((state, props) => {
    return {counter: state.counter + props.step};
    })
  }

  componentDidMount() {


    console.log("didMount", "App.js");
    // this.socketConnection();

    this.setState((state, props) => {
    return {counter: state.counter + props.step};
    })


  }

  componentDidUpdate() {

  }

  getMobileSpecs(brand_id){

  console.log("brand id received is",brand_id);
  var request = require("request");
  EventBus.publish("showLoading")

  var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/getMobileSpecs'
  var options = { method: 'POST',
    url: urlPath,
    headers:
     { 'Cache-Control': 'no-cache',
       'Content-Type': 'application/json',
       Authorization: localStorage.getItem('JWT'),},
    body: brand_id,
    json: true };

console.log("Call", options);

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log("Models Received", body.result);

  if (body.result)
  {
    localStorage.setItem('Models', JSON.stringify(body.result));

    EventBus.publish("ModelsReceived")

  }  else{
      console.log("API Result NOT Found");
      EventBus.publish("stoploading")
    }

    EventBus.publish("stoploading")

    });

  }

  sendmessage(chat_to_send){
    // console.log(chat_to_send)
    // var advert_id = chat_to_send.advert_id
    // var hisId = chat_to_send.hisId
    // var myId = chat_to_send.myId
    // var text = chat_to_send.text
    // console.log(advert_id,hisId,myId,text);
    // const socket = socketIOClient(this.state.endpoint)
    // socket.emit('room',{myId:myId,hisId:hisId,advert_id:advert_id,text:text});
    // console.log("chatsent");

  }
  startchat(start){
  // console.log("start",start);
  // var advert_id = start.advert_id
  // var hisId = start.hisId
  // var myId = start.myId
  // console.log(advert_id,hisId,myId);
  // const socket = socketIOClient(this.state.endpoint)
  // socket.emit('startchat',{myId:myId,hisId:hisId,advert_id:advert_id});
  // console.log("chatstarter");
  }

  getMessages() {
    // let observable = new Observable(observer => {
    //   const socket = socketIOClient(this.state.endpoint)
    //   socket.on('room', (data) => {
    //     observer.next(data.chat);
    //     console.log(data);
    //   });
    //   return () => {
    //     socket.disconnect();
    //   };
    // })
    // return observable;
  }


  getAdDetails(advert){
  var advert_id = advert.advert_id
  console.log("advert_id", advert_id);

  var userId = localStorage.getItem("userid")
  var request = require("request");
  var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/getAdvertismentDetatils'
  console.log("userid",userId);

  var options = { method: 'POST',
    url: urlPath,
    headers:
     { 'Cache-Control': 'no-cache',
       'Content-Type': 'application/json' },
    body: {advert_id:advert_id, user_id:userId},
    json: true };

console.log("Call", options);

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log("Ad Received", body.result);
      localStorage.setItem('ad_for_chat', body.result)
      if (body.result)
      {
        var id = body.result._id
        // localStorage.setItem('AD-'+id, JSON.stringify(body.result));

        EventBus.publish('AD-'+id,  body.result)

      }  else{
          console.log("API Result NOT Found");
        }


    });

  }
  getConditions(){

  console.log("getting conditions in app.js",);
  var request = require("request");
  var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port  + '/api/getAllConditions'
  var options = { method: 'POST',
    url: urlPath,
    headers:
     { 'Cache-Control': 'no-cache',
       'Content-Type': 'application/json',
       Authorization: localStorage.getItem('JWT'),
     },
    body: {},
    json: true };

console.log("Call", options);

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log("Conditions Received", body.result);

      if (body.result)
      {
        var id = body.result._id
        localStorage.setItem('Conditions', JSON.stringify(body.result));
        console.log("Conditions set")
        EventBus.publish('Conditions',  body.result)

      }  else{
          console.log("API Result NOT Found");
        }


    });

  }

  getAccessories(){

  console.log("getting accessories in app.js",);
  var request = require("request");
  var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port  + '/api/getAllPhysicalIssues/accessories'
  var options = { method: 'POST',
    url: urlPath,
    headers:
     { 'Cache-Control': 'no-cache',
       'Content-Type': 'application/json',
       Authorization: localStorage.getItem('JWT'),
     },
    body: {},
    json: true };

    console.log("Call", options);

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log("Accessories Received", body.result);
      if (body.result)
      {
        var id = body.result._id
        localStorage.setItem('Accessories', JSON.stringify(body.result));
        console.log("Accessories Received", localStorage.getItem('Accessories'));

        EventBus.publish('Accessories',  body.result)
      }  else{
          console.log("API Result NOT Found");
        }
    });
  }
  getPhysical(){

  console.log("getting PhysicalConditions in app.js",);
  var request = require("request");
  var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port  + '/api/getAllPhysicalIssues/issues'
  var options = { method: 'POST',
    url: urlPath,
    headers:
     { 'Cache-Control': 'no-cache',
       'Content-Type': 'application/json',
       Authorization: localStorage.getItem('JWT'),
     },
    body: {},
    json: true };

    console.log("Call", options);

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log("Physical Received", body.result);
      if (body.result)
      {
        var id = body.result._id
        localStorage.setItem('PhysicalConditions', JSON.stringify(body.result));
        EventBus.publish('PhysicalConditions',  body.result)
      }  else{
          console.log("API Result NOT Found");
        }
    });
  }
  placeAdd(type, brandName, deviceDetails, imei, title, price, description, color, storage, condition, age){
    console.log("DAta for place add received");
    var request = require("request");
    var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/placeAdd'

    var options = { method: 'POST',
    url: urlPath,
    headers:
    { 'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('JWT'),},
    body: {type:type,
          brandName:brandName,
          deviceDetails: deviceDetails,
          imei: imei,
          title: title,
          price: price,
          description: description,
          color: color,
          storage: storage,
          condition: condition,
          age: age
},
    json: true };

    console.log("Call", options);

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log("result Received", body.result);

      if (body.result)
      {
        var id = body.result._id
        localStorage.setItem('AdPosted', JSON.stringify(body.result));

      }  else{
        console.log("API Result NOT Found");
      }


    });

  }
  getBrands()
  {

    var userId = ""
    if (localStorage.getItem("userid") != null)
    {
      userId = localStorage.getItem("userid")
      console.log("Found User: ", userId);
    }

    var request = require("request");


    var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port +  '/getMobileBrands'

    console.log("Calling", urlPath);
    var options = { method: 'POST',
      url: urlPath,
      headers:
       { 'Cache-Control': 'no-cache',
         'Content-Type': 'application/json' },
      json: true };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log("All Brands Received", body.result);
      localStorage.setItem('brands', JSON.stringify(body.result));

      EventBus.publish("brandsReceived", true)

    });

  }

  getEnums()
  {

    var userId = ""
    if (localStorage.getItem("userid") != null)
    {
      userId = localStorage.getItem("userid")
      console.log("Found User: ", userId);
    }

    var request = require("request");

    var urlPath = urlObj.protocol + '//' + urlObj.hostname+ this.port + "/getEnums"//urlObj.protocol + '//' + urlObj.hostname+ this.port + '/getEnums'

console.log("Calling", urlPath);
    var options = { method: 'POST',
      url: urlPath,
      headers:
       { 'Cache-Control': 'no-cache',
         'Content-Type': 'application/json' },
      body: { user_id: userId },
      json: true };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log("Enums Received", body.result);
      localStorage.setItem('enums', JSON.stringify(body.result));

      EventBus.publish("enumsReceived", true)

    });

  }


  callApi = async () => {
      const response = await fetch('/searchFilter');
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body;
    };

  getAds(type) {
    EventBus.publish("showLoading")

    this.json = {}
    console.log(type);
    var user_id = undefined
    if (localStorage.getItem('userid') != null){
      this.json.user_id = localStorage.getItem('userid')
    }
    if (type != undefined)
    {
      console.log(this.searchjson.lat);
      this.json.type = type.type
      this.json.brandName = this.searchjson.brandName
      this.json.priceEnd = this.searchjson.priceEnd
      this.json.priceStart = this.searchjson.priceStart
      this.json.ageStart = this.searchjson.ageStart
      this.json.ageEnd = this.searchjson.ageEnd
      this.json.keyword = this.searchjson.keyword
      this.json.lat = undefined
      this.json.lng = undefined
      this.json.distance = undefined
      if(this.searchjson.lat !== undefined){
      this.json.lat = this.searchjson.lat
      this.json.lng = this.searchjson.lng
      this.json.distance = this.searchjson.distance

    }
    }else {
      this.json.type = "mobile"
    }
    if(localStorage.getItem('userid') != '' && localStorage.getItem('userid')){
     this.json.user_id = localStorage.getItem('userid')
   }
    console.log("Getting Ads for Json", this.json);
    var request = require("request");
    var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/searchFilter'

    console.log("Calling", urlPath);
    var options = { method: 'POST',
      url: urlPath,
      headers: { 'Cache-Control': 'no-cache' },
      body: this.json,
      json: true };
      console.log(options);

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log("Results Received", body.result);
      if (body.result.length == 0 && localStorage.getItem('adsResult') == '')
      {
        console.log("if length is empty");
        localStorage.setItem('adsResult', []);
      }
      else {
        console.log("if length i not empty");
        localStorage.setItem('adsResult', JSON.stringify(body.result));
      }
      EventBus.publish("adResult", true)
      EventBus.publish("stopLoading")
    });

  }
  searchFilters(brandName,priceStart,priceEnd,type,ageStart,ageEnd){
  var user_id = undefined
  if (localStorage.getItem('userid') != null){
    user_id = localStorage.getItem('userid')
  }
  EventBus.publish("showLoading")
  console.log("getting filters in app.js",);
  var request = require("request");
  var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port  + '/searchFilter'
  console.log(brandName)
  console.log(priceStart)
  console.log(priceEnd)
  // fetch(urlPath, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body:{
  //     brandName
  //   },
  //   json: true
  // })
  //     .then(res => {
  //       return res;
  //       res.json()})
  //     .then(
  //       (result) => {
  //         console.log("Results Received", result);
  //         this.setState({
  //           isLoaded: true,
  //         });
  //       },
  //       (error) => {
  //         console.log(error);
  //         this.setState({
  //           isLoaded: true,
  //           error
  //         });
  //       }
  //     )
  if(brandName != null && brandName != undefined && brandName != ''){
    this.searchjson = brandName;
  }
  var keyword = localStorage.getItem('searchkeyword');
  console.log(keyword)
  console.log(this.searchjson)

  var options = { method: 'POST',
  url: urlObj.protocol + '//' + urlObj.hostname+ this.port  + '/searchFilter',
  headers:
  { 'Cache-Control': 'no-cache'
  },
  body: {lat:this.searchjson.lat, lng:this.searchjson.lng, distance:this.searchjson.distance, brandName:this.searchjson.brandName, type:this.searchjson.type, priceEnd:this.searchjson.priceEnd, priceStart:this.searchjson.priceStart, ageStart:this.searchjson.ageStart, ageEnd:this.searchjson.ageEnd, keyword:this.searchjson.keyword,user_id:user_id},
  json: true };

  console.log("Call", options);
  request(options, (error, response, body) => {
    if (error) {
      console.log("error : ",error)
    }
    console.log("Results Received", body.result);
    if (body.result.length == 0 && localStorage.getItem('adsResult') == '')
    {
      localStorage.setItem('adsResult', []);
    }
    else {
      localStorage.setItem('adsResult', JSON.stringify(body.result));
    }
    localStorage.removeItem('keyword');
    EventBus.publish("adResult", true)
    EventBus.publish("stopLoading")
    });
    }

    searchKeyword(){
    EventBus.publish("showLoading")
    console.log("getting filters in app.js",);
    var user_id = undefined
    if (localStorage.getItem('userid') != null){
      user_id = localStorage.getItem('userid')
    }
    var request = require("request");
    var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port  + '/searchFilter'
    // if(brandName != null && brandName != undefined && brandName != ''){
    //   var searchjson = brandName;
    // }
    var keyword = localStorage.getItem('searchkeyword');
    if(keyword != null && keyword != undefined && keyword != ''){
      console.log(keyword)
      this.searchjson['keyword'] = keyword;
      console.log("after adding keyword",this.searchjson)

    }
    console.log(this.searchjson)
    var options = { method: 'POST',
    url: urlObj.protocol + '//' + urlObj.hostname+ this.port  + '/searchFilter',
    headers:
    { 'Cache-Control': 'no-cache'
    },
    body: {lat:this.searchjson.lat, lng:this.searchjson.lng, distance:this.searchjson.distance, brandName:this.searchjson.brandName, type:this.searchjson.type, priceEnd:this.searchjson.priceEnd, priceStart:this.searchjson.priceStart,ageStart:this.searchjson.ageStart, ageEnd:this.searchjson.ageEnd, keyword:this.searchjson.keyword,user_id:user_id},
    json: true };

    console.log("Call", options);
    request(options, (error, response, body) => {
      if (error) {
        console.log("error : ",error)
      }
      console.log("Results Received", body.result);
      if (body.result.length == 0 && localStorage.getItem('adsResult') == '')
      {
        localStorage.setItem('adsResult', []);
      }
      else {
        localStorage.setItem('adsResult', JSON.stringify(body.result));
      }
      localStorage.removeItem('keyword');
      EventBus.publish("adResult", true)
      EventBus.publish("stopLoading")

      });
      }

      searchLocation(lat,lng,distance){
      console.log("app js search locaation",this.searchjson)

      console.log("getting locations in app.js", lat);
      var user_id = undefined
      if (localStorage.getItem('userid') != null){
        user_id = localStorage.getItem('userid')
      }

      var request = require("request");
      var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port  + '/searchFilter'
      // if(brandName != null && brandName != undefined && brandName != ''){
      //   var searchjson = brandName;
      // }
      var location = localStorage.getItem('searchLocation');
      this.searchjson.lat = lat.lat;
      this.searchjson.lng = lat.lng;
      this.searchjson.distance = lat.distance;
      console.log(this.searchjson);
      if(this.searchjson.type){

      }else{
        this.searchjson.type = "mobile";
      }
      console.log("after adding locations",this.searchjson)

      var options = { method: 'POST',
      url: urlObj.protocol + '//' + urlObj.hostname+ this.port  + '/searchFilter',
      headers:
      { 'Cache-Control': 'no-cache'
      },
      body: {lat:lat.lat, lng:lat.lng, distance:this.searchjson.distance, brandName:this.searchjson.brandName, type:this.searchjson.type, priceEnd:this.searchjson.priceEnd, priceStart:this.searchjson.priceStart, ageStart:this.searchjson.ageStart, ageEnd:this.searchjson.ageEnd, keyword:this.searchjson.keyword,user_id:user_id},
      json: true };

      console.log("Call", options);
      request(options, (error, response, body) => {
        if (error) {
          console.log("error : ",error)
        }
        console.log("Results Received", body.result);
        if (body.result.length == 0 && localStorage.getItem('adsResult') == '')
        {
          localStorage.setItem('adsResult', []);
        }
        else {
          localStorage.setItem('adsResult', JSON.stringify(body.result));
        }
        localStorage.removeItem('keyword');
        EventBus.publish("adResult", true)
        });
        }
      makeoffer(offer){

        console.log("getting offer in app.js", offer);

        var request = require("request");
        var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port  + '/api/makeOffer'

        var options = { method: 'POST',
        url: urlObj.protocol + '//' + urlObj.hostname+ this.port  + '/api/makeOffer',
        headers:
        { 'Cache-Control': 'no-cache',
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('JWT'),},
        body: offer,
        json: true };

        console.log("Call", options);
        request(options, (error, response, body) => {
          if (error) {
            console.log("error : ",error)
          }
          if(body){
            // localStorage.setItem('AD-'+this.advert_id, JSON.stringify(body.ad));
            console.log("Results Received", body);
            toast.error("Offer Made", {
              autoClose: 3000,
              position: toast.POSITION.TOP_LEFT
            });
            // window.location.reload();

          }
          });
      }

      updateoffer(offer){

        console.log("getting offer in app.js", offer);

        var request = require("request");
        var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port  + '/api/updateOfferCreatedBySelf'

        var options = { method: 'POST',
        url: urlObj.protocol + '//' + urlObj.hostname+ this.port  + '/api/updateOfferCreatedBySelf',
        headers:
        { 'Cache-Control': 'no-cache',
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('JWT'),},
        body: offer,
        json: true };

        console.log("Call", options);
        request(options, (error, response, body) => {
          if (error) {
            console.log("error : ",error)
          }
          if(body){
            // localStorage.setItem('AD-'+this.advert_id, JSON.stringify(body.ad));
            console.log("Results Received", body);
            // window.location.reload();

          }

          });
      }
      counter_offer(offer){

        console.log("getting offer in app.js", offer);

        var request = require("request");
        var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port  + '/api/createCounterOffer'

        var options = { method: 'POST',
        url: urlObj.protocol + '//' + urlObj.hostname+ this.port  + '/api/createCounterOffer',
        headers:
        { 'Cache-Control': 'no-cache',
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('JWT'),},
        body: offer,
        json: true };

        console.log("Call", options);
        request(options, (error, response, body) => {
          if (error) {
            console.log("error : ",error)
          }
          if(body){
            // localStorage.setItem('AD-'+this.advert_id, JSON.stringify(body.ad));
            console.log("Results Received", body);
            EventBus.publish("getmyAdsOffers");

          }

          });
      }

      accept_reject(action){

        console.log("getting offer in app.js", action);

        var request = require("request");
        var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port  + '/api/acceptRejectOffer'

        var options = { method: 'POST',
        url: urlObj.protocol + '//' + urlObj.hostname+ this.port  + '/api/acceptRejectOffer',
        headers:
        { 'Cache-Control': 'no-cache',
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('JWT'),},
        body: action,
        json: true };

        console.log("Call", options);
        request(options, (error, response, body) => {
          if (error) {
            console.log("error : ",error)
          }
          if(body){
            // localStorage.setItem('AD-'+this.advert_id, JSON.stringify(body.ad));
            console.log("Results Received", body);

          }

          });
      }

    removeboost(boost){
      console.log("boost details in app.js" ,boost);
      var request = require("request");
      var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/boostAdverisement'
      var remove = false;
      var options = { method: 'POST',
      url: urlPath,
      headers:
      { 'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('JWT'),},
      body: boost,
      json: true };
      console.log("Call", options);

      request(options,  (error, response, body)=> {
        if (error) throw new Error(error);
        alert("Something Went Wrong")

        console.log(body)
        if (body){
          console.log("boost changed", body);
          // localStorage.setItem('AD-'+this.advert_id, JSON.stringify(body.ad));
        }else{
          console.log("API Result NOT Found");
        }
      });

      this.setState((state, props) => {
      return {counter: state.counter + props.step};
      })
    }
    makeboost(boost){
      console.log("boost details in app.js" ,boost);

    var request = require("request");
    var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/boostAdverisement'
    var add= 'true';
    console.log(add);
    var options = { method: 'POST',
    url: urlPath,
    headers:
    { 'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('JWT'),},
    body: boost,
    json: true };
    console.log("Call", options);

    request(options,  (error, response, body)=> {
      if (error) throw new Error(error);

      console.log(body)
      if (body){
        console.log("boost changed", body);
        window.location.reload();
        // localStorage.setItem('AD-'+this.advert_id, JSON.stringify(body.ad));
      }else{
        console.log("API Result NOT Found");
      }
    });

    this.setState((state, props) => {
    return {counter: state.counter + props.step};
    })
    }

    add_remove_favourite(favourite){

      if(localStorage.getItem('JWT') != undefined && localStorage.getItem('JWT') != ''){
      EventBus.publish("showLoading")
      console.log("add favourites",favourite);
      var request = require("request");
      var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/addFavouriteAdds'
      var options = { method: 'POST',
      url: urlPath,
      headers:
      { 'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('JWT'),},
      body: favourite,
      json: true };
      console.log("Call", options);

      request(options,  (error, response, body)=> {
        if (error) throw new Error(error);
        console.log(body)
        if (body.message){
          console.log("favourite changed", body.message);
          console.log("favourite changed", body.ad);
          // window.location.reload();
          // localStorage.setItem('AD-'+this.advert_id, JSON.stringify(body.ad));
          this.setState((state, props) => {
          return {counter: state.counter + props.step};
          })
        }else{
          console.log("API Result NOT Found");
        }
      });
      this.setState((state, props) => {
      return {counter: state.counter + props.step};
      })
      EventBus.publish("stopLoading")

    }else{
        toast.error("Please Login First", {
          autoClose: 3000,
          position: toast.POSITION.TOP_LEFT
        });
    }
    }

    enableDisableAdd(enable_disable){

      EventBus.publish("showLoading")
          var advert_id = enable_disable.advert_id.toString()
          console.log(advert_id);
          var request = require("request");
          var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/enableDisableAdd'

          var options = { method: 'POST',
          url: urlPath,
          headers:
          { 'Cache-Control': 'no-cache',
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('JWT'),},
          body: {advert_id:advert_id},
          json: true };

          console.log("Call", options);

          request(options,  (error, response, body)=> {
            if (error) throw new Error(error);
            if (body.result){
              console.log("result Received", body);
              // window.location.reload();
              EventBus.publish("stopLoading")
            }else{
              console.log("API Result NOT Found");
            }
          });
    }


  render() {

    return (


      // <LoginPage />

      <Router>
        <div className="App">

          <div className="Overlay">
            <div className="AllPages">
              <Route exact path="/" component={Home} />
              <Route exact path="/ad/:id" component={AdScreen} />
              <Route exact path="/postad" component={PostAd} />
              <Route exact path="/postad/:id" component={PostAd} />
              <Route exact path="/editad" component={EditAd} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/admin" component={AdminLoginPage} />
              <Route exact path="/accounts" component={AccountSettings} />
              <Route exact path="/accounts/:id" component={AccountSettings} />
              <Route exact path="/dashboard" component={AdminDashBoard} />
              <Route exact path="/dashboard/:id" component={AdminDashBoard} />
              <Route exact path="/verification" component={Verification} />
            </div>
            <div className="loading"  hidden={!this.loading} >

            </div>
          </div>
          <ToastContainer />
        </div>
      </Router>
    );
  }
}

export default App;
