import React, { Component } from 'react';
import EventBus from 'eventing-bus';
import { Image } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios, { post } from 'axios'

var url = require('url');
import './AccountSettings.css';

const urlObj = url.parse(document.location.href, true);
const port = "" ;

const success_toast = {
  backgroundColor: '#156dbf',
  color: 'white'
};
const packagedetails_color ={}

class MyAccount
 extends Component {

   profilePicture = []
   users_id = []
   username = "Danial"
   profilePicture = []
   userdetails = []
   allpackages = []
   UserDetailsContent= []
   packagedetails=[]
   available_packages = []
   name = []
   email = []
   mobile = []
   currency = []
   lower_section= []
   account_details =[]
   allcurrencies =[]
   file =[]
  componentDidMount() {
    EventBus.publish("showLoading")
    this.getallpackages();
    this.getUserDetails();
    console.log("enums received are", JSON.parse(localStorage.getItem('enums')));

  }
  constructor(props){
  super(props)
  this.state = {
  };
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

  }

  handleChange = (event) => {

    this.setState({[event.target.name]: event.target.value});
    console.log(event.target.value);
    console.log(event.target.name);
  }

  handle_update = (event) => {
    console.log("user_name", this.state.user_name);
    console.log("currency",this.state.currency);
    var upper_currency = []
    if(this.state.currency != undefined && this.state.currency != null && this.state.currency != ''){
      upper_currency = this.state.currency.toUpperCase();
    }

    EventBus.publish("showLoading")
    var request = require("request");
    var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/updateUser'

    var options = { method: 'POST',
    url: urlPath,
    headers:
    { 'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('JWT'),},
    body: {name:this.state.user_name, currency:upper_currency},
    json: true };

    console.log("Call", options);

    request(options,  (error, response, body)=> {
      if (error) throw new Error(error);{
        EventBus.publish("stopLoading")
      }
      if (body){
        if(body['user']){
          localStorage.setItem('currency',body['user']['currency']);
          localStorage.setItem('user',JSON.stringify(body['user']))
        }
        if(body['token']){
          localStorage.setItem('JWT',body['token']);
        }

        console.log("result Received", body);
        console.log(localStorage.getItem('currency'));

        console.log(localStorage.getItem('JWT'));
        window.location.reload();
      }else{
        console.log("API Result NOT Found");
        EventBus.publish("stopLoading")
      }
    });

  }

  handle_pass_update = (event) => {
    console.log("user_name", this.state.old_password);
    console.log("currency",this.state.new_password);
    EventBus.publish("showLoading")
    var request = require("request");
    var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/changePassword'

    var options = { method: 'POST',
    url: urlPath,
    headers:
    { 'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('JWT'),},
    body: {oldPassword:this.state.old_password, newPassword:this.state.new_password},
    json: true };

    console.log("Call", options);

    request(options,  (error, response, body)=> {
      if (error) throw new Error(error);{
        EventBus.publish("stopLoading")
      }
      if (body){
        console.log("result Received", body);
        if(body['message'] == "Password updated"){
          toast.success("Password Updated !", {
              autoClose: 2000,
              position: toast.POSITION.TOP_CENTER,
              className: 'password_success_toast'
            });
        }else{
          toast.error("Mismatched Passwords !", {
              autoClose: 2000,
              position: toast.POSITION.TOP_CENTER,
              className: 'password_fail_toast'
            });
        }
        // window.location.reload();
      }else{
        console.log("API Result NOT Found");
        EventBus.publish("stopLoading")
      }
    });

  }

  getUserDetails(){
    EventBus.publish("showLoading")
    var request = require("request");
    var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/getUserDetails'

    var options = { method: 'POST',
    url: urlPath,
    headers:
    { 'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('JWT'),},
    body: {},
    json: true };

    console.log("Call", options);

    request(options,  (error, response, body)=> {
      if (error) throw new Error(error);
      if (body.result){
        this.userdetails = body.result;
        console.log("result Received", body.result);
        this.showuserdetails();
      }else{
        console.log("API Result NOT Found");
      }
    });

  }
  getallpackages(){
    var request = require("request");
    var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/getAllPackages'

    var options = { method: 'POST',
    url: urlPath,
    headers:
    { 'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('JWT'),},
    body: {},
    json: true };

    console.log("Call", options);

    request(options,  (error, response, body)=> {
      if (error) throw new Error(error);
      if (body.result){
        this.allpackages = body.result;
        console.log("packages Received", body.result);
        this.showuserpackages();
      }else{
        console.log("API Result NOT Found");
      }
    });

  }

  showuserdetails(){
    var user = this.userdetails
    console.log(user)
    var userdets = []

    for (var key in user) {
      userdets.push(
        <div>

          <div className="deviceDetailsKey DeviceName">{key}</div>
          <div className="deviceDetailsValue DeviceName">{user[key]}</div>

        </div>
      )
      console.log(key,  user[key]);

    }
    this.UserDetailsContent = userdets
    this.packagedetails = this.userdetails.package
    packagedetails_color = this.userdetails.package.color
    console.log("color received is",packagedetails_color);
    this.name = this.userdetails.name
    this.email = this.userdetails.email
    this.mobile = this.userdetails.mobile
    this.currency = this.userdetails.currency
    this.profilePicture = this.userdetails.profilePicture
    this.users_id = this.userdetails._id
    console.log(this.name, this.email ,this.mobile ,this.currency)

    this.account_details =
    <span>
    <span className="edit" onClick={this.user_edit}>
    <Image className={"CheckedImage"} src="/img/edit.png" />
    </span>
    <div className="box" >
    <div className="userKeys users_details">Name </div>
    <div className="userValue users_details">{this.name}</div>
    <div className="userKeys users_details">Email </div>
    <div className="userValue users_details">{this.email}</div>
    <div className="userKeys users_details">Phone Number </div>
    <div className="userValue users_details">{this.mobile}</div>
    <div className="userKeys users_details">Currency</div>
    <div className="userValue users_details">{this.currency}</div>
    <div className="userKeys users_details">Change Password</div>
    <div className="userValue users_details" onClick={this.pass_edit}><Image className={"edit_pass_image"} src="/img/edit.png" /></div>

    </div>
    </span>
    this.lower_section = this.account_details
    var enums = JSON.parse(localStorage.getItem('enums'))
    this.allcurrencies = enums.currency;

    var cur =[]
    this.allcurrencies.forEach(function(i,idx,n){
      var color = i.color
      cur.push(
        <option className="name" value={i}>
        {i}
        </option>
      )
    })
    this.allcurrencies = cur

    console.log(this.packagedetails)
    this.setState((state, props) => {
    return {counter: state.counter + props.step};
  })
  EventBus.publish("stopLoading")

  }
  return_to_accounts = () =>{
    EventBus.publish("showLoading")

    this.lower_section = this.account_details
    EventBus.publish("stopLoading")

  }
  updatepackage = (e) => {
    console.log("updating package",e);
    var txt;
    var r = confirm("Press a button!");
    if (r == true) {
        txt = "You pressed OK!";
        console.log(txt);
        EventBus.publish("showLoading")
        var request = require("request");
        var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/updateUserPackage'

        var options = { method: 'POST',
        url: urlPath,
        headers:
        { 'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('JWT'),},
        body: {package_id:e},
        json: true };

        console.log("Call", options);

        request(options,  (error, response, body)=> {
          if (error) throw new Error(error);{
            EventBus.publish("stopLoading")
          }
          if (body){
            console.log("result Received", body);

            window.location.reload();
          }else{
            console.log("API Result NOT Found");
            EventBus.publish("stopLoading")
          }
        });
    } else {
        txt = "You pressed Cancel!";
        console.log(txt);

    }

  }
  handleFileInput = (e) => {
    console.log("filename ::", e.target.files[0]);
    this.file = e.target.files[0];
    console.log(this.file);
    var picdata = new FormData();
    picdata.append('userFile', 'e.target.files[0]');
    picdata.has('userFile'); // Returns true
    console.log(picdata.has('userFile'));
    if(this.file != undefined && this.file != '' && this.file != null){
        console.log("sending to fileupload")
        var txt;
        var r = confirm("Press a button!");
        if (r == true) {
            this.filetoupload()
        }else{
            txt = "You pressed Cancel!";
            console.log(txt);
        }
    }
  }

  filetoupload(){
    var fill = this.file;
    var id = this.newad_id;
    this.fileUploader(fill).then((response)=>{
    console.log("response file :: ", response.data);
    window.location.reload();
    })
  }

  fileUploader(file)
  {
    console.log("file :: ", file);
    // const url = 'https://httpbin.org/post';
    const formData = new FormData();
    formData.append('userFile',file)
    const idData = new FormData();
    idData.append('_id',this.users_id)
    const config = {
        headers: {'content-type': 'multipart/form-data',
      Authorization: localStorage.getItem('JWT')},
    }

    console.log("FormData", formData);
    return  post(urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/uploadUserImage/', formData,config)
  }

  showuserpackages = () =>{
    console.log(this.allpackages);
    var cc =[]
    var package_description = []
    this.allpackages.forEach((i,idx,n) =>{
      package_description = i.description
      console.log("package description iss",package_description);
      var pack = i.picture
      var color = i.color
      var price = "USD" + ' ' + i.price + ' '  + '<br />' +  ' ' + "Per Month"
      cc.push(
        <div style={{fontFamily:"proxs"}}>

        <div className={"AdItem"} onClick={() => this.updatepackage(i._id)}>
        <div className ={"package_title"} style={{color}}>
        {i.name}
        </div>
        <div className ={"package_description"}>
        {package_description}

        </div>
        <div style={{color}} className ={"package_price"}>
        USD {i.price} <br />
        Per Month

        </div>
        <img className={"package_img"} height="15" src={pack} />
        </div>



        </div>
      )

    })
    console.log(cc)
    this.available_packages = cc


    console.log(this.available_packages)
    this.setState((state, props) => {
    return {counter: state.counter + props.step};
  })

  }

  upgradePackage = () =>{
    EventBus.publish("showLoading")

    console.log("in package upgrade");
    this.lower_section =
    <span style={{overflowY:"hidden"}}>
    <Image className={"CheckedImage"} src="/img/cross.png" onClick={this.return_to_accounts} />
    <div className="box" >
    {this.available_packages}
    </div>
    </span>
    EventBus.publish("stopLoading")

  }

  user_edit = () =>{
    EventBus.publish("showLoading")

    console.log("in user edit");
    this.lower_section =
    <span style={{overflowY:"hidden"}}>
    <Image className={"CheckedImage"} src="/img/cross.png" onClick={this.return_to_accounts} /> <br />
    <div className="box" >
    <div className="userKeys users_details">Name </div>
    <div><input type="text" name="user_name" onChange={this.handleChange} className="userValue users_details name_input"/></div>
    <br /> <br />
    <div className="userKeys users_details">Currency </div>

    <div className="userValue users_details">
    <select name="currency" onClick={this.handleChange} className="currency_input">
    <option>
    </option>
    {this.allcurrencies}
    </select>
    </div>

    </div>
    <button className={"update_button"} onClick={this.handle_update}>
    Update
    </button>
    </span>
    EventBus.publish("stopLoading")
  }

  pass_edit = () =>{
    EventBus.publish("showLoading")

    console.log("in pass edit");
    this.lower_section =
    <span style={{overflowY:"hidden"}}>
    <Image className={"CheckedImage"} src="/img/cross.png" onClick={this.return_to_accounts} /> <br />
    <div className="box" >
    <div className="userKeys users_details">Old Password </div>
    <div><input type="Password" name="old_password" onChange={this.handleChange} className="userValue users_details name_input"/></div>
    <br /> <br />

    <div className="userKeys users_details">New Password </div>
    <div><input type="Password" name="new_password" onChange={this.handleChange} className="userValue users_details name_input"/></div>

    </div>
    <button className={"update_button"} onClick={this.handle_pass_update}>
    Update
    </button>
    </span>
    EventBus.publish("stopLoading")
  }



  render(){
    return (


      <div className="MyAccount">
      <div className="MyProfile fontRegular">

      <div className="img_div">
      <Image className={"user_img"} height="80" width="80" src={this.profilePicture} />
      </div>
      <b className={"name"}>
      {this.name}
      </b>

      <div className="upload_image">
      <label for="file">
      <input id="file" type="file" style={{display:"none"}} name="userFile" accept=".png,.gif,.jpeg,.jpg" onChange={(e) =>this.handleFileInput(e)} />
      <Image src="/img/camera.png" height="30" width="30" />
      </label>
      </div>
      <div className="for_text">PNG or JPG, Maximum size 5MB.
      <button className="upgrade" style={{backgroundColor:packagedetails_color, borderColor:packagedetails_color}} onClick={this.upgradePackage}> &nbsp; Upgrade </button>

      <div className="package_name" style={{color:packagedetails_color}}>
      {this.packagedetails.name}
      </div>

      </div>
      <div className="packae_bar">
      <Image className={"bar"} src={this.packagedetails.picture} />
      </div>
      {this.lower_section}
      </div>
      <ToastContainer />
      </div>

    )}

}

export default MyAccount;
