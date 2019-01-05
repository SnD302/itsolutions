import React, { Component } from 'react';
import EventBus from 'eventing-bus';
import { Image } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';

var url = require('url');
import './AccountSettings.css';

const urlObj = url.parse(document.location.href, true);
const port = "" ;

class Offers
 extends Component {
   myaddsOffers = []
   myOffers = []
   Offers= []
   showadds = []
   noAdds = ""
   col_stor = true
   update_offer = []
   new_offer = "-"
   mycurrency = localStorage.getItem('currency')
   offer_id = []
   offered_price = []
   advert_id = []
   hisid = []
   accept_reject_offer_view = []
   accept_or_reject_buttons = []
   if_mobile = []
   activebutton1 = {
           fontFamily:'proxr',
           backgroundColor: 'white',
           border: '1px solid #156dbf',
           borderRadius: '5px 5px 5px 5px',
           color:'#156dbf',
           fontSize: '120%',
           height: '40px',
           width: '100px',
         };
   activebutton2 = {
           fontFamily:'proxr',
           backgroundColor: 'white',
           border: '1px solid #156dbf',
           borderRadius: '5px 5px 5px 5px',
           color:'#156dbf',
           fontSize: '120%',
           height: '40px',
           width: '100px',
         };
  componentDidMount() {
    this.getmyOffers();
  }

  onOpenModal = () => {
    console.log("open")
   this.setState({ open: true });
 };

  onCloseModal = () => {
   this.setState({ open: false });
 };


  constructor(props){
  super(props)
  this.state = {
  showModal: false,
  showModal_received: false,
};
this.port = process.env.PORT;
this.handleOpenModal = this.handleOpenModal.bind(this);
this.handleOpenModal_received = this.handleOpenModal_received.bind(this);
this.handleCloseModal = this.handleCloseModal.bind(this);
this.handleCloseModal_received = this.handleCloseModal_received.bind(this);

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
  EventBus.on("getmyAdsOffers", this.getmyAdsOffers.bind(this));
  }

  handleOpenModal = (id,price,status) => {
    EventBus.publish("showLoading")
    console.log("in open modal");
    this.setState({ showModal: true });
    this.offer_id = id
    console.log(this.offer_id);
    this.offered_price = price

    if(status == "pending"){
      this.accept_or_reject_buttons =
      <div>
      </div>
    }else{
      this.accept_or_reject_buttons =
      <div>
      <button className={"accept_offer_button"} style={{marginTop:"20%"}} onClick={this.accept_offer}>
      Accept Offer
      </button>

      <button className={"reject_offer_button"} style={{marginTop:"20%"}} onClick={this.reject_offer}>
      Reject Offer
      </button>
      </div>
    }



    this.setState((state, props) => {
    return {counter: state.counter + props.step};
    EventBus.publish("stopLoading")

  })
  }
  handleCloseModal = () => {
    EventBus.publish("showLoading")

    this.setState({ showModal: false });
    // this.accept_reject_offer_view = ''
    this.offered_price = ''
    this.offer_id = ''

    this.setState((state, props) => {
    return {counter: state.counter + props.step};

  })
  EventBus.publish("stopLoading")
  }

  handleOpenModal_received = (id,price,hisid,advert_id) => {
    EventBus.publish("showLoading")
    console.log("in open modal");
    this.setState({ showModal_received: true });
    this.offer_id = id
    this.advert_id = advert_id
    this.hisid = hisid
    console.log(this.advert_id,"his id", this.hisid, this.offer_id);
    this.offered_price = price.toFixed(2)
    this.setState((state, props) => {
    return {counter: state.counter + props.step};
    EventBus.publish("stopLoading")

  })
  }
  handleCloseModal_received = () => {
    EventBus.publish("showLoading")

    this.setState({ showModal_received: false });
    this.offered_price = ''
    this.advert_id = ''
    this.offer_id = ''
    this.hisid = ''
    this.setState((state, props) => {
    return {counter: state.counter + props.step};

  })
  EventBus.publish("stopLoading")
  }




  getmyOffers = () =>{
    EventBus.publish("showLoading")

    this.activebutton1 = {
            fontFamily:'proxr',
            backgroundColor: '#156dbf',
            border: '1px solid #156dbf',
            borderRadius: '5px 5px 5px 5px',
            color:'#ffffff',
            fontSize: '120%',
            height: '40px',
            width: '100px',
          };
    this.activebutton2 = {
            fontFamily:'proxr',
            backgroundColor: 'white',
            border: '1px solid #156dbf',
            borderRadius: '5px 5px 5px 5px',
            color:'#156dbf',
            fontSize: '120%',
            height: '40px',
            width: '100px',
          };
        var request = require("request");
        var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/getAllOffersCreatedBySelf'

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
            this.Offers = body.result;
            console.log("result Received", body.result);
            if(body.result.length == 0){
              toast.error("No Sent Offers !", {
                  autoClose: 3000,
                  position: toast.POSITION.TOP_CENTER,
                });
            }else{
              this.displayOffers();
            }
          }else{
            console.log("API Result NOT Found");
            alert("No Sent Offers!");
          }
        });
  }
  getmyAdsOffers = () =>{

    this.handleCloseModal_received()
    EventBus.publish("showLoading")
    this.activebutton2 = {
            fontFamily:'proxr',
            backgroundColor: '#156dbf',
            border: '1px solid #156dbf',
            borderRadius: '5px 5px 5px 5px',
            color:'#ffffff',
            fontSize: '120%',
            height: '40px',
            width: '100px',
          };
    this.activebutton1 = {
            fontFamily:'proxr',
            backgroundColor: 'white',
            border: '1px solid #156dbf',
            borderRadius: '5px 5px 5px 5px',
            color:'#156dbf',
            fontSize: '120%',
            height: '40px',
            width: '100px',
          };
        console.log("ports is", port)
        var request = require("request");
        var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/getMyAddsOffers'

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
            this.Offers = body.result;
            console.log("result Received", body.result);
            this.displayOffers_received();
          }else{
            EventBus.publish("showLoading")

            console.log("API Result NOT Found");
            this.activebutton1 = {
                    fontFamily:'proxr',
                    backgroundColor: '#156dbf',
                    border: '1px solid #156dbf',
                    borderRadius: '5px 5px 5px 5px',
                    color:'#ffffff',
                    fontSize: '120%',
                    height: '40px',
                    width: '100px',
                  };
            this.activebutton2 = {
                    fontFamily:'proxr',
                    backgroundColor: 'white',
                    border: '1px solid #156dbf',
                    borderRadius: '5px 5px 5px 5px',
                    color:'#156dbf',
                    fontSize: '120%',
                    height: '40px',
                    width: '100px',
                  };
            toast.error("No received Offers !", {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
              });
              EventBus.publish("stopLoading")

          }
        });
  }


  displayOffers = () =>{
    console.log(this.Offers);
    var cc =[]
    var imgsrc = "https://www.cleartrip.com/hotels/assets/default-img.jpg"
    this.Offers.forEach((i,idx,n) =>{
      console.log(i);
      if(i.advert_id.type == "accessories"){
        this.if_mobile =
        <span><div className={"rightdiv fontRegular"}></div>
        <div className={"rightdiv fontRegular"}></div></span>
      }else{
        this.if_mobile =
        <span>
        <div className={"rightdiv fontRegular"}>
          <Image className={"storage_color_image"} src="/img/storage.png" /> <span style={{color:"#342d38", marginRight:"40px", marginLeft:"-1px", fontSize:"60%"}}> {i.advert_id.storage} </span>
        </div>
        <div className={"rightdiv fontRegular"}>
          <Image className={"storage_color_image"} src="/img/color.png" /><span style={{color:"#342d38", marginRight:"40px", fontSize:"60%"}}> {i.advert_id.color} </span>
        </div></span>
      }
      if(i.status == "pending" && i.user_id._id == localStorage.getItem('userid')){
        this.update_offer =
        <div>
        <button className={"actions_offer_button"} onClick={() => this.handleOpenModal(i._id, i.offered_price,i.status)}>
        Update
        </button></div>

      }else if(i.status == "counter" && i.user_id._id == localStorage.getItem('userid')){
        this.update_offer =
        <div>
        <button className={"actions1_offer_button"} onClick={() => this.handleOpenModal(i._id,i.offered_price,i.status)}>
        Re-counter
        </button>
        </div>

      }else if(i.status == "re-counter" && i.user_id._id == localStorage.getItem('userid')){
        this.update_offer =
        <div>
        <button className={"counter_offer_button"} >
        Re-countered
        </button></div>
      }else if(i.status == "accepted" && i.user_id._id == localStorage.getItem('userid')){
        this.update_offer =
        <div>
        <button className={"counter_offer_button"} >
        Accepted
        </button></div>
      }else{
        this.update_offer =
        <div>
        <button className={"counter_offer_button"} >
        Rejected
        </button></div>
      }
      if(i.advert_id.title != '' && i.advert_id.title !=undefined){
      if(i.advert_id.pictures[0] != undefined && i.advert_id.pictures[0] != ''){
        imgsrc = i.advert_id.pictures[0]
      }else{
        imgsrc = "https://www.cleartrip.com/hotels/assets/default-img.jpg"
      }
      cc.push(

        <div className={"AdItem --aspect-ratio: 2/1;"} >
          <div className={"ImageSide"}>
          <Link to={"/ad/" + (i._id)}>
            <Image className={"ImageSideImage"} src={imgsrc}/>
            </Link>
          </div>

          <div className={"DescriptionSide fontRegular"}>

            <div className={"AdTitle fontSemiBold"}> {i.advert_id.title}

            </div>
            <div className={"AdDescription fontRegular"}> {i.advert_id.description} </div>

            <div className={"pricediv_my fontSemiBold"}>
            <span style={{fontSize:"60%", color:"#342d38"}} >Price : {this.mycurrency}</span> <span style={{marginLeft: "3px", fontSize:"90%", color:"#342d38"}}>{i.advert_id.price.toFixed(2)} </span>

            </div>

            {this.if_mobile}

            {this.update_offer}


            <div className={"pricediv fontSemiBold"}>
            <span style={{marginLeft: "3px",fontSize:"80%", color:"#342d38"}} >Offered : {this.mycurrency}</span> <span style={{marginLeft: "3px", fontSize:"130%", color:"#342d38"}}>{i.offered_price} </span>

            </div>
          </div>
        </div>
      )
}
    })
    console.log(cc)
    this.showadds = cc
    console.log(this.showadds)
    this.setState((state, props) => {
    return {counter: state.counter + props.step};
  })
  EventBus.publish("stopLoading")

  }

  displayOffers_received = () =>{
    console.log(this.Offers);
    var cc =[]
    var imgsrc = "https://www.cleartrip.com/hotels/assets/default-img.jpg"
    this.Offers.forEach((i,idx,n) =>{
      console.log(i);
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
      console.log(i.offers.offered_price);
      i.offers.forEach((x,xdx,m) =>{
        console.log(x);

      if(x.status == "pending"){
        this.update_offer =
        <div>
        <button className={"actions_offer_button"} onClick={() => this.handleOpenModal_received(x._id, x.offered_price, x.user_id._id,x.advert_id)}>
        Actions
        </button>
        </div>

      }else if(x.status == "re-counter"){
        this.update_offer =
        <div>
        <button className={"actions_offer_button"} onClick={() => this.handleOpenModal_received(x._id, x.offered_price, x.user_id._id,x.advert_id)}>
        Actions
        </button>

        </div>
      }else if(x.status == "counter"){
        this.update_offer =
        <div>
        <button className={"counter_offer_button"} >
        Countered
        </button>
        </div>
      }else if(x.status == "accepted"){
        this.update_offer =
        <div>
        <button className={"rejected_offer_button"} >
        Accepted
        </button>
        </div>
      }else{
        this.update_offer =
        <div>
        <button className={"rejected_offer_button"} >
        rejected
        </button>
        </div>
      }
      if(i.title != '' && i.title !=undefined){
      if(i.pictures[0] != undefined && i.pictures[0] != ''){
        imgsrc = i.pictures[0]
      }else{
        imgsrc = "https://www.cleartrip.com/hotels/assets/default-img.jpg"
      }

      cc.push(

        <div className={"AdItem --aspect-ratio: 2/1;"} >
          <div className={"ImageSide"}>
          <Link to={"/ad/" + (i._id)}>
            <Image className={"ImageSideImage"} src={imgsrc}/>
            </Link>
          </div>

          <div className={"DescriptionSide fontRegular"}>

            <div className={"AdTitle fontSemiBold"}> {i.title}

            </div>
            <div className={"AdDescription fontRegular"}> {i.description} </div>

            <div className={"pricediv_my fontSemiBold"}>
            <span style={{fontSize:"60%", color:"#342d38"}} >Price : {this.mycurrency}</span> <span style={{marginLeft: "3px", fontSize:"90%", color:"#342d38"}}>{i.price.toFixed(2)} </span>

            </div>

            {this.if_mobile}

            {this.update_offer}


            <div className={"pricediv fontSemiBold"}>
            <span style={{marginLeft: "3px",fontSize:"80%", color:"#342d38"}} >Offered : {this.mycurrency}</span> <span style={{marginLeft: "3px", fontSize:"130%", color:"#342d38"}}>{x.offered_price.toFixed(2)} </span>

            </div>
          </div>
        </div>
      )
    }

      })

    })
    console.log(cc)
    this.showadds = cc
    console.log(this.showadds)
    this.setState((state, props) => {
    return {counter: state.counter + props.step};
  })
  EventBus.publish("stopLoading")

  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
    console.log(event.target.value);
  }

  updateoffer = (event) => {

    var offer = parseInt(this.state.offering)
    console.log("price offered", parseInt(this.state.offering));
    console.log("offer id", this.offer_id);
    console.log(offer);
    if(offer !== undefined && offer !== '' && offer !== null){
      EventBus.publish("updateoffer", {offer_id:this.offer_id,offered_price :offer});

      this.setState((state, props) => {
      return {counter: state.counter + props.step};
      })
      this.handleCloseModal();
    }
    else{
      alert("offer Price Missing!");
    }
  }
  counter_offer = (event) => {

    var offer = parseInt(this.state.offering_counter)
    console.log("price offered", parseInt(this.state.offering_counter));
    console.log(this.advert_id,offer,this.hisid);
    if(offer !== undefined && offer !== '' && offer !== null){
      EventBus.publish("counter_offer", {advert_id:this.advert_id,price :offer,user_id:this.hisid});

      this.setState((state, props) => {
      return {counter: state.counter + props.step};
      })
      this.handleCloseModal();
    }
    else{
      alert("offer price Missing!");
    }
  }
  accept_offer = (event) => {
    var status ="accepted";
    var offer_id = this.offer_id
    console.log(this.offer_id,status);

    if(offer_id !== undefined && offer_id !== '' && offer_id !== null){
      EventBus.publish("accept_reject", {offer_id:offer_id, status :status});

      this.setState((state, props) => {
      return {counter: state.counter + props.step};
      })
      alert("Accepted!");
      this.handleCloseModal_received();
      this.handleCloseModal();
    }
    else{
      alert("Missing!");
    }
  }

  reject_offer = (event) => {
    var status = "rejected"
    var offer_id = this.offer_id
    console.log(this.offer_id,status);

    if(offer_id !== undefined && offer_id !== '' && offer_id !== null){
      EventBus.publish("accept_reject", {offer_id:offer_id, status :status});

      this.setState((state, props) => {
      return {counter: state.counter + props.step};
      })
      alert("Rejected!");
      this.handleCloseModal_received();
      this.handleCloseModal();
    }
    else{
      alert("Missing!");
    }
  }

  render(){
    return (


      <div className="Offers">
      <div className={"buttonsplacing"}>
      <button style={this.activebutton1} className={"offersButton MyAdsoffs"} onClick={this.getmyOffers}>
      Sent
      </button> &nbsp; &nbsp;
      <button style={this.activebutton2} onClick={this.getmyAdsOffers}>
      Received
      </button>
      </div>
      {this.showadds}
      <Modal style={{borderRadius:"20px"}} isOpen={this.state.showModal} contentLabel="Minimal Modal Example" >

      <span className={"close"} onClick={this.handleCloseModal}>x</span>
      <div >
      <label className={"labels"}>
      Offer is {this.offered_price}
      </label><br /><br /><br /><br />
      <div className={"offer_inp"}>
      <span className={"labels2"}> {this.mycurrency} </span> &nbsp; <input type="number" name="offering" onChange={this.handleChange} className={"offer_input"}/>
      </div>
      <div>
      <button className={"BlueButton"} style={{marginLeft:"29%", marginTop:"20%"}} onClick={this.updateoffer}>
      Update Offer
      </button>


      {this.accept_or_reject_buttons}


      </div>
      </div>

      </Modal>


      <Modal style={{borderRadius:"20px"}} isOpen={this.state.showModal_received} contentLabel="Minimal Modal Example" >

      <span className={"close"} onClick={this.handleCloseModal_received}>x</span>
      <div >
      <label className={"labels"}>
      Offer Received is {this.offered_price}
      </label><br /><br /><br /><br />
      <div className={"offer_inp"}>
      <span className={"labels2"}> {this.mycurrency} </span> &nbsp; <input type="number" name="offering_counter" onChange={this.handleChange} className={"offer_input"}/>
      </div>
      <div>
      <button className={"BlueButton"} style={{marginLeft:"29%", marginTop:"15%"}} onClick={this.counter_offer}>
      Counter Offer
      </button>


      <button className={"accept_offer_button"} style={{marginTop:"20%"}} onClick={this.accept_offer}>
      Accept Offer
      </button>

      <button className={"reject_offer_button"} style={{marginTop:"20%"}} onClick={this.reject_offer}>
      Reject Offer
      </button>
      </div>
      </div>

      </Modal>
      <ToastContainer />
      </div>

    )}

}

export default Offers;
