import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {AuthService} from './auth.service';
import {map, switchMap, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted httpCall to put token');

    return this.authService.loggedUser.pipe(
     take(1),
     map(loggedUser => {
       if (loggedUser) {
         return loggedUser.token;
       }
       return null;
     }),
     switchMap(token => {
       if (!token) {
         return next.handle(req);
       }
       const request = req.clone({
         setHeaders: {
           TOKEN: token
         }
       });
       return next.handle(request);
     })
   );

   // return next.handle(req);
  }
}
