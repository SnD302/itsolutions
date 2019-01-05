import React, { Component } from 'react';
import {   Button, Image  } from 'react-bootstrap';
import { Accordion, AccordionItem } from 'react-sanfona';
import EventBus from 'eventing-bus';
import Checkbox from 'rc-checkbox';

import './FilterMenu.css'
import './HomePage.css'

var brandscheck = [];
var brandsfinalcheck = [];

function onChangebrand(e) {
  console.log('Checkbox checked:', (e.target.checked));
  console.log('Checkbox checked:', (e.target.value));
  if(e.target.value == -1){
    console.log(e.target.value)
  }
  console.log(brandscheck);
  if(e.target.checked == true){
    // checks = checks.concat(e.target.value);
    brandscheck.push(e.target.value);
    console.log('final checked:', brandscheck);
  } else if(e.target.checked == false){
    //checks.pull(e.target.value);
    console.log("in false")
    brandsfinalcheck = [];
    brandscheck.forEach(function(i,idx,x){
      console.log(i , e.target.value)
      if(i+"" == e.target.value+""){
        console.log("matched")
      }else{
        brandsfinalcheck.push(i);
      }
      if(idx == x.length-1){
        brandscheck = brandsfinalcheck;
        console.log("final check : ", brandsfinalcheck);
        console.log(brandscheck);
      }
    })
//    checks.splice(e.target.value );
    console.log('final checked:', brandscheck);
  }
  console.log('final checked:', brandscheck);

}

class FilterMenu extends Component{


  brandsData = []
  age = [
    {"name":"Brand New", "count": -1},
    {"name":"Less Than a Year", "count": 0},
    {"name":"1 Year", "count":1},
    {"name":"2 Years", "count":2},
    {"name":"3 Years", "count":3},
    {"name":"4 Years", "count":4},
    {"name":"5 Years", "count":5},
    {"name":"6 Years", "count":6},
    {"name":"7 Years", "count":7},
    {"name":"Greater Than 7", "count":8}
];
  agenames = []
  type_selected = "mobile"
  checkpic = {
          height: '10px',
          position: 'absolute',
          left:'13.2%',
          marginTop:'-1%'
        };
  temp_check = ''

  handleChangeChk = function(){
    console.log("****");
  }

  applyFilters = (event) =>{
    console.log("in savefilters");
    console.log(this.price_from.value)
    console.log(this.price_to.value)
    console.log(this.age_from.value)
    console.log(this.age_to.value)
    console.log("in savefilters");

    console.log("Happened from", this.price_from.value);
    console.log("Happened to", this.price_to.value);
    console.log(brandscheck);
    var brandName = ''
    var price_start = '0'
    var price_end = '1500'
    if(this.price_from.value != undefined && this.price_from.value != ''){
      price_start = this.price_from.value
    }
    if(this.price_to.value != undefined && this.price_to.value != ''){
      price_end = this.price_to.value
    }
    brandscheck.forEach(function(i,idx,x){
      brandName = brandscheck +','
    })
    console.log(brandName)
    console.log(price_start)
    console.log(price_end)
    console.log(this.type_selected)
    var type_selected = this.type_selected

    EventBus.publish("searchFilters", {brandName: brandName, priceStart:price_start, priceEnd:price_end, type:type_selected, ageStart:this.age_from.value, ageEnd:this.age_to.value});

    // console.log("event", event);
  }
  brandsReceived()
  {
    EventBus.publish("showLoading")
    var ag = []
    this.age.forEach(function(i,idx,n){
      ag.push(
      <option className="name" value={i.count}>
      {i.name}
      </option>
      )

    })
    this.agenames = ag
    var brands;
    if (localStorage.getItem("brands") != null)
    {
      brands = JSON.parse(localStorage.getItem("brands"))
      console.log("brands", JSON.parse(localStorage.getItem("brands")));
        var bb = []
        brands.forEach(function(i,idx,n){
          bb.push(<label className="brandsOption">
          <Checkbox className="checkbox" onChange={onChangebrand} name={i.brandName} value={i.brandName} />
          <p className="name"> {i.brandName}</p>
          </label>)
        })
        this.brandsData = bb
    }


    this.setState((state, props) => {
    return {counter: state.counter + props.step};
    })

  }

  componentDidMount() {
    EventBus.on("brandsReceived", this.brandsReceived.bind(this));
  }

  componentDidUpdate() {

  }


  catChanged(type){

    console.log("Type", type);
    var brr = localStorage.getItem("brands")
    if (brr.indexOf(type+",") != -1)
    {
      brr = brr.replace(type+",", "")
    }
    else{
      brr = brr+type+","
    }

    localStorage.setItem("brands", brr)

    console.log("Brands Selcetd", brr);
    EventBus.publish("getAds", true)
  }
  handleChange = (event) => {
    console.log(brandscheck);
    this.setState({[event.target.name]: event.target.value});
    console.log(event.target.value);
    console.log(event.target.name);

  }


  typeClicked(type){
    console.log("Clicked");
    console.log("Type", type);
    if(type == "mobile"){
      EventBus.publish("verify_accesorries")
      console.log("Type", type);
      this.checkpic = {
              height: '10px',
              position: 'absolute',
              left:'13.2%',
              marginTop:'-1%'
            };
    }else if(type == "tablet"){
      EventBus.publish("verify_accesorries")
      console.log("Type", type);
      this.checkpic = {
              height: '10px',
              position: 'absolute',
              left:'17.7%',
              marginTop:'-1%'
            };
    }else if(type == "accessories"){
      EventBus.publish("verify_accesorries")
      console.log("Type", type);
      this.checkpic = {
              height: '10px',
              position: 'absolute',
              left:'22.2%',
              marginTop:'-1%'
            };
    }
    this.type_selected = type;

    EventBus.publish("getAds", {type: this.type_selected})

  }
  changeclass = () =>{
    this.temp_check = this.checkpic
    console.log("on close called", this.temp_check);
    console.log("on close called", this.checkpic);

    this.checkpic = {

          };
          console.log(this.checkpic);
          console.log(this.temp_check);
          this.setState((state, props) => {
          return {counter: state.counter + props.step};
          })
  }
  change_open_class = () =>{
    console.log("on open called");
          console.log(this.checkpic);
          this.setState((state, props) => {
          return {counter: state.counter + props.step};
          })
          this.checkpic = this.temp_check

  }

  render() {
    return (
      <div className="FilterMenu">
      <div>
      <Image style={{height:"100px",marginBottom:"5%", marginTop:"8%", float:"left", marginLeft:"7%"}} src="/img/logo.png" />
      </div>

      <Accordion style={{width:"80%", marginTop:"50%"}} allowMultiple = {true}>

      <AccordionItem title={<h className="leftside fontSemiBold filterType">Device Type <Image src="/img/down.png" className={"arrow-down"} /> </h>} onClose={this.changeclass} onExpand={this.change_open_class} expanded={true}>
      <br /><br />
        <div className="leftside typeBtns">
          <Image name="phone" className={"typeButton"} src="/img/smartphone.png" onClick={() => this.typeClicked("mobile") }/>
          <Image name="check" src="/img/checked.png" style={this.checkpic}/>
          <Image name="tablet" className={"typeButton"} src="/img/ipad.png" onClick={() => this.typeClicked("tablet") } />
          <Image name="accessories" className={"typeButton"} src="/img/battery.png" onClick={() => this.typeClicked("accessories") } /><br />
      </div><br />

      </AccordionItem><br /><br />

      <AccordionItem title={<h className="leftside fontSemiBold filterType" > Brands <Image src="/img/down.png" className={"arrow-down"} /> </h>} expanded={true}>
        <form className="leftside fontRegular brandsForm">
          {this.brandsData}
        </form><br />
      </AccordionItem><br /><br />

      <AccordionItem title={<h className="leftside fontSemiBold filterType"> Price Range (USD) <Image src="/img/down.png" className={"arrow-down"} /></h> }  expanded={false}>
        <div className="leftside fontRegular">
        <input type="number" name="price_from" ref={node => (this.price_from = node)} placeholder="Starting" style={{width:"40%"}}/> <span style={{width:"20%"}}>&nbsp; To &nbsp; </span>
        <input type="number" name="price_to" ref={node => (this.price_to = node)} placeholder="Ending" style={{width:"40%"}}/>
        </div>
      </AccordionItem><br /><br />

      <AccordionItem title={<h className="leftside fontSemiBold filterType"> Age <Image src="/img/down.png" className={"arrow-down"} /></h> }  expanded={false}>
        <div className="leftside fontRegular">
        <label className="AgeOption"> Minimum
        </label>
        <select name="age_selected" ref={node => (this.age_from = node)} className={"age_select"} style={{width:"100%"}} placeholder="Starting">
        <option></option>
        {this.agenames}
         </select>
         <span style={{width:"20%"}}>&nbsp;  &nbsp; </span>
         <label className="AgeOption"> Maximum
         </label>
         <select name="age_selected" ref={node => (this.age_to = node)} className={"age_select"} style={{width:"100%"}}>
         <option></option>
         {this.agenames}
          </select>
        </div>
      </AccordionItem><br /><br />

      </Accordion>
      <button className="leftside fontSemiBold applyBtn" style={{color:"#ffffff", textAlign:"center"}} onClick={this.applyFilters.bind(this)}>  Apply Filters </button>
      <br /><br />


      </div>

    )
  }
}


export default FilterMenu;
