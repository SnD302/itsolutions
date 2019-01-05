import { Component, OnInit } from '@angular/core';
import { Data, AppService } from '../../../app.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html'
})
export class TopMenuComponent implements OnInit {
  public currencies = ['USD', 'EUR'];
  public currency:any;
  public name:any;
  public profilePicture:any
  public flags = [
    { name:'English', image: 'assets/images/flags/gb.svg' },
    { name:'German', image: 'assets/images/flags/de.svg' },
    { name:'French', image: 'assets/images/flags/fr.svg' },
    { name:'Russian', image: 'assets/images/flags/ru.svg' },
    { name:'Turkish', image: 'assets/images/flags/tr.svg' }
  ]
  public flag:any;

  constructor(public appService:AppService,public router:Router) { }

  ngOnInit() {
    this.currency = this.currencies[0];
    this.flag = this.flags[0];
    this.name= localStorage.getItem('name');
    this.showuser();
  }


  public changeCurrency(currency){
    this.currency = currency;
  }

  public changeLang(flag){
    this.flag = flag;
  }

  public showuser(){
    this.appService.getUserDetails().subscribe(data=>{
      // console.log(data);
      this.profilePicture=data['result']['profilePicture'];
    })
  }

  public sign_out(){
    localStorage.removeItem('jwt');
    localStorage.removeItem('userid');
    localStorage.removeItem('name');
    localStorage.removeItem('currency');
    localStorage.clear();
    this.router.navigate(['/sign-in']);
  }
  public adrouter(){
    if(localStorage.getItem('jwt') != undefined && localStorage.getItem('jwt') != null && localStorage.getItem('jwt') != '' ){
    this.router.navigate(['/account']);
  }
  else{
    this.router.navigate(['/sign-in']);
  }
  }

}
