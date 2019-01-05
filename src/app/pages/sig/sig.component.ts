import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import { AppService } from '../../app.service';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { WindowService } from '../../window.service';
import { Renderer2 } from '@angular/core';


@Component({
  selector: 'app-sig',
  templateUrl: './sig.component.html',
  styleUrls: ['./sig.component.scss']
})
export class SigComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  forgotForm: FormGroup;
  VerificationForm: FormGroup;
  NewNumForm: FormGroup;
  mismatch:any;
  jwt:any;
  userid:any;
  windowRef:any;
  phoneNumber: any;
  si :any;
  verificationCode: string;
  user: any;
  name:any;
  fp:any;
  su :any;

  country: string;
  area: string;
  prefix: string;
  line: string;
  public sendcode:any;
  public verifynsignup:any;
  public invalidformat:any;
  public verifyscreen:any;
  public numexist:any;
  public smsVerification:any;

  constructor(private win: WindowService,public formBuilder: FormBuilder, public router:Router, public snackBar: MatSnackBar,public services:AppService,public renderer:Renderer2) {
    this.renderer.setStyle(document.body, 'background-color', '#156dbf');
    this.si = true;
    this.fp = false;
    this.su = false;
    this.sendcode=true;
    this.verifynsignup=false;
    this.verifyscreen=false;
    this.numexist=false;
  }

  ngOnInit() {

    this.VerificationForm = this.formBuilder.group({
      'vcode': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.loginForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });
    this.forgotForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, emailValidator])]
    });
    this.NewNumForm = this.formBuilder.group({
      'mobile_number11': ['', Validators.required],
      'vcode11': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.registerForm = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'email1': ['', Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required],
      // 'user_name': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      // 'country_name': ['', Validators.required],
      'mobile_number': ['', Validators.required],
      // 'verificationCode':['', Validators.required]
    },{validator: matchingPasswords('password', 'confirmPassword')});

    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

    this.windowRef.recaptchaVerifier.render();

  }
  get e164() {
    const num = this.country + this.area + this.prefix + this.line
    return `+${num}`
  }

  public onLoginFormSubmit(values:Object):void {
    if (this.loginForm.valid) {
      //this.router.navigate(['/']);
      console.log("in signIn component");
      console.log(this.loginForm.value);
  this.services.login1(this.loginForm.value.email,this.loginForm.value.password).subscribe(data=>{
    console.log("Data => ",data)
    if(data['success'] ){
      localStorage.setItem('jwt',data['token']);
      localStorage.setItem('name',data['user']['name']);
      localStorage.setItem('currency',data['user']['currency']);
      localStorage.setItem('userid',data['user']['_id']);
      console.log(localStorage.getItem('jwt'))
      this.router.navigate(['/products']);
    }
  },err=>{
    this.mismatch="Email or Password Incorrect";
    console.log("password mismatch");
  });
    //  console.log("Data in services : ",x);
    }
  }
  public onforgotFormSubmit(values:Object):void {
    if (this.forgotForm.valid) {
      //this.router.navigate(['/']);
      console.log("in signIn component");
      console.log(this.forgotForm.value);
      }
  }

  public onRegisterFormSubmit(values:Object):void {
    if (this.registerForm.valid) {
      console.log("registering valid");
      console.log(this.registerForm.value);

      this.services.register1(this.registerForm.value.name,this.registerForm.value.email1, this.registerForm.value.password).subscribe(data=>{
        console.log("Data => ",data)
        localStorage.setItem('jwtr',data['token']);
      //  if(data['success'] ){
        // localStorage.setItem('jwt',data['token']);
        // console.log(localStorage.getItem('jwt'))

         if(data['user'] ){
           const appVerifier = this.windowRef.recaptchaVerifier;
           const num = this.registerForm.value.mobile_number;
           console.log(num);
           firebase.auth().signInWithPhoneNumber(num,appVerifier)
                   .then(result => {
                     console.log(result);
                       this.windowRef.confirmationResult = result;
                       if(result){
                         this.services.checkmobile(this.registerForm.value.mobile_number).subscribe((data3)=>{
                           console.log("check mbile", data3)
                             this.snackBar.open('Number Already Exists', '×', { panelClass: 'success', verticalPosition: 'top', duration: 5000 });
                             this.numexist=true;
                       },(err)=>{

                           this.snackBar.open('Verify Your Number to Proceed', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
                           this.verifyscreen=true;
                           this.su=false;
                       });

                       }
                   })
                   .catch( error =>{
                     this.invalidformat = "Invalid Format";
                     console.log(error); });

    }
      },err=>{
        // this.snackBar.open('Email Already Exists', '×', { panelClass: 'success', verticalPosition: 'top', duration: 5000 });

        console.log("something went wrong");
      });

    }
  }

  sendLoginCode(yourphone) {
    if (this.NewNumForm.valid) {
      this.services.checkmobile(this.NewNumForm.value.mobile_number11).subscribe((data3)=>{
        console.log("check mbile", data3)
          this.snackBar.open('Number Already Exists', '×', { panelClass: 'success', verticalPosition: 'top', duration: 5000 });
    },(err)=>{
        this.snackBar.open('Verify Your Number to Proceed', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.su=false;
        var appVerifier = this.windowRef.recaptchaVerifier;
        var num = this.NewNumForm.value.mobile_number11;
        var num = yourphone;
        console.log(num);
        firebase.auth().signInWithPhoneNumber(num,appVerifier)
                .then(result => {
                  console.log(result);
                    this.windowRef.confirmationResult = result;
                })
                .catch( error => console.log(error) );
    });

          }
  }

  verifyLoginCodeNewNum(values:Object):void {
    if (this.NewNumForm.valid) {
    this.windowRef.confirmationResult
                  .confirm(this.NewNumForm.value.vcode11)
                  .then( result => {
                    this.user = result.user;
                    this.verifyscreen=false;
                    this.su=false;
                    this.si=true;
                    this.snackBar.open('Account Registered! Please Login', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    })
    .catch( error =>{ console.log(error, "Incorrect code entered?")
  });
  }
  }

  verifyLoginCode(values:Object):void {
    if (this.VerificationForm.valid) {
      console.log(this.VerificationForm.value.vcode);
    this.windowRef.confirmationResult
                  .confirm(this.VerificationForm.value.vcode)

                  .then( result => {
                    console.log(this.VerificationForm.value.vcode);
                    this.smsVerification= true;
                    console.log(this.registerForm.value.mobile_number, this.smsVerification);
                    console.log(result);
                    this.user = result.user;
                    this.verifyscreen=false;
                    this.su=false;
                    this.si=true;
                    this.snackBar.open('Account Registered! Please Login', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
                    this.services.updateUserinregister(this.registerForm.value.mobile_number,this.smsVerification).subscribe(data=>{
                    console.log(data);
                    })

    })
    .catch( error => console.log(error, "Incorrect code entered?"));
    this.invalidformat = "Incorrect code entered";
  }
  }

  signup(){
    this.si = false;
    this.su = true;
    this.fp = false;
  }

  signin(){
    this.si = true;
    this.su = false;
    this.fp = false;
  }

  forgotPassword(){
    this.fp = true;
    this.su = false;
    this.si = false;
  }
  public adrouter(){
    this.router.navigate(['/products']);
  }


}
