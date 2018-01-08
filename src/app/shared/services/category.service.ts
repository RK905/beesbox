import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class CategoryService {

    categories$;
    constructor(private db: AngularFireDatabase) {
        this.categories$ = this.db.list('/categories', query => query.orderByChild('name') ).valueChanges();
    }

    getAll() {
        return this.categories$;
    }
}