import * as mimeTypes from '../../assets/mimes/db.json';

export class MimeSearcher {
     mimes: any;
    constructor() {
        this.mimes = (mimeTypes as any).default;
    }
    lookup(path: string): string {
        let result = null;
        for (const elem in this.mimes) {
            if (this.mimes[elem]) {
                const ext = this.mimes[elem].extensions;
                if (ext) {
                    const extensions = ext as string[];
                    for (const extension of extensions) {
                        if (path.endsWith(extension)) {
                            result = elem;
                            break;
                        }
                    }
                    if (result) {
                        break;
                    }
                }
            }
        }
        return result;
    }
}
