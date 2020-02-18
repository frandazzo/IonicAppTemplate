import { Injectable } from '@angular/core';
import {CanLoad, Route, Router, UrlSegment } from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from './auth.service';
import {map, switchMap, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlreadyLoggedGuardGuard implements  CanLoad {
  constructor(private authService: AuthService, private router: Router) {
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.IsAuthenticated.pipe(
        take(1),
        switchMap(auth => {
          if (auth) {
            return of(auth);
          }
          return this.authService.autoLogin();
        }),
        map(auth => {
          if (auth === true) {
            return false;
          }
          return true;
        }),
        tap(proceedToAuthPage => {
          if (!proceedToAuthPage) {
            this.router.navigateByUrl('/');
          }
        })
    );
  }
}
