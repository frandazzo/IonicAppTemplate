import {Injectable} from '@angular/core';
import {FakeDbServiceService} from './utils/fake-db-service.service';
import {environment} from '../environments/environment';

import * as users from '../assets/fakeBackend/users.json';
import {HttpMethod, RuleModel} from './utils/rule-model';
import {OperationError} from './utils/operation-error';
import {EntityDb} from './utils/entity-db';
import {FakeDb} from './utils/fake-db';


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
    console.log('Inizializzazione fake db!!!');
    this.backendService.configure({
      serverPath: environment.serverUrl,
      resultDecorator: (r) => {
        if (r instanceof OperationError) {
          return {
            error: true,
            message: r.error,
            value: null
          };
        }
        return {
          error: false,
          message: null,
          value: r
        };
      }
    });

    this.backendService.addEntityDb(new EntityDb(
        'users',
        new FakeDb('users', true, false, (users as any).default),
        [
            new RuleModel('auth/remotelogin', HttpMethod.POST, true,
                (queryParams , pathParams , body, db) => {
                  const username = body.get('mail');
                  const password = body.get('password');
                  const req = {
                    username,
                    password
                  };
                  const user = db.findOne(req);

                  if (!user) {
                    throw new OperationError('Wrong credentials');
                  }

                  return {
                    token: '',
                    company: 'company',
                    mail: 'fg.randazzo@hotmail.it',
                    name: 'Francesco',
                    surname: 'Randazzo',
                    role: 'Admin',
                    username
                  };
                })
        ]));
  }
}
