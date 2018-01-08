import { WCProduct } from './wc-product.model';
import { ShoppingCartItem } from './shopping-cart-item.model';


export class ShoppingCart {

    cart: ShoppingCartItem[] = [];

    constructor(private cartMap: { [productId: string]: ShoppingCartItem }) {
        this.cartMap = cartMap || {};

        for (let productId in cartMap) {
            let cartItem = cartMap[productId];
            this.cart.push(new ShoppingCartItem({...cartItem, $key: productId }));
        }
    }

    getQuantity(product: WCProduct) {
        let cartItem = this.cartMap[product.$key];
        return cartItem ? cartItem.quantity : 0;
    }

    get totalPrice() {
        let total: number = 0;
        for (let productId in this.cart) {
            total += this.cart[productId].totalPrice;
        }
        return total;
    }

    get totalItemsCount() {
        let count: number = 0;
        for (let productId in this.cart) {
            count += this.cartMap[productId].quantity;
        }
        return count;
    }

}