import React, { Component } from 'react';
import HomeHeaderBar from '../HomeHeaderBar/HomeHeaderBar'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import EventBus from 'eventing-bus';
import { Image } from 'react-bootstrap';
import {Gallery} from '../Magnifier/index.js';
import ImageGallery from 'react-image-gallery';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { withRouter, BrowserRouter as Router, Route, Link } from "react-router-dom";
import Modal from 'react-modal';
import Geocode from "react-geocode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


var url = require('url');
import './AdScreen.css';

const options = ['flag as fake','flag as sold','needs review'];
const urlObj = url.parse(document.location.href, true);
const port = "" ;



// Get address from latidude & longitude.


const GridItemImage= {
  height:  '500px',
  width: '500px',
  objectFit: 'scale-down',
  overflow: 'hidden'
}
Geocode.enableDebug();
Geocode.setApiKey("AIzaSyAmJXP-luQXB68lchXN2Wm9oe40MuxzHHI");


class AdScreen extends Component {

  currentAd = {}
  currentDevice = {}
  currentUser = {}
  picturesContent = [<img src="https://www.cleartrip.com/hotels/assets/default-img.jpg"/>]
  demopictures = [
    <img src="https://www.cleartrip.com/hotels/assets/default-img.jpg"/>,
]
  demopictures1 = "https://www.cleartrip.com/hotels/assets/default-img.jpg"
  demopictures2 = "https://www.cleartrip.com/hotels/assets/default-img.jpg"
  demopictures3 = "https://www.cleartrip.com/hotels/assets/default-img.jpg"
  demopictures4 = "https://www.cleartrip.com/hotels/assets/default-img.jpg"
  deviceDetailsContent = []
  userImg = "https://www.planwallpaper.com/static/images/wallpaper-cool-hd-3d.jpg"
  accessories = "-"
  currentprice = "-"
  favContent = "-"
  favourite = "-"
  advert_id= "-"
  mycurrency =""
  DeviceName = "-"
  new_offer = "-"
  offer_id = "-"
  usedage = "-"
  adlat = "-"
  adlng = "-"
  ad_address = "Getting User Location"
  current_offers = []
  current_ad_user_id = []
  boosted = []
  col_stor = true
  getObjectByValue(array, key, value) {
    return array.filter(function (object) {
        return object[key] === value;
    });
    return -1
  };

  constructor(props){
  super(props)
  this.state = {
    result: '',
    showModal: false

  };

  this.handleOpenModal = this.handleOpenModal.bind(this);
  this.handleCloseModal = this.handleCloseModal.bind(this);

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
  this.col_stor = true;

  }

  handleOpenModal () {
    if(localStorage.getItem('JWT') != undefined && localStorage.getItem('JWT') != null){
      this.setState({ showModal: true });
    }else{
      toast.error("Please Login First", {
        autoClose: 3000,
        position: toast.POSITION.TOP_LEFT
      });
    }
  }


  handleCloseModal () {
    this.setState({ showModal: false });
  }

  adReceived(adObject)
  {

      this.currentAd =adObject
      if(this.currentAd != undefined && this.currentAd != ''){
        console.log("goint to fill fillVariabless");
        EventBus.publish("showLoading")

        setTimeout(this.fillVariables(), 5000)


      }
  }

    report_fake(){
    this.report_type="flag as fake";
    }
    report_sold(){
    this.report_type="flag as sold";

    }
    report_review(){
    this.report_type="needs review";

    }
    _onSelect = (e)=>{
      console.log(e.value);
      var report = e.value

        if(localStorage.getItem('JWT') != undefined && localStorage.getItem('JWT') != ''){
        var request = require("request");
        var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/report'
        var options = { method: 'POST',
        url: urlPath,
        headers:
        { 'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('JWT'),},
        body: {
          advert_id:this.advert_id,
          type:report
      },
        json: true };
        console.log("Call", options);

        request(options,  (error, response, body)=> {
          if (error) throw new Error(error);
          console.log(body)
          if (body){
            console.log("API Result Found", body);
            console.log("API Result Found", response);

          }else{
            console.log("API Result NOT Found");
          }
        });

        this.setState((state, props) => {
        return {counter: state.counter + props.step};
        })
      }else{
        toast.error("Please Login First", {
          autoClose: 3000,
          position: toast.POSITION.TOP_LEFT
        });
      }

    }

  getAdDetailsFromAnywhere()
  {

    EventBus.publish("showLoading")
    if (this.props.match.params.id == null)
    {
      console.log("No Ad ID");
    }
    else
    {
      var ads = localStorage.getItem("adsResult")
      var json = JSON.parse(ads)
      console.log("All Ads", json);

      if (localStorage.getItem("AD-"+this.props.match.params.id) != null){
        this.currentAd = JSON.parse(localStorage.getItem('AD-'+this.props.match.params.id));
        console.log("Found Individual", ('AD-'+this.props.match.params.id));

          this.fillVariables()

      }
        else if(json != null && this.getObjectByValue(json, "_id", this.props.match.params.id) != -1)
      {
        var obj = this.getObjectByValue(json, "_id", this.props.match.params.id)[0]
        console.log("This Ad", obj);
        this.currentAd = obj
        if(this.currentAd == undefined || this.currentAd == ''){
          console.log("empty")
          this.props.history.push('/not-found')
        }

          this.fillVariables()
      }

      else
      {
          EventBus.on("AD-"+this.props.match.params.id, this.adReceived.bind(this));
          EventBus.publish("getAdDetails",  {advert_id: this.props.match.params.id})
          this.fillVariables()

      }

    }

  }

  onOpenModal = () => {
    console.log("open")
   this.setState({ open: true });
 };

  onCloseModal = () => {
   this.setState({ open: false });
 };

  getads(){
    EventBus.publish("showLoading")
    EventBus.publish("getAdDetails",  {advert_id: this.props.match.params.id})
    EventBus.on("AD-"+this.props.match.params.id, this.adReceived.bind(this));
    console.log("this task is done in getadss");
    // this.fillVariables();
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
        }else if(response.results[0].address_components.length > 3 && response.results[0].address_components[4].short_name != undefined && response.results[0].address_components[4].short_name != ''){
            this.ad_address = response.results[0].address_components[4].long_name;
          }else if(response.results[0].address_components[0].short_name != undefined && response.results[0].address_components[0].short_name != ''){
            this.ad_address = response.results[0].address_components[0].long_name;
          }else{
            this.ad_address = "Cannot find the Location"
          }

        }
        // response.results.forEach(function(i,idx,n){
        //   if(i.types[1] = "administrative_area_level_1"){
        //     console.log(response.results.types);
        //     console.log(i.formatted_address);
        //   }
        // })

        console.log("this is address",this.ad_address);
        EventBus.publish("stopLoading")

      },
      error => {
        console.error("this is error",error);
        EventBus.publish("stopLoading")

      }
    );

  }

  fillVariables()
  {

    console.log("Id", this.props.match.params.id);


      var p = []
      console.log("my id ", localStorage.getItem('userid'));
      console.log("currentAd", this.currentAd)


      console.log("picture details", this.picturesContent);
      this.accessories = ""
      var aa = ""

      this.currentAd.accessories.forEach(function(i,idx,n){

        aa += (i.title+",")
      })

      if (aa == "")
      {
        this.accessories = "-"
      }
      else {
        this.accessories = aa
      }
      if(this.currentAd.price){
        EventBus.publish("showLoading")

        this.currentprice = this.currentAd.price.toFixed(2);

      }

      var off =[]

      this.adlat = this.currentAd.location[0]
      this.adlng = this.currentAd.location[1]
      this.getaddress();


      console.log("accessories", this.accessories);

      var device = this.currentAd.deviceDetails;
      this.currentDevice = device;
      this.favourite = this.currentAd.isFavourite;
      this.boosted = this.currentAd.boosted;
      this.current_ad_user_id = this.currentAd.user_id._id;
      this.advert_id = this.currentAd._id;

      if(this.current_ad_user_id != localStorage.getItem('userid')){

        console.log("this.current_ad_user_id", this.current_ad_user_id);
        this.checkFavourite();

      }else{
        this.checkmyadd()

      }
      console.log("logsss",this.currentDevice);
      if(this.currentAd.type == "mobile"){
        console.log("in mobilees", this.currentAd.type);
        this.DeviceName = this.currentAd.deviceDetails.DeviceName
      }else{
        this.DeviceName = "-"
      }
      if(this.currentAd.age == 1){
        this.usedage = "- used" + ' ' + this.currentAd.age + ' ' + "Year"
      }else if(this.currentAd.age == 0){
        this.usedage = "- Less than a year"
      }else if(this.currentAd.age == -1){
        this.usedage = "- Brand new"
      }else(
        this.usedage = "- used" + ' ' + this.currentAd.age + ' ' + "Years"
      )
      console.log("Device Details", device);
      console.log("favourite Details", this.favourite);

      var aduser = this.currentAd.user_id
      this.currentUser = aduser
      console.log("User Details only", aduser);



      var pics = this.currentAd.pictures
      this.demopictures = this.currentAd.pictures

      if(this.currentAd.pictures[0]){
        this.demopictures1 = this.currentAd.pictures[0]
      }
      if(this.currentAd.pictures[1]){
        this.demopictures2 = this.currentAd.pictures[1]
      }
      if(this.currentAd.pictures[2]){
        this.demopictures3 = this.currentAd.pictures[2]
      }
      if(this.currentAd.pictures[3]){
        this.demopictures4 = this.currentAd.pictures[3]
      }

      console.log("piccsss",this.picturesContent);
      pics.forEach(function(i,idx,n){

        p.push(<Image src={i}/>)
        // p.push({ 'original': i})
      })
      this.picturesContent = p
      this.deviceDetailsContent = []

      if(device != undefined && device != ''){
      this.col_stor = true;
      delete device._id;
      delete device.Brand;
      delete device.offers;
      delete device.pictures;
      delete device.__v;

      for (var key in device) {
        EventBus.publish("showLoading")

        this.deviceDetailsContent.push(
          <div style={{display: "flex"}}>
            <div className="deviceDetailsKey DeviceName">{key}</div>
            <div className="deviceDetailsValue fontRegular DeviceName">{device[key]}</div>

          </div>
        )

      }
    }else{
      this.col_stor = false;

    }
        this.current_offers = this.currentAd.offers
        this.format_offers();


      this.setState((state, props) => {
        console.log("Loading Pics");
      return {counter: state.counter + props.step};
    })


  }
  format_offers(){
    console.log("in format offers");
    var status = []
    var offered_price = []
    var offer_id =[]
    if(this.current_offers != undefined && this.current_offers != ''){
    this.current_offers.forEach(function(i,idx,n){

      if(i.user_id == localStorage.getItem('userid')){

        console.log("id matched", i.status)
        status = i.status
        offered_price = i.offered_price.toFixed(2);
        offer_id = i._id;
      }
    })
    this.offer_id = offer_id
  }
    if(status == "pending"){
      console.log("pending for update");
      this.new_offer = <div>
        <span className={"close"} onClick={this.handleCloseModal}>x</span>
        <label className={"labels"}>
        Your Offer was {offered_price}
        </label> <br /><br />
        <div ><br />
        <label className={"labels2"}>

        </label> <br />
        <div className={"offer_inp"}>
        <span className={"labels2"}> {this.mycurrency} </span> &nbsp; <input type="number" name="offering" onChange={this.handleChange} className={"offer_input"}/>
        </div>
        <div>
        <button className={"BlueButton"} style={{marginLeft:"29%", marginTop:"20%"}} onClick={this.updateoffer}>
        Update Offer
        </button>
        </div>
        </div>
        </div>
    } else if(status == "counter"){
      console.log("pending for re-counter");
      this.new_offer = <div>
        <span className={"close"} onClick={this.handleCloseModal}>x</span>
        <label className={"labels"}>
        Re-Counter offer is {offered_price}
        </label> <br /><br />
        <div >
        <label className={"labels2"}>

        </label> <br />
        <div className={"offer_inp"}>
        <span className={"labels2"}> {this.mycurrency} </span> &nbsp; <input type="number" name="offering" onChange={this.handleChange}  className={"offer_input"}/>
        </div>
        <div>
        <button className={"BlueButton"} style={{marginLeft:"29%", marginTop:"20%"}} onClick={this.updateoffer}>
        Re-Counter
        </button>
        </div>
        </div>
        </div>

    } else if(status == "re-counter"){
      console.log("make offer");
      this.new_offer = <div>
        <span className={"close"} onClick={this.handleCloseModal}>x</span>
        <label className={"labels"}>
        Your offer is pending
        </label> <br /><br />
        <div ><br />
        <label className={"labels2"}>
        </label> <br />

        <div>
        <button className={"BlueButton"} style={{marginLeft:"29%", marginTop:"20%"}}>
        Re-Countered
        </button>
        </div>
        </div>
        </div>

    } else if(status == "rejected"){
      console.log("make offer");
      this.new_offer = <div>
        <span className={"close"} onClick={this.handleCloseModal}>x</span>
        <label className={"labels"}>
        Make An Offer
        </label> <br /><br />
        <div ><br />
        <label className={"labels2"}>
        </label> <br />
        <div className={"offer_inp"}>
        <span className={"labels2"}> {this.mycurrency} </span> &nbsp;  <input type="number" name="offering" onChange={this.handleChange} className={"offer_input"}/>
        </div>
        <div>
        <button className={"BlueButton"} style={{marginLeft:"29%", marginTop:"20%"}} onClick={this.makeoffer}>
        Make Offer
        </button>
        </div>
        </div>
        </div>

    }else{
      console.log("make offer");
      this.new_offer = <div>
        <span className={"close"} onClick={this.handleCloseModal}>x</span>
        <label className={"labels"}>
        Make An Offer
        </label> <br /><br />
        <div ><br />
        <label className={"labels2"}>
        </label> <br />
        <div className={"offer_inp"}>
        <span className={"labels2"}> {this.mycurrency} </span> &nbsp;  <input type="number" name="offering" onChange={this.handleChange} className={"offer_input"}/>
        </div>
        <div>
        <button className={"BlueButton"} style={{marginLeft:"29%", marginTop:"20%"}} onClick={this.makeoffer}>
        Make Offer
        </button>
        </div>
        </div>
        </div>
    }
  }
  componentDidUpdate(){
  }
  componentDidMount() {
    // this.getAdDetailsFromAnywhere()

    EventBus.publish("showLoading")

    this.getads()

    if(localStorage.getItem('JWT') != undefined && localStorage.getItem('JWT') != ''){
      this.mycurrency = localStorage.getItem('currency')
    }else{
      this.mycurrency = 'USD'
    }

}


addfavourite=(e)=>{
  if(localStorage.getItem('JWT') != undefined && localStorage.getItem('JWT') != ''){
  console.log("add favourites");
  console.log(this.favContent);
  var request = require("request");
  var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/addFavouriteAdds'
  var add= 'true';
  console.log(add);
  var options = { method: 'POST',
  url: urlPath,
  headers:
  { 'Cache-Control': 'no-cache',
  'Content-Type': 'application/json',
  Authorization: localStorage.getItem('JWT'),},
  body: {
    advert_id:this.advert_id,
    add:add
},
  json: true };
  console.log("Call", options);

  request(options,  (error, response, body)=> {
    if (error) throw new Error(error);
    console.log(body)
    if (body.message){
      console.log("favourite changed", body.message);
      console.log("favourite changed", body.ad);
      // localStorage.setItem('AD-'+this.advert_id, JSON.stringify(body.ad));
    }else{
      console.log("API Result NOT Found");
    }
  });
  this.favContent = this.isFavourite

  this.setState((state, props) => {
  return {counter: state.counter + props.step};
  })
}else{
    toast.error("Please Login First", {
      autoClose: 3000,
      position: toast.POSITION.TOP_LEFT
    });
}
}
makeboost=(e)=>{
  if(localStorage.getItem('JWT') != undefined && localStorage.getItem('JWT') != ''){
  var boost = true;
  EventBus.publish("makeboost", {advert_id:this.advert_id,enabled:boost});

}else{

}
}

removeboost=(e)=>{

  if(localStorage.getItem('JWT') != undefined && localStorage.getItem('JWT') != ''){
  var boost = false;
  EventBus.publish("removeboost", {advert_id:this.advert_id,enabled:boost});

}else{
}
}

removefavourite=(e)=>{

  if(localStorage.getItem('JWT') != undefined && localStorage.getItem('JWT') != ''){
  console.log("remove favourites");
  this.favContent = this.notFavourite
  console.log(this.favContent);
  var request = require("request");
  var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/addFavouriteAdds'
  var remove = false;
  var options = { method: 'POST',
  url: urlPath,
  headers:
  { 'Cache-Control': 'no-cache',
  'Content-Type': 'application/json',
  Authorization: localStorage.getItem('JWT'),},
  body: {
    advert_id:this.advert_id,
    add:remove
},
  json: true };
  console.log("Call", options);

  request(options,  (error, response, body)=> {
    if (error) throw new Error(error);
    console.log(body)
    if (body.message){
      console.log("favourite changed", body.message);
      console.log("favourite changed", body.ad);
      // localStorage.setItem('AD-'+this.advert_id, JSON.stringify(body.ad));
    }else{
      console.log("API Result NOT Found");
    }
  });

  this.setState((state, props) => {
  return {counter: state.counter + props.step};
  })
}else{

}


}

  isFavourite = <div>
  <img className="likeBtn" src="/img/yes-like.png" onClick={this.removefavourite}/>
  </div>

  notFavourite = <div>
  <img className="likeBtn" src="/img/no-like.png" onClick={this.addfavourite}/>
  </div>

  isBoosted = <div>
  <img className="boost" src="/img/boost-dis.png" onClick={this.removeboost}/>
  </div>

  notBoosted = <div>
  <img className="boost" src="/img/boost.png" onClick={this.makeboost}/>
  </div>

  checkFavourite() {

    if(this.favourite == true){
      this.favContent = this.isFavourite
    } else if(this.favourite  == false){
      this.favContent = this.notFavourite
    }
  }

  checkmyadd(){
    if(this.boosted == true){
      this.favContent = this.isBoosted
    } else if(this.boosted  == false){
      this.favContent = this.notBoosted
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
    console.log(event.target.value);
  }

  makeoffer = (event) => {

    var offer = parseInt(this.state.offering)
    console.log("price offered", this.state.offering);
    console.log(offer);
    if(offer !== undefined && offer !== '' && offer !== null){
      EventBus.publish("makeoffer", {advert_id:this.advert_id,price:offer});
      setTimeout(this.handleCloseModal(), 5000)
      this.setState((state, props) => {
      return {counter: state.counter + props.step};
      })
    }

    else{
      alert("Fields Missing!");
    }
  }
  updateoffer = (event) => {

    var offer = parseInt(this.state.offering)
    console.log("price offered", parseInt(this.state.offering));
    console.log("offer id", this.offer_id);
    console.log(offer);
    if(offer !== undefined && offer !== '' && offer !== null){
      EventBus.publish("updateoffer", {offer_id:this.offer_id,offered_price :offer});
      setTimeout(this.handleCloseModal(), 5000)

      this.setState((state, props) => {
      return {counter: state.counter + props.step};
      })
    }
    else{
      alert("Fields Missing!");
    }
  }
  switchpage = (page) =>
  {
    var url = "/accounts/" + page
    console.log("Value", page);
    this.setState((state, props) => {
    return {counter: state.counter + props.step};
    })

    console.log("props", this.props.match.params.id);
    window.location.reload();
    this.props.history.push(url)
  }


  render(){
    const images = [
      {
        original: this.picturesContent[0],
        thumbnail: this.picturesContent,
        originalClass: 'GridItemImage',
        sizes:60,
      }
    ]

    return (


      <div className="AdPage">

        <HomeHeaderBar />
        <div className={'PageBody'}>

          <div className="leftSide">
          <Link to={"/"}>
            <p className="fontSemiBold backBtn">Back to Home</p>
            </Link>
            <Carousel>
            <img src={this.demopictures1}/>
            <img src={this.demopictures2}/>
            <img src={this.demopictures3}/>
            <img src={this.demopictures4}/>
            </Carousel>
              <div className="userInfo">
                <img className="userImageRound" src={this.currentUser.profilePicture} />
                <p className="fontRegular userNameText">{this.currentUser.name}</p>
                <p className="fontRegular userAreaText">{this.ad_address}</p>
              </div>
              <div className="report fontRegular">
              <Dropdown className='dropdown' options={options} onChange={this._onSelect.bind(this)} placeholder="Report this ad" />
              </div>

          </div>

          <div className="middleSide fontRegular">
            <p className=" fontSemiBold AdTitle">{this.currentAd.title}</p>
            <p className=" fontRegular AdDescription">{this.currentAd.description}</p>

            {this.favContent}

            <div className="icons_details" hidden={!this.col_stor}>
            <div className="fontRegular specsstorage" >
              <img className="specsImg"  src="/img/storage.png" /> <span className="specsText fontRegular "> {this.currentAd.storage} </span>
            </div>

            <div className=" fontRegular specsstorage">
              <img className="specsImg"  src="/img/color.png" /> <span className="specsText fontRegular "> {this.currentAd.color} </span>
            </div>
            </div>


            <p className=" fontRegular AdDescription bottom"> - includes <span className="bold">{this.accessories}</span> </p>
            <p className=" fontRegular AdDescription bottom"> <span className="bold">{this.usedage}</span> </p>


            <div className="fullLine fontRegular " >
              <button className="contactbutton" onClick={ () => this.switchpage("Messages") }>
              <Image className="buttonpic" src="/img/message.png" />
            <span className="buttontext">  CONTACT </span>
              </button>
            </div>
            <div className="fullLine fontRegular " >
              <button className="buybutton" onClick={this.handleOpenModal}>
              <Image className="buttonpic" src="/img/cart.png" />
              <span className="buttontext" > BUY THIS </span>
              </button>

            </div>
            <Modal style={{borderRadius:"20px"}} isOpen={this.state.showModal} contentLabel="Minimal Modal Example" >
            {this.new_offer}

            </Modal>

            <div className={"fullLine fontSemiBold pricediv"}>
            <span className={"currency"}>{this.mycurrency}</span> <span className={"price"}>{this.currentprice}</span>
            </div>



          </div>

          <div className="fontRegular rightSide">
            <p className="fontRegular fontSemiBold fontRight DeviceName">{this.DeviceName}</p>

            {
              this.deviceDetailsContent
            }
          </div>


        </div>
        <ToastContainer />
      </div>

    )
  }


}

export default withRouter(AdScreen);
