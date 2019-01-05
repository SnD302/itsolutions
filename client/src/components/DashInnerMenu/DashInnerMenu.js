import React, { Component } from 'react';
import HomeHeaderBar from '../HomeHeaderBar/HomeHeaderBar'
import AdminAccount from './AdminAccount.js'
import AdsManagement from './AdsManagement.js'


import EventBus from 'eventing-bus';
import { Image } from 'react-bootstrap';
import { withRouter, History, BrowserRouter as Router, Route, Link } from "react-router-dom";



var url = require('url');

const urlObj = url.parse(document.location.href, true);
const port = "" ;

class DashInnerMenu extends Component {

  componentDidMount() {
    console.log(this.props.match.params.id)
    if(this.props.match.params.id == "UsersManagement"){
      console.log("UsersManagement")
      this.pagetoload = <AdminAccount />
    }
    else if(this.props.match.params.id == "AdsManagement"){
      console.log("AdsManagement")
      this.pagetoload = <AdsManagement />
    }else{
      this.pagetoload= <AdminAccount />
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

    }else if(vv=="mypurchases"){
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

      <div className="DashInnerMenu">

      <div className="InnerAds">
      {this.pagetoload}
      </div>
      </div>

    )}

}

export default withRouter(DashInnerMenu);
