import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from './auth.service';
import {map, switchMap, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.IsAuthenticated.pipe(
        take(1),
        map(auth => {
          if (auth === true) {
            return true;
          }
          this.router.navigateByUrl('/auth');
          return false;
        })
    );

    // if (!this.authService.IsAuthenticated) {
    //     //   this.router.navigateByUrl('/auth');
    //     // }
    //     // return this.authService.IsAuthenticated;
    //      return true;
  }
}
