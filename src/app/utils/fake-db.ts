import {RequestParams} from './rule-model';

export class FakeDb {
    constructor(private name: string,
                private inMemory: boolean,
                private initLocalStorageDbAtStartupIfEmpty: boolean,
                private startupDb: any[] = []) {
        if (!this.inMemory) {
            if (!this.name) {
                throw new Error('Nome tabella mancante in fake db per un db non in memory');
            }
            if (this.initLocalStorageDbAtStartupIfEmpty) {
                // devo impostare il database presente nel local storage con quanto espresso
                // in startupDb
                this.setLocalStorageDb(this.startupDb);
            }
        }

    }

    private setLocalStorageDb(db: any[]) {
        if (!Array.isArray(db)) {
            this.startupDb = [];
        }
        localStorage.setItem(this.name, JSON.stringify(db));
    }

    findOne(params: RequestParams) {
        const db: any[] = this.getDb();
        const result = this.findElement(params, db);
        if (result) {
            return {...result};
        }
        return null;
    }

    private findElement(params: RequestParams,  db: any[] ) {
        let result = null;
        for (const elem of db) {
            let valid = false;
            for (const prop in params) {
                if (params[prop] === elem[prop]) {
                    valid = true;
                } else {
                    valid = false;
                    break;
                }
            }
            if (valid) {
                result = elem;
                break;
            }
        }
        return result;
    }

    private getNewId() {
        return Math.floor(Math.random() * 10000);
    }

    insert(object: any) {
        const db: any[] = this.getDb();

        const obj = {...object};
        obj.id = this.getNewId();
        db.push(obj);
        if (!this.inMemory) {
            this.setLocalStorageDb(db);
        }
        return {...obj};
    }

    update(params: RequestParams, object: any) {
        const db: any[] = this.getDb();
        const result = this.findElement(params, db);
        for (const prop in result) {
            if (object[prop]) {
                result[prop] = object[prop];
            }
        }
        if (!this.inMemory) {
            this.setLocalStorageDb(db);
        }
    }

    delete(params: RequestParams) {
        const db: any[] = this.getDb();
        let i = -1;
        for (const elem of db) {
            i++;
            let valid = true;
            for (const prop in params) {
                if (params[prop] === elem[prop]) {
                    valid = false;
                    break;
                }
            }
            if (valid) {
                db.splice(i, 1);
                break;
            }
        }
        if (!this.inMemory) {
            this.setLocalStorageDb(db);
        }
    }

    findMany(params: RequestParams) {
        const db: any[] = this.getDb();
        const result = [];
        for (const elem of db) {
            let valid = true;
            for (const prop in params) {
                if (params[prop] === elem[prop]) {
                    valid = false;
                    break;
                }
            }
            if (valid) {
                result.push(elem);
            }
        }
        return [...result];
    }

    private getDb() {
        if (this.inMemory) {
            return this.startupDb;
        } else {
            let localStorageData = localStorage.getItem(this.name);
            if (!localStorageData) {
                localStorageData = '[]';
            }
            return JSON.parse(localStorageData);
        }
    }
}
