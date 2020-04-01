import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../data.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-t1',
  templateUrl: './t1.page.html',
  styleUrls: ['./t1.page.scss'],
})
export class T1Page implements OnInit, OnDestroy {

  private sub: Subscription;
  constructor(private  activatedRoute: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.sub = this.dataService.currenData$.subscribe( a => console.log(a));
    console.log(this.activatedRoute.snapshot.url);
  }

 ngOnDestroy() {
    this.sub.unsubscribe();
 }

}
