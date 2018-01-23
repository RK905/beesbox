import { Injectable }   from '@angular/core';
import { environment }  from '../../../environments/environment';

import { Product }      from '../models/product.model';
import { Category }     from '../models/category.model';

import * as WooCommerce from 'woocommerce-api';


@Injectable()
export class WooCommerceService {

    wooCommerce: any;

    constructor() {
        this.wooCommerce = WooCommerce(environment.wooCommerceApiConfig);
    }

    public async getProducts() {
        try {
            let list = await this.wooCommerce.getAsync('products');
            let parsedList: Product[] = JSON.parse(list.toJSON().body);
            console.log('productList = ', ...parsedList);
            return parsedList;
        }
        catch (error) { return null }
    }

    public async getProduct(productId: string) {
        try { 
            let sProduct = await this.wooCommerce.getAsync('products/' + productId);
            let parsedProduct: Product[] = JSON.parse(sProduct.toJSON().body);
            console.log('selected Product = ', parsedProduct);
            return parsedProduct;
        }
        catch (error) { return null }
    }

    public async getAllCategories() {
        try { 
            let catList = await this.wooCommerce.getAsync('products/categories');
            let parsedList: Category[] =  JSON.parse(catList.toJSON().body);
            console.log('cat list = ',  ...parsedList);
            return parsedList;
        }
        catch (error) { return null }
    }
}