import { NgModule }                  from '@angular/core';
import { CommonModule }              from '@angular/common';
import { FormsModule }               from '@angular/forms';

import { IonicModule }               from 'ionic-angular';

import { AngularFireAuthModule }     from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule }    from 'angularfire2/firestore';

import { ProductCardComponent }      from './components/product-card/product-card.component';
import { ProductListComponent }      from './components/product-list/product-list.component';
import { ProductGridComponent }      from './components/product-grid/product-grid.component';

import { AuthService }               from './services/auth.service';
import { HelperService }             from './services/helper.service';
import { UserService }               from './services/user.service';
import { ShoppingCartService }       from './services/shopping-cart.service';
import { WooCommerceService }        from './services/woocommerce.service';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        //AngularFirestoreModule.enablePersistence()
    ],
    declarations: [
        ProductCardComponent,
        ProductListComponent,
        ProductGridComponent
    ],
    providers: [
        AuthService,
        HelperService,
        ShoppingCartService,
        UserService,
        WooCommerceService
    ],
    exports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        ProductCardComponent,
        ProductListComponent,
        ProductGridComponent
    ],
})
export class SharedModule { }