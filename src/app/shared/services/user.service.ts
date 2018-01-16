import { Injectable }                                 from '@angular/core';

import { AppUser }                                    from '../models/app-user.model';
//import { AngularFireDatabase }                        from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

//import { Observable } from 'rxjs/Observable';
import * as firebase  from 'firebase/app';


@Injectable()
export class UserService {

    constructor(//private db: AngularFireDatabase,
                private afs: AngularFirestore) {
    }

    saveUser(user: firebase.User) {
        //FIRESTORE METHOD
        this.afs.collection('users').doc(user.uid).set({
            name: user.displayName == null ? 'test' : user.displayName,
            email: user.email
        }, { merge: true});

        //ANGULARFIREDATABASE METHOD
        /*this.db.object('/users/' + user.uid).update({
            name: user.displayName == null ? 'test' : user.displayName,
            email: user.email
        });*/
    }

    getUser(uid: string): AngularFirestoreDocument<AppUser> {
        
        //FIRESTORE METHOD
        return this.afs.collection('users').doc<AppUser>(uid);

        //ANGULARFIREDATABASE METHOD
        //return this.db2.object('/users/' + uid);
         
    }

}