import {HttpMethod, RuleModel} from './rule-model';
import {HttpRequest} from '@angular/common/http';
import {FakeDb} from './fake-db';

export class EntityDb {

    constructor(private entity: string,
                private db: FakeDb =
                    new FakeDb(entity, true, false, []),
                private rules: RuleModel[] = []
                ) {
    }
    get entityToStore() {
        return this.entity;
    }
    get store() {
        return this.db;
    }
    private normalizeUrl(url: string) {
        // questa funzione rimuove una eventuale query string!
        const index = url.indexOf('?');
        if (index === -1) {
            // nessuna query string trovata
            return url;
        }

        // deco rimuovere la query string
        return url.split('?')[0];
    }
    tryMatchPath(url: string, method: HttpMethod) {
        const normalizedUrl = this.normalizeUrl(url);
        let found = false;
        for (const rule of this.rules) {
            if (rule.isCompatibleWith(normalizedUrl, method)) {
                found = true;
                break;
            }
        }
        return found;
    }
    retrieveCompatibleRule(url: string, method: HttpMethod) {
        const normalizedUrl = this.normalizeUrl(url);
        let m: RuleModel = null;
        for (const rule of this.rules) {
            if (rule.isCompatibleWith(normalizedUrl, method)) {
                m = rule;
                break;
            }
        }
        return m;
    }
}

