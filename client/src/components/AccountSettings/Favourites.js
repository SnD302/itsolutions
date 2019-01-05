import React, { Component } from 'react';
import EventBus from 'eventing-bus';
import { Image } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


var url = require('url');
import './AccountSettings.css';

const urlObj = url.parse(document.location.href, true);
const port = "" ;

class Favourites
 extends Component {

  myfavourites = []
  showfavourites = []
  sold = "-"
  soldContent = []
  if_mobile = []
  mycurrency = localStorage.getItem('currency')
  componentDidMount() {
    this.getmyFavourites();
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

  getmyFavourites(){
    EventBus.publish("showLoading")
        console.log("in getmyfavourites" );
        var request = require("request");
        var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/getFavouriteAdds'

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
            if(body.result.length == 0){
              toast.error("No Favourites !", {
                  autoClose: 3000,
                  position: toast.POSITION.TOP_CENTER,
                });
            }else{
              this.myfavourites = body.result;
              console.log("result Received", body.result);
              EventBus.publish("showLoading")
              this.checkSold();
              EventBus.publish("stopLoading")
            }


          }else{
            console.log("API Result NOT Found");
          }
        });
  }


  checkSold(){
    this.sold = this.myfavourites.sold;
    console.log("sold Received", this.sold);

    if(this.sold == true){
      var notAvailable = <div>
        <button className={"BlueButton PostButton"}>
        Sold
        </button>
        </div>

      this.soldContent = notAvailable
      console.log("????",this.soldContent);
      console.log("????",notAvailable);
    } else if(this.sold  == false){
      var isAvailable = <div>
        <button className={"BlueButton PostButton"}>
        Available
        </button>
        </div>
      this.soldContent = isAvailable
      console.log("????",this.soldContent);
      console.log("????",isAvailable);
    }
    this.displayfavourites();

    this.setState((state, props) => {
    return {counter: state.counter + props.step};

  })
  }

  add_remove_favourite = (e) =>{
    if(localStorage.getItem('JWT') != undefined && localStorage.getItem('JWT') != null){

      console.log(e);

      var add = false;
      EventBus.publish("add_remove_favourite", {advert_id: e, add:add});
      EventBus.publish("showLoading")
        console.log("favourite changed");
      EventBus.publish("stopLoading")


  }else{
    alert("Please Login First")
  }

  }

  displayfavourites =() =>{
    var cc =[]
    var favourite = []
    var picture= "https://www.cleartrip.com/hotels/assets/default-img.jpg"
    this.myfavourites.forEach((i,idx,n)=>{
      if(i.pictures.length != '' && i.pictures.length != undefined && i.pictures.length != null){
        picture = i.pictures[0]
      }
      if(i.type == "accessories"){
        this.if_mobile =
        <span><div className={"rightdiv fontRegular"}></div>
        <div className={"rightdiv fontRegular"}></div></span>
      }else{
        this.if_mobile =
        <span>
        <div className={"rightdiv fontRegular"}>
          <Image className={"storage_color_image"} src="/img/storage.png" /> <span style={{color:"#342d38", marginRight:"40px", marginLeft:"-1px", fontSize:"60%"}}> {i.storage} </span>
        </div>
        <div className={"rightdiv fontRegular"}>
          <Image className={"storage_color_image"} src="/img/color.png" /><span style={{color:"#342d38", marginRight:"40px", fontSize:"60%"}}> {i.color} </span>
        </div></span>
      }
      if(i.isFavourite = true){
        favourite = <Image onClick={() => this.add_remove_favourite(i._id)} className={"CheckedImage"} src="/img/cross.png" />
      }
      cc.push(

        <div className={"AdItem --aspect-ratio: 2/1;"} >
          <div className={"ImageSide"}>
          <Link to={"/ad/" + (i._id)}>
            <Image className={"ImageSideImage"} src={picture}/>
            </Link>
          </div>

          <div className={"DescriptionSide fontRegular"}>
            {favourite}
            <div className={"AdTitle fontSemiBold"}> {i.title}


            </div>
            <div className={"AdDescription fontRegular"}> {i.description} </div>
            {this.if_mobile}

            <div className={"pricediv fontSemiBold"}>
            <span style={{marginLeft: "3px",fontSize:"80%", color:"#342d38"}}>{this.mycurrency}</span> <span style={{marginLeft: "3px", fontSize:"130%", color:"#342d38"}}> {i.price.toFixed(2)} </span>

            </div>
          </div>
        </div>
      )

    })
    console.log(cc)
    this.showfavourites = cc
    console.log(this.showfavourites)
    this.setState((state, props) => {
    return {counter: state.counter + props.step};
  })
  EventBus.publish("stopLoading")
  }





  render(){
    return (


      <div className="Favourites">
      {this.showfavourites}
      <ToastContainer />
      </div>

    )}

}

export default Favourites;
