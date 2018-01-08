import { Injectable } from '@angular/core';

import { AppUser } from '../models/app-user.model';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';


@Injectable()
export class UserService {

    constructor(private db: AngularFireDatabase) {
    }

    saveUser(user: firebase.User) {
        this.db.object('/users/' + user.uid).update({
            name: user.displayName,
            email: user.email
        });
    }

    getUser(uid: string): AngularFireObject<AppUser> {
        return this.db.object('/users/' + uid);
    }
}