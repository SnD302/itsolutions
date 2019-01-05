import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { Data, AppService } from '../../app.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('horizontalStepper') horizontalStepper: MatStepper;
  @ViewChild('verticalStepper') verticalStepper: MatStepper;
  billingForm: FormGroup;
  deliveryForm: FormGroup;
  paymentForm: FormGroup;
  addcardForm: FormGroup;
  countries = [];
  months = [];
  years = [];
  deliveryMethods = [];
  grandTotal = 0;
  public saleid:any[];
  public sellersaleid:any[];
  public sailstatus:any[];
  public departsail:any[];
  public adverts:any[];
  public card_id:any[];
  public cards:any[];
  public status:any[];
  public curr_lowercase:any[];
  public final:any[];
  public confirmstatus:string;
  public billing:any;
  public newcard:any;
  public payment:any;
  public deliver:any;
  public confirm:any;
  public buyer:any;
  public seller:any;
  public receive:any;
  constructor(public appService:AppService, public formBuilder: FormBuilder,public snackBar: MatSnackBar) {
    this.billing =false;
    this.newcard =false;
    this.payment =false;
    this.deliver =false;
    this.confirm =false;
    this.buyer =false;
    this.seller =false;
    this.receive=false;

   }

  ngOnInit() {

    //this.add_card();
    this.retreiveCustomerCards();
    this.appService.Data.cartList.forEach(product=>{
      this.grandTotal += product.newPrice;
    });
    this.countries = this.appService.getCountries();
    this.months = this.appService.getMonths();
    this.years = this.appService.getYears();
    this.deliveryMethods = this.appService.getDeliveryMethods();
    this.billingForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: '',
      company: '',
      email: ['', Validators.required],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      state: '',
      zip: ['', Validators.required],
      address: ['', Validators.required]
    });
    this.addcardForm = this.formBuilder.group({
      Country:['', Validators.required],
      cardNumber:['', Validators.compose([Validators.required, Validators.minLength(16)])],
      addresscountry: ['', Validators.required],
      addresszip: ['', Validators.required],
      ExpiryMonth: ['', Validators.required],
      ExpiryYear: ['', Validators.required],
      csv:['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });
    this.deliveryForm = this.formBuilder.group({
      // deliveryMethod: [this.deliveryMethods[0], Validators.required],
      senderName: ['', Validators.required],
      courier: ['', Validators.required],
      track: ['', Validators.required],
    });
    this.paymentForm = this.formBuilder.group({
      Amount: ['', Validators.required],
      // adv_id: ['', Validators.required],
      Card: ['', Validators.required],
      expiredMonth: ['', Validators.required],
      expiredYear: ['', Validators.required],
      currency: ['', Validators.required]
    });

    this.saleid=JSON.parse(sessionStorage.getItem("setsail")); //buyer
    this.sellersaleid=JSON.parse(sessionStorage.getItem("saleIdseller")); // seller
    this.sale();
    this.getsaleseller();
    this.retreiveCustomerCards();
    // console.log(this.advert_id);
  }
  ngOnDestroy(){
    sessionStorage.removeItem('setsail');
    sessionStorage.removeItem('saleIdseller');
  }
  public placeOrder(){
    this.horizontalStepper._steps.forEach(step => step.editable = false);
    this.verticalStepper._steps.forEach(step => step.editable = false);
    this.appService.Data.cartList.length = 0;
  }
  public showcard(){
    this.newcard =true;
    this.payment=false;
  }
  // public add_card(){
  //   this.appService.add_card().subscribe(data=>{
  //     console.log("add cards=>", data);
  //     //this.myfavourite=data['result'];
  // })
  // }
  // public retreiveCustomerCards(){
  //   this.appService.retreiveCustomerCards().subscribe(data=>{
  //     console.log("existing cards=>", data);
  //     //this.myfavourite=data['result'];
  // })
  // }

  public sale(){
    var adv=[];
    // var adv._id=[];
    // this.sellersaleid=[];
    this.appService.getsale(this.saleid).subscribe(data=>{
      this.sailstatus=data['sail'];
      this.status=data['sail']['status'];
      adv=data['sail'];
    //  console.log(data.length);

    //  for (var i=0; i<data.length; i++){
        this.adverts=data['sail']['advert_id']['_id'];
    //  }
    if(data['sail']['status'] === "address pending"){
      console.log("address pending");
      this.billing=true;
    } else if(data['sail']['status'] === "payment pending"){
      console.log("payment pending");
      this.payment=true;
    }else if(data['sail']['status'] === "departer pending"){
      this.buyer=true;
    }
    else if(data['sail']['status'] === "departed"){
      this.confirm=true;
    }
    else if(data['sail']['status'] === "received"){
      this.receive=true;
    }
      console.log(this.adverts);
      console.log(this.sailstatus);
      console.log("in sale", data);
    })
  }
  public getsaleseller(){
    // this.saleid=[];
    this.appService.getsaleseller(this.sellersaleid).subscribe(data=>{
      console.log("seller sale",data);
      if(data['sail']['status'] === "address pending"){
        console.log("address pending");
        this.seller=true;
      } else if(data['sail']['status'] === "payment pending"){
        console.log("payment pending");
        this.seller=true;
      }
      else if(data['sail']['status'] === "departer pending"){
        this.deliver=true;
      }
      else if(data['sail']['status'] === "received"){
        this.receive=true;
      }
    })

  }

  public enteraddress(){
    console.log(this.billingForm.value.address);
    if (this.billingForm.valid){
    this.appService.enteraddress(this.saleid,this.billingForm.value.address).subscribe(data=>{
      console.log(data);
      if(data['sail'] ){
      this.snackBar.open('Address added successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      this.billing=false;
      this.payment=true;
    }
  },err=>{
    this.snackBar.open('Invalid Cardentials!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    })
    }
}


public add_card(values:Object):void{
  if (this.addcardForm.valid) {
  this.appService.add_card(this.addcardForm.value.ExpiryMonth,this.addcardForm.value.ExpiryYear,this.addcardForm.value.Country,this.addcardForm.value.addresscountry,this.addcardForm.value.addresszip,this.addcardForm.value.cardNumber,this.addcardForm.value.csv).subscribe(data=>{
      console.log("Data => ",data)
      if(data['Card'] ){
      this.snackBar.open('Card created successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      this.newcard=false;
      this.payment=true;
      this.makepayment(values);
    }
  },err=>{
    this.snackBar.open('Invalid Cardentials!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
})
}
}

public retreiveCustomerCards(){
  this.appService.retreiveCustomerCards().subscribe(data=>{
    console.log("User Card ",data)
    this.cards=data['result'];
    console.log(this.cards);

  })
}
public makepayment(values:Object):void{
  this.curr_lowercase=this.paymentForm.value.currency.toLowerCase();
  console.log(this.adverts,this.paymentForm.value.Amount,this.curr_lowercase,this.paymentForm.value.Card);
  if (this.paymentForm.valid){
    this.appService.makePaymentWithCard(this.adverts,this.paymentForm.value.Amount,this.curr_lowercase,this.paymentForm.value.Card).subscribe(data=>{
      console.log(data);
      this.final=data['final'];
      if(data['final'] ){
      this.snackBar.open('Payment made!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      this.payment=false;
      this.buyer=true;
    }
  },err=>{
      this.snackBar.open('Invalid Cardentials!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    })
  }
}

public entercourier(values:Object):void{
  if (this.deliveryForm.valid){
    this.appService.addcourierinfo(this.sellersaleid,this.deliveryForm.value.courier,this.deliveryForm.value.track).subscribe(data=>{
      console.log(data);
      this.departsail=data['sail'];
      if(data['sail'] ){
      this.snackBar.open('Courier details sent!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      this.deliver=false;
    }
  },err=>{
    this.snackBar.open('Invalid Cardentials!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    })
  }
}

public confirmdelivery(){
  this.confirmstatus="received";
  this.appService.confirmdelivery(this.saleid,this.confirmstatus).subscribe(data=>{
    console.log(data);
  })
}
}
