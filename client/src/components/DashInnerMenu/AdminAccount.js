import React, { Component } from 'react';
import EventBus from 'eventing-bus';
import { Image } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactTable from "react-table";
import Modal from 'react-modal';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


var url = require('url');

const urlObj = url.parse(document.location.href, true);
const port = "" ;


const suspended = ['Suspended Users'];
const allusers = ['All Users'];

const success_toast = {
  backgroundColor: '#156dbf',
  color: 'white'
};
const packagedetails_color ={}

class AdminAccount extends Component {

  data = []
  columns = []
  users = []
  user_id = []
  username = []
  useremail = []
  userpackage = []
  reason = []
  action_result ='';
  toshow = ''
  columns = [
    {
     Header: 'Name',
     accessor: 'name',
     Cell: props => <div className = "table_cells_name">{props.value}</div> // Custom cell components!
   },{
       Header: 'Email',
       accessor: 'email', // String-based value accessors!
       Cell: props => <div className = "table_cells_email">{props.value}</div> // Custom cell components!

     }, {
       Header: 'Mobile',
       accessor: 'mobile',
       Cell: props => <div className = "table_cells_mobile">{props.value}</div> // Custom cell components!
     },
    {
     Header: 'Account Status',
     accessor: 'ac_status',
     Cell: props => <div className = "table_cells_account">{props.value}</div> // Custom cell components!
   },
   {
    Header: 'Currency',
    accessor: 'currency',
    Cell: props => <div className = "table_cells_currency">{props.value}</div> // Custom cell components!
  }, {
    Header: 'Package',
    accessor: 'package',
    Cell: props => <div className = "table_cells_package">{props.value}</div> // Custom cell components!
  },
  {
    Header: 'Make Admin',
    accessor: 'admin',
    Cell: props => <div className = "table_cells_admin">{props.value}</div> // Custom cell components!
  },
{
    Header: "Users",
    accessor: "suspend",
    id: "over",
    Cell: props => <div className = "table_cells_users">{props.value}</div>,

    Filter: ({ filter, onChange }) =>
      <select
        onChange={this.onChange_filter}
        style={{ width: "100%" }}
      >
        <option value="all">Show All</option>
        <option value="true" >Suspended</option>
      </select>
  }

 ]
  componentDidMount() {
    this.getAllUsers();

  }
  constructor(props){
  super(props)
  this.state = {
    showModal: false,
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
  onChange_filter = (event) =>{
    console.log("Something" ,event.target.value);
    if(event.target.value == "true"){
      console.log("in true");
      this.getAll_suspended_Users();
    }else{
      console.log("in all");
      this.getAllUsers();
    }
  }

  getAllUsers = () => {
    EventBus.publish("showLoading")
    // this.toshow =<span><Dropdown className={"Dropdown"} onChange={this._onSelect.bind(this)} options={suspended} placeholder="All Users" />
    // </span>


        var request = require("request");
        var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/getAllUsers'

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
          // console.log("result Received", body.result);

          if (body.result){
            this.users = body.result
            this.display_users()
            console.log("result Received", body.result);

          }else{
            console.log("API Result NOT Found");
            alert("Error!");
            EventBus.publish("stopLoading")
          }
        });
  }
  getAll_suspended_Users = () =>{
      // this.toshow =<Dropdown className={"Dropdown"} onChange={this._onSelect.bind(this)} options={allusers} placeholder="Suspended Users" />

      var request = require("request");
      var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/getAllSuspendedUsers'

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
        // console.log("result Received", body.result);

        if (body.result){
          this.users = body.result
          this.display_users()
          console.log("result Received", body.result);

        }else{
          console.log("API Result NOT Found");
          alert("Error!");
          EventBus.publish("stopLoading")
        }
      });
  }
  display_users = () =>{
    var rr = []
    this.data= []
    console.log("users are",this.action_result);
    if(this.action_result != '' && this.action_result != undefined && this.action_result != null){
      var changed_id = this.action_result._id
      console.log("changed_id",this.action_result._id);

    }else{
      console.log("from start");
    }
    this.users.forEach((i,idx,n) =>{

      var entry = []
      if(i._id == changed_id){
        this.users[idx] = this.action_result;
        i = this.action_result;
        console.log("********************************************")
        console.log(this.action_result);
        console.log("********************************************")
      }

      entry.name = i.name
      entry.email = i.email
      entry.mobile = i.mobile
      entry.ac_status = i.accountStatus
      entry.currency = i.currency
      entry.package = i.package.name

      if(i.isAdmin){
        entry.admin = <button className="remove_admin" onClick={() => this.removeAdmin(i._id)}> Remove Admin</button>
      }else{
        entry.admin = <button className="make_admin" onClick={() => this.makeAdmin(i._id)}> Make Admin</button>
      }
      if(i.isDeleted && i.blockReason != '' && i.blockReason != undefined && i.blockReason != null ){
        entry.suspend = <button className="un-suspend_user" onClick={() => this.unsuspend_user(i._id)}> Un-Suspend</button>

      }else if(i.isDeleted){
        entry.suspend = <button className="un-suspend_user" > Deleted</button>
      }else{
        entry.suspend = <button className="suspend_user" onClick={() => this.handleOpenModal(i._id,i.name,i.email,i.package.name)}> Suspend</button>

      }
      // entry.action = <button onClick={() => this.handleOpenModal(i._id,i.type)}> Action</button>

      // console.log("entry data is",entry);
      this.data.push(entry)
      if(idx == n.length-1){
        if(this.action_result!=''){
          this.action_result = '';
        }
      }
//      this.action_result = ''
    })

    console.log("new data is",this.data);
    this.setState((state, props) => {
    return {counter: state.counter + props.step};
  })
  EventBus.publish("stopLoading")

  }

  removeAdmin = id => {
    console.log("remove admin");
    EventBus.publish("showLoading")
    this.user_id = id
    this.action_body = {user_id:this.user_id}
    console.log("action body is",this.action_body);
    this.perform_admin();
  }
  makeAdmin = (id) => {
    console.log("make admin");
    EventBus.publish("showLoading")
    this.user_id = id

    this.action_body = {user_id:this.user_id}
    console.log("action body is",this.action_body);
    this.perform_admin();
  }
  suspend_user = () => {
    console.log("suspend user");
    EventBus.publish("showLoading")

    this.reason = this.state.reason
    this.action_body = {user_id:this.user_id,reason:this.reason}
    console.log("action body is",this.action_body);
    if(this.action_body.reason != null && this.action_body.reason != undefined && this.action_body.reason != ''){
      this.perform_suspend();
    }else{
      alert("Reason is Empty!");
    }
  }
  unsuspend_user = (userid) => {
    console.log("un_suspend user");
    // unsuspendUser
    EventBus.publish("showLoading")

    this.action_body = {user_id:userid}
    console.log("action body is",this.action_body);
    this.perform_un_suspend();

  }
  unsuspend_all = () => {
  console.log("in un suspend all users");
      var request = require("request");
      var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/unsuspendAllUsers'

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
        console.log("Body : ",body);
        if (body.result){
          console.log("result Received", body.result);
          alert("Users succesfuly Un-Suspended!");

          this.getAllUsers();
          EventBus.publish("stopLoading")

        }else{
          console.log("API Result NOT Found");
          alert("Something is wrong!");
          EventBus.publish("stopLoading")
        }
      });
  }
  handleOpenModal = (user_id, username, useremail, userpackage) =>{
    console.log(user_id, username, useremail, userpackage);
    this.user_id = user_id
    this.username = username
    this.useremail = useremail
    this.userpackage = userpackage
    EventBus.publish("showLoading")
    console.log("in open modal");
    this.setState({ showModal: true });

      this.accept_or_reject_buttons =
      <div>

      <button className={"suspend_user_button"} style={{marginTop:"20%"}} onClick={this.suspend_user}>
      Suspend User
      </button>
      </div>

    this.setState((state, props) => {
    return {counter: state.counter + props.step};
    EventBus.publish("stopLoading")

  })
  }
  handleCloseModal = () => {
    EventBus.publish("showLoading")
    this.user_id = ''
    this.username = ''
    this.useremail = ''
    this.userpackage = ''
    this.reason = ''
    this.setState({ showModal: false });

    this.setState((state, props) => {
    return {counter: state.counter + props.step};

  })
  EventBus.publish("stopLoading")
  }


  perform_un_suspend = () => {
    console.log("in perform action ");
        var request = require("request");
        var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/unsuspendUser'

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
            this.display_users();
            EventBus.publish("stopLoading")
            this.handleCloseModal();

          }else{
            console.log("API Result NOT Found");
            alert("Something is wrong!");
            EventBus.publish("stopLoading")
            this.handleCloseModal();
          }
        });

  }

  perform_suspend = () => {
    console.log("in perform action ");
        var request = require("request");
        var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/suspendUser'

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
            this.display_users();
            EventBus.publish("stopLoading")
            this.handleCloseModal();

          }else{
            console.log("API Result NOT Found");
            alert("Something is wrong!");
            EventBus.publish("stopLoading")
            this.handleCloseModal();
          }
        });

  }
  perform_admin = () => {
    console.log("in perform action ");
        var request = require("request");
        var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/makeAdmin'

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
            this.display_users();
            EventBus.publish("stopLoading")

          }else{
            console.log("API Result NOT Found");
            alert("Something is wrong!");
            EventBus.publish("stopLoading")
          }
        });

  }

  handleChange = (event) => {

    this.setState({[event.target.name]: event.target.value});
    console.log(event.target.value);
    console.log(event.target.name);

  }
  _onSelect = (e)=>{
    console.log(e.value);
    var selection = e.value
    if (e.value == "All Users"){
      this.getAllUsers();
    }else if(e.value == "Suspended Users"){
      this.getAll_suspended_Users();
    }
  }


  render(){
    return (


      <div className="AdminAccount">

      {this.toshow} &nbsp; &nbsp; &nbsp; &nbsp;
            <ReactTable
            data={this.data}
            columns={this.columns}
            minRows={10}
            defaultPageSize={10}
            filterable={true}
            filterAll ={true}

            />
    &nbsp; &nbsp; &nbsp; &nbsp;
    <button className={"unsuspend_all"} onClick={this.unsuspend_all}>
    Un-Suspend All
    </button>

    <Modal style={{borderRadius:"20px"}} isOpen={this.state.showModal} contentLabel="Minimal Modal Example" >

    <span className={"close"} onClick={this.handleCloseModal}>x</span>
    <div >
    <label className={"labels"}>
    Perform action against this User
    </label><br />
    <div className={"labels1"}>
    User Name : {this.username}
    </div>
    <div className={"labels1"}>
    User Email : {this.useremail}
    </div>
    <div className={"labels1"}>
    User Package : {this.userpackage}
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

export default AdminAccount;
