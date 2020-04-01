import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../data.service';

@Component({
  selector: 'app-testtab',
  templateUrl: './testtab.page.html',
  styleUrls: ['./testtab.page.scss'],
})
export class TesttabPage implements OnInit {
  private id: string;
  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      console.log('parent tab: ' + params.get('id'));
      this.dataService.setCurrentData(params.get('id'));
    });
  }

  ionViewWillEnter() {
  }

}
