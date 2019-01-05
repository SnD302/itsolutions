import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import { AppService } from '../../app.service';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { WindowService } from '../../window.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  mismatch:any;
  jwt:any;
  userid:any;
  windowRef:any;
  phoneNumber: any;
  verificationCode: string;
  user: any;
  name:any;

  constructor(private win: WindowService,public formBuilder: FormBuilder, public router:Router, public snackBar: MatSnackBar,public services:AppService) { }

  ngOnInit() {
    //
    // this.loginForm = this.formBuilder.group({
    //   'email': ['', Validators.compose([Validators.required, emailValidator])],
    //   'password': ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    // });
    //
    // this.registerForm = this.formBuilder.group({
    //   'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    //   'email1': ['', Validators.compose([Validators.required, emailValidator])],
    //   'password': ['', Validators.required],
    //   'confirmPassword': ['', Validators.required],
    //   'user_name': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    //   'country_name': ['', Validators.required],
    //   'mobile_number': ['', Validators.required],
    //   'verificationCode':['', Validators.required]
    // },{validator: matchingPasswords('password', 'confirmPassword')});
    //
    // this.windowRef = this.win.windowRef;
    // this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    //
    // this.windowRef.recaptchaVerifier.render();

  }

  // public onLoginFormSubmit(values:Object):void {
  //   if (this.loginForm.valid) {
  //     //this.router.navigate(['/']);
  //     console.log("in signIn component");
  //     console.log(this.loginForm.value);
  // this.services.login1(this.loginForm.value.email,this.loginForm.value.password).subscribe(data=>{
  //   console.log("Data => ",data)
  //   if(data['success'] ){
  //     localStorage.setItem('jwt',data['token']);
  //     localStorage.setItem('name',data['user']['name']);
  //     localStorage.setItem('userid',data['user']['_id']);
  //     console.log(localStorage.getItem('jwt'))
  //     this.router.navigate(['/products']);
  //   }
  // },err=>{
  //   this.mismatch="Email or Password Incorrect";
  //   console.log("password mismatch");
  // });
  //   //  console.log("Data in services : ",x);
  //   }
  // }
  //
  // public onRegisterFormSubmit(values:Object):void {
  //   if (this.registerForm.valid) {
  //     console.log("registering valid");
  //     console.log(this.registerForm.value);
  //     this.services.register1(this.registerForm.value.name,this.registerForm.value.email1,this.registerForm.value.password,this.registerForm.value.user_name,this.registerForm.value.country_name,this.registerForm.value.mobile_number).subscribe(data=>{
  //       console.log("Data => ",data)
  //     //  if(data['success'] ){
  //       localStorage.setItem('jwt',data['token']);
  //       console.log(localStorage.getItem('jwt'))
  //       this.snackBar.open('You registered successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
  //       this.router.navigate(['/products']);
  //     //  }
  //     },err=>{
  //       this.snackBar.open('Email Already Exists', '×', { panelClass: 'success', verticalPosition: 'top', duration: 5000 });
  //
  //       console.log("something went wrong");
  //     });
  //
  //   }
  // }
  //
  // forgotpassword(){
  //
  // }
  //
  // sendLoginCode() {
  //   const appVerifier = this.windowRef.recaptchaVerifier;
  //   const num = this.registerForm.value.mobile_number;
  //   firebase.auth().signInWithPhoneNumber(num,appVerifier)
  //           .then(result => {
  //             console.log(result);
  //               this.windowRef.confirmationResult = result;
  //           })
  //           .catch( error => console.log(error) );
  // }
  //
  // verifyLoginCode() {
  //   this.windowRef.confirmationResult
  //                 .confirm(this.verificationCode)
  //                 .then( result => {
  //                   this.user = result.user;
  //   })
  //   .catch( error => console.log(error, "Incorrect code entered?"));
  // }



}
