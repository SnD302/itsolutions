import React, { Component } from 'react';
import HomeHeaderBar from '../HomeHeaderBar/HomeHeaderBar'
import EventBus from 'eventing-bus';
import { Image,Glyphicon,InputGroup } from 'react-bootstrap';
import { withRouter,BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Accordion, AccordionItem } from 'react-sanfona';
import FileInput  from 'react-file-input';
import Checkbox from 'rc-checkbox';
import { createGeoInput, DefaultGeoInput } from 'react-geoinput';
import PropTypes from 'prop-types';
import axios, { post } from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Geocode from "react-geocode";

var url = require('url');
import './EditAd.css';

const manuCallback = function(object) {}
const SimpleInput = createGeoInput(DefaultGeoInput);
const fetch = require('node-fetch');
const urlObj = url.parse(document.location.href, true);
const port = "" ;
var searcharea = []
var lat = []
var lng = []
var phoneswitch = '';


  const BarebonesGeoInput = ({
    addressInput,
    loadingGeoDestination,
    geoDestinationInput,
    onPredictionClick,
    predictions,
  }) => (
    <div>
      <input className={"input"} {...addressInput} />

      {loadingGeoDestination && <div style={{ marginTop: 10 }}>Loading destination ...</div>}

      <hr />

      <div>
        <div>
          {!!predictions && !!predictions.length ? predictions.map((prediction, index) => (
            <div className={"locationsdrop"} key={index} >
            <span className={"locationsdropdown"} onClick={() => onPredictionClick(index)}>
              {JSON.stringify(prediction.description)}
              </span>
            </div>
          )) : ''}
        </div>
      </div>

    </div>
  );

  BarebonesGeoInput.propTypes = {
    addressInput: PropTypes.shape({
      onChange: PropTypes.func.isRequired,
      value: PropTypes.string,
    }).isRequired,
    loadingGeoDestination: PropTypes.bool.isRequired,
    geoDestinationInput: PropTypes.shape({
      value: PropTypes.object,
    }).isRequired,

    onPredictionClick: PropTypes.func.isRequired,
    // onChange: () => {this.searcharea = this.state.geoDestination },
    predictions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.node,
      onClick: PropTypes.func,
    })).isRequired,
  };

const DemoInput = createGeoInput(BarebonesGeoInput);

Geocode.enableDebug();
Geocode.setApiKey("AIzaSyAmJXP-luQXB68lchXN2Wm9oe40MuxzHHI");
class EditAd extends Component {

  state = {
      open: false,
      address: '',
      geoDestination: undefined,
    }
    onAddressChange = value => this.setState({ address: value })
    onGeoDestinationChange = value => this.setState({ geoDestination: value })


  colorData = []
  storageData = []
  conditionsData = []
  accessoriesData = []
  physicalData = []
  agenames = []
  newad_id= []
  mycurrency ="-"
  displaylocaccord = []
  displayverifyaccord = []
  forverification = []
  verify_display = []
  file = []
  file1 = []
  file2 = []
  file3 = []
  adtitle = []
  title = []
  device_name = ''
  imageSrc: string;
  locationaccord = false;
  verifyaccord = false;
  for_edit_ad = []
  type = []
  brand_id = []
  model = []
  advert_id = []
  adlat = []
  adlng = []
  ad_address = []
  imei_for_accessory = true;
  color_storage_accessory = true;
  condition_accessory = true;
  // edit_price = []
  // edit_imei = []
  // edit_description =[]
  // edit_color =[]
  // edit_storage =[]
  // edit_condition =[]
  edit_age =[]
  edit_accessories = []
  edit_physical = []
  accessoriesArray = []
  accesschecks = []
  physchecks =[]
  phoneswitch= []
  phoneDead_box = []
  button_switch_accessory = []
  age = [
    {"name":"Brand New", "count": -1},
    {"name":"Less Than a Year", "count": 0},
    {"name":"1 Year", "count":1},
    {"name":"2 Years", "count":2},
    {"name":"3 Years", "count":3},
    {"name":"4 Years", "count":4},
    {"name":"5 Years", "count":5},
    {"name":"6 Years", "count":6},
    {"name":"7 Years", "count":7},
    {"name":"Greater Than 7", "count":8}
];

  getCond_Acc_phy = () =>
  {
    EventBus.publish("getAccessories");
    EventBus.publish("getPhysical");
    EventBus.publish("getConditions");
    console.log("conditions in postad.js")
    var conditions;
    var accessories;
    var physical;

      console.log("conditions in postad.js ((IF))")
      conditions = JSON.parse(localStorage.getItem("Conditions"))
      accessories = JSON.parse(localStorage.getItem("Accessories"))
      physical = JSON.parse(localStorage.getItem("PhysicalConditions"))
      console.log("conditions", conditions);
      console.log("accessories", accessories);
      console.log("physical", JSON.parse(localStorage.getItem("PhysicalConditions")));

        var con = []
        var acc = []
        var phy = []

        conditions.forEach(function(i,idx,n){
          con.push(
          <option className="name" value={i._id}>
          {i.title}
          </option>
          )
        })
        accessories.forEach((i,idx,n) =>{


          console.log("Checking " + i._id, "in", this.edit_accessories);
          acc.push(
            <p><label >
            <Checkbox name="my-checkbox" onChange={this.onChangeaccess} value={i._id} defaultChecked={this.edit_accessories.indexOf(i._id) != -1}  />
            <span className="name"> {i.title}</span>
            </label></p>
          )
        })
        physical.forEach((i,idx,n) =>{
          phy.push(
            <p><label >
            <Checkbox name="my-checkbox" onChange={this.onChangePhysical} value={i._id} defaultChecked={this.edit_physical.indexOf(i._id) != -1} />
            <span className="name"> {i.title}</span>
            </label></p>
          )
        })
        this.physicalData = phy
        this.accessoriesData = acc
        this.conditionsData = con

        this.accesschecks = this.edit_accessories.split(/[,]+/)
        delete this.accesschecks[0]
        var newse = []
        this.accesschecks.forEach((i,idx,n) =>{
            newse.push(i);
        })
        this.accesschecks = newse

        this.physchecks = this.edit_physical.split(/[,]+/)
        delete this.physchecks[0]
        var newphy = []
        this.physchecks.forEach((i,idx,n) =>{
            newphy.push(i);
        })
        this.physchecks = newphy

  }

  onChangeaccess =(e) => {

    // console.log('Checkbox checked:', (e.target.checked));
    console.log("**Edit Ids", this.accesschecks)

    console.log('Checkbox checked:', (e));
    if(e.target.value == -1){
      console.log(e.target.value)
    }
    console.log(this.accesschecks);
    if(e.target.checked == true){
      // checks = checks.concat(e.target.value);
      this.accesschecks.push(e.target.value);
      console.log('final checked:', this.accesschecks);
    } else if(e.target.checked == false){
      //checks.pull(e.target.value);
      console.log("in false")
      var accessfinalCheck = [];
      this.accesschecks.forEach((i,idx,x)=>{
        console.log(i , e.target.value)
        if(i+"" == e.target.value+""){
          console.log("matched")
        }else{
          accessfinalCheck.push(i);
        }
        if(idx == x.length-1){
          this.accesschecks = accessfinalCheck;
          console.log("final check : ", accessfinalCheck);
          console.log(this.accesschecks);
        }
      })
  //    checks.splice(e.target.value );
      console.log('final checked:', this.accesschecks);
    }
    console.log('final checked:', this.accesschecks);

  }

  phonedeadcheck =(e)=>{
  if(e.target.checked == true){
    this.phoneswitch = true;
    console.log('Checkbox checked:', this.phoneswitch);
  }else if(e.target.checked == false){
    this.phoneswitch = false;
    console.log('Checkbox checked:', this.phoneswitch);
  }
  }

  onChangePhysical =(e)=> {
    console.log('Checkbox checked:', (e.target.checked));
    console.log('Checkbox checked:', (e.target.value));
    if(e.target.value == -1){
      console.log(e.target.value)
    }
    console.log(this.physchecks);
    if(e.target.checked == true){
      // checks = checks.concat(e.target.value);
      this.physchecks.push(e.target.value);
      console.log('final checked:', this.physchecks);
    } else if(e.target.checked == false){
      console.log("in false")
      var physfinalchecks = [];
      this.physchecks.forEach((i,idx,x)=>{
        console.log(i , e.target.value)
        if(i+"" == e.target.value+""){
          console.log("matched")
        }else{
          physfinalchecks.push(i);
        }
        if(idx == x.length-1){
          this.physchecks = physfinalchecks;
          console.log("final check : ", physfinalchecks);
          console.log(this.physchecks);
        }
      })
      console.log('final checked:', this.physchecks);
    }
    console.log('final checked:', this.physchecks);

  }

  EnumsReceived()
  {

    var enums;

    if (localStorage.getItem("enums") != null)
    {

      enums = JSON.parse(localStorage.getItem("enums"))

      console.log("enums", JSON.parse(localStorage.getItem("enums")));

        // var category = this.enums.category;
        // console.log("Category Details", category);
        var category = enums.category
        console.log("categories" , category)
        var color = enums.color
        console.log("colors" , color)
        var storage = enums.storage
        console.log("storage" , storage)
        var cc = []
        var check= []
        var col = []
        var sto = []
        var ag = []

        color.forEach(function(i,idx,n){

          col.push(
          <option className="name" value={i} >
          {i}
          </option>
          )

        })
        storage.forEach(function(i,idx,n){
          sto.push(
          <option className="name" value={i + " GB"} >
          {i} GB
          </option>
          )

        })
        this.age.forEach(function(i,idx,n){
          ag.push(
          <option className="name" value={i.count}>
          {i.name}
          </option>
          )

        })

        this.colorData = col
        this.storageData = sto
        this.agenames = ag
        this.setState((state, props) => {
        return {counter: state.counter + props.step};
        })
    }


  }
  constructor(props){
  // this.locationaccord = false;
  super(props)
  this.state = {
    activeClickedItems: [0],
    activeClickedItems_first : true,
    activeClickedItems_second : false,
    activeClickedItems_third : false,
    activeClickedItems_location : true,
    activeClickedItems_verify : true,
    result: ''
  };

  this.toggleActive = this.toggleActive.bind(this);
  this.handleClick = this.handleClick.bind(this);
  this.port = process.env.PORT;

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
  if(sessionStorage.getItem('edit_Ad') != '' && sessionStorage.getItem('edit_Ad') != null && sessionStorage.getItem('edit_Ad') != undefined){
    this.for_edit_ad = JSON.parse(sessionStorage.getItem('edit_Ad'));
    this.edit_ad_values();

  }
  this.getCond_Acc_phy();

}
toggleActive(index) {
  const position = this.state.activeClickedItems.indexOf(index);

  if (position !== -1) {
    this.setState({ activeClickedItems: [] });
  } else {
    this.setState({ activeClickedItems: [index] });
  }
}
handleClick({ activeItems }) {
  this.setState({ activeClickedItems: activeItems });
}

getaddress(){
  EventBus.publish("showLoading")

  console.log("this is address",this.adlat, this.adlng);

  Geocode.fromLatLng(this.adlng, this.adlat).then(
    response => {
      console.log("location response is",response);
      if(response.results != undefined && response.results != ''){
        if(response.results[0].address_components.length > 8 && response.results[0].address_components[5].short_name != undefined && response.results[0].address_components[5].short_name != ''){
          this.ad_address = response.results[0].address_components[5].long_name;
          this.state.address = this.ad_address
          this.state.geoDestination = this.ad_address
          console.log(this.state.geoDestination);
          console.log(this.state.address);
      }else if(response.results[0].address_components.length > 3 && response.results[0].address_components[4].short_name != undefined && response.results[0].address_components[4].short_name != ''){
          this.ad_address = response.results[0].address_components[4].long_name;
          this.state.address = this.ad_address
          this.state.geoDestination = this.ad_address
          console.log(this.state.geoDestination);
          console.log(this.state.address);
        }else if(response.results[0].address_components[0].short_name != undefined && response.results[0].address_components[0].short_name != ''){
          this.ad_address = response.results[0].address_components[0].long_name;
          this.state.address = this.ad_address
          this.state.geoDestination = this.ad_address
          console.log(this.state.geoDestination);
          console.log(this.state.address);
        }else{
          this.ad_address = "Cannot find the Location"

        }

      }

      console.log("this is address",this.ad_address);
      EventBus.publish("stopLoading")

    },
    error => {
      console.error("this is error",error);
      EventBus.publish("stopLoading")

    }
  );

}


handleFileInput = (e) => {
  console.log("filename ::", e.target.files[0]);
  this.file = e.target.files[0];
  this.file1 = e.target.files[1];
  this.file2 = e.target.files[2];
  this.file3 = e.target.files[3];
  console.log(this.file);
  console.log(this.file1);
  console.log(this.file2);
  console.log(this.file3);
  var picdata = new FormData();
  picdata.append('userFile', 'e.target.files[0]');
  picdata.has('userFile'); // Returns true
  console.log(picdata.has('userFile'));

  EventBus.publish("showLoading")
  const showfile = e.target.files[0];
  const reader = new FileReader();
  console.log(reader.result);
  reader.onload = e => this.imageSrc = reader.result;
  reader.readAsDataURL(showfile);
  console.log(this.imageSrc);
  EventBus.publish("stopLoading")


}
handleChange = (event) => {

  this.setState({[event.target.name]: event.target.value});
  console.log(event.target.value);
  console.log(event.target.name);
}




handleButton = (event) => {
  console.log("Category", this.type);
  console.log("brand id",this.brand_id);
  console.log("device id",this.model);
  console.log("IMEI",this.state.imei);
  console.log("title",this.adtitle);
  console.log("price",this.state.price);
  console.log("desxription",this.state.description);
  console.log("color",this.state.color);
  console.log("storage",this.state.storage );
  console.log("condition",this.state.condition);
  console.log("age",this.state.age_selected);
  console.log("filess",this.file);
  console.log("phonedead",this.phoneswitch);
  console.log("access",this.accesschecks);
  console.log("physc",this.physchecks);

    this.state.activeClickedItems_third = false
    this.state.activeClickedItems_first = false
    this.state.activeClickedItems_second = false
    this.state.activeClickedItems_location = true

  if(this.type == "accessories"){
    var request = require("request");
    var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/placeAdd'

    var options = { method: 'POST',
    url: urlPath,
    headers:
    { 'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('JWT'),},
    body: {type:this.type,
          brand_id:this.brand_id,
          title: this.adtitle,
          price: this.state.price,
          description: this.state.description,
          age: this.state.age_selected,
          advert_id:this.advert_id,
  },

    json: true };

    console.log("Call", options);

    request(options,  (error, response, body)=> {
      if (error) throw new Error(error);
      if(body){
        console.log("displaying next accordion")
        EventBus.publish("showLoading")
        this.locationaccord = true;
        toast.success("Update Your Location !", {
            autoClose: 2000,
            position: toast.POSITION.TOP_CENTER
          });
        // this.displaylocaccord = this.locationaccordion
        EventBus.publish("stopLoading")
      }
      if (body.result)
      {
        localStorage.setItem('AdPosted', JSON.stringify(body.result));
        console.log("result Received", body.result);
        this.newad_id = body.result._id
        console.log("file sending", this.newad_id);

        console.log("file sending", this.file);
        if(this.file != undefined && this.file != '' && this.file != null){
            console.log("sending to fileupload")
            this.filetoupload()
        }else{
          console.log("file was missing")
        }
      }  else{
        console.log("API Result NOT Found");
      }
    });

  }else{

  var request = require("request");
  var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/placeAdd'

  var options = { method: 'POST',
  url: urlPath,
  headers:
  { 'Cache-Control': 'no-cache',
  'Content-Type': 'application/json',
  Authorization: localStorage.getItem('JWT'),},
  body: {type:this.type,
        brandName:this.brand_id,
        deviceDetails: this.model,
        imei: this.state.imei,
        title: this.adtitle,
        price: this.state.price,
        description: this.state.description,
        color: this.state.color,
        storage: this.state.storage,
        condition: this.state.condition,
        age: this.state.age_selected,
        phoneDead:this.phoneswitch,
        physicalIssues:this.physchecks,
        accessories:this.accesschecks,
        advert_id:this.advert_id,
},


  json: true };

  console.log("Call", options);

  request(options,  (error, response, body)=> {
    if (error) throw new Error(error);
    if(body){
      console.log("displaying next accordion")
      EventBus.publish("showLoading")
      this.locationaccord = true;
      toast.success("Update Your Location !", {
          autoClose: 2000,
          position: toast.POSITION.TOP_CENTER
        });
      // this.displaylocaccord = this.locationaccordion
      EventBus.publish("stopLoading")
    }
    if (body.result)
    {
      localStorage.setItem('AdPosted', JSON.stringify(body.result));
      console.log("result Received", body.result);
      this.newad_id = body.result._id
      console.log("file sending", this.newad_id);

      console.log("file sending", this.file);
      if(this.file != undefined && this.file != '' && this.file != null){
          console.log("sending to fileupload")
          this.filetoupload()
      }else{
        console.log("file was missing")
      }
    }  else{
      console.log("API Result NOT Found");
    }
  });
}

}


  filetoupload(){
    var fill = this.file;
    var id = this.newad_id;
    this.fileUploader(fill).then((response)=>{
    console.log("response file :: ", response.data);
    if (response.data){
      this.forverification = response.data.result
      console.log("result Received", this.forverification);
    }

    })

    if(this.file1 != undefined && this.file1 != '' && this.file1 != null){
        var fill1 = this.file1
        console.log("sending to fileupload1")
        this.fileUploader(fill1).then((response1)=>{
        console.log("response file :: ", response1.data);
        if (response1.data){
          this.forverification = response1.data.result
          console.log("result Received", this.forverification);
        }
        })
    }else{
      console.log("file 1 was missing")
    }
    if(this.file2 != undefined && this.file2 != '' && this.file2 != null){
        var fill2 = this.file2
        console.log("sending to fileupload2")
        this.fileUploader(fill2).then((response2)=>{
        console.log("response file :: ", response2.data);
        if (response2.data){
          this.forverification = response2.data.result
          console.log("result Received", this.forverification);
        }
        })
    }else{
      console.log("file 2 was missing")
    }
    if(this.file3 != undefined && this.file3 != '' && this.file3 != null){
        var fill3 = this.file3
        console.log("sending to fileupload3")
        this.fileUploader(fill3).then((response3)=>{
        console.log("response file :: ", response3.data);
        if (response3.data){
          this.forverification = response3.data.result
          console.log("result Received", this.forverification);
        }
        })
    }else{
      console.log("file 3 was missing")
    }

  }

  fileUploader(file)
  {
    console.log("file :: ", file);
    // const url = 'https://httpbin.org/post';
    const formData = new FormData();
    formData.append('userFile',file)
    const config = {
        headers: {'content-type': 'multipart/form-data',
      Authorization: localStorage.getItem('JWT')},

    }

    console.log("FormData", formData);
    return  post(urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/uploadImage/' + this.newad_id, formData,config)
  }

  fileupload(){
    console.log("uploading picture", this.newad_id);
    console.log("uploading picture", this.file);

    var request = require("request");
    var fill = this.file;
    var id = this.newad_id;
    var token = localStorage.getItem('JWT');
    const filetou = new FormData(fill);
    filetou.append('userFile',filetou);

    const config = {
      headers: {'content-type': 'multipart/form-data',
      Authorization: localStorage.getItem('JWT'),
    },

  }
    const headers1 = new FormData(token);
    headers1.append('Authorization',token );
    headers1.append('content-Type', 'multipart/form-data' );

    console.log(filetou);
    var urlPath = urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/uploadImage/' + this.newad_id
    var options = { method: 'POST',
    url: urlPath,
    json: true,
    headers:{ 'Cache-Control': 'no-cache',
    Authorization: localStorage.getItem('JWT')},
    body : {userFile:this.file, advert_id:this.newad_id},
  };
    console.log("Call", options);
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log("Ad With Picture", body.result);
      if (body.result)
      {
        console.log("Picture Posted");

      }else{
        console.log("API Result NOT Found");
      }
    });
  }
  send() {
      const method = "POST";
      const body = new FormData(this.form);
      console.log("filename ::", body);
      fetch("http://uploading-api-dev.herokuapp.com/upload", { method, body })
        .then(res => res.json())
        .then(body => alert(JSON.stringify(body, null, "\t")));
    }

  state = {
      disabled: false,
    };

    toggle = () => {
      this.setState((state) => ({
        disabled: !state.disabled,
      }));
    }

  componentDidMount() {
    this.EnumsReceived();
    console.log("your currency is",localStorage.getItem('currency'))
    // EventBus.publish("ModelsReceived");


  }
  componentWillMount(){

  }
  componentDidUpdate(){

  if(this.state.geoDestination != '' && this.state.geoDestination != null &&this.state.geoDestination != undefined){
    searcharea = this.state.geoDestination;
    }

  }

  edit_ad_values = () =>{
    EventBus.publish("showLoading")
    console.log("in edit_ad_values", this.for_edit_ad);
    this.type = this.for_edit_ad.type
    if(this.type == "accessories"){
      this.imei_for_accessory = false;
      this.color_storage_accessory = false;
      this.condition_accessory = false;
      this.button_switch_accessory=
      <button className={"nextButton"} onClick={this.handleButton.bind(this)}>
      Next
      </button>
    }else{
      this.imei_for_accessory = true;
      this.color_storage_accessory = true;
      this.condition_accessory = true;

      this.button_switch_accessory=
      <button className={"nextButton"} onClick={this.accordion_next_first}>
      Next
      </button>
    }
    this.brand_id = this.for_edit_ad.deviceDetails.Brand
    this.model = this.for_edit_ad.deviceDetails._id
    this.adtitle = this.for_edit_ad.title;
    this.advert_id = this.for_edit_ad._id;

    this.adlat = this.for_edit_ad.location[0]
    this.adlng = this.for_edit_ad.location[1]


    this.phoneswitch = this.for_edit_ad.phoneDead
    this.getaddress();
    this.state.description = this.for_edit_ad.description
    this.state.price = this.for_edit_ad.price;
    this.state.imei = this.for_edit_ad.imei;
    this.state.color = this.for_edit_ad.color;
    this.state.storage = this.for_edit_ad.storage
    this.state.condition = this.for_edit_ad.condition._id
    this.state.age_selected = this.for_edit_ad.age

    var pc = []
    this.for_edit_ad.pictures.forEach((i,idx,x)=>{
      console.log(i._id)
      pc.push(
        this.selected_pictures =
        <div className="picture_view">
          <Image id="blah" className="picture_view" src={i}  />
        </div>
      )
    })


    if(this.for_edit_ad.accessories.length > 0){
    this.for_edit_ad.accessories.forEach((i,idx,x)=>{
      console.log(i._id)
      this.edit_accessories += "," + i._id
    })
    }else{
    this.edit_accessories = ''
    }
    if(this.for_edit_ad.physicalIssues.length > 0){

    this.for_edit_ad.physicalIssues.forEach((i,idx,x)=>{
      console.log(i._id)
      this.edit_physical += "," + i._id
    })
    }else{
    this.edit_physical = ''
    }
    if(phoneswitch = true){
    this.phoneDead_box=
    <Checkbox name="brands" onChange={this.phonedeadcheck} type="checkbox" defaultChecked/>
    }else{
    this.phoneDead_box=
    <Checkbox name="brands" onChange={this.phonedeadcheck} type="checkbox"/>
    }

    console.log("**Edit Ids", this.edit_accessories.split(/[,]+/));
    console.log("**Edit Ids", this.edit_physical.split(/[,]+/));
    if(this.for_edit_ad.age = -1){
      this.edit_age = "Brand New"
    }else if(this.for_edit_ad.age = 0){
      this.edit_age = "Less Than a Year"
    }else if(this.for_edit_ad.age = 1){
      this.edit_age = "1 Year"
    }else if(this.for_edit_ad.age > 7){
      this.edit_age = "Greater Than 7"
    }else{
      this.edit_age = this.for_edit_ad.age + ' ' + "Years"
    }

    this.mycurrency = '' + localStorage.getItem('currency') + ' ' + this.state.price

    console.log(this.type, this.brand_id, this.model, this.adtitle);
    EventBus.publish("stopLoading")

  }
  postbylocation = () =>{
    var id = this.newad_id
    console.log("advert id", id)
    console.log("locations", searcharea);
    if(searcharea.location != '' && searcharea.location != undefined && searcharea.location != null){
      lat =searcharea.location.lat
      lng =searcharea.location.lng
    }else{
      lat = this.adlat
      lng = this.adlng
    }

    console.log("locations", lat);
    console.log("locations", lng);
    var locs = {lat: lat, lng:lng};

    if(lat != undefined && lat != '' && lat != null &&
        lng != undefined && lng != undefined && lng != undefined &&
        id != undefined && id != undefined && id != undefined) {
        this.state.activeClickedItems_third = false
        this.state.activeClickedItems_first = false
        this.state.activeClickedItems_second = false
        this.state.activeClickedItems_location = false;
        this.state.activeClickedItems_verify = true;
    var request = require("request");
    var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/updateAddLocation'

    var options = { method: 'POST',
    url: urlPath,
    headers:
    { 'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('JWT'),},
    body: {advert_id:id,
          lat:lat,
          lng: lng
  },
    json: true };
    this.verifyaccord = true;
    console.log("Call", options);

    request(options,  (error, response, body)=> {
      if (error) throw new Error(error);
      if(body){
        console.log("verifications")
        EventBus.publish("showLoading")
        EventBus.publish("stopLoading")

      }
      if (body.result)
      {
        this.forverification = body
        console.log("result Received", body);
        this.verify_your_content();
        toast.success("Verify Your Ad !", {
            autoClose: 2000,
            position: toast.POSITION.TOP_CENTER
          });

      }  else{
        console.log("API Result NOT Found");
      }
    });
  }else{
    console.log("something is missing")
  }

  }


  verifyAdd = () =>{
    console.log("advert id", this.newad_id)

    if(this.newad_id != undefined && this.newad_id != undefined && this.newad_id != undefined ) {
      this.state.activeClickedItems_verify = false
      this.state.activeClickedItems_first = false
      this.state.activeClickedItems_second = false
      this.state.activeClickedItems_third = false
      this.state.activeClickedItems_location = false
    var request = require("request");
    var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/verifyTrue'

    var options = { method: 'POST',
    url: urlPath,
    headers:
    { 'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('JWT'),},
    body: {advert_id:this.newad_id
  },
    json: true };

    console.log("Call", options);

    request(options,  (error, response, body)=> {
      if (error) throw new Error(error);
      if (body.result)
      {
        console.log("result Received", body.result);

        var url = "/ad/" + body.result._id
        this.setState((state, props) => {
        return {counter: state.counter + props.step};
        })

        console.log("props", this.props.match.params.id);
        window.location.reload();
        this.props.history.push(url)


      }  else{
        console.log("API Result NOT Found");
      }
    });
  }else{
    console.log("something is undefined")
  }

  }

  verify_your_content = () =>{
    EventBus.publish("showLoading")
    var data = this.forverification.result;
    console.log("data for verification is",this.forverification.result);
    console.log("in verify_your_content ",data);

    var vs = [];
    EventBus.publish("stopLoading")

    delete data.countryCode;
    delete data.country;
    delete data._id;
    delete data.deviceDetails;
    delete data.condition;
    delete data.user_id;
    delete data.search;
    delete data.__v;
    delete data.reason;
    delete data.isDeleted;
    delete data.views;
    delete data.distance;
    delete data.boosted;
    delete data.boostStartingTime;
    delete data.sold;
    delete data.isFavourite;
    delete data.updatedAt;
    delete data.createdAt;
    delete data.boosts;
    delete data.payment_id;
    delete data.payment;
    delete data.location;
    delete data.phoneDead;
    delete data.isVerified;
    delete data.visible;
    delete data.offers;

    var type = data['type']
    var brandName = data['brandName']
    var imei = data['imei']
    var title = data['title']
    var price = data['price']
    var description = data['description']
    var color = data['color']
    var storage = data['storage']
    var age = data['age']
    var pictures = data['pictures'][0]
    var functional = data['physicalIssues']['title']
    var accessories = data['accessories']['title']

    console.log(pictures);
    var usedage = []
    if(age == 1){
      usedage = "used" + ' ' + age + ' ' + "Year"
    }else if(age == 0){
      usedage = "Less than a year"
    }else if(age == -1){
      usedage = "Brand new"
    }else(
      usedage = "used" + ' ' + age + ' ' + "Years"
    )
    // var accessories = data['accessories'][0]
    // var physicalIssues = data['physicalIssues'][0]


      EventBus.publish("showLoading")

      this.verify_display.push(
        <div style={{width : "100%"}}>
        <div className={'ThreeColumns'}>

        <div className="first_Side">
        <img className="ad_picture" src={pictures}/>

        </div>

        <div className="second_Side">
        <div className="AdTitle">{title}</div>
        <div className="AdDescription">{description} </div>

        <div className="icons_details" >
        <div className="fontRegular specsstorage" >
          <img className="specsImg"  src="/img/storage.png" /> <span className="specsText fontRegular "> {storage} </span>
        </div>

        <div className=" fontRegular specsstorage">
          <img className="specsImg"  src="/img/color.png" /> <span className="specsText fontRegular "> {color} </span>
        </div>
        </div>
        <div className="AdTitle">{usedage} </div>

        <div className="AdTitle">{this.mycurrency} &nbsp;</div>

        </div>

        <div className="third_Side">
        <div className="AdDescription1">Type: &nbsp; &nbsp; &nbsp; <span className="AdDescription2">{type} </span></div>
        <div className="AdDescription1">IMEI: &nbsp; &nbsp; &nbsp;  <span className="AdDescription2">{imei} </span></div>
        <div className="AdDescription1"> </div>
        <div className="AdDescription1"><span className="AdDescription2">{functional}</span></div>
        <div className="AdDescription1"><span className="AdDescription2">{accessories}</span></div>
        </div>

        </div>

        </div>
      )
      EventBus.publish("stopLoading")


    this.setState((state, props) => {
    return {counter: state.counter + props.step};
    })
    console.log("display created",this.verify_display)

  }

  addlocation(){
    console.log("location accordion expanded")
  }
  accordion_next_first = () =>{
      this.state.activeClickedItems_first = false
      this.state.activeClickedItems_third = false

      console.log("statee isss",this.state.activeClickedItems_first);

      console.log(this.state.activeClickedItems_second);

      this.state.activeClickedItems_second = true
      console.log(this.state.activeClickedItems_second);
      this.setState((state, props) => {
      return {counter: state.counter + props.step};
      })
  }
  accordion_next_second = () =>{

      this.state.activeClickedItems_second = false
      this.state.activeClickedItems_first = false
      console.log("statee isss",this.state.activeClickedItems_second);

      console.log(this.state.activeClickedItems_second);

      this.state.activeClickedItems_third = true

      console.log(this.state.activeClickedItems_second);
      this.setState((state, props) => {
      return {counter: state.counter + props.step};
      })
  }

  accordion_next_third = () =>{
      this.state.activeClickedItems_first = !this.state.activeClickedItems_first
      console.log("statee isss",this.state.activeClickedItems_first);

      console.log(this.state.activeClickedItems_second);

      this.state.activeClickedItems_second = true
      console.log(this.state.activeClickedItems_second);
      this.setState((state, props) => {
      return {counter: state.counter + props.step};
      })


  }



  verifyaccordion =  <span>
        <Accordion className={'MainAccordion'} >

        <AccordionItem className={'PostAdSteps'} title={<div className={'fontSemiBold titleAccordian'} >Verify Ad</div> }
        expanded={this.state.activeClickedItems_verify}
        >

        <form className={'AccordionForm'}>
        -
        {this.verify_display}
        </form>
        <button className={"verifyAdButton"} onClick={() => this.verifyAdd}>
        Verify Ad
        </button>
        </AccordionItem>

        </Accordion>

        </span>

    render(){

      return (
      <div className="EditPage">
      <HomeHeaderBar />
      <div className={'PostPageBody'}>

      <div className={'headerbar'}>
      <Link to={"/"}>
        <span className="SemiBold backBtn">Back to Home</span>
        </Link>
        <span className="SemiBold submit">SUBMIT AN AD</span>


      </div>
      <div className={'PostAdForm'}>
      <Accordion className={'MainAccordion'} openNextAccordionItem={true}>
      <AccordionItem className={'PostAdSteps'} title={<div className={'fontSemiBold titleAccordian'}>Necessary Requirements</div>}
      expanded={this.state.activeClickedItems_first}
      >


      <form className={'AccordionForm'}>

      <div className={'TwoColumns'}>

      {this.title}
      <div className="full">
      <label className={'Formtitle'}>
      Ad Title
      </label>
      <p >{this.adtitle} </p>
      </div>

      </div>

      <div className={'TwoColumns'}>

      <div className="leftSide">

      <label className={'Formtitle'}>
      Price
      </label>
      <p><input type="number" min="1" name="price" value={this.state.price} onChange={this.handleChange} placeholder={this.mycurrency} className={'inputsdropdown'}/></p>
        <p className={'hints'}>Your Currency Is {this.mycurrency}</p>
      </div>

      <div className="rightSide" hidden = {!this.imei_for_accessory}>

      <label className={'Formtitle'}>
      IMEI
      </label>
      <p><input type="number" min="14" max="20" name="imei" value={this.state.imei} onChange={this.handleChange} placeholder={this.edit_imei} className={'inputsdropdown'}/></p>
      <p className={'hints'}>Minimum 14 Digits. (optional)</p>
      </div>

      </div>


      <div className={'TwoColumns'}>

      <div className="full">
      <label className={'Formtitle'}>
      Ad Description
      </label>
      <p>
      <textarea type="text" rows="4" cols="50" name="description" value={this.state.description} onChange={this.handleChange} className={'textarea'} />
      </p>
        <p className={'hints'}>Max 3000 Characters</p>
      </div>

      </div>

      <div className={'TwoColumns'} hidden={!this.color_storage_accessory}>

      <div className="leftSide">
      <label className={'Formtitle'}>
      Color
      </label>
      <p><select name="color" value={this.state.color} onChange={this.handleChange} className={'inputsdropdown'} >
      {this.colorData}
       </select></p>
      </div>

      <div className="rightSide">

      <label className={'Formtitle'}>
      Storage
      </label>
      <p><select name="storage" value={this.state.storage} onChange={this.handleChange} className={'inputsdropdown'}>
      <option></option>
      {this.storageData}
       </select></p>
      </div>

      </div>

      <div className={'TwoColumns'}>

      <div className="leftSide" hidden = {!this.condition_accessory}>
      <label className={'Formtitle'}>
      Condition
      </label>
      <p><select name="condition" value={this.state.condition} onChange={this.handleChange} className={'inputsdropdown'}>
      <option></option>
      {this.conditionsData}
       </select></p>
      </div>

      <div className="rightSide">

      <label className={'Formtitle'}>
      Age
      </label>
      <p><select name="age_selected" value={this.state.age_selected} onChange={this.handleChange} className={'inputsdropdown'}>
      <option></option>
      {this.agenames}
       </select></p>
      </div>

      </div>

      <div className={'PictureColum'}>

      <div className={'picture_area'}>
      <label for="file">
      <input id="userFile" type="file" style={{display:"none"}} name="userFile" accept=".png,.gif,.jpeg,.jpg" onChange={(e) =>this.handleFileInput(e)} multiple/>
      <Image src="/img/camera.png" className={'fle'}/>
      </label>

      </div>

      <p className={'hints'}>Ads with Photos Sell Faster</p>
      {this.selected_pictures}

      </div>

      </form>

      {this.button_switch_accessory}

      </AccordionItem>
      <AccordionItem className={'PostAdSteps'} title={<div className={'fontSemiBold titleAccordian'}>Functional Conditions</div>}
      expanded={this.state.activeClickedItems_second}
      >



      <form className={'AccordionForm'}>
      <div className="rightSide">
      <label className={'Formtitle'}>
      Functional or Physical Conditions
      </label>
      <br />
      <label>
      Does The Mobie Switch On &nbsp;
      {this.phoneDead_box}
      </label>
       <br />
      <div className={'lightitles'}> Please Tick/Untick Checkboxes </div>
      {this.physicalData}


      </div>
      </form>
      <button className={"nextButton"} onClick={this.accordion_next_second}>
      Next
      </button>

      </AccordionItem>

      <AccordionItem className={'PostAdSteps'} title={<div className={'fontSemiBold titleAccordian'}>Available Accessories</div>}
      expanded={this.state.activeClickedItems_third}
      >

      <form className={'AccordionForm'}>
      <div className="rightSide">
      <label className={'Formtitle'}>
      Available Accessories
      </label>
      <div className={'lightitles'}> Please Tick/Untick Checkboxes </div>
      {this.accessoriesData}

      </div>
      </form>
      <button className={"postAdButton"} onClick={this.handleButton.bind(this)} >
      Next
      </button>

      </AccordionItem>

      </Accordion>


      <div hidden={!this.locationaccord}>
     <Accordion className={'MainAccordion'} >

     <AccordionItem className={'PostAdSteps'} title={<div className={'fontSemiBold titleAccordian'}>Insert Location</div>} expanded={this.state.activeClickedItems_location}>
     <form className={'AccordionForm'}>
     <div className="leftSide">
     <label className={"labels"}>
     Your Address
     </label> <br />
     <DemoInput style={{borderRadius:"5px 5px 5px 5px"}}
     addressInput={{
     onChange: this.onAddressChange,
     value: this.state.address,
     }}
     geoDestinationInput={{
     onChange: this.onGeoDestinationChange,
     value: this.state.geoDestination,
     }}
     />
     <p className={'hints'}>Depends on Package</p>

     </div>


     <div className="rightSide">

     </div>

     </form>
     <button className={"postAdButton"} onClick={this.postbylocation}>
     Update Location
     </button>
     </AccordionItem>

     </Accordion>

     </div>

     <div hidden={!this.verifyaccord}>
          <Accordion className={'MainAccordion'} >

          <AccordionItem className={'PostAdSteps'} title={<div className={'fontSemiBold titleAccordian'} >Verify Ad</div> }
          expanded={this.state.activeClickedItems_verify}
          >

          <form className={'AccordionForm'}>
          -
          {this.verify_display}
          </form>
          <button className={"verifyAdButton"} onClick={this.verifyAdd}>
          Verify Ad
          </button>
          </AccordionItem>

          </Accordion>

          </div>


      </div>

      </div>
      <ToastContainer />
    </div>
    )}
}


export default withRouter(EditAd);
