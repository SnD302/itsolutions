import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Data, AppService } from '../../app.service';
import { ChatService } from '../../chat.service';
import { Router, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import  * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';


// const socket = io('https://celx-dev.herokuapp.com');

@Component({
  selector: 'app-account',
  templateUrl: './myaccs.component.html',
  styleUrls: ['./myaccs.component.scss']
})
export class MyaccsComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen:boolean = true;
  // public links = [
  //   { name: 'Account Dashboard', href: 'dashboard', icon: 'dashboard' },
  //   { name: 'Account Information', href: 'information', icon: 'info' },
  //   { name: 'Addresses', href: 'addresses', icon: 'location_on' },
  //   { name: 'Order History', href: 'orders', icon: 'add_shopping_cart' },
  //   { name: 'Logout', href: '/sign-in', icon: 'power_settings_new' },
  // ];
  passForm: FormGroup;
  public offeridnew:any[];
  public offeradvertid:any[];
  public advertid:any[];
  public enums:any[];
  public hid:any;
  public Edit:any;
  public myadd:any[];
  public offerid:any[];
  public nooffers:any;
  public myad_id:any[];
  public mytitle:any[];
  public myprice:any[];
  public myoffers:any[];
  public myoffersstatus:any[];
  public sale:any[];
  public userdetails:any[];
  public username:any[];
  public useremail:any[];
  public usercurrency:any[];
  public user: any;
  public id:any[];
  public first: any;
  public pass: any;
  public acc:any;
  public adds:any;
  public fileToUpload : File=null;
  public file: any;
  public curr_lowercase:any;
  public mismatch:any;
  public profilePicture:any;
  public hist_but:any;
  public offer_but:any;
  public boost:any;
  public boostmyad:any;
  public deactivate:any;
  // public msg:any;
  public status_but:any;
  public proceed:any;
  public offer_create:any;
  public pkr:any;
  public off_pr:any;
  public off_rc:any;
  public favour_but:any;
  public noadds:any;
  public main:any;
  public pck:any;
  public up:any;
  public status_but1:any;
  public pay:any;
  public stripeID:any[];
  public sale_seller:any[];
  public mycurrency:any;
  public currency:any;
  public package:any[];
  public card_id:any;
  public packages:any[];
  public cards:any[];
  public package_id:any;
  public remove:any;
  public head_h:any;
  public head_m:any;
  public head_o:any;
  public head_f:any;
  public head_he:any;
  public head_a:any;
  public headings:any;
  public head_acc:any;
  public disable:any;
  public visible:any;
  public disid:any;
  public myuserid:any;
  public chat:any;
  public chats:any;
  public dateTime:any;
  public full:any;
  public hour:any;
  public minute:any;
  public chat_id:any;
  public chatadvertid:any;
  public chatadvert:any;
  public chathisid:any;
  public messages:any;
  public message:any;
  public messageFrom:any;
  public msg:any;
  public headi:any;
  public advertinmsg:any;
  public titleinmsg:any;
  public newmessage:any;
  public mes:any;
  public connection:any;
  public adTitle:any;
  public adpictures:any;
  public adcolor:any;
  public adstorage:any;
  public aduserid:any;
  public offer_view:any;
  // public offerstatus:string;
  public offerstatus:string;
  public offerstatusseller:string;
  public adidstring:string;
  public mymatchedad:string;
  public matchedofferid:string;
  public chat_msg:any;
  public messageresult:any;
  public matchedofferprice:any;
  public offersNotMatchedid:any;
  public offersbyseller:any;
  public messageuserid:any;


  constructor(public router:Router,public appService:AppService,public chatService:ChatService,public formBuilder: FormBuilder, public snackBar: MatSnackBar) {
    this.first =true;
    this.user =false;
    this.pass =false;
    this.adds=true;
    this.acc=false;
    this.hist_but=true;
    this.offer_but=false;
    this.boost=true;
    this.deactivate=true;
    this.chat=false;
    this.msg=false;
    this.pkr=true;
    this.mes = false;
    this.off_rc=false;
    this.status_but1=false;
    this.pck=false;
    this.up=true;
    this.pay=false;
    this.head_h=true;
    this.head_m=false;
    this.head_o=false;
    this.head_f=false;
    this.head_he=false;
    this.head_a=false;
    this.head_acc=true;
    this.disable=true;
    this.headi=true;
    this.offer_view=false;
    this.headings="MY ADS";
    this.myuserid= localStorage.getItem('userid');

    // socket.on('room',(chat)=>{
    //  console.log(chat.chat);
    //  localStorage.setItem("chatItem",JSON.stringify(chat.chat));
    // })

   }
ngDoCheck(){
// console.log("****")
//   if((JSON.parse(localStorage.getItem("chatItem")))._id){
//     //  console.log("its a message");
//       this.testFunction(JSON.parse(localStorage.getItem("chatItem")));
//   }
//  console.log(this.newmessage);
//  JSON.parse(localStorage.getItem("chatItem"));

  //console.log("logged",x);
  // socket.on('room',(kp)=>{
  //   console.log(kp.chat.message);
  // });
}
  ngOnInit() {
    localStorage.getItem('userid');

    this.connection = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);
      // console.log(messages);
      console.log(message);

    })


// this.socketConnection();
  //  socket.on('event', function(data){console.log("evet")});


    this.showadds();
    this.getallpackages();
    this.showuser();
    this.getallenums();
    this.retreiveCustomerCards();

    // this.myaddsoffers();
    this.passForm = this.formBuilder.group({
      'old_pass': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'new_pass': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    if(window.innerWidth < 960){
      this.sidenavOpen = false;
    };
    this.mycurrency= localStorage.getItem('currency');

  }

  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }
  public test(){
    console.log("test")

  }

  ngAfterViewInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if(window.innerWidth < 960){
          this.sidenav.close();
        }
      }
    });
  }
  // socket.on('room',function(kp){
  //   console.log(kp);
  // });

  public adds_h(){

  }
  public mk_offr(){
    this.offer_view=true;
    this.msg=false;
  }
  public canceloffer(){
    this.offer_view=false;
    this.msg=true;
  }
  // public socketConnection(){
  //   console.log("******************"+localStorage.getItem('userid')+"****************");
  //   console.log("connecting");
  //   socket.on('connect',function(){
  //     console.log("+++++++++Conected+++++++");
  //     socket.emit('user',{user_id:localStorage.getItem('userid')});
  //   })
  // }

  public testFunction(chat){
    console.log("got chat");
    var c = localStorage.getItem("chatItem");
    if(localStorage.getItem("allMessages")!=null && this.mes == true){
    var a = "},"+c+"]";

    if( (localStorage.getItem("allMessages")).indexOf("}]")>-1){
      var x = JSON.parse(localStorage.getItem("allMessages"));
      console.log(x.length);
      x[x.length] = JSON.parse(localStorage.getItem("chatItem"));
    this.messages = x;
      // var x = (localStorage.getItem("allMessages")).replace("}]",a);
      //
      // localStorage.setItem("allMessages",x)
      // console.log("AllMessages in  : ",localStorage.getItem("allMessages"))
      // this.messages = JSON.parse(x);
    }

    }


//    var tchat = this.messages;
    //this.messages = tchat.push(chat);
  }



  public chat_s(){
    this.adds=false;
    this.acc=false;
    this.hid = false;
    this.head_a=false;
    this.head_m=true;
    this.head_h=false;
    this.head_o=false;
    this.head_f=false;
    this.hist_but=false;
    this.offer_but=false;
    this.head_acc=false;
    this.chat=true;
  }
  public acc_s(){
    // this.headings="ACCOUNT SETTINGS";
    this.headi=false;
    this.adds=false;
    this.acc=true;
    this.hid = false;
    this.head_a=true;
    this.head_h=false;
    this.head_o=false;
    this.head_f=false;
    this.hist_but=false;
    this.offer_but=false;
    this.head_acc=false;
    this.msg=false;
    this.chat=false;
    this.offer_view=false;
  }
  public edituser(){
    this.user =true;
    this.first=false;
    this.pass=false;
    this.up=false;
  }
  public cancel(){
    this.adds=true;
    this.hid=false;
    this.pay=false;
  }
  public canceledit(){
    this.user =false;
    this.pass=false;
    this.first=true;
    this.pck=false;
    this.up=true;
    this.pay=false;
  }
  public editpass(){
    this.pass=true;
    this.user=false;
    this.first=false;
  }
  public editpayment(){
    this.pay=true;
    this.user=false;
    this.first=false;
  }
  public updatepackage(){
    this.pck=true;
    this.first=false;
    this.up=false;
  }
  public adrouter(){
    this.router.navigate(['/sell']);
  }
  public adrouterhome(){
    this.router.navigate(['/']);
  }
  public getallpackages(){
    this.appService.getallpackages().subscribe(data=>{
      console.log("packages", data);
      this.packages=data['result'];
    })
  }
  public getAllChats(){
    this.headings="MESSAGES";
    this.headi=true;
    this.chat_s();
    this.msg=false;
    this.chat=true;
    var off=[];

    this.appService.getAllChats().subscribe(data=>{
      console.log("chats", data);
      this.chats= data['result'];
      for(var k=0;k<data['result'].length;k++){
        if(data['result'][k].length>0){
          console.log(data['result'][k]);
        }
        this.dateTime=new Date(data['result'][k]['dateTime']);
        this.chat_id=data['result'][k]['chat_id'];
        this.chatadvert=data['result'][k]['advert_id'];

        console.log(this.chat_id);
        console.log(this.dateTime);
        this.hour =this.dateTime.getHours();
        this.minute =this.dateTime.getMinutes();
        this.full = this.hour + ':' + this.minute;
        console.log(this.full);
        for(var m=0;m<data['result'][k].length;m++){


          console.log(data['result'][k]['advert_id'][m]['_id']);
          console.log(data['result'][k]['advert_id'][m]);
          console.log(data['result'][k]['advert_id']);

        }

        }
    })
  }
  public getAllMessages(value,advertid){
    this.msg=true;
    this.chat=false;
    console.log("====",advertid);
    console.log("****",value);
    this.chathisid=value;
    this.chatadvertid=advertid;
   // console.log(this.chatadvertid);
   //  console.log(this.chathisid);
    this.myuserid= localStorage.getItem('userid');
    console.log(this.myuserid);
    this.appService.getAllMessages(this.myuserid,this.chathisid,this.chatadvertid).subscribe(data=>{
      console.log("allMessages : ",data);
      this.mes = true;
      this.messages=data['result'];
      this.messageuserid=this.messages[0]['messageFrom'];
      console.log(this.messageuserid);
      localStorage.setItem("allMessages",JSON.stringify(data['result']));
      if (data['result']){
        var finalStatus = '';
        this.messageresult=data['result'];
        console.log(this.messageresult);
        this.adTitle = data['result'][0]['advert_id']['title'];
        this.adcolor = data['result'][0]['advert_id']['color'];
        this.adstorage = data['result'][0]['advert_id']['storage'];
        this.adpictures = data['result'][0]['advert_id']['pictures'][0];
        // var offersMatched = [];
        var count = 0;
                this.chatService.startchat(this.myuserid,this.chathisid,this.chatadvertid);
                this.adddetails();

                  // data['result']['offers'].forEach(function(i,idx,x){
                  //   if(i.user_id == localStorage.getItem("userid")){
                  //     offersMatched[count] = i;
                  //     count = count+1;
                  //   }
                  //   if(idx == x.length-1){
                  //     console.log("matched offers :",offersMatched);
                  //     // this.offerstatus= offersMatched;
                  //     // console.log("direct",(offersMatched[0]['status']));
                  //     if (offersMatched[0]['status'] == "pending"){
                  //       console.log("pending");
                  //       // this.adstorage = "amiii jee";
                  //       this.offerstatus = "pending";
                  //       console.log(this.offerstatus);
                  //     }else if(offersMatched[0]['status'] == "re-counter"){
                  //       console.log("re-counter");
                  //       this.offerstatus = "re-counter";
                  //       console.log(this.offerstatus);
                  //     } else if (offersMatched[0]['status'] == "counter"){
                  //       console.log("counter");
                  //       this.offerstatus = "counter";
                  //       console.log(this.offerstatus);
                  //     } else if (offersMatched[0]['status'] == "rejected"){
                  //       console.log("rejected");
                  //       this.offerstatus = "rejected";
                  //       console.log(this.offerstatus);
                  //     } else if (offersMatched[0]['status'] == "accepted"){
                  //       console.log("accepted");
                  //       this.offerstatus = "accepted";
                  //       console.log(this.offerstatus);
                  //     }
                  //
                  //   }
                  // })
                  // this.aduserid=data['result']['user_id']['_id'];
      }
      // socket.emit('startchat',{myId:this.myuserid,hisId:this.chathisid,advert_id:this.chatadvertid});

      // console.log(this.advertinmsg);
      // console.log(this.titleinmsg);
      // console.log(this.storageinmsg);
      // console.log(this.colorinmsg);


      // for(var k=0;k<data['result'].length;k++){
      //   if(data['result'][k].length>0){
      //     console.log(data['result'][k]);
      //   }
      //   // this.messages=data['result'][k];
      //   this.messageFrom=data['result'][k]['messageFrom'];
      //   this.message=data['result'][k]['message'];
      //
      //   console.log(this.messages);
      //   console.log(this.messageFrom);
      //   console.log(this.message);
      //
      // }

    })
  }
  public adddetails(){

    this.appService.getProductById(this.chatadvertid).subscribe(data=>{
      if(data['result']['user_id']['_id']){
        this.aduserid=data['result']['user_id']['_id'];
      }

      console.log("advertisement details",data);
      console.log(localStorage.getItem("userid"));
      var offersMatched :any;
      var offersNotMatched = [];
      var count= 0;


    if(data['result']['user_id']['_id'] == localStorage.getItem("userid")){
      console.log("else if");
      // offersNotMatched[count] = data['result']['offers'];
      for(var j=0; j<data['result']['offers'].length; j++){
        offersNotMatched[count] = data['result']['offers'][j];
        console.log( data['result']['offers'][j])
        console.log("id from messages",this.messageuserid);
        console.log("zero index" , data['result']['offers'][0]);

        count = count+1;
        this.offersbyseller = offersNotMatched;
        console.log("offersNotMatched" , this.offersbyseller);

        // this.offersNotMatchedid[count] = data['result']['offers'][j]['_id'];
    }
    //     count = count+1;
    //     // console.log("daannniiiiiiiiiiiiii");
    //     // console.log("daannniiiiiiiiiiiiii" ,offersNotMatched );
    //     if(offersNotMatched[j]['status'] == "re-counter"){
    //     this.offersNotMatchedid = offersNotMatched[j]['_id'];
    //     this.offerstatusseller = "re-counter";
    //     console.log("re-counter");
    //     // break;
    //   }
    //   if(offersNotMatched[j]['status'] == "pending"){
    //     console.log("pending");
    //     this.offersNotMatchedid = offersNotMatched[j]['_id'];
    //     this.offerstatusseller = "pending";
    //
    //     // break;
    //   }
    //   if(offersNotMatched[j]['status'] == "counter"){
    //     console.log("counter");
    //     this.offersNotMatchedid = offersNotMatched[j]['_id'];
    //     this.offerstatusseller = "counter";
    //
    //     // break;
    //   }
    //   if(offersNotMatched[j]['status'] = "rejected"){
    //     console.log("rejected");
    //     this.offersNotMatchedid = offersNotMatched[j]['_id'];
    //     this.offerstatusseller == "rejected";
    //
    //     // break;
    //   }
    //   console.log(this.offerstatusseller);
    // }
    }

      for(var i=0; i<data['result']['offers'].length; i++){
        console.log(i);
        console.log("do something");
        if(data['result']['offers'][i]['user_id'] == localStorage.getItem("userid")){
          offersMatched[count] = data['result']['offers'][i];
          count = count+1;
          console.log("first if");

        }

        console.log("between ifs");
        if(this.adidstring.indexOf(data['result']['offers'][i]['advert_id']) !=-1){
          console.log("your id matched");
          this.mymatchedad = "matchedad";
        }else{
          this.mymatchedad = "notmatched";
          console.log("your id did not matched");
      }
        if(offersMatched != '' && offersMatched != null && offersMatched != undefined ){
        if(i == data['result']['offers'].length-1){
          console.log("matched", offersMatched);
          this.matchedofferid = offersMatched[offersMatched.length-1]['_id'];
          this.matchedofferprice = offersMatched[offersMatched.length-1]['offered_price'];
          console.log(this.matchedofferid);
          // this.offerstatus = offersMatched;
          // console.log(this.offerstatus);
          if (offersMatched[offersMatched.length-1]['status'] == "pending"){
                console.log("pending");
                // this.adstorage = "amiii jee";
                this.offerstatus = "pending";
                console.log(this.offerstatus);
              }else if(offersMatched[offersMatched.length-1]['status'] == "re-counter"){
                console.log("re-counter");
                this.offerstatus = "re-counter";
                console.log(this.offerstatus);
              } else if (offersMatched[offersMatched.length-1]['status'] == "counter"){
                console.log("counter");
                this.offerstatus = "counter";
                console.log(this.offerstatus);
              } else if (offersMatched[offersMatched.length-1]['status'] == "rejected"){
                console.log("rejected");
                this.offerstatus = "rejected";
                console.log(this.offerstatus);
              } else if (offersMatched[offersMatched.length-1]['status'] == "accepted"){
                console.log("accepted");
                this.offerstatus = "accepted";
                console.log(this.offerstatus);
              }
        }
      }


      }


})

  }

  public acceptseller(value){
    // console.log(value);
    var tick ="accepted";
    var acceptedoffer =value;
    console.log(acceptedoffer);
    var count=0;
    var sal=[];
    this.appService.accept(acceptedoffer,tick).subscribe(data=>{
      console.log("accept_reject adds =>", data);
      // this.sale=data['result']['sail']['seller_id'];
      this.sale_seller=data['sail']['_id'];
      console.log(this.sale_seller);
      this.adddetails();
      // this.appService.getsale(this.sale_seller).subscribe(data=>{
      //   sessionStorage.setItem("sellersale", JSON.stringify(data['sail']));
      //   console.log("sellersale : ",JSON.parse(sessionStorage.getItem("sellersale")));
      //   console.log(data);
      // })
  })
  }
  public rejectseller(value){
    // console.log(value);
    var cross ="rejected";
    var acceptedoffer =value;
    console.log(acceptedoffer);
    var count=0;
    var sal=[];
    this.appService.reject(acceptedoffer,cross).subscribe(data=>{
      console.log("accept_reject adds =>", data);
      // this.sale=data['result']['sail']['seller_id'];
      this.sale_seller=data['sail']['_id'];
      console.log(this.sale_seller);
      this.adddetails();
      // this.appService.getsale(this.sale_seller).subscribe(data=>{
      //   sessionStorage.setItem("sellersale", JSON.stringify(data['sail']));
      //   console.log("sellersale : ",JSON.parse(sessionStorage.getItem("sellersale")));
      //   console.log(data);
      // })
  })
  }

  public accept(){
    // console.log(value);
    var tick ="accepted";
    var acceptedoffer =this.matchedofferid;
    console.log(acceptedoffer);
    var count=0;
    var sal=[];
    this.appService.accept(acceptedoffer,tick).subscribe(data=>{
      console.log("accept_reject adds =>", data);
      // this.sale=data['result']['sail']['seller_id'];
      this.sale_seller=data['sail']['_id'];
      console.log(this.sale_seller);
      this.myaddsoffers();
      // this.appService.getsale(this.sale_seller).subscribe(data=>{
      //   sessionStorage.setItem("sellersale", JSON.stringify(data['sail']));
      //   console.log("sellersale : ",JSON.parse(sessionStorage.getItem("sellersale")));
      //   console.log(data);
      // })
  })
  }
  public reject(){
    // console.log(value);
    var cross ="rejected";
    var acceptedoffer =this.matchedofferid;
    console.log(acceptedoffer);
    var count=0;
    var sal=[];
    this.appService.reject(acceptedoffer,cross).subscribe(data=>{
      console.log("accept_reject adds =>", data);
      // this.sale=data['result']['sail']['seller_id'];
      this.sale_seller=data['sail']['_id'];
      console.log(this.sale_seller);
      this.myaddsoffers();
      // this.appService.getsale(this.sale_seller).subscribe(data=>{
      //   sessionStorage.setItem("sellersale", JSON.stringify(data['sail']));
      //   console.log("sellersale : ",JSON.parse(sessionStorage.getItem("sellersale")));
      //   console.log(data);
      // })
  })
  }
  public updateofferchat(value){
    console.log(value);
    var updateprice = value;
    console.log(updateprice);
    console.log(this.matchedofferid);
    this.appService.updateofferchat(this.matchedofferid,updateprice).subscribe(data=>{
      console.log(data);
      this.canceloffer();
    })
  }
  public counterofferchat(value){
    console.log(value);
    var updateprice = value;
    console.log(updateprice);
    this.appService.counterofferchat(this.chatadvertid,this.chathisid,updateprice).subscribe(data=>{
      console.log(data);
      this.canceloffer();
    })
  }

  public sendMessagechat(chat_msg){
    this.chatService.sendMessage(this.myuserid,this.chathisid,this.chatadvertid,chat_msg);
    this.chat_msg = '';
  }


  public sendmessage(chat_msg){

    console.log(chat_msg);
    // socket.emit('room',{myId:this.myuserid,hisId:this.chathisid,advert_id:this.chatadvertid,text:chat_msg});
  }
  public scmsg(chat){
  this.messages[this.messages.length] = chat;
  }

  public setNewpack(value){
    console.log(value);
    this.package_id=value;
  }
  public updateUserPackage(){
    console.log(this.package_id);
    this.appService.updateUserPackage(this.package_id).subscribe(data=>{
      console.log(data);
      this.snackBar.open('Package Updated', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      this.showuser();
    })
  }
  public showuser(){
    this.appService.getUserDetails().subscribe(data=>{
      console.log(data);
      this.userdetails=data['result'];
      this.username=data['result']['name'];
      this.useremail=data['result']['email'];
      this.usercurrency=data['result']['currency'];
      this.id=data['result']['_id'];
      this.profilePicture=data['result']['profilePicture'];
      this.package=[data['result']['package']];
      this.stripeID=[data['result']['stripeID']];
      console.log(this.username);
      console.log(this.id);

    })
  }
  public retreiveCustomerCards(){
    this.appService.retreiveCustomerCards().subscribe(data=>{
      console.log(data);
      this.cards=data['result'];
    })
  }
  public getallenums(){
    this.appService.getenums().subscribe(data=>{
      console.log(data);
      this.enums =data['result']['currency'];
    })
  }
  public deletecard(value){
    console.log(value);
    this.card_id=value;
    this.appService.deletecard(this.card_id,this.stripeID).subscribe(data=>{
      console.log(data);
      this.snackBar.open('Deleted', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      // this.retreiveCustomerCards();
      this.showuser();

    })
  }
  // public currencyselect(new_currency){
  //   // console.log(new_currency);
  //   this.currency= value;
  //   console.log(this.currency);
  // }
  public handleFileInput(event) {
    this.file = event.target.files[0];
    console.log("hassam");
    console.log(this.file);
    // if (event.target.files && event.target.files[0]) {
    //     const file = event.target.files[0];
    // }
  }
  public updateuserimage(){
    this.appService.uploaduserimage(this.file,this.id).subscribe(data=>{
      console.log(data);
      this.snackBar.open('Successfull', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      this.showuser();
    })
  }
  public updateUser(new_name,new_currency){
    if(new_currency != undefined && new_currency != null && new_currency != ''){
    this.curr_lowercase=new_currency.toUpperCase();
  }
    console.log(this.curr_lowercase,new_name);
    this.appService.updateUser(new_name,this.curr_lowercase).subscribe(data=>{
      console.log(data);
      // localStorage.removeItem('jwt');
      localStorage.setItem('jwt',data['token']);
      console.log(localStorage.getItem('jwt'));
      this.snackBar.open('User Details Updated', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      localStorage.removeItem('currency');
      console.log(data['user']['currency']);
      localStorage.setItem('currency',data['user']['currency']);
      this.mycurrency= localStorage.getItem('currency');

      this.showuser();
      this.acc=true;
      this.head_a=true;
      this.user=false;
      this.first=true;
      this.up=true;
      // this.showadds();
    })

  }
public onpassFormSubmit(values:Object):void {
  if (this.passForm.valid) {
    this.appService.changepassword(this.passForm.value.old_pass,this.passForm.value.new_pass).subscribe(data=>{
      console.log(data);
      this.snackBar.open('Passwords updated', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      this.showuser();
    },err=>{
      this.mismatch="Old Password Incorrect";
      console.log("password mismatch");
  })
  }
}

// public boostad(value){
//   console.log(value);
//   this.boostmyad=value;
//   var boosttrue = "true";
//   this.appService.boostad(this.boostmyad.boosttrue).subscribe(data=>{
//     console.log("boost", data);
//     if(data['result'] ){
//     this.snackBar.open('Advertisement Boosted successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
//     }
//   },err=>{
//     this.snackBar.open('No Boosts Left!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
//   });
// }

public updateoffer(createdOffer){
  this.offeridnew = createdOffer;
  console.log(this.offeridnew);
  this.adds=false;
  // this.hid=true;
  if(this.hid == true){
      this.hid = false;
  }else{
  this.hid = true;
  }

  if(this.Edit == 'Edit'){
  this.Edit = "Submit";
}else{
    this.Edit = "Edit";
}

}
public deleteoffer(createdOffer,_id){
  this.offeridnew = createdOffer;
  this.offeradvertid = _id;
  this.appService.removeMyCreatedOffer(this.offeradvertid,this.offeridnew).subscribe(data=>{
    console.log(data);
    this.snackBar.open('Offer Deleted', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    this.offersbyme();
  })
}
public submitPrice(price){
    console.log(this.offeridnew);
    console.log(price);
    this.appService.updateoffer(this.offeridnew,price).subscribe(data=>{
      console.log(data);
    })
  this.hid = false;
  this.adds=true;
}
  public showadds(){
    this.headings="MY ADS";
    this.headi=true;
    this.adds=true;
    this.acc=false;
    this.boost=true;
    this.disable=true;
    this.deactivate=true;
    this.hist_but=true;
    this.offer_but=false;
    this.status_but=false;
    this.status_but1=false;
    this.proceed=false;
    this.offer_create=false;
    this.pkr=true;
    this.off_pr=false;
    this.off_rc=false;
    this.favour_but=false;
    this.hid = false;
    this.head_h=true;
    this.head_o=false;
    this.head_f=false;
    this.head_a=false;
    this.chat=false;
    this.msg=false;
    this.offer_view=false;


    console.log("before service request");
    this.appService.myadds().subscribe(data=>{
    console.log("my adds", data);
    this.myadd=data['result'];
    this.myad_id=data['result']['_id'];
    this.mytitle=data['result']['title'];
    this.myprice=data['result']['price'];
    this.visible=data['result']['visible'];
    console.log("visible", this.visible);

    for(var i=0;i<data['result'].length;i++){
      data['result'][i]['price'] = parseFloat(data['result'][i]['price']).toFixed(2);
      if(data['result'][i]['pictures'].length>0){
        for(var j=0;j<data['result'][i]['pictures'].length;j++){

          if(data['result'][i]['pictures'][j]){
            data['result'][i]['pictures'][j] = data['result'][i]['pictures'][j].replace(".mp4" , ".jpg");
         data['result'][i]['pictures'][j] = data['result'][i]['pictures'][j].replace(".mov" , ".jpg");
      }
}

}
      this.adidstring = this.adidstring + data['result'][i]['_id'];
      console.log(this.adidstring.indexOf(data['result'][i]['_id']));
      if(this.adidstring.indexOf(data['result'][i]['_id']) !=-1){
        //matched
      }else{
      //not macthed
    }
    }

  })
  }
  public myPurchases(){
    this.off_pr=false;
    this.headings="PURCHASES"

    console.log("before service request");
    this.appService.myPurchases().subscribe(data=>{
    console.log("my purchases", data);
    if(data['result']){
    this.myadd=data['result'];
  }
  for(var i=0;i<data['result'].length;i++){
    data['result'][i]['price'] = parseFloat(data['result'][i]['price']).toFixed(2);
    if(data['result'][i]['pictures'].length>0){
      for(var j=0;j<data['result'][i]['pictures'].length;j++){

        if(data['result'][i]['pictures'][j]){
          data['result'][i]['pictures'][j] = data['result'][i]['pictures'][j].replace(".mp4" , ".jpg");
       data['result'][i]['pictures'][j] = data['result'][i]['pictures'][j].replace(".mov" , ".jpg");
    }
}

}
  }
},err=>{
  if(err.status == 404){
    console.log("got error");
    this.router.navigate(['/account']);
    this.snackBar.open('No Purchases Yet', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    this.myadd = [];
  }
})
  }


  public offersbyme(){
    this.headings="OFFERS";
    this.headi=true;
    this.adds=true;
    this.acc=false;
    this.boost=false;
    this.disable=false;
    this.deactivate=false;
    this.msg=false;
    this.hist_but=false;
    this.offer_but=true;
    this.status_but=true;
    this.proceed=true;
    this.offer_create=true;
    this.pkr=false;
    this.off_pr=true;
    this.off_rc=false;
    this.favour_but=false;
    this.hid = false;
    this.status_but1=false;
    this.head_h=false;
    this.head_o=true;
    this.head_f=false;
    this.head_a=false;
    this.msg=false;
    this.chat=false;
    this.offer_view=false;


    this.appService.offersbyme().subscribe(data=>{
      console.log("offers by self =>", data);
      var off=[];
      if(data['result'].length>0){
        for(var k=0;k<data['result'].length;k++){
          if(data['result'][k]['advert_id'].length>0){
            console.log(data['result'][k]['advert_id']);
          }
          console.log(data['result'][k]['advert_id']);

          off[k]=data['result'][k]['advert_id'];
          off[k].status = data['result'][k].status;
          off[k].createdOffer = data['result'][k]['_id'];
          off[k].offered_price = parseFloat(data['result'][k].offered_price).toFixed(2);
          off[k].sail_id = data['result'][k].sail_id;


          if(k==data['result'].length-1){
            this.myadd=off;
            console.log(this.myadd);
          }
        }
      }else{
        this.myadd=[];
      }
      // this.myoffers=data['result'];
      // this.myoffersstatus=data['result']['status'];
      // this.sale=data['result']['sail_id'];
      // console.log(this.sale);
      sessionStorage.setItem("onsale",JSON.stringify(this.sale));
      for(var i=0;i<data['result'].length;i++){
        data['result'][i]['price'] = parseFloat(data['result'][i]['price']).toFixed(2);
      }
    })
  }

  public myaddsoffers(){
    this.status_but=false;
    this.proceed=false;
    this.offer_create=false;
    this.pkr=true;
    this.off_pr=false;
    this.off_rc=true;
    this.status_but1=false;


    var count = 0;
    this.appService.myaddsoffers().subscribe(data=>{
      var off=[];
      if(data['result'] ){
        console.log("offers on my =>", data);
        this.myadd=data['result'];
        for(var i=0;i<data['result'].length;i++){
          data['result'][i]['price'] = parseFloat(data['result'][i]['price']).toFixed(2);
          if(data['result'][i]['pictures'].length>0){
            for(var j=0;j<data['result'][i]['pictures'].length;j++){

              if(data['result'][i]['pictures'][j]){
                data['result'][i]['pictures'][j] = data['result'][i]['pictures'][j].replace(".mp4" , ".jpg");
             data['result'][i]['pictures'][j] = data['result'][i]['pictures'][j].replace(".mov" , ".jpg");
          }
    }

    }
        }
        for(var k=0;k<data['result'].length;k++){
if(data['result'][k]['offers'].length>0){
var stat = false;
for(var m=0;m<data['result'][k]['offers'].length;m++){
  console.log(data['result'][k]['offers'][m]['status'])
  if(data['result'][k]['offers'][m]['status']!='pending'){
    console.log(stat);
    stat = true;
  }else{
    console.log("else");
    if(m == data['result'][k]['offers'].length-1){
      if(stat){
        console.log("no")
      }else{
        console.log('yes')
        off[count] = data['result'][k];
        count = count+1;
      }
    }
  }

}
}
        }
        this.offerid=data['result']['offers'];
        console.log("ff",off);
        // this.myadd = off;
      }

    },err=>{
      // this.myadd=[];
      this.nooffers= ("Did Not Receive any offers Yet!");
      console.log("No offers exist");
    });
}

public openOfferDetails(mm){
  console.log("mm ",mm)
  this.status_but=false;
  this.proceed=false;
  this.offer_create=false;
  this.pkr=true;
  this.off_pr=false;
  this.off_rc=false;
  this.status_but1=true;
var offerFound = mm;
var myO = mm.offers;
for(var i=0;i<myO.length;i++){
myO[i]['title'] = mm.title;
myO[i]['price'] = mm.price;
myO[i]['description'] = mm.description;
myO[i]['pictures'] = mm.pictures;
myO[i]['storage'] = mm.storage;
myO[i]['color'] = mm.color;
// if(data['result'][i]['description'].length>30){
// data['result'][i]['description'] = data['result'][i]['description'].substring(0,30)+"...";
// }
// data['result'][i]['price'] = parseFloat(data['result'][i]['price']).toFixed(2);
myO[i]['price'] = parseFloat(myO[i].offered_price).toFixed(2);

  if(i==myO.length-1){
console.log("created : ",myO);
    this.myadd = myO;
  }
}
//
// var offeredResult = [];
// var offeredAd = mm;
// var offer = [];
// offer= offeredAd.offers;
//
// for(var i=0;i<offer.length;i++){
//   offeredResult[i] = offeredAd;
//   offeredResult[i].offer_id = offer[i]._id;
//   console.log(offer[i]._id)
//   offeredResult[i].username = offer[i].user_id.name;
//   offeredResult[i].price = offer[i].offered_price;
//   offeredResult[i].status = offer[i].status;
// console.log("at ofResult : ",offeredResult[i].offer_id,offer[i]._id);
//   if(i==offer.length-1){console.log("created for display :",offeredResult);
//
//     this.myadd = offeredResult;
//
//
//   }
//}

}
public favouriteadds(){
  this.headings="FAVOURITES";
  this.headi=true;
  this.acc=false;
  this.boost=false;
  this.disable=false;
  this.deactivate=false;
  this.msg=false;
  this.hist_but=false;
  this.offer_but=false;
  this.pkr=true;
  this.off_rc=false;
  this.off_pr=false;
  this.adds=true;
  this.favour_but=true;
  this.hid = false;
  this.status_but1=false;
  this.head_h=false;
  this.head_o=false;
  this.head_f=true;
  this.head_a=false;
  this.msg=false;
  this.chat=false;
  this.offer_view=false;



    this.appService.favouriteadds().subscribe(data=>{
      console.log("favourit adds =>", data);
      if(data['result'].length>0){
      this.myadd=data['result'];
      // this.advertid=data['result']['_id'];
    }else{
      this.myadd=[];
      this.noadds= ("Nothing Here For Now");
      console.log(this.noadds);
    }
    for(var i=0;i<data['result'].length;i++){
      if(data['result'][i]['description'].length>30){
      data['result'][i]['description'] = data['result'][i]['description'].substring(0,30)+"...";
    }
      data['result'][i]['price'] = parseFloat(data['result'][i]['price']).toFixed(2);
    }


    for(var i=0;i<data['result'].length;i++){
      if(data['result'][i]['pictures'].length>0){
        for(var j=0;j<data['result'][i]['pictures'].length;j++){

          if(data['result'][i]['pictures'][j]){
            data['result'][i]['pictures'][j] = data['result'][i]['pictures'][j].replace(".mp4" , ".jpg");
         data['result'][i]['pictures'][j] = data['result'][i]['pictures'][j].replace(".mov" , ".jpg");
      }
}

}

}


  },err=>{
    // if(err.status == 404){
    //   console.log("got error");``
    //   this.router.navigate(['/account']);
    //   this.snackBar.open('No Purchases Yet', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    //   this.myadd = [];
    // }

  })
}

public accept_reject(value){
  // console.log(value);
  var tick ="accepted";
  var acceptedoffer =value;
  console.log(acceptedoffer);
  var count=0;
  var sal=[];
  this.appService.accept(acceptedoffer,tick).subscribe(data=>{
    console.log("accept_reject adds =>", data);
    // this.sale=data['result']['sail']['seller_id'];
    this.sale_seller=data['sail']['_id'];
    console.log(this.sale_seller);
    this.myaddsoffers();
    // this.appService.getsale(this.sale_seller).subscribe(data=>{
    //   sessionStorage.setItem("sellersale", JSON.stringify(data['sail']));
    //   console.log("sellersale : ",JSON.parse(sessionStorage.getItem("sellersale")));
    //   console.log(data);
    // })
})
}


public accept_reject1(offerid){
  var cross ="rejected";
  this.appService.reject(offerid,cross).subscribe(data=>{
    console.log("accept_reject adds =>", data);
})
}
public status_seller(value){
var saleIdseller = value;
this.appService.getsale(saleIdseller).subscribe(data=>{
console.log(data);
sessionStorage.setItem("saleIdseller", JSON.stringify(data['sail']));
this.router.navigate(['/checkout']);

})

}
public afteraccepted(value){
this.sale= value;
console.log(this.sale);
sessionStorage.setItem("setsail", JSON.stringify(this.sale));
this.router.navigate(['/checkout']);
}

public addtofavourites(value){
  this.remove=false;
  this.advertid=value;
if(localStorage.getItem('jwt') != undefined && localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != '' ){
this.appService.removefavourites(this.advertid,this.remove).subscribe(data=>{
  console.log(data);
  this.favouriteadds();
})
}

}
public enabledisable(value){
  this.disid=value;
if(localStorage.getItem('jwt') != undefined && localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != '' ){
this.appService.enabledisable(this.disid).subscribe(data=>{
  console.log(data);
  if(data['result']['visible'] == false){
    this.snackBar.open('Ad Deactivated', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
  }
  else {
    this.snackBar.open('Ad Activated', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
  }
  this.showadds();
})
}
}

}
