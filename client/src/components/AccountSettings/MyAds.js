import React, { Component } from 'react';
import EventBus from 'eventing-bus';
import { Image } from 'react-bootstrap';
import { withRouter, BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactPopupLayer from "react-popup-layer"
import "react-popup-layer/assets/index.css"

var url = require('url');
import './AccountSettings.css';

const urlObj = url.parse(document.location.href, true);
const port = "" ;

class MyAds extends Component {

  myadds = []
  showadds = []
  visible_ads =[]
  visible = []
  advert_id  = []
  visible = []
  edit_Ad = []
  complete_add = []
  if_mobile =[]
  componentDidMount() {
    this.getmyAds();
  }


  constructor(props){
  super(props)
  this.state = {
    visible:false,
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
  openCustomFooterModal = (id,visible,complete_add)=>{
     this.setState({ visible: true })
     this.advert_id = id
     this.visible = visible
     console.log(complete_add);
     this.complete_add = complete_add

    }
  cancelCustomFooterModal = ()=>{
    this.setState({ visible: false })
    this.advert_id = ''
    localStorage.removeItem('edit_Ad')
    }
  customOk = ()=>{
    console.log('ok!')
    this.cancelCustomFooterModal()
    }
  viewad = ()=>{
    console.log('view ad!' , this.advert_id)

    var url = "/ad/" + this.advert_id
    this.setState((state, props) => {
    return {counter: state.counter + props.step};
    })
    console.log(url);
    // window.location.reload();
    this.props.history.push(url)

  }

  editAd = ()=> {
    console.log('editAd ad!')
    sessionStorage.setItem('edit_Ad',JSON.stringify(this.complete_add));
    console.log(JSON.parse(sessionStorage.getItem('edit_Ad')));

    var url = "/editad/"
    this.setState((state, props) => {
    return {counter: state.counter + props.step};
    })

    this.props.history.push(url)

  }

  getmyAds(){
    EventBus.publish("showLoading")

        var request = require("request");
        var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/myAdds'

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
            this.myadds = body.result;
            console.log("result Received", body);
            this.displayads();
          }else{
            console.log("API Result NOT Found");
          }
        });
  }

    activate_deactive = () =>{
      // console.log("is activate_deactive working", e);
      // console.log("is activate_deactive working", e1);
        console.log("this is true");
        var advert_id = this.advert_id.toString()
        EventBus.publish("enableDisableAdd", {advert_id:advert_id})
        this.cancelCustomFooterModal()
    }


  displayads = () => {
    var cc =[]
    var visible = []
    var imgsrc = "https://www.cleartrip.com/hotels/assets/default-img.jpg"
    this.myadds.forEach((i,idx,n) =>{
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
      this.visible_ads = i.visible
      if(i.visible = true){
        visible = <img className={"CheckedImage"} src="/img/checked.png" />
      }else{
        visible = <img className={"CheckedImage"} src="/img/cross.png" />
      }
      if(i.pictures[0] != undefined && i.pictures[0] != ''){
        imgsrc = i.pictures[0]
      }else{
        imgsrc = "https://www.cleartrip.com/hotels/assets/default-img.jpg"
      }

      cc.push(

        <div className={"AdItem --aspect-ratio: 2/1;"} onClick={ () => this.openCustomFooterModal(i._id,i.visible,i)} >
          <div className={"ImageSide"}>
            <Image className={"ImageSideImage"} src={imgsrc}
            />
          </div>

          <div className={"DescriptionSide fontRegular"}>
            <div onClick={() => this.activate_deactive(i.visible,i._id)}> {visible} </div>
            <div className={"AdTitle fontSemiBold"}> {i.title}


            </div>
            <div className={"AdDescription fontRegular"}> {i.description} </div>
            {this.if_mobile}


            <div className={"pricediv fontSemiBold"}>
            <span style={{marginLeft: "3px",fontSize:"80%", color:"#342d38"}}>{i.user_id.currency}</span> <span style={{marginLeft: "3px", fontSize:"130%", color:"#342d38"}}> {i.price} </span>


            </div>
          </div>
        </div>
      )

    })
    console.log(cc)
    this.showadds = cc
    console.log(this.showadds)
    this.setState((state, props) => {
    return {counter: state.counter + props.step};
  })
  EventBus.publish("stopLoading")

  }




  render(){
    const { visible } = this.state

    return (

      <div className="MyAds">
      {this.showadds}

    <ReactPopupLayer
        title={<span className={"modal_title"}> Choose Action</span>}
        visible={visible}
        onCancel={this.cancelCustomFooterModal}
        footer={[
            <span key="cancel" className={"cancel"} onClick={ () => this.editAd() }>EDIT AD</span>,
            <span key="enable" className={"enable"} onClick={ () => this.activate_deactive() }>DISABLE AD</span>,
            <span key="view" className={"view"} onClick={ () => this.viewad() }>VIEW THIS AD</span>

        ]}
        className="my-modal"
    >
        <p>
            <h4>You can Enable, Disable and View Ad</h4>
        </p>
    </ReactPopupLayer>


      </div>

    )
  }

}

export default withRouter(MyAds);
