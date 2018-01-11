import { Component } from '@angular/core';

import { IonicPage, 
         NavController, 
         NavParams } from 'ionic-angular';

import { AuthService }         from '../../app/shared/services/auth.service';
import { ShoppingCartService } from '../../app/shared/services/shopping-cart.service';


@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

  product: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public authService: AuthService, 
              public cartService: ShoppingCartService) {
    this.product = this.navParams.get('product');
    console.log(this.product);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

  onAddToCart(product) {
    this.navCtrl.push('ShoppingCartPage');

  }

}
