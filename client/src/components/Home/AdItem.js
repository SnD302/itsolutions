import React, { Component } from 'react';
import { Image, Form, FormGroup, FormControl,Button ,InputGroup } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import EventBus from 'eventing-bus';

class AdItem extends Component {
  mycurrency=[]
  favourites=[]
  if_mobile =[]
  componentDidMount(){
    EventBus.on("verify_accesorries", this.verify_accesorries.bind(this));
    if(localStorage.getItem('JWT') != undefined && localStorage.getItem('JWT') != ''){
      this.mycurrency = localStorage.getItem('currency')
    }else{
      this.mycurrency = 'USD'
    }
    this.drawfavourites();
  }
  constructor(props){
    super(props)
    this.state = {
    };
  }
  verify_accesorries =() =>{
    if(this.props.ad.type == "accessories"){
      this.if_mobile=
      <span>
      <div className={"rightdiv fontRegular"}></div>
      <div className={"rightdiv fontRegular"}></div>

      </span>

    }else{
      this.if_mobile=
      <span>
      <div className={"rightdiv fontRegular"}>
        <Image className={"storage_color_image"} src="/img/storage.png" /> <span style={{color:"#342d38", marginRight:"40px", marginLeft:"-1px", fontSize:"60%"}}> {this.props.ad.storage} </span>
      </div>

      <div className={"rightdiv fontRegular"}>
        <Image className={"storage_color_image"} src="/img/color.png" /><span style={{color:"#342d38", marginRight:"40px", fontSize:"60%"}}> {this.props.ad.color}</span>
      </div>
      </span>
    }
    this.setState((state, props) => {
    return {counter: state.counter + props.step};
    })
  }
  drawfavourites = () =>{
    if(this.props.ad.isFavourite == false){
      this.favourites = <img className="likeBtn" src="/img/no-like.png" onClick={this.add_remove_favourite}/>
    }else{
      this.favourites = <img className="likeBtn" src="/img/yes-like.png" onClick={this.add_remove_favourite}/>
    }

  }

  add_remove_favourite = () =>{
    if(localStorage.getItem('JWT') != undefined && localStorage.getItem('JWT') != null){

    console.log(this.props.ad._id);

    if(this.props.ad.isFavourite == false){

      var add = true;
      EventBus.publish("add_remove_favourite", {advert_id: this.props.ad._id, add:add});
      this.props.ad.isFavourite = true
      this.drawfavourites();
    }else{

      var add = false;
      EventBus.publish("add_remove_favourite", {advert_id: this.props.ad._id, add:add});
      this.props.ad.isFavourite = false
      this.drawfavourites();
    }
  }else{
    alert("Please Login First")
  }

  }


  render() {

    return(
      <div className={"AdItem --aspect-ratio: 2/1;"} >
        <div className={"ImageSide"}>
        <Link to={"/ad/" + (this.props.ad._id)}>
          <img className={"ImageSideImage"} src={this.props.ad.pictures[0].replace(".mp4" , ".jpg")} />
          </Link>
        </div>

        <div className={"DescriptionSide fontRegular"}>
          <div className={"Boosted"} hidden={!this.props.ad.boosted} > Boosted</div><br />
          <Link to={"/ad/" + (this.props.ad._id)}>

          <div className={"AdTitle fontSemiBold"}> {this.props.ad.title.substring(0,16)+"..."} </div>
          </Link>

          <div className={"AdDescription fontRegular"}> {this.props.ad.description} </div>
          {this.if_mobile}

          <div>

          {this.favourites}

          </div>
          <div className={"pricediv fontSemiBold"}>
          <span style={{marginLeft: "3px",fontSize:"80%", color:"#342d38"}}>{this.mycurrency}</span> <span style={{marginLeft: "3px", fontSize:"130%", color:"#342d38"}}>{this.props.ad.price}</span>
          </div>
        </div>
      </div>
    )
    }


}

export default AdItem;
