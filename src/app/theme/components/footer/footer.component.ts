import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public lat: number = 33.6957;
  public lng: number = -73.0113;
  public zoom: number = 12;

  constructor() { }

  ngOnInit() { }

  subscribe(){ }

}
