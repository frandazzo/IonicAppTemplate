/* tslint:disable:no-trailing-whitespace */
import {FakeDb} from './fake-db';
import {path} from '@angular-devkit/core';

export interface RequestParams {
    [prop: string]: any;
}

export class RuleModel {
    constructor(private contextPath: string, private method: HttpMethod, public useDecoratorForResult = true,
                private readonly operation: (queryParams: RequestParams, pathParams: RequestParams, body: any, db: FakeDb) => any) {

        if (!operation) {
            switch (method) {
                case HttpMethod.GET:
                    this.operation = RuleModel.Get;
                    break;
                case HttpMethod.POST:
                    this.operation = RuleModel.Insert;
                    break;
                case HttpMethod.PUT:
                    this.operation = RuleModel.Update;
                    break;
                case HttpMethod.DELETE:
                    this.operation = RuleModel.Delete;
                    break;
                default:
                    throw new Error('http method not supported for fake backend!');
            }
        }

    }
    get operationToExecute() {
        return this.operation;
    }


    static Get(queryParams: RequestParams, pathParams: RequestParams, body: any, db: FakeDb): any {
        const pathKeyNumbers = Object.keys(pathParams).length;
        const queryKeyNumbers = Object.keys(queryParams).length;

        if (queryKeyNumbers === 0 && pathKeyNumbers === 0) {
            return db.findOne(pathParams);
        }

        if (pathKeyNumbers === 0) {
            return db.findMany(queryParams);
        }

        if (queryKeyNumbers === 0) {
            return db.findMany(pathParams);
        }

        const obj = Object.assign(pathParams, queryParams);
        return db.findMany(obj);
    }

    static Insert(queryParams: RequestParams, pathParams: RequestParams, body: any, db: FakeDb): any {
        return db.insert(body);
    }
    static Update(queryParams: RequestParams, pathParams: RequestParams, body: any, db: FakeDb): any {
        return db.update(pathParams, body);
    }

    static Delete(queryParams: RequestParams, pathParams: RequestParams, body: any, db: FakeDb): any {
        return db.delete(pathParams);
    }

    static toHttpMethod(method: string) {
        switch (method) {
            case 'POST': {
                return HttpMethod.POST;
            }
            case 'PUT': {
                return HttpMethod.PUT;
            }
            case 'GET': {
                return HttpMethod.GET;
            }
            case 'DELETE': {
                return HttpMethod.DELETE;
            }
            default: {
                throw new Error('http method not supported by fake db!');
            }
        }
    }

    isCompatibleWith(normalizedUrl: string, method: HttpMethod) {
        // adesso posso eseguire uno split della stringa sugli "/" in modo da suddividere il path
        // in elementi atomici confrontabili
        const splittedUrl = normalizedUrl.split('/');
        const splittedPath =  this.contextPath.split('/');
        if (method !== this.method) {
            return false;
        }
        if (splittedPath.length !== splittedUrl.length) {
            return false;
        }
        let matched = true;

        try {
            splittedPath.forEach((value, index) => {
                if (!value.startsWith(':')) {
                    // eseguo la verifica di uguaglianza solamente se non si tratta di path vriables
                    if (value !== splittedUrl[index]) {
                        matched = false;
                        throw new Error('match not found');
                    }
                }
            });
        } catch (e) {
            matched = false;
        }
        return matched;
    }

    findPathParams(url: string) {
        const splittedUrl = url.split('/');
        const splittedPath =  this.contextPath.split('/');
        const result = {};
        splittedPath.forEach((value, index) => {
            if (value.startsWith(':')) {
                const key = value.replace(':', '');
                const val = splittedUrl[index];
                result[key] = val;
            }
        });
        return result;
    }
}

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

