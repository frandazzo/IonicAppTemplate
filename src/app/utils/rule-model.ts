interface RequestParams {
    [prop: string]: any;
}

export class RuleModel {
    path: string;
    method: HttpMethod;
    useDecoratorForResult = true;
    operation: (queryParams: RequestParams, pathParams: RequestParams, body: any, db: any[]) => any;
}

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

