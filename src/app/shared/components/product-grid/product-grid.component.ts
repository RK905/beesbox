import { Component, Input } from '@angular/core';

import { NavController }    from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product }          from '../../models/product.model';
//import { ShoppingCart } from '../../models/shopping-cart.model';
import { Cart } from '../../models/cart.model';
import { Item } from '../../models/item.model';


@Component({
    selector: 'product-grid',
    templateUrl: 'product-grid.html'
})
export class ProductGridComponent {

    @Input() 
    product: Product;

    cart: Item[];

    constructor(public navCtrl: NavController, 
                private cartService: ShoppingCartService,
                public storage: Storage) {
        this.storage.get('cart').then((data: Item[]) => {
            this.cart = (data.length || data != null) ? data.slice() : [];
        }); 
    }

    getQuantity() {
        if (!this.cart) return 0;
        else {
            for (let i of this.cart) {
                return (i.product.id === this.product.id) ? i.quantity : 0;
            }
        }
    }

    showProductDetails() {
        this.navCtrl.push('ProductDetailsPage', { product: this.product });
    }

}