import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {UserModel} from './user.model';
import {HttpClient} from '@angular/common/http';
import {catchError, map, take, tap} from 'rxjs/operators';

import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedUserSubject  = new BehaviorSubject<UserModel>(null);

  get loggedUser(): Observable<UserModel> {
    return this.loggedUserSubject.asObservable();
  }
  constructor(private http: HttpClient) { }

  get IsAuthenticated() {
    return this.loggedUser.pipe(
        map(data => !!data)
    );
  }



  logout() {
    this.loggedUserSubject.next(null);
  }

  login(mail: string, password: string) {
    const formData = new FormData();
    formData.append('mail', mail );
    formData.append('password', password);
    return this.http.post<any>(environment.serverUrl + 'auth/remotelogin', formData).pipe(
        map(data => {
          const error = data.error;
          if (error === false) {
            return data.value;
          }

          throw new Error(data.message);
        }),
        tap(data => {
            const l: UserModel = data;
            this.loggedUserSubject.next(l);
        })
    );

  }
}
