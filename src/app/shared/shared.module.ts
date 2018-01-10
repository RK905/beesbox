import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { IonicModule }  from 'ionic-angular';

import { AngularFireAuthModule }     from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AuthService }        from './services/auth.service';
import { CategoryService }    from './services/category.service';
import { HelperService }      from './services/helper.service';
import { UserService }        from './services/user.service';
import { WooCommerceService } from './services/woocommerce.service';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
    ],
    declarations: [],
    exports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule
    ],
    providers: [
        AuthService,
        CategoryService,
        HelperService,
        UserService,
        WooCommerceService
    ]
})
export class SharedModule { }