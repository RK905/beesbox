import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import * as WooCommerce from 'woocommerce-api';


@Injectable()
export class WooCommerceService {

    wooCommerce: any;

    constructor() {
        this.wooCommerce = WooCommerce(environment.wooCommerceApiConfig);
    }

    init() {
        return this.wooCommerce;
    }
}