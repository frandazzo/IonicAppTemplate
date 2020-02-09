import {Injectable} from '@angular/core';
import {FakeDbServiceService} from './fake-db-service.service';
import {environment} from '../../environments/environment';

import * as users from '../../assets/fakeBackend/users.json';
import {HttpMethod} from './rule-model';
import {OperationError} from './operation-error';


export function initializationFactory(fakeDbInitializer: FakeBackendInitializerService) {
  return (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      fakeDbInitializer.init();
      resolve();
    });
  };
}




@Injectable({
  providedIn: 'root'
})
export class FakeBackendInitializerService {

  constructor(private backendService: FakeDbServiceService) { }
  init() {
    console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF');
    // this.backendService.configure({
    //   serverPath: environment.serverUrl,
    //   resultDecorator: (r) => {
    //     if (r instanceof OperationError) {
    //       return {
    //         error: true,
    //         message: r.error,
    //         value: null
    //       };
    //     }
    //     return {
    //       error: null,
    //       message: null,
    //       value: r
    //     };
    //   }
    // });
    //
    // this.backendService.addEntityDb({
    //   entity: 'users',
    //   db: users,
    //   rules: [
    //     {
    //       method: HttpMethod.POST,
    //       path: 'auth/remotelogin',
    //       useDecoratorForResult: true,
    //       operation: (queryParams , pathParams , body, db ) => {
    //         const username = body.mail;
    //         const password = body.password;
    //
    //         const user = db.find(value => {
    //           return value.username === username && value.password === password;
    //         });
    //
    //         if (!user) {
    //           return null;
    //         }
    //
    //         return {
    //           username,
    //           name: 'Francesco Randazzo'
    //         };
    //
    //       }
    //     },
    //     {
    //       method: HttpMethod.GET,
    //       path: 'test',
    //       useDecoratorForResult: true,
    //       operation: (queryParams , pathParams , body, db ) => {
    //         return db;
    //       },
    //     },
    //     {
    //       method: HttpMethod.GET,
    //       path: 'test/:username',
    //       useDecoratorForResult: true,
    //       operation: (queryParams , pathParams , body, db ) => {
    //         return db[0];
    //       },
    //     }
    //   ]
    // });

  }
}
