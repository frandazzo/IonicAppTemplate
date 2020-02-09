import { Injectable } from '@angular/core';
import {RuleModel} from './rule-model';
import {DictionaryItem} from './dictionary';
import {EntityDb} from './entity-db';


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
        const key = entityDb.entity;
        this.entities.push(key);
        this.dictionary[key] = entityDb;
    }
    tryMatchPath(url: string, requestMethod: string)  {
    }
}
