import { Injectable }               from '@angular/core';

import { Storage } from '@ionic/storage';

/*import { AngularFireDatabase, 
         AngularFireList, 
         AngularFireObject }        from 'angularfire2/database';*/

import { AngularFirestore, 
         AngularFirestoreDocument } from 'angularfire2/firestore';

import { Product }                  from '../models/product.model';
import { Item }         from '../models/item.model'; 

import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';



@Injectable()
export class ShoppingCartService {

    cart: Item[];
    
    constructor(public storage: Storage) {
        this.getCart();        
    }

    get CartCount() {
        return this.cart.length;
    }

    getCart(): Item[] {
        this.getOrCreateCart();
        return this.cart;
    }

    getOrCreateCart() {
        this.storage.get('cart').then((data: Item[]) => {
            if (data === null || data === undefined) {
                this.cart = [];
                this.storage.set('cart', this.cart).then(() => console.log('cart set'))
                    .catch((error) => console.log(error));
            }
            else this.cart = data.slice();
        })
        .catch((error) => console.log(error));      
    }

    addToCart(product: Product) {
        this.updateItemQuantity(product, 1);
        this.getOrCreateCart();
    }

    removeFromCart(product: Product) {
        this.updateItemQuantity(product, -1);
        this.getOrCreateCart();
    }

    emptyCart() {
        this.cart = [];
        this.storage.set('cart', this.cart).then(() => console.log('cart emptied'));   
    }

    private updateItemQuantity(product: Product, change: number) {
        this.getOrCreateCart();
        //cart but no items
        if (this.cart == null || this.cart.length == 0) {

            let newItem = new Item(product, 1);
            this.cart.push(newItem);
            this.storage.set('cart', this.cart).then(() => {
                console.log('new item added ' + this.cart);
            }).catch((error) => console.log(error));
            
        } else {
            //cart with items
            for (let i = 0; i < this.cart.length; i++) {
                let curItem = this.cart[i];
                //if item already exists in cart
                if (curItem.product.id === product.id) {
                    let q = curItem.quantity + change;
                    //if item.quantity is down to 0
                    if (q === 0) {
                        //remove item 
                        this.cart.splice(i, 1);
                        if (this.cart.length == 0) {
                            this.emptyCart();
                        }
                        this.storage.set('cart', this.cart).then(() => console.log('item was removed', ...this.cart))
                        .catch((error) => console.log(error));
                    } 
                    //update existing item
                    else {
                        //let newItem = new Item(product, q);
                        this.cart[i].quantity += change;
                        this.storage.set('cart', this.cart).then(() => console.log('item updated', ...this.cart))
                            .catch((error) => console.log(error));
                    }
                }
            }
        }
    }
}