//import { ShoppingCart } from './shopping-cart.model';
import { BillingAddress } from './billing-address.model';
import { ShippingAddress } from './shipping-address.model';



export class Order {
    $key: string;
    id: number;
    order_key: string;
    status: string;
    currency: string;
    date_created: string;
    date_created_gmt: string;
    date_modified: string;
    date_modified_gmt: string;
    
    payment_method: string;
    payment_method_title: string;
    billing: BillingAddress;
    shipping: ShippingAddress;
    line_items: Array<{ product_id: number, quantity: number, variation_id?: number }>;
    shipping_lines: Array<{ method_id: string, moethod_title: string, total: number }>;

}