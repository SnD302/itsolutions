import React, { Component } from 'react';
import HomeHeaderBar from '../HomeHeaderBar/HomeHeaderBar'
import EventBus from 'eventing-bus';
import { Image,Glyphicon,InputGroup,Button} from 'react-bootstrap';
import { withRouter,BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Accordion, AccordionItem } from 'react-sanfona';
import FileInput  from 'react-file-input';
import Checkbox from 'rc-checkbox';
import { createGeoInput, DefaultGeoInput } from 'react-geoinput';
import PropTypes from 'prop-types';
import axios, { post } from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var url = require('url');
import './PostAd.css';

const manuCallback = function(object) {}
const SimpleInput = createGeoInput(DefaultGeoInput);
const fetch = require('node-fetch');
const urlObj = url.parse(document.location.href, true);
const port = "" ;
var searcharea = []
var lat = []
var lng = []
var accesschecks = [];
var accessfinalCheck = [];
var physchecks = [];
var physfinalchecks = [];
var phoneswitch = '';

function phonedeadcheck(e){
if(e.target.checked == true){
  phoneswitch = true;
  console.log('Checkbox checked:', phoneswitch);
}else if(e.target.checked == false){
  phoneswitch = false;
  console.log('Checkbox checked:', phoneswitch);
}
}
function onChangeaccess(e) {
  console.log('Checkbox checked:', (e.target.checked));
  console.log('Checkbox checked:', (e.target.value));
  if(e.target.value == -1){
    console.log(e.target.value)
  }
  console.log(accesschecks);
  if(e.target.checked == true){
    // checks = checks.concat(e.target.value);
    accesschecks.push(e.target.value);
    console.log('final checked:', accesschecks);
  } else if(e.target.checked == false){
    //checks.pull(e.target.value);
    console.log("in false")
    accessfinalCheck = [];
    accesschecks.forEach(function(i,idx,x){
      console.log(i , e.target.value)
      if(i+"" == e.target.value+""){
        console.log("matched")
      }else{
        accessfinalCheck.push(i);
      }
      if(idx == x.length-1){
        accesschecks = accessfinalCheck;
        console.log("final check : ", accessfinalCheck);
        console.log(accesschecks);
      }
    })
//    checks.splice(e.target.value );
    console.log('final checked:', accesschecks);
  }
  console.log('final checked:', accesschecks);

}

function onChangePhysical(e) {
  console.log('Checkbox checked:', (e.target.checked));
  console.log('Checkbox checked:', (e.target.value));
  if(e.target.value == -1){
    console.log(e.target.value)
    // console.log(d.target.value)
  }
  console.log(physchecks);
  if(e.target.checked == true){
    // checks = checks.concat(e.target.value);
    physchecks.push(e.target.value);
    console.log('final checked:', physchecks);
  } else if(e.target.checked == false){
    console.log("in false")
    physfinalchecks = [];
    physchecks.forEach(function(i,idx,x){
      console.log(i , e.target.value)
      if(i+"" == e.target.value+""){
        console.log("matched")
      }else{
        physfinalchecks.push(i);
      }
      if(idx == x.length-1){
        physchecks = physfinalchecks;
        console.log("final check : ", physfinalchecks);
        console.log(physchecks);
      }
    })
    console.log('final checked:', physchecks);
  }
  console.log('final checked:', physchecks);

}


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


class PostAd extends Component {

  state = {
      open: false,
      address: '',
      geoDestination: undefined,
    }
    onAddressChange = value => this.setState({ address: value })
    onGeoDestinationChange = value => this.setState({ geoDestination: value })


  brandsData = []
  categoriesData = []
  colorData = []
  storageData = []
  conditionsData = []
  accessoriesData = []
  physicalData = []
  modelsData= []
  agenames = []
  newad_id= []
  mycurrency ="-"
  displaylocaccord = []
  displayverifyaccord = []
  forverification = []
  verify_display = []
  brand_id_posting = []
  file = []
  file1 = []
  file2 = []
  file3 = []
  adtitle = []
  adtitle_acc = []
  title = []
  device_name = ''
  imageSrc: string;
  locationaccord = false;
  verifyaccord = false;
  no_mobile_accord =true;
  device_model_imei =true;
  deviceModel = true;
  new_brand = false;
  functional_conditions_accordion = true;
  accessories_accordion= true;
  age_for_accessory = []
  color_storage_condition_age= []
  mobile_or_accessory_button= []
  for_edit_ad = []
  type = []
  functional_conditions = []
  accessories_selected = []
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

  brandsReceived()
  {

    var brands;

    if (localStorage.getItem("brands") != null)
    {

      brands = JSON.parse(localStorage.getItem("brands"))

      console.log("brands", JSON.parse(localStorage.getItem("brands")));
        var bb = []

        brands.forEach(function(i,idx,n){

          bb.push(
          <option placeholder="" className="name" value={i._id}> {i.brandName}</option>
        )

        })

        this.brandsData = bb
        console.log("brands founr are",this.brandsData);
    }


    this.setState((state, props) => {
    return {counter: state.counter + props.step};
    })
  }

  getCond_Acc_phy()
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
        accessories.forEach(function(i,idx,n){
          acc.push(
            <p><label >
            <Checkbox name="my-checkbox" onChange={onChangeaccess} value={i._id} />
            <span className="name"> {i.title}</span>
            </label></p>
          )
        })
        physical.forEach(function(i,idx,n){
          phy.push(
            <p><label >
            <Checkbox name="my-checkbox" onChange={onChangePhysical} value={i._id} />
            <span className="name"> {i.title}</span>
            </label></p>
          )
        })
        this.physicalData = phy
        this.accessoriesData = acc
        this.conditionsData = con
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

        category.forEach((i,idx,n) =>{

          cc.push(
          <option className="name" value={i.name} >
          <img src="i.image" class="images"/>
          {i.name}
          </option>
          )


        })
        color.forEach(function(i,idx,n){
          col.push(
          <option className="name" value={i}>
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

        this.categoriesData = cc
        this.colorData = col
        this.storageData = sto
        this.agenames = ag
        this.for_mobie_tablet()
        console.log("categories received are",this.categoriesData);
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


handleChangebrands = (e) => {
  this.setState({[e.target.name]: e.target.value});

  if(e.target.value == "Cannot Find Your Brand ?"){
    console.log("have to add a brand");
    this.new_brand = true;
    this.deviceModel = false;
    this.state.brand_id = ''
    this.adtitle = ''
  }else{
    this.new_brand = false;
    this.deviceModel = true;
    console.log(e.target.value);
    console.log(e.target.name);
    console.log("idd ...??",e.target);
    this.setState({brand_id: e.target.value});
    EventBus.publish("getMobileSpecs",  {brand_id: e.target.value})
  }

}

handleChangemodels = (e) => {

  this.setState({[e.target.name]: e.target.value});
  console.log("in handleChangemodels",e.target.value);
  console.log("in handleChangemodels",e.target.name);
  var device_id = e.target.value
  console.log("new device id is", this.device_id);
  var models = JSON.parse(localStorage.getItem("Models"))
  console.log("models",models);
  models.forEach((i,idx,n) =>{
    if (device_id == i._id){
      console.log("your device is ",i.DeviceName);
      this.device_name = i.DeviceName
      console.log("your device is ",this.device_name);


    }
  })
  this.gettitle();
}



ModelsReceived()
{
  console.log("i just received brand")
  if (localStorage.getItem("Models") != null)
  {
    this.testmodels()

  }

}
testmodels(){

  EventBus.publish("showLoading")
  var models;
  console.log("models", JSON.parse(localStorage.getItem("Models")));
    var mod = []

    models = JSON.parse(localStorage.getItem("Models"))

    models.forEach(function(i,idx,n){
      mod.push(
      <option className="name" value={i._id}>
      {i.DeviceName}
      </option>
      )
    })

    this.modelsData = mod
    EventBus.publish("stopLoading")

}
gettitle = () =>{
  var models = JSON.parse(localStorage.getItem("Models"))
  console.log("models",models);

  if(models != undefined){
  var name = models[0]['Brand']['brandName'];
  console.log("models",name);
  this.adtitle = name + ' '  +this.device_name;
  EventBus.publish("showLoading")
  if(this.adtitle != ''){

    var celltitle =
    <div className="full">
    <label className={'Formtitle'}>
    Ad Title
    </label>
    <p >{this.adtitle} </p>
    </div>

    this.title = celltitle
    console.log("this.adtitle",this.adtitle);

  }
  EventBus.publish("stopLoading")

}
this.setState((state, props) => {
return {counter: state.counter + props.step};
})
}

add_new_Brand = (event) =>{
  console.log("New Brand", this.state.newBrand);
  console.log("New Model",this.state.newModel);
  if(this.state.newBrand != '' && this.state.newBrand != null && this.state.newBrand != undefined &&
      this.state.newModel != '' && this.state.newModel != null && this.state.newModel != undefined ){
        this.adtitle = this.state.newBrand + ' ' + this.state.newModel
        this.add_a_Brand();

        if(this.adtitle != ''){

          var celltitle =
          <div className="full">
          <label className={'Formtitle'}>
          Ad Title
          </label>
          <p >{this.adtitle} </p>
          </div>

          this.title = celltitle
          console.log("this.adtitle",this.adtitle);

        }
        this.setState((state, props) => {
        return {counter: state.counter + props.step};
        })
      }else{
        toast.error("Fields Missing!", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER
          });
      }
}
add_a_Brand = () =>{
  EventBus.publish("showLoading")
  var request = require("request");
  var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/createMobileBrand'

  var options = { method: 'POST',
  url: urlPath,
  headers:
  { 'Cache-Control': 'no-cache',
  'Content-Type': 'application/json',
  Authorization: localStorage.getItem('JWT'),},
  body: {brandName:this.state.newBrand},
  json: true };
  // phoneModelName:this.state.newModel
  console.log("Call", options);

  request(options,  (error, response, body)=> {
    if (error) throw new Error(error);
    if (body.result){
      console.log("result Received", body.result);
      this.state.brand_id = body.result._id
      console.log("new id aii",this.state.brand_id);
      // this.add_a_Model()
      this.setState((state, props) => {
      return {counter: state.counter + props.step};
      })
    }else{
      console.log("API Result NOT Found");
      toast.error("BrandName Alredy exists!", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER
        });
    }
  });
}
add_a_Model = ()=>{
  var request = require("request");
  var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/createMobileBrand'

  var options = { method: 'POST',
  url: urlPath,
  headers:
  { 'Cache-Control': 'no-cache',
  'Content-Type': 'application/json',
  Authorization: localStorage.getItem('JWT'),},
  body: {brand:this.state.newBrand,phoneModelName:this.state.newModel},
  json: true };
  // phoneModelName:this.state.newModel
  console.log("Call", options);

  request(options,  (error, response, body)=> {
    if (error) throw new Error(error);
    if (body.result){
      console.log("result Received", body.result);

      this.setState((state, props) => {
      return {counter: state.counter + props.step};
      })
    }else{
      console.log("API Result NOT Found");
      toast.error("BrandName Alredy exists!", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER
        });
    }
  });
  EventBus.publish("stopLoading");
}

handleButton = (event) => {
  console.log("Category", this.state.category);
  console.log("brand id",this.state.brand_id);
  console.log("device id",this.state.model);
  console.log("IMEI",this.state.imei);
  console.log("title",this.adtitle);
  console.log("price",this.state.price);
  console.log("desxription",this.state.description);
  console.log("color",this.state.color);
  console.log("storage",this.state.storage );
  console.log("condition",this.state.condition);
  console.log("age",this.state.age_selected);
  console.log("filess",this.file);
  console.log("phonedead",phoneswitch);
  console.log("access",physchecks);
  console.log("physc",accesschecks);
  console.log("title",this.state.title_acc);
  if(this.state.category == "accessories"){
    if(this.state.brand_id != null && this.state.price != null && this.state.description != null &&
    this.state.age_selected != null && this.state.brand_id != undefined &&
    this.state.price != undefined && this.state.description != undefined &&
    this.state.age_selected != undefined && this.state.title_acc != null && this.state.title_acc != undefined) {

          this.state.activeClickedItems_third = false
          this.state.activeClickedItems_first = false
          this.state.activeClickedItems_second = false
          this.state.activeClickedItems_location = true

        var request = require("request");
        var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/placeAdd'

        var options = { method: 'POST',
        url: urlPath,
        headers:
        { 'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('JWT'),},
        body: {
              type:this.state.category,
              brand_id :this.state.brand_id,

              title: this.state.title_acc,
              price: this.state.price,
              description: this.state.description,
              age: this.state.age_selected,
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
        toast.error("Fields Missing!", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER
          });
        console.log("something is undefined")
    }
  }
  else{
  if(this.state.category != null && this.state.brand_id != null && this.state.model != null && this.state.imei != null && this.adtitle != null &&
  this.state.price != null && this.state.description != null && this.state.color != null && this.state.storage != null && this.state.condition != null &&
  this.state.age_selected != null && this.state.category != undefined && this.state.brand_id != undefined && this.state.model != undefined && this.state.imei != undefined && this.adtitle != undefined &&
  this.state.price != undefined && this.state.description != undefined && this.state.color != undefined && this.state.storage != undefined && this.state.condition != undefined &&
  this.state.age_selected != undefined) {

    this.state.activeClickedItems_third = false
    this.state.activeClickedItems_first = false
    this.state.activeClickedItems_second = false
    this.state.activeClickedItems_location = true

  var request = require("request");
  var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/placeAdd'

  var options = { method: 'POST',
  url: urlPath,
  headers:
  { 'Cache-Control': 'no-cache',
  'Content-Type': 'application/json',
  Authorization: localStorage.getItem('JWT'),},
  body: {type:this.state.category,
        brandName:this.state.brand_id,
        deviceDetails: this.state.model,
        imei: this.state.imei,
        title: this.adtitle,
        price: this.state.price,
        description: this.state.description,
        color: this.state.color,
        storage: this.state.storage,
        condition: this.state.condition,
        age: this.state.age_selected,
        phoneDead:phoneswitch,
        physicalIssues:physchecks,
        accessories:accesschecks
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
      if(body.result.physicalIssues.length > 0){
        this.functional_conditions = body.result.physicalIssues
        console.log(this.functional_conditions);
      }
      if(body.result.accessories.length > 0){
        this.accessories_selected = body.result.accessories
        console.log(this.accessories_selected);
      }

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
  toast.error("Fields Missing!", {
      autoClose: 3000,
      position: toast.POSITION.TOP_CENTER
    });
  console.log("something is undefined")
    }
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
    this.brandsReceived();
    this.EnumsReceived();
    console.log("your currency is",localStorage.getItem('currency'))
    this.mycurrency = "Your Currency is " + '' + localStorage.getItem('currency')
    EventBus.on("brandsReceived", this.brandsReceived.bind(this));
    EventBus.on("ModelsReceived", this.ModelsReceived.bind(this));
    // EventBus.publish("ModelsReceived");

  }

componentDidUpdate(){

  if(this.state.geoDestination != '' && this.state.geoDestination != null &&this.state.geoDestination != undefined){
    searcharea = this.state.geoDestination;
  }

}

  edit_ad_values = () =>{
    console.log("in edit_ad_values", this.for_edit_ad);
    this.type =
    <option className="name" value={this.for_edit_ad.type}>
    {this.for_edit_ad.type}
    </option>
  }
  postbylocation = () =>{
    var id = this.newad_id
    console.log("advert id", id)
    console.log("locations", searcharea);
    lat =searcharea.location.lat
    lng =searcharea.location.lng
    console.log("locations", lat);
    console.log("locations", lng);
    var locs = {lat: lat, lng:lng};
    // localStorage.setItem('addlocations', locs);
    // console.log("locations", localStorage.getItem('addlocations'));
    // console.log("locations", locs);

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
        // this.displayverifyaccord = this.verifyaccordion
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
    var functional = []
    var accessories = []
    //
    // this.functional_conditions.forEach((i,idx,x)=>{
    //   console.log(i)
    //   functional = i.title
    // })
    // this.accessories_selected.forEach((i,idx,x)=>{
    //   console.log(i)
    //   accessories = i.title
    // })


    console.log(functional);
    console.log(accessories);
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

        <div className=" fontRegular specsstorage_1">
          <img className="specsImg"  src="/img/color.png" /> <span className="specsText fontRegular "> {color} </span>
        </div>
        </div>
        <div className="AdTitle">{usedage} </div>

        <div className="AdTitle">{this.mycurrency} &nbsp; {price}</div>

        </div>

        <div className="third_Side">
        <div className="AdTitle">Brand Name: &nbsp; &nbsp; &nbsp; <span className="AdDescription2"> {brandName} </span></div>
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

  handleChange_category = (event) => {

    this.setState({[event.target.name]: event.target.value});
    console.log(event.target.value);
    console.log(event.target.name);
    if(event.target.value == "accessories"){
      this.no_mobile_accord = false;
      this.device_model_imei = false;
      this.functional_conditions_accordion = false;
      this.accessories_accordion = false;
      console.log("change of plans");
      this.color_storage_condition_age =<div></div>
      this.age_for_accessory =
          <div className="rightSide">
          <label className={'Formtitle'}>
          Age
          </label>
          <p><select name="age_selected" onClick={this.handleChange} className={'inputsdropdown'}>
          <option></option>
          {this.agenames}
           </select></p>
          </div>
      this.mobile_or_accessory_button =
      <button className={"nextButton"} onClick={this.handleButton.bind(this)}>
      Next
      </button>
      this.title =
        <div className="full">
        <label className={'Formtitle'}>
        Ad Title
        </label>
        <p><input type="text" rows="1" cols="50" name="title_acc" onChange={this.handleChange} className={'textarea'}/></p>
        </div>
      // if(this.state.category == "accessories"){
      // var models = JSON.parse(localStorage.getItem("Models"))
      // var name = models[0]['Brand']['brandName'];
      // console.log("models",name);
      // this.adtitle_acc = name
      // console.log("title for accessory is",this.adtitle_acc);
      // if(this.adtitle_acc != ''){
      //   this.state.title_acc = this.adtitle_acc
      //   var celltitle =
      //   <div className="full">
      //   <label className={'Formtitle'}>
      //   Ad Title
      //   </label>
      //   <p><input type="text" rows="1" cols="50" name="title_acc" value={this.state.title_acc} onChange={this.handleChange} className={'textarea'}/></p>
      //   </div>
      //
      //   this.title = celltitle
      //   console.log("this.adtitle",this.adtitle);
      //
      // }
      // }

    }else{
      console.log("go with the flow")
      this.age_for_accessory = ''
      this.for_mobie_tablet();
      this.state.activeClickedItems_third = false
      this.state.activeClickedItems_second = false
      this.state.activeClickedItems_first = true
      this.functional_conditions_accordion = true;
      this.accessories_accordion = true;

    }
  }

  for_mobie_tablet = () =>{
    this.no_mobile_accord = true;
    this.device_model_imei = true;

    this.color_storage_condition_age =
    <span>
    <div className={'TwoColumns'}>

    <div className="leftSide">
    <label className={'Formtitle'}>
    Color
    </label>
    <p><select name="color" onClick={this.handleChange} className={'inputsdropdown'}>
    <option></option>
    {this.colorData}
     </select></p>
    </div>

    <div className="rightSide">

    <label className={'Formtitle'}>
    Storage
    </label>
    <p><select name="storage" onClick={this.handleChange} className={'inputsdropdown'}>
    <option></option>
    {this.storageData}
     </select></p>
    </div>

    </div>

    <div className={'TwoColumns'}>

    <div className="leftSide">
    <label className={'Formtitle'}>
    Condition
    </label>
    <p><select name="condition" onClick={this.handleChange} className={'inputsdropdown'}>
    <option></option>
    {this.conditionsData}
     </select></p>
    </div>

    <div className="rightSide">

    <label className={'Formtitle'}>
    Age
    </label>
    <p><select name="age_selected" onClick={this.handleChange} className={'inputsdropdown'}>
    <option></option>
    {this.agenames}
     </select></p>
    </div>

    </div>
    </span>

    this.mobile_or_accessory_button =
    <button className={"nextButton"} onClick={this.accordion_next_first}>
    Next
    </button>

    this.setState((state, props) => {
    return {counter: state.counter + props.step};
    })
  }

  // For New Model
  // <label className={'Formtitle'}>
  // Model Name
  // </label>
  // <p><input type="text" name="newModel" onChange={this.handleChange} className={'inputsdropdown'}/></p>
  // <p className={'hints'}>Add New Model</p>
    render(){

      return (
      <div className="PostPage">
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

      <div className="leftSide">
      <label className={'Formtitle'}>
      Category
      </label>
      <p><select name="category" onClick={this.handleChange_category} className={'inputsdropdown'}>
      <option>
      </option>
      {this.categoriesData}
       </select></p>
       <p className={'hints'}>Mobile Phones Tablets e.t.c.</p>

      </div>

      <div className="rightSide">

      <label className={'Formtitle'}>
      Brands
      </label>
      <p><select name="brand_id" onChange={this.handleChangebrands} className={'inputsdropdown'}>
      <option></option>
      {this.brandsData}
      <option style={{fontFamily:"proxs", color:"#342d38"}}>Cannot Find Your Brand ?</option>
       </select></p>
       <p className={'hints'}>Apple, Samsung e.t.c</p>
      </div>

      </div>
      <div className={'TwoColumns'} hidden= {!this.new_brand}>

      <div className="leftSide">
      <label className={'Formtitle'}>
      Brand Name
      </label>
      <p><input type="text" name="newBrand" onChange={this.handleChange} className={'inputsdropdown'}/></p>
      <p className={'hints'}>Add New Brand</p>
      </div>

      <div className="rightSide" >

      <Button className={"addbrandButton"} onClick={this.add_new_Brand.bind(this)}>Add Brand</Button>

      </div>
      </div>

      <div className={'TwoColumns'} hidden= {!this.device_model_imei}>

      <div className="leftSide" hidden= {!this.deviceModel}>
      <label className={'Formtitle'}>
      Device Model
      </label>
      <p><select name="model" onClick={this.handleChangemodels} className={'inputsdropdown'} placeholder={this.mycurrency}>
      <option></option>
      {this.modelsData}
       </select></p>
       <p className={'hints'}>Mobile Phone, Tablets e.t.c</p>

      </div>

      <div className="rightSide">

      <label className={'Formtitle'}>
      IMEI
      </label>
      <p><input type="number" min="14" max="20" name="imei" onChange={this.handleChange} className={'inputsdropdown'}/></p>
      <p className={'hints'}>Minimum 14 Digits. (optional)</p>
      </div>

      </div>
      <div className={'TwoColumns'}>

      {this.title}

      </div>

      <div className={'TwoColumns'}>

      <div className="leftSide">

      <label className={'Formtitle'}>
      Price
      </label>
      <p><input type="number" min="1" name="price" onChange={this.handleChange} placeholder={this.mycurrency} className={'inputsdropdown'}/></p>
        <p className={'hints'}>You Can Change Your Currency In Account Settings</p>
      </div>
      {this.age_for_accessory}

      </div>

      <div className={'TwoColumns'}>

      <div className="full">
      <label className={'Formtitle'}>
      Ad Description
      </label>
      <p><textarea type="text" rows="4" cols="50" name="description" onChange={this.handleChange} className={'textarea'}/></p>
        <p className={'hints'}>Max 3000 Characters</p>
      </div>

      </div>

      {this.color_storage_condition_age}


      <div className={'PictureColum'}>

      <div className={'picture_area'}>
      <label for="file">
      <input id="userFile" type="file" style={{display:"none"}} name="userFile" accept=".png,.gif,.jpeg,.jpg" onChange={(e) =>this.handleFileInput(e)} multiple/>
      <Image src="/img/camera.png" className={'fle'}/>
      </label>

      </div>

      <p className={'hints'}>Ads with Photos Sell Faster</p>

      <div className="picture_view">
        <Image id="blah" className="picture_view" src={this.imageSrc}  />
      </div>


      </div>

      </form>

      {this.mobile_or_accessory_button}

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
      <Checkbox name="brands" onChange={phonedeadcheck} type="checkbox" />
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
     <Accordion className={'MainAccordion_1'} >

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
          <Accordion className={'MainAccordion_1'} >

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


export default withRouter(PostAd);
