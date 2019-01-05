import React, { Component } from 'react';
import EventBus from 'eventing-bus';
import { Image } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import socketIOClient from 'socket.io-client'
import { Observable } from 'rxjs/Observable';
import Modal from 'react-modal';

var url = require('url');
import './AccountSettings.css';

const urlObj = url.parse(document.location.href, true);
const port = "" ;


const Inchat={
  fontFamily: 'proxr',
}
const Inchat_bottom={
  fontFamily: 'proxr',
}

class Messages






 extends Component {
  socket;
  mychats = []
  mymessages = []
  chatsdisplay = []
  details = []
  singlechat = []
  chatclass = []
  topscreen = []
  send_chat_msg = []
  chat_advert_id = []
  chat_his_id = []
  connection = ''
  messages = ''
  advert_id = ''
  advert_id_counter = ''
  his_user_id = ''
  hisId = ''
  myId = ''
  text = ''
  ad_for_chat= ''
  update_offer = ''
  fakeurl = "https://www.cleartrip.com/hotels/assets/default-img.jpg"
  offer_id =[]
  status =[]
  offered_price =[]
  accept_or_reject_buttons = []
  mycurrency = localStorage.getItem('currency')
  componentDidMount() {
    this.getallchats();

      this.connection = this.getMessages_push().subscribe(message => {
      this.messages.push(message);
      // console.log(messages);
      this.displaysinglechat()
    console.log(message);
    this.setState((state, props) => {
    return {counter: state.counter + props.step};
  })
    })

    // this.getMessages_push();

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
  this.socket = socketIOClient('https://celx-dev.herokuapp.com')
  this.socketConnection();
  this.state = {
    result: '',
    message: '',
    messages: [],
    showModal: false,
    showModal_makeoffer:false,
    showModal_received: false,
    endpoint: 'https://celx-dev.herokuapp.com' // this is where we are connecting to with sockets
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
  this.handleOpenModal = this.handleOpenModal.bind(this);
  this.handleOpenModal_received = this.handleOpenModal_received.bind(this);
  this.handleOpenModal_makeoffer = this.handleOpenModal_makeoffer.bind(this);

  this.handleCloseModal = this.handleCloseModal.bind(this);
  this.handleCloseModal_received = this.handleCloseModal_received.bind(this);
  this.handleCloseModal_makeoffer = this.handleCloseModal_makeoffer.bind(this);


//   if(this.mychats != undefined && this.mychats != null){
//   this.socket = socketIOClient(this.state.endpoint)
//   this.socket.on('room', (data) => {
//     receiveMessages(data);
//     console.log(data);
//   });
//   const receiveMessages= data =>{
//     console.log(data);
//     this.setState({messages: [... this.state.messages,data]});
//     console.log(this.state.messages);
//   };
//
//   this.sendMessage_from_constructor = ev => {
//     console.log("in constructor");
//     this.socket.emit('room',{hisId:this.hisId,text:this.text,advert_id:this.advert_id,myId:this.myId});
//     this.state.message({message: ''});
//   }
// }
  }
  handleOpenModal_makeoffer = (id,price,status) => {
    EventBus.publish("showLoading")
    console.log("in open modal");
    this.setState({ showModal_makeoffer: true });
    if(status = "nothing"){
      this.status = "Make Offer"
      this.accept_or_reject_buttons =
      <div>
      </div>
    }
    this.setState((state, props) => {
    return {counter: state.counter + props.step};
    EventBus.publish("stopLoading")

  })
  }

  handleOpenModal = (id,price,status) => {
    EventBus.publish("showLoading")
    console.log("in open modal");
    this.setState({ showModal: true });
    this.offer_id = id
    console.log(this.offer_id);
    this.offered_price = price
    if(status == "pending"){
      this.status = "Update Offer"
      this.accept_or_reject_buttons =
      <div>
      </div>

    }else if(status == "counter"){
      this.status = "Re-Counter"
      this.accept_or_reject_buttons =
      <div>
      <button className={"accept_offer_button"} style={{marginTop:"20%"}} onClick={this.accept_offer}>
      Accept Offer
      </button>

      <button className={"reject_offer_button"} style={{marginTop:"20%"}} onClick={this.reject_offer}>
      Reject Offer
      </button>
      </div>

    }else if(status = "nothing"){
      this.status = "Make Offer"
      this.accept_or_reject_buttons =
      <div>
      </div>
    }else if(status = "rejected"){
      this.status = "Make Offer"
      this.accept_or_reject_buttons =
      <div>
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
    this.status = ''
    this.offer_id = ''
    this.setState((state, props) => {
    return {counter: state.counter + props.step};

  })
  EventBus.publish("stopLoading")
  }
  handleCloseModal_makeoffer = () => {
    EventBus.publish("showLoading")

    this.setState({ showModal_makeoffer: false });
    // this.accept_reject_offer_view = ''
    this.offered_price = ''
    this.status = ''
    this.offer_id = ''
    this.setState((state, props) => {
    return {counter: state.counter + props.step};

  })
  EventBus.publish("stopLoading")
  }

  handleOpenModal_received = (offer_id,advert_id,price,hisid,status) => {

    EventBus.publish("showLoading")
    console.log("in open modal");
    this.setState({ showModal_received: true });
    this.offer_id = offer_id
    this.status = status
    this.offered_price = price
    this.his_user_id = hisid
    this.advert_id_counter =advert_id
    console.log(this.his_user_id, this.advert_id_counter, this.status, this.offered_price);
    this.offered_price = price.toFixed(2)
    this.setState((state, props) => {
    return {counter: state.counter + props.step};
    EventBus.publish("stopLoading")

  })
  }

  handleCloseModal_received = () => {
    EventBus.publish("showLoading")

    this.setState({ showModal_received: false });
    this.status =  ''
    this.offered_price =  ''
    this.his_user_id =  ''
    this.advert_id_counter = ''
    this.offer_id = ''
    this.setState((state, props) => {
    return {counter: state.counter + props.step};

  })
  EventBus.publish("stopLoading")
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
      alert("Accepted!");
    }
    else{
      alert("Missing!");
    }
  }


  socketConnection = ()=>{
  // this.socket = socketIOClient('https://celx-dev.herokuapp.com')
  console.log("******************"+localStorage.getItem('userid')+"****************");
  console.log("socket");
  this.socket.on('connect', () =>{
    console.log("+++++++++Conected+++++++");
    this.socket.emit('user',{user_id:localStorage.getItem('userid')});
    })
  }

  startchat(){
  var myuserid= localStorage.getItem('userid');
  // console.log("start", advert_id,myId,hisId);
  var advert_id = this.chat_advert_id
  var hisId = this.chat_his_id
  var myId = myuserid
  console.log("advert_id",advert_id,);
  console.log("hisId",hisId);
  console.log("myId",myId,);
  // socket = socketIOClient(this.state.endpoint)
  console.log("this is socket",this.socket);
  this.socket.emit('startchat',{myId:myId,hisId:hisId,advert_id:advert_id});
  console.log("chatstarter");
  }

  getMessages_push() {
    console.log("in get messages push, before observer");

    let observable = new Observable(observer => {
      // const socket = socketIOClient(this.state.endpoint)
      console.log("in get messages push");
      this.socket.on('room', (data) => {
        observer.next(data.chat);
        console.log(data);

        this.setState((state, props) => {
        return {counter: state.counter + props.step};

      })

      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
    this.setState((state, props) => {
    return {counter: state.counter + props.step};

  })
  }


  sendmessage(advert_id,myId,hisId,chat_msg){
    var advert_id = advert_id
    var hisId = hisId
    var myId = myId
    var text = chat_msg
    console.log("advert_id",advert_id,);
    console.log("hisId",hisId);
    console.log("myId",myId,);
    console.log("text",text,);
    this.state.msg = ''
    // const socket = socketIOClient(this.state.endpoint)
    this.socket.emit('room',{hisId:hisId,text:text,advert_id:advert_id,myId:myId});
    console.log("chatsent");
  }



  getallchats(){
    EventBus.publish("showLoading")

      var request = require("request");
      var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/getAllChats'

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
        if (body){
          this.mychats = body.result;
          console.log("result Received", this.mychats);
          this.displaychats();
        }else{
          console.log("API Result NOT Found");
        }
      });
  }
  getmessages = (event,e) =>{
    console.log("getting advert_id's", event);
    console.log("getting his_id's", e);
    this.chat_advert_id = event;
    this.chat_his_id = e;
    var myuserid= localStorage.getItem('userid');
    EventBus.publish("showLoading")
    this.getad();
      var request = require("request");
      var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/getAllMessages'

      var options = { method: 'POST',
      url: urlPath,
      headers:
      { 'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('JWT'),},
      body: {advert_id:event, hisId:e, myId:myuserid},
      json: true };

      console.log("Call", options);

      request(options,  (error, response, body)=> {
        if (error) throw new Error(error);
        if (body){
          this.messages = body.result;
          console.log("result Received", this.messages);
          this.startchat();
          // EventBus.publish("startchat",  {advert_id: this.chat_advert_id, myId:myuserid, hisId:this.chat_his_id})

          this.displaysinglechat();
        }else{
          console.log("API Result NOT Found");
          EventBus.publish("stopLoading")
        }
      });

    // console.log(chat_id,advert_id);
  }
  getad =() =>{

    EventBus.publish("showLoading")
    console.log("this task is done in getadss");
    console.log("advert_id", this.chat_advert_id);

    var userId = localStorage.getItem("userid")
    var request = require("request");
    var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/getAdvertismentDetatils'
    console.log("userid",userId);

    var options = { method: 'POST',
      url: urlPath,
      headers:
       { 'Cache-Control': 'no-cache',
         'Content-Type': 'application/json' },
      body: {advert_id:this.chat_advert_id, user_id:userId},
      json: true };

      console.log("Call", options);

      request(options, (error, response, body) =>{
        if (error) throw new Error(error);

        console.log("Ad Received", body.result);
        if (body.result)
        {
          this.ad_for_chat = body.result
          this.format_offers();
        }  else{
            console.log("API Result NOT Found");
          }
      });
  }

  format_offers = () =>{
    console.log("for formatting offers",this.ad_for_chat);
    var myuserid = localStorage.getItem('userid')
    console.log("user id of advert is",this.ad_for_chat.user_id._id);
    if(this.ad_for_chat.user_id._id != myuserid){
      console.log("if chat is for other advert", this.ad_for_chat);
      if(this.ad_for_chat.offers.length ==0){
        EventBus.publish("showLoading")
        console.log("length 0 ");
        console.log("make offer");
        this.update_offer =
        <div>
        <button className={"counter_offer_button"} onClick={() => this.handleOpenModal_makeoffer("nothing","nothing","nothing")}>
        Actions
        </button></div>
        EventBus.publish("stopLoading")
      }else{
        console.log("lets go");
    this.ad_for_chat.offers.forEach((i,idx,n)=>{
      EventBus.publish("showLoading")
      console.log(i);
      console.log(i.status);
      if(i.user_id == myuserid){

      if(i.status == "Accepted" && i.user_id == myuserid){
        n.length = 0;
        console.log("this is accepted");

        this.update_offer =
        <div>
        <button className={"counter_offer_button"} >
        Accepted
        </button></div>
        EventBus.publish("stopLoading")

      }else if(i.status == "pending" && i.user_id == myuserid) {
        n.length = 0;
        console.log("your offer is pending" ,i.offered_price);

        this.update_offer =
        <div>
        <button className={"counter_offer_button"} onClick={() => this.handleOpenModal(i._id, i.offered_price,i.status)}>
        Actions
        </button></div>
        EventBus.publish("stopLoading")

      }else if(i.status == "counter" && i.user_id == myuserid){
        n.length = 0;
        console.log("your offer is in counter" ,i.offered_price);

        this.update_offer =
        <div>
        <button className={"actions1_offer_button"} onClick={() => this.handleOpenModal(i._id,i.offered_price,i.status)}>
        Actions
        </button>
        </div>
        EventBus.publish("stopLoading")

      }else if(i.status == "re-counter" && i.user_id == myuserid){
        n.length = 0;
        console.log("your have re-countered" ,i.offered_price);

        this.update_offer =
        <div>
        <button className={"counter_offer_button"} >
        Re-countered
        </button></div>
        EventBus.publish("stopLoading")
      }else if(i.status == "rejected" && i.user_id == myuserid){
        n.length = 0;
        console.log("your have rejected, make offer" ,i.offered_price);

        this.update_offer =
        <div>
        <button className={"counter_offer_button"} onClick={() => this.handleOpenModal(i._id,'',i.status)}>
        Actions
        </button></div>
        EventBus.publish("stopLoading")
      } else{
        console.log("make offer");
        this.update_offer =
        <div>
        <button className={"counter_offer_button"} onClick={() => this.handleOpenModal_makeoffer(i._id,i.offered_price,"nothing")}>
        Actions
        </button></div>
        EventBus.publish("stopLoading")
      }
    }else{
      console.log("other offers than me status", i.status);
      EventBus.publish("stopLoading")
    }

    })
  }
  } else if(this.ad_for_chat.user_id._id == myuserid){

    console.log("if chat is for my advert");

    this.ad_for_chat.offers.forEach((i,idx,n)=>{
      console.log(i);

      if(i.status == "accepted" && i.user_id == this.chat_his_id){
        n.length = 0;
        console.log("your offer is accepted" ,i.offered_price);

        this.update_offer =
        <div>
        <button className={"actions_offer_button"}>
        Accepted
        </button></div>
        EventBus.publish("stopLoading")
      }else if(i.status == "pending" && i.user_id == this.chat_his_id) {
        n.length = 0;
        console.log("your offer is pending" ,i.offered_price);

        this.update_offer =
        <div>
        <button className={"actions_offer_button"} onClick={() => this.handleOpenModal_received(i._id,i.advert_id, i.offered_price,i.user_id,i.status)}>
        Actions
        </button></div>
        EventBus.publish("stopLoading")

      }else if(i.status == "counter" && i.user_id == this.chat_his_id){
        n.length = 0;
        console.log("your offer is in counter" ,i.offered_price);

        this.update_offer =
        <div>
        <button className={"actions1_offer_button"}>
        Countered
        </button>
        </div>
        EventBus.publish("stopLoading")

      }else if(i.status == "re-counter" && i.user_id == this.chat_his_id){
        n.length = 0;
        console.log("your have re-countered" ,i.offered_price);

        this.update_offer =
        <div>
        <button className={"counter_offer_button"} onClick={() => this.handleOpenModal_received(i._id,i.advert_id, i.offered_price, i.user_id,i.status)}>
        Actions
        </button></div>
        EventBus.publish("stopLoading")

      }else if(i.status == "rejected" && i.user_id == this.chat_his_id){
        n.length = 0;
        console.log("your have rejected, make offer" ,i.offered_price);

        this.update_offer =
        <div>
        <button className={"counter_offer_button"} >
        No Offer
        </button></div>
        EventBus.publish("stopLoading")

      }else{
        console.log("no offer");

        this.update_offer =
        <div>
        <button className={"counter_offer_button"}>
        No Offer
        </button></div>
        EventBus.publish("stopLoading")
      }
    })


  }else{
    console.log("something wrong in the condition");
  }
  }



  displaychats = () =>{
    this.topscreen = ''
    var cc =[]
    var imgsrc = []
    console.log(this.mychats);
    this.mychats.forEach((i,idx,n)=>{
      if(i.advert_id.title != '' && i.advert_id.title !=undefined){
        if(i.advert_id.pictures[0] != undefined && i.advert_id.pictures[0] != ''){
          imgsrc = i.advert_id.pictures[0]
        }else{
          imgsrc = "https://www.cleartrip.com/hotels/assets/default-img.jpg"
        }
      cc.push(

        <div className="chats" name="details" value={i.advert_id} onClick={() => this.getmessages(i.advert_id._id,i.messageFrom._id)}>

        <div className="img_div">
        <Image className={"user_img"} height="80" width="80" src={imgsrc}
        onError={(e)=>{e.target.onerror = null; e.target.src="https://www.cleartrip.com/hotels/assets/default-img.jpg"}}
          />
        </div>
        <div className={"AdTitle fontSemiBold"}> {i.advert_id.user_id.name}
        </div>
        <div className={"Ad_name fontSemiBold"}> For {i.advert_id.title}
        </div>
        <div className={"Ad_message fontSemiBold"}> {i.message}
        </div>
        </div>
      )
    }
    })
    console.log(cc)
    this.chatsdisplay = cc
    this.setState((state, props) => {
    return {counter: state.counter + props.step};
    EventBus.publish("stopLoading")

  })

  }
  displaysinglechat(){

    var cc =[]
    var adpic = []
    var adtitle = []
    var addetail = []
    var myuserid= localStorage.getItem('userid');
    this.messages.forEach((i,idx,n)=>{
      if(i.advert_id.pictures != '' && i.advert_id.pictures != undefined){
        addetail =
        <span className={"ad_detail"}>
        <Image className={"ad_img"} height="80" width="80" src={i.advert_id.pictures[0]}  />
        <span className={"ad_title"}> {i.advert_id.title} </span>
        <div className={"ad_title"}> {i.advert_id.storage} - {i.advert_id.color}</div>

        </span>
      }
        // adpic = <Image className={"ad_img"} height="80" width="80" src={i.advert_id.pictures[0]}  />
        // adtitle = <span className={"ad_title"}> {i.advert_id.title} </span>
        // addetail = <div> {i.advert_id.storage} - {i.advert_id.color}</div>
      Inchat={
        overflow:'hidden',
        height:'370px',
        overflowX:'hidden',
      };
      Inchat_bottom={
        overflow:'scroll',
        height:'370px',
        overflowX:'hidden',
      };
      if(i.messageFrom == myuserid){
        this.chatclass = {
                float: 'right',
                textAlign: 'left',
                width: '60%',
                textOverflow: 'ellipsis',
                color: '#ffffff',
                backgroundColor: '#156dbf',
                borderRadius: '5px 5px 5px 5px',
                padding: '1%',
                marginBottom: '0.5%',
              };
      }else if(i.messageFrom != myuserid){
        this.chatclass = {
                float: 'left',
                textAlign: 'left',
                width: '60%',
                textOverflow: 'ellipsis',
                color: '#342d38',
                backgroundColor: '#f2f2f2',
                borderRadius: '5px 5px 5px 5px',
                padding: '1%',
                marginBottom: '0.5%',
              };
      }
      cc.push(

        <div className="messages" name="messages" >


        <div className={"bottomscreen"} >

        <div style={this.chatclass}>
        {i.message}
        </div>


        </div>

        </div>
      )
      this.setState((state, props) => {
      return {counter: state.counter + props.step};
    })
      EventBus.publish("stopLoading")
    })
    console.log(cc)
    this.topscreen = <div className={"topscreen"}>
    {addetail}
    {this.update_offer}
    </div>
    this.send_chat_msg = <form className={"text_message"} id="msg_form"> <input type="text" name="msg" onChange={this.handleChange} className={"msg_area"} id="msg" />
     <Image className="ItemImage" onClick={this.handlesend.bind(this)} src="/img/send.png" />
     </form>
    this.chatsdisplay = cc

    this.setState((state, props) => {
    return {counter: state.counter + props.step};
  })
    EventBus.publish("stopLoading")
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
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
    }
    else{
      alert("offer Price Missing!");
    }
  }
  counter_offer = (event) => {
    console.log(this.his_user_id, this.advert_id_counter, this.status, this.offered_price);

    var offer = parseInt(this.state.offering_counter)
    console.log("price offered", parseInt(this.state.offering_counter));
    console.log(this.advert_id,offer,this.hisid);
    if(offer !== undefined && offer !== '' && offer !== null){
      EventBus.publish("counter_offer", {advert_id:this.advert_id_counter,price :offer,user_id:this.his_user_id});

      this.setState((state, props) => {
      return {counter: state.counter + props.step};
      })
    }
    else{
      alert("offer price Missing!");
    }
  }

  handlesend = (event) => {
    var myuserid= localStorage.getItem('userid');
    var chat_msg = this.state.msg;
    console.log("my id",myuserid,
      "his id",this.chat_his_id,
      "advert id",this.chat_advert_id,
      "msg",chat_msg)
    console.log("Message is", this.state.msg);
    this.advert_id = this.chat_advert_id
    this.hisId = this.chat_his_id
    this.myId = myuserid
    this.text = chat_msg
    document.getElementById("msg_form").reset();

    // this.sendMessage_from_constructor();

    console.log("this.chat_advert_id", this.chat_advert_id, "myuserid", myuserid, "this.chat_his_id",this.chat_his_id, "chat_msg",chat_msg);
    this.sendmessage(this.chat_advert_id,myuserid,this.chat_his_id,chat_msg);
    // EventBus.publish("sendmessage",  {advert_id: this.chat_advert_id, myId:myuserid, hisId:this.chat_his_id, text:chat_msg})
  }

  render(){
    return (


      <div className="Messages">
      <div className="MessagesScreen">
      <div style={Inchat}>
      {this.topscreen}
      <div style={Inchat_bottom}>
      {this.chatsdisplay}
      </div>

      </div>
      {this.send_chat_msg}

      </div>
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
      {this.status}
      </button>


      {this.accept_or_reject_buttons}


      </div>
      </div>

      </Modal>

      <Modal style={{borderRadius:"20px"}} isOpen={this.state.showModal_makeoffer} contentLabel="Minimal Modal Example" >

      <span className={"close"} onClick={this.handleCloseModal_makeoffer}>x</span>
      <div >
      <label className={"labels"}>
      No Offer Yet
      </label><br /><br /><br /><br />
      <div className={"offer_inp"}>
      <span className={"labels2"}> {this.mycurrency} </span> &nbsp; <input type="number" name="offering" onChange={this.handleChange} className={"offer_input"}/>
      </div>
      <div>
      <button className={"BlueButton"} style={{marginLeft:"29%", marginTop:"20%"}} onClick={this.makeoffer}>
      {this.status}
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
      </div>

    )}

}

export default Messages
;
