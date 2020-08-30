import { Injectable } from '@angular/core';

export interface IStorageProvider {
    get(key: string): Promise<string>;
    set(key: string, value: string): boolean;
    clearKey(key: string): boolean;
    clear(): void;
}

@Injectable({
    providedIn: 'root'
})
export class StorageProvider implements IStorageProvider{
    constructor(private storage: Storage) {}

    clear(): void {
        this.storage.clear();
    }

    clearKey(key: string): boolean {
        this.storage.remove(key);
        return true;
    }


    async get(key: string): Promise<string> {
        let result;
        try {
            result = await this.storage.get(key);
        } catch (e) {
            throw e;
        }

        return result;
    }

    set(key: string, value: string): boolean {
        this.storage.set(key, value).then((onloadeddata) => {
            return true;
        }, () => {
        }).catch((error) => {
            return false;
        });

        return false;
    }

    setPromise(key: string, value: string) {
        return this.storage.set(key, value);
    }

}
