import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Data, AppService } from '../../app.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen:boolean = true;
  // public links = [
  //   { name: 'Account Dashboard', href: 'dashboard', icon: 'dashboard' },
  //   { name: 'Account Information', href: 'information', icon: 'info' },
  //   { name: 'Addresses', href: 'addresses', icon: 'location_on' },
  //   { name: 'Order History', href: 'orders', icon: 'add_shopping_cart' },
  //   { name: 'Logout', href: '/sign-in', icon: 'power_settings_new' },
  // ];
  public myadd:any[];
  public myad_id:any[];
  public mytitle:any[];
  public myprice:any[];


  constructor(public router:Router,public appService:AppService) { }

  ngOnInit() {
    this.showadds();

    if(window.innerWidth < 960){
      this.sidenavOpen = false;
    };
  }

  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
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

  public showadds(){
    console.log("before service request");
    this.appService.myadds().subscribe(data=>{
    console.log("my adds", data);
    this.myadd=data['result'];
    this.myad_id=data['result']['_id'];
    this.mytitle=data['result']['title'];
    this.myprice=data['result']['price'];
  })
  }



}
