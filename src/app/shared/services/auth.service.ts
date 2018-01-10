import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from './user.service';
import { AppUser } from '../models/app-user.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import * as firebase from 'firebase';


@Injectable()
export class AuthService {

    user$: Observable<firebase.User>;

    constructor(private userService: UserService, private afAuth: AngularFireAuth) {
        this.user$ = afAuth.authState;
    }

    loginGoogle() {
        let googleAuth = new firebase.auth.GoogleAuthProvider();
        return this.afAuth.auth.signInWithPopup(googleAuth);
    }

    loginEmail(email:string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }

    logout() {
        return this.afAuth.auth.signOut();
    }

    register(email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    }

    get appUser$(): Observable<AppUser> {
        return this.user$
            .switchMap((user) => {
                if (user) {
                    return this.userService.getUser(user.uid).valueChanges();
                } else {
                    return Observable.of(null);
                }
            });
    }
}