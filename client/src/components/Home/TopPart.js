import React, { Component } from 'react';
import { Col, Glyphicon, InputGroup,Image, Button,Label,FormGroup,form,FormControl,ControlLabel  } from 'react-bootstrap';
import EventBus from 'eventing-bus';
import './HomePage.css'
import { withRouter, BrowserRouter as Router, Route, Link } from "react-router-dom";
import Geocode from "react-geocode";
import { createGeoInput, DefaultGeoInput } from 'react-geoinput';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
// import {geoPropTypes, geolocated} from 'react-geolocated';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const manuCallback = function(object) {}
const SimpleInput = createGeoInput(DefaultGeoInput);

interface IDemoProps {
  label: string;
}

var searcharea = []
var lat = []
var lng = []

const fieldText = {
  backgroundColor: '#ffffff',
  height: '35px',
  'borderColor': '#ffffff',
  outline: 'none',
  color: '#5f5f5f'
}



const fieldImg = {
  backgroundColor: '#ffffff',
  width: '35px',
  height: '35px',
  'borderColor': '#ffffff',
  display: 'block',
  'marginLeft': 'auto',
  'marginRight': 'auto',
  padding: '08px'
}


const reactionImg = {
  backgroundColor: '#ffffff',
  width: '35px',
  height: '35px',
  'borderColor': '#ffffff',
  display: 'block',
  'marginLeft': 'auto',
  'marginRight': 'auto',
  padding: '08px'
}

const TopPartLabel={

  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordWrap: 'break-word',
  fontWeight: '700',
  color: '#555555',
  textAlign: 'left',
  fontSize: '18px',
  height: '30px'

}

const TopSearchLabelText={

  paddingTop: '10px',
  width: '15%',
  color: '#555555',
  textAlign: 'left',
  fontSize: '18px',
  display:'float'
}

const TopSearchBox={
  paddingTop: '0px',
  width: '90%',
  color: '#555555',
  textAlign: 'left',
  fontSize: '15px',
  display:'float',
  height: '35px',
  borderColor: '#ffffff'
}

const TopSearchLabelDiv={
  margin: '0px 0px 0px 0px',
  height: '40px',
  display: 'flex'
}

var TopText = ""
var SearchLabelText = ""


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

// <span>
//     {geoDestinationInput.value ? JSON.stringify(geoDestinationInput.value.location.lat, null, 2): ''}
// </span>
class TopPart extends Component {

  searching_in = "Current Location"
  radiuspoints =[]
  startinglat = ''
  startinglng = ''
  radius = [
    {"name":"National", "count": "National"},
    {"name":"10", "count": 10},
    {"name":"20", "count": 20},
    {"name":"50", "count": 50},
    {"name":"100", "count": 100},
    {"name":"200", "count": 200},

];

  state = {
      open: false,
      address: '',
      geoDestination: undefined,
    }
    onAddressChange = value => this.setState({ address: value })
    onGeoDestinationChange = value => this.setState({ geoDestination: value })

  manuCallback = function(object)
  {
  //  console.log("Changing to ", object);
    this.TopText = "Vom Hersteller "+object+" gibt es folgende Produkte"

    this.setState((state, props) => {

      // props.buttonTitle = this.buttonTitle
      return {counter: state.counter + props.step};
    });
  }
  onOpenModal = () => {
    console.log("open")
   this.setState({ open: true });
 };

  onCloseModal = () => {
   this.setState({ open: false });
 };
  callback = function(object)
  {
    //console.log("Changing to ", object);
    this.TopText = "In der Kategorie Bier haben wir 142 Produkte gefunden:"

    this.setState((state, props) => {

      // props.buttonTitle = this.buttonTitle
      return {counter: state.counter + props.step};
    });
  }
  constructor(props) {
      super(props)
      this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }
  componentDidMount() {
    this.getLocation();
    console.log("location is",this.props.isGeolocationAvailable);
    this.TopText = "In der Kategorie Bier haben wir 142 Produkte gefunden:"
    this.SearchLabelText = "Suchen: "

    EventBus.on("Category", this.callback.bind(this));
    EventBus.on("ManuChanged", this.manuCallback.bind(this));
    EventBus.on("getaddress", this.getaddress.bind(this));


    var ag =[]
    this.radius.forEach(function(i,idx,n){
      ag.push(
      <option className="name" value={i.count}>
      {i.name}
      </option>
      )

    })
    this.radiuspoints = ag

  }
  componentDidUpdate(){
    if(this.state.geoDestination !== '' && this.state.geoDestination !== null &&this.state.geoDestination !== undefined){
      searcharea = this.state.geoDestination;
      // console.log("locations", searcharea);
    }else{

    }

  }

  getaddress(lat,lng){
    EventBus.publish("showLoading")

    console.log("this is address",lat.lat, lat.lng);
      Geocode.fromLatLng(lat.lat, lat.lng).then(
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
              this.ad_address = "All Locations"
            }

          }
          this.searching_in =this.ad_address
          console.log("this is address",this.ad_address);
          EventBus.publish("stopLoading")
        },
        error => {
          console.error("this is error",error);
          EventBus.publish("stopLoading")
        }
      );

  }


  getLocation(){
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position) {
   // x.innerHTML = "Latitude: " + position.coords.latitude +
   // "<br>Longitude: " + position.coords.longitude;
   console.log(position.coords.latitude);
   console.log(position.coords.longitude);
   var type = "mobile"
   // this.startinglng = position.coords.longitude
   // this.startinglat = position.coords.latitude
   console.log(type);
   if(position.coords.latitude != undefined && position.coords.latitude != '' && position.coords.longitude != undefined && position.coords.longitude != ''){
     EventBus.publish("searchLocation", {lat: position.coords.latitude, lng:position.coords.longitude});
     EventBus.publish("getaddress", {lat: position.coords.latitude, lng:position.coords.longitude});

   }
 }
  getplace(){
    console.log("is getplace working ?");
  }



  handleSubmit(){
    console.log(localStorage.getItem('JWT'));
    if (localStorage.getItem('JWT') == null || localStorage.getItem('JWT') == undefined){
    }else{

    }
  }
  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
    console.log(event.target.value);
  }

  applyKeyword = (event) =>{
    console.log("in keyword");
    console.log(this.state.searchkeyword)
    localStorage.setItem('searchkeyword', this.state.searchkeyword);
    EventBus.publish("searchKeyword");
  }
  searchbylocation = (event) => {
    console.log("locations", searcharea);
    if(searcharea.location !== '' && searcharea.location !== undefined){
      var lat =searcharea.location.lat
      var lng =searcharea.location.lng
    }
    var radii = 'National'
    var city = "--"
    if(searcharea.city !== undefined){
      city = searcharea.city + ','
    }
    var country = searcharea.country
    if(this.state.radius != '' && this.state.radius != undefined && this.state.radius != null){
      radii = parseInt(this.state.radius)
      }

    console.log("locations", lat);
    console.log("locations", lng);
    console.log(radii);
    var locs = {lat: lat, lng:lng, distance:radii};
    localStorage.setItem('searchLocation', locs);
    console.log("locations", localStorage.getItem('searchLocation'));
    console.log("locations", locs);
    if(radii !== undefined && radii !== '' && radii !== null && lat !== undefined && lat !== '' && lat !== null){
      this.searching_in = city + country;
      EventBus.publish("searchLocation", {lat: lat, lng:lng, distance:radii});
    }
    else{
      alert("Fields Missing!");
    }
    setTimeout(this.handleCloseModal(), 5000)
    radii =""
  }

  switchpage = (page) =>
  {
    if(localStorage.getItem('JWT') != undefined && localStorage.getItem('JWT') != ''){

    var url = "/postad/"
    console.log("Value", page);
    this.setState((state, props) => {
    return {counter: state.counter + props.step};
    })

    console.log("props", this.props.match.params.id);
    this.props.history.push(url)
  }else{
    toast.error("Please Login First", {
      autoClose:2000,
      position: toast.POSITION.TOP_CENTER
    });
  }
  }

  pageonload =(e) =>{
    console.log("locations", searcharea);
    if(searcharea.location !== '' && searcharea.location !== undefined){
      var lat =searcharea.location.lat
      var lng =searcharea.location.lng
    }
    var city = "--"
    if(searcharea.city !== undefined){
      city = searcharea.city + ','
    }
    var country = searcharea.country
    var radii = this.state.radius
    console.log("locations", lat);
    console.log("locations", lng);
    console.log(radii);
    var locs = {lat: lat, lng:lng, distance:radii};
    localStorage.setItem('searchLocation', locs);
    console.log("locations", localStorage.getItem('searchLocation'));
    console.log("locations", locs);
    if(radii !== undefined && radii !== '' && radii !== null && lat !== undefined && lat !== '' && lat !== null){
      this.searching_in = city + country;
      EventBus.publish("searchLocation", {lat: lat, lng:lng, distance:radii});
    }
    else{
      alert("Fields Missing!");
    }
    setTimeout(this.handleCloseModal(), 5000)
    radii =""
  }

    render(): JSX.Element {
    const { open } = this.state;

    return (
      <div className={"TopPart"}>

      <FormGroup>
        <InputGroup style={{alignItems: 'center'}} >

          <div style={{borderRadius: '7px 7px 7px 7px', border:'1px solid black', display: 'flex', width: '60%', height: '40px', alignItems: 'center'}}>
            <FormControl className="fontRegular" placeholder="Search with Keyword " type="text" style={TopSearchBox} name="searchkeyword" onChange={this.handleChange}/>
            <InputGroup.Addon style={{alignItems: 'center', height: '20px', width: '10%'}} ><Glyphicon glyph="search" onClick={this.applyKeyword}/> </InputGroup.Addon>
          </div>

        </InputGroup>
      </FormGroup>
      <div className={"fontRegular searching"} >
      <span style={{color:"#5a555e"}}> Searching in </span> <span style={{textDecoration: "underline", color:"#5a555e"}}> {this.searching_in}</span> <span style={{color:"#156dbf", cursor:"pointer"}} onClick={this.handleOpenModal}>
      Change
      </span>
      <Modal style={{borderRadius:"20px"}} isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example" >
        <span className={"close"} onClick={this.handleCloseModal}>x</span>
        <label className={"labels"}>
        Location Filter
        </label> <br />
        <label className={"labels1"}>
        Enter Location
        </label> <br />
        <DemoInput style={{borderRadius:"5px 5px 5px 5px", borderTop:"0px !important"}}
        addressInput={{
        onChange: this.onAddressChange,
        value: this.state.address,
        }}
        geoDestinationInput={{
        onChange: this.onGeoDestinationChange,
        value: this.state.geoDestination,
        }}
        />
        <div >
        <label className={"labels2"}>
        Search Radius
        </label> <br />

        <select name="radius" onClick={this.handleChange} className={'radiusinput'}>
        {this.radiuspoints}
         </select>
         <span className={"fontRegular"}> Miles </span>

        <div>
        <button className={"BlueButton"} style={{marginLeft:"29%", marginTop:"20%"}} onClick={this.searchbylocation}>
        Search Area
        </button></div>
        </div>

        </Modal>

      </div>
      <div>
      <button className={"BlueButton"} style={{float: "right", marginRight:"-2%"}} onClick={ () => this.switchpage("postad") }>
      Post an Ad
      </button>
      </div><br />

      <ToastContainer />
      </div>
    );
  }

}

export default withRouter(TopPart);
