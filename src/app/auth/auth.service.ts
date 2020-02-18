import { Injectable } from '@angular/core';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {UserModel} from './user.model';
import {HttpClient} from '@angular/common/http';
import { map,  tap} from 'rxjs/operators';
import { Plugins } from '@capacitor/core';

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

    autoLogin(): Observable<boolean> {
      return from(Plugins.Storage.get({key: 'loggedUserData'})).pipe(
          map(dataToString => {
              if (dataToString && dataToString.value) {
                return JSON.parse(dataToString.value);
              }
              this.clearLoggedUserDataOnLocalBrowser();
              return null;
          }),
          tap((user: UserModel) => {
              if (!user) {
                  this.clearLoggedUserDataOnLocalBrowser();
              }
              this.loggedUserSubject.next(user);
          }),
          map((userModel: UserModel) => {
              return !!userModel;
          }));
    }

  logout() {
    this.loggedUserSubject.next(null);
    this.clearLoggedUserDataOnLocalBrowser();
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
          this.clearLoggedUserDataOnLocalBrowser();
          throw new Error(data.message);
        }),
        tap(data => {
            const l: UserModel = data;
            this.loggedUserSubject.next(l);
            this.registerLoggedUserDataOnLocalBrowser(l);
        })
    );
  }

  private registerLoggedUserDataOnLocalBrowser(userData: UserModel) {
        Plugins.Storage.set({key: 'loggedUserData', value: JSON.stringify(userData)});
  }
  private clearLoggedUserDataOnLocalBrowser() {
      Plugins.Storage.clear();
  }

}
