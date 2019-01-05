import React, { Component } from 'react';
import EventBus from 'eventing-bus';
import { Image } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


var url = require('url');
import './AccountSettings.css';

const urlObj = url.parse(document.location.href, true);
const port = "" ;

class Help
 extends Component {



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


      <div className="Help">
      <div style={{fontSize:"150%"}}>

      <form
      action="mailto:help@celxapp.com?subject=Help%20Required%20"
      method="POST"
      enctype="multipart/form-data"
      name="EmailTestForm">
      <div>
      </div>
      <div className={'for_label'}>
      <label className={'Formtitle'}>
      Send us an email:
      </label>
      <p>
      <textarea type="text" name="VisitorComment" rows="3" cols="50" className={'textarea'} /></p>
      </div>
      <input className="update_button" type="submit" value="Send Email" />

      </form>
      </div>
      </div>

    )}

}

export default Help;
