import React, { Component } from 'react';
import EventBus from 'eventing-bus';
import { Image } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
import ReactTable from "react-table";
import Modal from 'react-modal';

import 'react-table/react-table.css'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios, { post } from 'axios'

var url = require('url');

const urlObj = url.parse(document.location.href, true);
const port = "" ;

const success_toast = {
  backgroundColor: '#156dbf',
  color: 'white'
};


const packagedetails_color ={}
import './DashInnerMenu.css';

class AdsManagement extends Component {

  activebutton1 = []
  activebutton2 = []
  reported = []
  showadds = []
  data = []
  report_id = []
  report  = []
  title= []
  username= []
  reported_user_id= []
  advert_id = []
  reason = []
  action_body = []
  action_result = []
  ads = []
  visible = []
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
          width: '140px',
        };
  columns = []
  componentDidMount() {
  this.getAllReports();

  }
  constructor(props){
  super(props)
  this.state = {
    showModal: false,
    showModal_advertisements:false,
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
  this.handleOpenModal_advertisements = this.handleOpenModal_advertisements.bind(this);
  this.handleCloseModal = this.handleCloseModal.bind(this);
  this.handleCloseModal_advertisements = this.handleCloseModal_advertisements.bind(this);

  }

  onOpenModal = () => {
    console.log("open")
   this.setState({ open: true });
 };

  onCloseModal = () => {
   this.setState({ open: false });
 };

 handleChange = (event) => {

   this.setState({[event.target.name]: event.target.value});
   console.log(event.target.value);
   console.log(event.target.name);

 }

  getAllReports = () =>{
    EventBus.publish("showLoading")
    this.columns = [
      {
       Header: 'Report',
       accessor: 'report',
       Cell: props => <span className='number'>{props.value}</span>

     },{
         Header: 'Title',
         accessor: 'title' // String-based value accessors!
       }, {
         Header: 'IMEI',
         accessor: 'imei',
         Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
       },
      {
       Header: 'UserName',
       accessor: 'username',
       Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
     },
     {
      Header: 'UserEmail',
      accessor: 'useremail',
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      Header: 'Report Status',
      accessor: 'status',
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      Header: 'Ad Status',
      accessor: 'deleted',
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    },
      {
       Header: 'Enable/Disable',
       accessor: 'action',
       Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
     }]
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
            width: '140px',
          };
        var request = require("request");
        var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/getAllReports'

        var options = { method: 'POST',
        url: urlPath,
        headers:
        { 'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('admin_JWT'),},
        body: {},
        json: true };

        console.log("Call", options);

        request(options,  (error, response, body)=> {
          if (error) throw new Error(error);
          if (body.result){
            this.reported = body.result
            this.display_reported()
            console.log("result Received", body.result);
            if(body.result.length == 0){
              toast.error("No Reports !", {
                  autoClose: 3000,
                  position: toast.POSITION.TOP_CENTER,
                });
            }else{

            }
          }else{
            console.log("API Result NOT Found");
            toast.error("No Reports!", {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
              });
            EventBus.publish("stopLoading")
          }
        });
  }


    display_reported = () =>{
      var rr = []
      this.data= []
      console.log("reported ads are",this.reported);
      if(this.action_result != '' && this.action_result != undefined && this.action_result != null){
        var changed_id = this.action_result._id
        console.log("changed_id",this.action_result._id);

      }else{
        console.log("from start");
      }
      this.reported.forEach((i,idx,n) =>{
        var entry = []
        if(i._id == changed_id){
          this.reported[idx] = this.action_result;
          i = this.action_result;
        }
        entry.title = i.advert_id.title
        entry.report = i.type
        entry.imei = i.advert_id.imei
        entry.device = i.advert_id.device
        if(i.status != "pending"){
          entry.action = <div> </div>
        }else{
          entry.action = <button className={"action_button"} onClick={() => this.handleOpenModal(i._id,i.type,i.advert_id.title,i.advert_user.name,i.advert_user._id,i.advert_id._id)}> Action</button>
        }
        if(i.advert_id.isDeleted == true && i.advert_id.reason != '' && i.advert_id.reason != undefined && i.advert_id.reason != null){
          entry.deleted = "Deleted"
        }else{
          entry.deleted = ""
        }
        // entry.action = <button onClick={() => this.handleOpenModal(i._id,i.type)}> Action</button>

        entry.username = i.advert_user.name
        entry.useremail = i.advert_user.email
        entry.status = i.status

        // console.log("entry data is",entry);
        this.data.push(entry)
        // this.action_result = ''
      })

      console.log("new data is",this.data);
      this.showadds = rr
      this.setState((state, props) => {
      return {counter: state.counter + props.step};
    })
    EventBus.publish("stopLoading")

    }
handleOpenModal = (id,report,title,username,reported_user_id,advert_id) => {
  console.log(id);
  this.report_id = id
  this.report = report
  this.title = title
  this.username = username
  this.reported_user_id = reported_user_id
  this.advert_id = advert_id
  EventBus.publish("showLoading")
  console.log("in open modal");
  this.setState({ showModal: true });

    this.accept_or_reject_buttons =
    <div>
    <button className={"dismiss_report_button"} style={{marginTop:"20%"}} onClick={this.dismiss_report}>
    Dismiss Report
    </button>

    <button className={"delete_ad_button"} style={{marginTop:"20%"}} onClick={this.delete_ad}>
    Delete Ad
    </button>
    <button className={"suspend_user_button"} style={{marginTop:"20%"}} onClick={this.suspend_user}>
    Suspend User
    </button>
    </div>


  this.setState((state, props) => {
  return {counter: state.counter + props.step};
  EventBus.publish("stopLoading")

})
}
handleOpenModal_advertisements  = (id,type,title,name,visible) => {
  console.log(id);
  this.advert_id = id
  this.type = type
  this.title = title
  this.username = name
  if(visible == false){
    this.visible = "Not_visible"

  }else{
    this.visible = "Visible"
  }
  console.log(this.advert_id,this.type,this.title,this.name);
  EventBus.publish("showLoading")
  console.log("in open modal");
  this.setState({ showModal_advertisements: true });

    this.accept_or_reject_buttons =
    <div>
    <button className={"dismiss_report_button"} style={{marginTop:"20%"}} onClick={this.enable}>
    Enable
    </button>

    <button className={"delete_ad_button"} style={{marginTop:"20%"}} onClick={this.disable}>
    Disable
    </button>

    </div>


  this.setState((state, props) => {
  return {counter: state.counter + props.step};
  EventBus.publish("stopLoading")

})
}
enable = () => {
  EventBus.publish("showLoading")
  var enable = true
  console.log("in dismiss report");
  this.reason = this.state.reason
  this.state.reason = ''
  this.action_body = {advert_id:this.advert_id,reason:this.reason,enable:enable}
  console.log("action body is",this.action_body);
  if(this.reason != '' && this.reason != undefined && this.reason != null){
    if(this.visible == "Not_visible" && this.action_body.reason != '' && this.action_body.reason != null && this.action_body.reason != undefined){
      console.log("in else enable");
      this.enable_disable();
    }else{
      console.log("in else enable");
    }
  }else{
    toast.error("Reason Needed !", {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });
  }

}
disable = () => {
  EventBus.publish("showLoading")
  var enable = false

  console.log("in dismiss report");
  this.reason = this.state.reason
  this.state.reason = ''
  this.action_body = {advert_id:this.advert_id,reason:this.reason,enable:enable}
  console.log("action body is",this.action_body);
  if(this.reason != '' && this.reason != undefined && this.reason != null){
  if(this.visible == "Visible"  && this.action_body.reason != '' && this.action_body.reason != null && this.action_body.reason != undefined){
    console.log("in if disble");

    this.enable_disable();
  }else{
    console.log("in else disble");
  }
}else{
  toast.error("Reason Needed !", {
      autoClose: 3000,
      position: toast.POSITION.TOP_CENTER,
    });
}
}

enable_disable = () => {

  console.log("in perform action ");
      var request = require("request");
      var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/enableDisableAddAdmin'

      var options = { method: 'POST',
      url: urlPath,
      headers:
      { 'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('admin_JWT'),},
      body: this.action_body,
      json: true };

      console.log("Call", options);

      request(options,  (error, response, body)=> {
        if (error) throw new Error(error);
        console.log("Body : ",body);
        if (body.result){
          console.log("result Received", body.result);
          this.action_result = body.result;
          this.display_ads();
          this.visible = ''
          EventBus.publish("stopLoading")
          this.handleCloseModal_advertisements();

        }else{
          console.log("API Result NOT Found");
          this.visible = ''

          toast.error("Something is Wrong !", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          EventBus.publish("stopLoading")
          this.handleCloseModal_advertisements();
        }
      });

}


dismiss_report = () => {
  EventBus.publish("showLoading")

  console.log("in dismiss report");
  this.reason = this.state.reason
  this.state.reason = ''
  this.action_body = {report_id:this.report_id,reason:this.reason,advert_id:this.advert_id,action:"dismiss"}
  console.log("action body is",this.action_body);
  if(this.action_body.reason != '' && this.action_body.reason != undefined && this.action_body.reason != null){
    this.perform_action();
  }else{
    toast.error("Reason Needed !", {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });
  }
}
delete_ad = () => {
  EventBus.publish("showLoading")

  console.log("in delete ad");
  this.reason = this.state.reason
  this.state.reason = ''
  this.action_body = {report_id:this.report_id,reason:this.reason,advert_id:this.advert_id,action:"delete"}
  console.log("action body is",this.action_body);
  if(this.action_body.reason != '' && this.action_body.reason != undefined && this.action_body.reason != null){
    this.perform_action();
  }else{
    toast.error("Reason Needed !", {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });
  }

}
suspend_user = () => {
  EventBus.publish("showLoading")

  console.log("in suspend user");
  this.reason = this.state.reason
  this.state.reason = ''
  this.action_body = {report_id:this.report_id,reason:this.reason,advert_id:this.advert_id,action:"suspend",user_id:this.reported_user_id}
  console.log("action body is",this.action_body);
  if(this.action_body.reason != '' && this.action_body.reason != undefined && this.action_body.reason != null){
    this.perform_action();
  }else{
    toast.error("Reason Needed !", {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });
  }
}
perform_action = () => {
  console.log("in perform action ");
      var request = require("request");
      var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/adminActionReport'

      var options = { method: 'POST',
      url: urlPath,
      headers:
      { 'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('admin_JWT'),},
      body: this.action_body,
      json: true };

      console.log("Call", options);

      request(options,  (error, response, body)=> {
        if (error) throw new Error(error);
        console.log("Body : ",body);
        if (body.result){
          console.log("result Received", body.result);
          this.action_result = body.result;
          this.display_reported();
          EventBus.publish("stopLoading")
          this.handleCloseModal();

        }else{
          console.log("API Result NOT Found");
          toast.error("Something is wrong !", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          EventBus.publish("stopLoading")
          this.handleCloseModal();
        }
      });

}

handleCloseModal = () => {
  EventBus.publish("showLoading")
  this.report_id = ''
  this.report = ''
  this.title = ''
  this.username = ''
  this.reported_user_id = ''
  this.advert_id = ''
  this.reason = ''
  this.action_body = ''
  this.setState({ showModal: false });
  // this.accept_reject_offer_view = ''

  this.setState((state, props) => {
  return {counter: state.counter + props.step};

})
EventBus.publish("stopLoading")
}
handleCloseModal_advertisements = () => {
  EventBus.publish("showLoading")
  this.report_id = ''
  this.report = ''
  this.title = ''
  this.username = ''
  this.reported_user_id = ''
  this.advert_id = ''
  this.reason = ''
  this.action_body = ''
  this.setState({ showModal_advertisements: false });
  // this.accept_reject_offer_view = ''

  this.setState((state, props) => {
  return {counter: state.counter + props.step};

})
EventBus.publish("stopLoading")
}


  getAllAdvertisements = () =>{
    EventBus.publish("showLoading")
    this.data= []
    this.columns = [
      {
       Header: 'Title',
       accessor: 'title',
       Cell: props  => <div className = "table_cells">{props.value}</div> // Custom cell components!
     },{
         Header: 'Device Type',
         accessor: 'type' // String-based value accessors!
       },{
         Header: 'UserName',
         accessor: 'name', // String-based value accessors!
         Cell: props => <div className = "table_cells">{props.value}</div>  // Custom cell components!
         },{
         Header: 'IMEI',
         accessor: 'imei',
         Cell: props => <div className = "table_cells">{props.value}</div>  // Custom cell components!
       },
       {
        Header: 'Price (USD)',
        accessor: 'price',
        Cell: props => <div className = "table_cells">{props.value}</div>  // Custom cell components!
      },
      {
       Header: 'Color',
       accessor: 'color',
       Cell: props => <div className = "table_cells">{props.value}</div>  // Custom cell components!
     },
     {
      Header: 'Storage',
      accessor: 'storage',
      Cell: props => <div className = "table_cells">{props.value}</div>  // Custom cell components!
    }, {
      Header: 'Visible',
      accessor: 'visible',
      Cell: props => <div className = "table_cells">{props.value}</div>  // Custom cell components!
    },
      {
       Header: 'Enable/Disable',
       accessor: 'action',
       Cell: props => <div className = "table_cells">{props.value}</div>  // Custom cell components!
     }]
    this.activebutton2 = {
            fontFamily:'proxr',
            backgroundColor: '#156dbf',
            border: '1px solid #156dbf',
            borderRadius: '5px 5px 5px 5px',
            color:'#ffffff',
            fontSize: '120%',
            height: '40px',
            width: '140px',
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
        var request = require("request");
        var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/viewAllAdvertisements'

        var options = { method: 'POST',
        url: urlPath,
        headers:
        { 'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('admin_JWT'),},
        body: {},
        json: true };

        console.log("Call", options);

        request(options,  (error, response, body)=> {
          if (error) throw new Error(error);
          if (body.result){
            EventBus.publish("stopLoading")
            this.ads = body.result;
            this.display_ads();
            console.log("result Received", body.result);
            if(body.result.length == 0){
              toast.error("No Advertisements !", {
                  autoClose: 3000,
                  position: toast.POSITION.TOP_CENTER,
                });
            }else{

            }
          }else{
            console.log("API Result NOT Found");

            toast.error("No Advertisements !", {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
              });
            EventBus.publish("stopLoading")
          }
        });
  }

  display_ads = () =>{
    var rr = []
    this.data= []
    console.log("reported ads are",this.ads);
    if(this.action_result != '' && this.action_result != undefined && this.action_result != null){
      var changed_id = this.action_result._id
      console.log("changed_id",this.action_result._id);

    }else{
      console.log("from start");
    }
    this.ads.forEach((i,idx,n) =>{
      var entry = []
      if(i._id == changed_id){
        this.ads[idx] = this.action_result;
        i = this.action_result;
      }
      entry.title = i.title
      entry.type = i.type
      entry.imei = i.imei
      entry.price = i.price
      entry.name = i.user_id.name
      entry.device = i.device
      if(i.visible){
        entry.action = <button className={"action_button"} onClick={() => this.handleOpenModal_advertisements(i._id,i.type,i.title,i.user_id.name,i.visible)}> Action</button>
        entry.visible = "Visible"
      }else{
        entry.action = <div> </div>
        entry.visible = "Not-Visible"
        entry.action = <button className={"action_button"} onClick={() => this.handleOpenModal_advertisements(i._id,i.type,i.title,i.user_id.name,i.visible)}> Action</button>
      }
      // entry.action = <button onClick={() => this.handleOpenModal(i._id,i.type)}> Action</button>

      entry.color = i.color
      entry.storage = i.storage

      // console.log("entry data is",entry);
      this.data.push(entry)
      // this.action_result = ''
    })

    console.log("new data is",this.data);
    this.showadds = rr
    this.setState((state, props) => {
    return {counter: state.counter + props.step};
  })
  EventBus.publish("stopLoading")

  }



  render(){

    return (


      <div className="AdsManagement">
      <div className="Ads_header">
      <button style={this.activebutton1} className={"offersButton MyAdsoffs"} onClick={this.getAllReports}>
      Reports
      </button> &nbsp; &nbsp; &nbsp; &nbsp;
      <button style={this.activebutton2} className={"offersButton MyAdsoffs"} onClick={this.getAllAdvertisements}>
      Advertisements
      </button>
      </div>

      <ReactTable
      data={this.data}
      columns={this.columns}
      minRows={10}
      defaultPageSize={10}
      filterAll ={true}
      filterable={true}
      loadingText='Loading...'
      noDataText= ''
      />



      <Modal style={{borderRadius:"20px"}} isOpen={this.state.showModal} contentLabel="Minimal Modal Example" >

      <span className={"close"} onClick={this.handleCloseModal}>x</span>
      <div >
      <label className={"labels"}>
      Perform action against this report
      </label><br />
      <div className={"labels1"}>
      Report Is : {this.report}
      </div>
      <div className={"labels1"}>
      Against Ad : {this.title}
      </div>
      <div className={"labels1"}>
      User Name : {this.username}
      </div>
      <br />

      <div>
      <textarea type="text" rows="2" cols="50" name="reason" onChange={this.handleChange} placeholder="Reason for action " className={'textarea'}/>
      </div>
      <div>


      {this.accept_or_reject_buttons}


      </div>
      </div>

      </Modal>
      <Modal style={{borderRadius:"20px"}} isOpen={this.state.showModal_advertisements} contentLabel="Minimal Modal Example" >

      <span className={"close"} onClick={this.handleCloseModal_advertisements}>x</span>
      <div >
      <label className={"labels"}>
      Enable or Disable This Add
      </label><br />
      <div className={"labels1"}>
      Title Is : {this.title}
      </div>
      <div className={"labels1"}>
      Add Status : {this.visible}
      </div>
      <div className={"labels1"}>
      User Name : {this.username}
      </div>
      <br />

      <div>
      <textarea type="text" rows="2" cols="50" name="reason" onChange={this.handleChange} placeholder="Reason for action " className={'textarea'}/>
      </div>
      <div>


      {this.accept_or_reject_buttons}


      </div>
      </div>

      </Modal>
      <ToastContainer />
      </div>

    )}

}

export default AdsManagement;
