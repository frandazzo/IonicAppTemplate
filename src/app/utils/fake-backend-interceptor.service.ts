import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {FakeDbServiceService} from './fake-db-service.service';

@Injectable({
  providedIn: 'root'
})
export class FakeBackendInterceptorService implements HttpInterceptor{

  constructor(private fakeDb: FakeDbServiceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted httpCall' + req.url);

    if (this.fakeDb.tryMatchPath(req)) {
      const result = this.fakeDb.executeRequestOnFakeDb(req);
      return of(new HttpResponse({ status: 200, body: result }));
    }
    // for (const element of this.fakeDb.urls) {
    //   if (req.url.indexOf(element) > -1) {
    //     console.log('Loaded from fake db : ' + element);
    //     return of(new HttpResponse({ status: 200, body: ((this.fakeDb) as any).default }));
    //   }
    // }


    return next.handle(req);
  }
}
