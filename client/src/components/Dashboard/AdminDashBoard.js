import React, { Component } from 'react';
import HomeHeaderBar from '../HomeHeaderBar/HomeHeaderBar'
import DashSideMenu from '../DashSideMenu/DashSideMenu'
import DashInnerMenu from '../DashInnerMenu/DashInnerMenu'

import EventBus from 'eventing-bus';
import { Image } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



var url = require('url');
import './AdminDashBoard.css';

const urlObj = url.parse(document.location.href, true);
const port = "" ;

class AdminDashBoard extends Component {



  componentDidMount() {
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



  render(){
    return (


      <div className="AdminDashBoardPage">

        <HomeHeaderBar />
        <div className={'DashBody'}>
        <DashSideMenu />
        <DashInnerMenu />

        </div>

      </div>

    )}

}

export default AdminDashBoard;
