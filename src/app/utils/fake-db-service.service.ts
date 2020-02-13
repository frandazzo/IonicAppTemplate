import { Injectable } from '@angular/core';
import {RequestParams, RuleModel} from './rule-model';
import {DictionaryItem} from './dictionary';
import {EntityDb} from './entity-db';
import {HttpRequest} from '@angular/common/http';


export interface FakeDbServiceServiceConfiguration {
    serverPath: string;
    resultDecorator: (result: any) => any;
}

@Injectable({
  providedIn: 'root'
})
export class FakeDbServiceService {
    // lista delle entità ordinate per consentire la ricerca di un path tra le rules di ogni entita
    private  entities: string[] = [];
    // dictionary che contiene la lista delle associazioni traa una entita il il suo db
    private  dictionary: DictionaryItem<string, EntityDb>[] = [];
    private serverPath = 'localhost:8080/';
    // nessuna azione di decorazione!!! viene restituito l'input
    private resultDecorator: (result: any) => any = (r) => r;
    constructor() {}
    configure(config: FakeDbServiceServiceConfiguration) {
        this.serverPath = config.serverPath;
        this.resultDecorator = config.resultDecorator;
    }

    addEntityDb(entityDb: EntityDb) {
        const key = entityDb.entityToStore;
        this.entities.push(key);
        this.dictionary[key] = entityDb;
    }
    private removeServerInfoFromUrl(url: string) {
        return url.replace(this.serverPath, '');
    }

    tryMatchPath(req: HttpRequest<any>)  {
        let matched = false;
        const url = this.removeServerInfoFromUrl(req.url);
        // ciclo ordinatamenten per ogni entita
        for (const entity of this.entities) {
            const entityDb: EntityDb = this.dictionary[entity];
            if (entityDb.tryMatchPath(url, RuleModel.toHttpMethod(req.method))) {
                matched = true;
                break;
            }
        }
        return matched;
    }
    executeRequestOnFakeDb(req: HttpRequest<any>) {
        const env: any = this.retrieveComaptibleExecutionEnvironment(req);
        if (!env) {
            throw new Error('No environment model found');
        }
        // devo adesso recuperare tutti gli input
        const body = req.body;
        const reqParams: RequestParams = this.findRequestParams(this.retrieveQueryString(req.url));
        const pathParams: RequestParams = (env.rule as RuleModel).findPathParams(this.removeServerInfoFromUrl(req.url));
        // calcolo il risultato richiedendolo all'operazione da eseguire sullaregole
        const a = (env.entityDb as EntityDb);
        const r = (env.rule as RuleModel);
        let result = null;
        try {
            result = r.operationToExecute(reqParams, pathParams, body, a.store);
        } catch (error) {
            result = error;
        }
        if (!r.useDecoratorForResult) {
            return result;
        }
        if (this.resultDecorator) {
            return this.resultDecorator(result);
        }
        return result;
    }

    private findRequestParams(url: string) {
        if (!url) {
            return {};
        }
        const result = {};
        const params = url.split('&');
        for (const elem of params) {
            const query = elem.split('=');
            if (query.length === 2) {
                result[query[0]] = query[1];
            }
        }
        return result;
    }
    private retrieveComaptibleExecutionEnvironment(req: HttpRequest<any>) {
        const url = this.removeServerInfoFromUrl(req.url);
        const rule: any = {};
        for (const entity of this.entities) {
            const entityDb: EntityDb = this.dictionary[entity];
            const r = entityDb.retrieveCompatibleRule(url, RuleModel.toHttpMethod(req.method)) ;
            if (r) {
                rule.rule = r;
                rule.entityDb = entityDb;
                break;
            }
        }
        return rule ;
    }

    private retrieveQueryString(url: string) {
        const normalized = this.removeServerInfoFromUrl(url);
        const a = normalized.split('?');
        if (a.length > 1) {
            return a[1];
        }
        return '';
    }
}
