import { Billing }  from './billing.model';
import { Cart } from './cart.model';
import { Shipping } from './shipping.model';

export interface AppUser {
    id: string;
    name: string;
    email: string;
    isAdmin?: boolean;
    gender?: string;
    birthdate?: Date;
    inRelationship?: boolean;
    shippingAddresses?: Shipping[];
    billingAddresses?: Billing[];
    cart?: Cart;
}