import { Item } from './item.model';

 
export class Cart {
    
    dateCreated: string;
    constructor(public items?: Item[]) {
        this.dateCreated = new Date().getTime().toString();
        if (!this.items) this.items = [];
    }

    get cartItemCount() {
        let counter = 0;
        if (!this.items) {
            return counter;
        } else {
            for (let item of this.items) {
                counter += item.quantity;
            }
            return counter; 
        }
    }

    get cartTotalPrice() {
        let counter = 0;
        if (!this.items) {
            return counter;
        } else {
            for (let item of this.items) {
                counter += item.itemPrice;
            }
        }
    }
}