import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AthenticationService
{
  domain = "https://celx-dev.herokuapp.com";
  authToken;
  user;
  options;
  result:any;

  constructor(private http: Http) {}

  createAuthenticationHeaders()
  {
    this.loadToken();
    this.options = new RequestOptions(
    {
      headers: new Headers({'Content-Type': 'application/json','authorization': this.authToken})
    });
  }

  loadToken()
  {
    this.authToken = localStorage.getItem('token');
  }

checkFunction(){
  console.log("found");
}

  login()
  {
    console.log("in login");
    return this.http.post(this.domain + '/authenticate', {email:"mohsin1111@gmail.com",password:"qwertyui"}).map(res => res.json());
  }


}
