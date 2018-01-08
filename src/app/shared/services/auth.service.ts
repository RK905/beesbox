import { Injectable } from '@angular/core';

import { AppUser } from '../models/app-user.model';
import { AngularFireObject } from 'angularfire2/database';
import { UserService } from './user.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class AuthService {

    user$: Observable<firebase.User>;

    constructor(private userService: UserService, private afAuth: AngularFireAuth) {
        this.user$ = afAuth.authState;
    }

    loginGoogle() {
        let googleAuth = new firebase.auth.GoogleAuthProvider();
        this.afAuth.auth.signInWithPopup(googleAuth);
    }

    loginEmail(email:string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    /*get appUser$(): Observable<AppUser> {
        return this.user$  
            .switchMap((user: firebase.User) => {
                if (user) return this.userService.getUser(user.uid);

                return Observable.of(null);
            });
    }*/
}