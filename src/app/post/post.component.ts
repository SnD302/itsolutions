import { Component, OnInit } from '@angular/core';
// import { SharedModule } from '../../shared/shared.module';
import { FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(public router:Router, public formBuilder: FormBuilder) { }

  ngOnInit() {
  }

}
