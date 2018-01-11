import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { ShoppingCart } from '../models/shopping-cart.model';
import { WCProduct } from '../models/wc-product.model';
import { ShoppingCartItem } from '../models/shopping-cart-item.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';


@Injectable()
export class ShoppingCartService {

    constructor(private db: AngularFireDatabase) {

    }

    /*addToCart(product) {
        localStorage.getItem('cartId').then((data) => {
            if (data == null || data.length == 0) {
                data = [];
            }
        })
    }*/

    /*async getCart(): Promise<Observable<ShoppingCart>> {
        let cartId = await this.getOrCreateCartId();
        return this.db.object('/shopping-carts' + cartId)
            .valueChanges()
            .map((x: ShoppingCart) => new ShoppingCart(x.cart));
    }

    private async getOrCreateCartId(): Promise<string> {
        let cartId = localStorage.getItem('cartId');
        if (cartId) return cartId;

        let result = await this.create();
        localStorage.setItem('cartId', result.key);
    }

    private create() {
        return this.db.list('/shopping-carts')
            .push({
                dateCreated: new Date().getTime()
            });
    }*/
}