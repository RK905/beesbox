import { Component, 
         Input, 
         OnInit } from '@angular/core';

import { NavController }    from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HelperService } from '../../services/helper.service';
//import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product }          from '../../models/product.model';
import { Cart } from '../../models/cart.model';
import { Item } from '../../models/item.model';


@Component({
    selector: 'product-grid',
    templateUrl: 'product-grid.html'
})
export class ProductGridComponent implements OnInit {

    @Input() 
    product: Product;

    gridSize: number;
    cart: Cart;
    isInCart: boolean;

    constructor(public navCtrl: NavController, 
                private helperService: HelperService,
                //private cartService: ShoppingCartService,
                public storage: Storage) {

        
    }

    ngOnInit() {
        //this.cartService.getCart().then((cart: Cart) => this.cart = cart);
        this.helperService.gridSize$.subscribe((size: number) => this.gridSize = size);
    }

    showProductDetails() {
        this.navCtrl.push('ProductDetailsPage', { product: this.product });
    }

    toggleAddToCartButton() {
        for (let item of this.cart.items) {
            this.isInCart = (item.product.id === this.product.id) ? true : false;
        }
    }



}