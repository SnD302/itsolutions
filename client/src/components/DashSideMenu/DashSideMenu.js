import React, { Component } from 'react';
// import MenuItem from './MenuItem'
import { Image } from 'react-bootstrap';
import { withRouter, History, BrowserRouter as Router, Route, Link } from "react-router-dom";
import EventBus from 'eventing-bus';

import './DashSideMenu.css';

class DashSideMenu extends Component {
UsersManagement= []
AdsManagement= []

messages = []
offer = []
favourites = []
help = []
home = []
accountsettings = []
DashBoard = []
AdminAccount = []

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.selected = []
    console.log(this.selected);
    if(this.props.match.params.id == "UsersManagement"){
      console.log("UsersManagement")
      this.DashBoard = {
        color: '#156dbf',
      };
    }else if(this.props.match.params.id == "AdsManagement"){
      console.log("AdsManagement")
      this.AdminAccount = {
        color: '#156dbf',
      };
    }else{
      this.DashBoard = {
      color: '#156dbf',
      };
    }

    this.setState((state, props) => {
    return {counter: state.counter + props.step};
    })
  }


  switchpage = (page) =>
  {
    var url = "/dashboard/" + page
    console.log("Value", page);
    this.setState((state, props) => {
    return {counter: state.counter + props.step};
    })

    console.log("props", this.props.match.params.id);
    window.location.reload();
    this.props.history.push(url)
  }

  render() {

    return(
      <div className="DashSideMenu">
        <div>
        <div className="fontSemiBold backBtn SideMenuLogo">

        </div>
        </div>
        <div className="Menu">
        <div className="menuitems" style={this.DashBoard} onClick={ () => this.switchpage("UsersManagement") }>  Users Management</div>
        <div className="menuitems" style={this.AdminAccount} onClick={ () => this.switchpage("AdsManagement") }>  Ads Management</div>

        </div>
      </div>

    )}



}



export default withRouter(DashSideMenu);
