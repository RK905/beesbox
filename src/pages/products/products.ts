import { Component, 
        OnInit, 
        OnDestroy }            from '@angular/core';

import { IonicPage, 
         NavController, 
         NavParams }           from 'ionic-angular';
import { Storage } from '@ionic/storage';

import {ToolbarAnimation }     from '../../animations/toolbar.animation';
import { UserAuthService }         from '../../app/shared/services/user-auth.service';
import { HelperService }       from '../../app/shared/services/helper.service';
import { WooCommerceService }  from '../../app/shared/services/woocommerce.service';
import { AppUser }             from '../../app/shared/models/app-user.model';
import { Product }             from '../../app/shared/models/product.model';
import { ShoppingCartService } from '../../app/shared/services/shopping-cart.service';
import { Item }                from '../../app/shared/models/item.model';
import { Cart } from '../../app/shared/models/cart.model';


@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
  animations: [
    ToolbarAnimation
  ]
})
export class ProductsPage implements OnInit, OnDestroy {

  appUser: AppUser;
  cart: Cart;
  selectedView: string;
  curSize: number;
  productList: Product[];
  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private wooService: WooCommerceService,
              private authService: UserAuthService, 
              private helperService: HelperService,
              private cartService: ShoppingCartService,
              public storage: Storage) {

    
  }

  async ngOnInit() {
    this.authService.appUser$.subscribe((user) => {
      if (!user) return;
      this.appUser = user;
    });
    //this.cartService.getCart().then((cart: Cart) => this.cart = cart);

    this.helperService.selectedView$.subscribe((view) => this.selectedView = view);
    this.helperService.gridSize$.subscribe((size) => this.curSize = size);

    this.productList = await this.wooService.getProducts();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }

  async getAllProducts() {
    this.productList = await this.wooService.getProducts();
}

  showProductDetails(p: Product) {
    this.navCtrl.push('ProductDetailsPage', { product: p });
  }

  ngOnDestroy() {
  }
}
