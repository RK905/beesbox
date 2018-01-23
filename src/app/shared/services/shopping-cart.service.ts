import { Injectable }      from '@angular/core';

import { Storage }         from '@ionic/storage';

import { AngularFireDatabase, 
         AngularFireObject, 
         AngularFireList } from 'angularfire2/database';

import { UserAuthService } from '../services/user-auth.service';
import { AppUser }         from '../models/app-user.model';
import { Product }         from '../models/product.model';
import { Cart }            from '../models/cart.model';
import { Item }            from '../models/item.model'; 

import { Observable }      from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';



@Injectable()
export class ShoppingCartService {

    cart: Cart;
    
    constructor(public storage: Storage,
                private afDb: AngularFireDatabase,
                private authService: UserAuthService) {  
    }

    async getCart(cartId: string) {
        
    }

    private async getCartFromStorage() {
        return await this.storage.get('cart');
    }

    private getCartFromFirebase(cartId: string) {
        return this.afDb.object<Cart>('/shopping-carts' + cartId);
    }

    /*private async getOrCreateCartId(): Promise<Cart> {
        //let cartId = await this.storage.get('cartId');

        if (cartId) return this.getCartFromFirebase(cartId).snapshotChanges();

        else {
            let cart = await this.storage.get('cart');

            if (cart) return this.getCartFromStorage();

            else {
                let result = await this.createCart();
                this.storage.set('cartId', result.key)
            }
        }
    }*/

    private createCart() {
        let dateCreated = new Date().getTime().toString();
        let tempCart = new Cart(dateCreated, []);
        this.storage.set('cart', tempCart);
        return this.afDb.list('/shopping-carts').push(tempCart);
    }
    /*public getCart(): Promise<Cart> {
        return this.getOrCreateCart();
    }

    public incrementItem(product: Product) {
        this.updateItemQuantity(product, 1);
    }

    public decrementItem(product: Product) {
        this.updateItemQuantity(product, -1);
    }

    public removeAllFromCart(item: Item) {
        let index = this.cart.items.indexOf(item);
        this.cart.items.splice(index, 1);
        this.setCart();
    }

    public emptyCart() {
        this.cart.items = [];
        this.setCart();  
    }


    private getStorageKeys(): string[] {
        let keys: string[] = [];
        this.storage.keys().then((list: string[]) => { keys = list });
        return keys;
    }
    private async getOrCreateCart(): Promise<Cart> {
        let keys = this.getStorageKeys();
            if (keys.indexOf('cart') !== -1) return this.storage.get('cart');
            else return this.createCart();
    }
    private createCart() {
        let createdDate = new Date().getTime().toString();
        this.cart = new Cart(createdDate);
        return this.setCart();
    }

    

    private setCart(): Promise<Cart> {
        if (this.cart == null || this.cart == undefined) {
        }
        return this.storage.set('cart', this.cart).catch(() => {
         }) ;
    }

    private updateItemQuantity(product: Product, change: number) {
        //if no items, add 1
        if (this.cart.items == null || this.cart.items.length == 0) {
            let newItem = new Item(product, 0);
            if (change > 0) {
                newItem.quantity += change;
                this.cart.items.push(newItem);
            }
        } else {
        //if items already exists
            for (let myItem of this.cart.items) {

                let index = this.cart.items.indexOf(myItem);
                let p = this.cart.items[index].product;

                //if product is already in cart
                if (p.id === product.id) {
                    let q: number = myItem.quantity + change;
                    if (q === 0) this.cart.items.splice(index, 1);
                    else myItem.quantity = q;
                }
                //else add product to cart
                else {
                    let newItem = new Item(product, 0);
                    if (change > 0) {
                        newItem.quantity += change;
                        this.cart.items.push(newItem);
                    }
                }
            }
        }
    }*/


    /*private updateItemQuantity(product: Product, change: number) {

        //if no items in cart, add item
        if (this.cart.items == null || this.cart.items.length == 0) {
            let newItem = new Item(product, 1);
            this.cart.items.push(newItem);
            /*this.storage.set('cart', this.cart)
                .then(() => console.log('new item added ' + product.name))
                .catch((error) => console.log(error));*/
        //}

        /*else { //iterate through all items in cart
            for (let myItem of this.cart.items) {
                let index: number = this.cart.items.indexOf(myItem);
                let q: number = myItem.quantity + change;

                //if update quantity reduces to 0, remove item from cart
                if (q  === 0) {
                    this.cart.items.splice(index, 1);
                }
                //q > 0, increment or decrement like normal
                else {

                    //if product id matches a cart item product id
                    if ( myItem.product.id === product.id) {
                        myItem.quantity = q;
                    }
                        /*this.storage.set('cart', this.cart)
                            .then(() => console.log('item updated, ' + myItem.quantity + ' ' + product.name + 's'))
                            .catch((error) => console.log(error));*/
                /*}
            }
            return this.setCart();
        }
    }*/

    
    /*private updateItemQuantity(product: Product, change: number) {
        this.getOrCreateCart();
        //cart but no items
        if (this.cart.items == null || this.cart.items.length == 0) {

            let newItem = new Item(product, 1);
            this.cart.items.push(newItem);
            this.storage.set('cart', this.cart).then(() => {
                console.log('new item added ' + product.name);
            }).catch((error) => console.log(error));
            
        } 
        
        else {
            //cart with items
            for (let i = 0; i < this.cart.items.length; i++) {
                let curItem = this.cart.items[i];


                //if item already exists in cart
                if (curItem.product.id === product.id) {
                    let q = curItem.quantity + change;
                    //if item.quantity is down to 0
                    if (q === 0) {
                        //remove item 
                        this.cart.items.splice(i, 1);
                        if (this.cart.items.length == 0) {
                            this.emptyCart();
                        }
                        this.storage.set('cart', this.cart).then(() => console.log('item was removed', ...this.cart.items))
                        .catch((error) => console.log(error));
                    } 



                    //update existing item
                    else {
                        //let newItem = new Item(product, q);
                        this.cart.items[i].quantity += change;
                        this.storage.set('cart', this.cart).then(() => console.log('item updated', ...this.cart.items))
                            .catch((error) => console.log(error));
                    }
                }
            }
        }
    }*/
}