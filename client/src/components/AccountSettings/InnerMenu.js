import React, { Component } from 'react';
import HomeHeaderBar from '../HomeHeaderBar/HomeHeaderBar'
import MyAds from './MyAds.js'
import MyAccount from './MyAccount.js'
import MyPurchases from './MyPurchases.js'
import Favourites from './Favourites.js'
import Offers from './Offers.js'
import Messages from './Messages.js'
import Help from './Help.js'


import EventBus from 'eventing-bus';
import { Image } from 'react-bootstrap';
import { withRouter, History, BrowserRouter as Router, Route, Link } from "react-router-dom";



var url = require('url');
import './AccountSettings.css';

const urlObj = url.parse(document.location.href, true);
const port = "" ;

class InnerMenu extends Component {
pagetoload= <MyAds />


  componentDidMount() {
    console.log(this.props.match.params.id)
    if(this.props.match.params.id == "MyAds"){
      console.log("MyAds")
      this.pagetoload = <MyAds />
    }
    else if(this.props.match.params.id == "Home"){
      console.log("Home")
      this.pagetoload = <MyAds />

    }else if(this.props.match.params.id == "MyPurchases"){
      console.log("MyPurchases")
      this.pagetoload = <MyPurchases />

    }else if(this.props.match.params.id == "Messages"){
      console.log("Messages")
      this.pagetoload = <Messages />

    }else if(this.props.match.params.id == "Offers"){
      console.log("Offers")
      this.pagetoload = <Offers />

    }else if(this.props.match.params.id == "Favourites"){
      console.log("Favourites")
      this.pagetoload = <Favourites />

    }else if(this.props.match.params.id == "Help"){
      console.log("Help")
      this.pagetoload = <Help />

    }else if(this.props.match.params.id == "AccountSettings"){
      console.log("MyAccount")
      this.pagetoload = <MyAccount />
    }else{
      this.pagetoload = <MyAds />
    }
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
  componentDidUpdate() {
    console.log(localStorage.getItem("page"));

}
  callbackpage(vv)
  {
    if(vv=="myads")
    {
      this.page= <MyAds />
    }else if(vv=="mypurchases"){
      this.page= <MyPurchases />
    }
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

  }
  }

  render(){
    return (

      <div className="InnerMenu">
      <div>
      <button className={"BlueButton PostButton"} style={{float: "right"}} onClick={ () => this.switchpage("postad") }>
      Post an Ad
      </button>
      </div>
      <div className="InnerAds">
      {this.pagetoload}
      </div>
      </div>

    )}

}

export default withRouter(InnerMenu);
