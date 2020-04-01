import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {
    this.currenData$ = this.currentDataSubject.asObservable();
  }
  currentDataSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  currenData$: Observable<string>;
  setCurrentData(data: string) {
    this.currentDataSubject.next(data);
  }
}
