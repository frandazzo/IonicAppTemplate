import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../data.service';

@Component({
  selector: 'app-t2',
  templateUrl: './t2.page.html',
  styleUrls: ['./t2.page.scss'],
})
export class T2Page implements OnInit {

  private sub: Subscription;

  constructor(private  activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
   this.activatedRoute.paramMap.subscribe(a => console.log('from t2 page: ' + a.get('id')));
  }



}
