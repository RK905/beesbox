import { Component, 
         Input, 
         OnInit } from '@angular/core';

//import { ShoppingCartService } from '../../services/shopping-cart.service';
import { UserAuthService } from '../../services/user-auth.service';

import { AppUser } from '../../models/app-user.model';
import { Cart }   from '../../models/cart.model';
import { Item }   from '../../models/item.model';
import { Product } from '../../models/product.model';


@Component({
    selector: 'cart-item',
    templateUrl: 'cart-item.html'
})
export class  CartItemComponent implements OnInit {

    @Input()
    item: Item;

    AppUser: AppUser;
    cart: Cart;

    constructor(private authService: UserAuthService, 
                //private cartService: ShoppingCartService
    ) {

    }

    ngOnInit() {
        this.authService.appUser$.subscribe((user) => this.AppUser = user);

        /*this.cartService.getCart()
            .then((cart: Cart) => this.cart = cart)
            .catch((error) => console.log(error));*/
    }

    incrementItem() {
        //this.cartService.incrementItem(this.item.product);
    }

    decrementItem() {
        //this.cartService.decrementItem(this.item.product);
    }
}