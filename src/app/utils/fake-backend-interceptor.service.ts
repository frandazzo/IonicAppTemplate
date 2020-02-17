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

    return next.handle(req);
  }
}
