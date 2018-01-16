import { Component, 
        OnInit, 
        OnDestroy }            from '@angular/core';

import { IonicPage, 
         NavController, 
         NavParams }           from 'ionic-angular';
import { Storage } from '@ionic/storage';

import {ToolbarAnimation }     from '../../animations/toolbar.animation';
import { AuthService }         from '../../app/shared/services/auth.service';
import { HelperService }       from '../../app/shared/services/helper.service';
import { WooCommerceService }  from '../../app/shared/services/woocommerce.service';
import { AppUser }             from '../../app/shared/models/app-user.model';
import { Product }             from '../../app/shared/models/product.model';
import { ShoppingCartService } from '../../app/shared/services/shopping-cart.service';
import { Item }                from '../../app/shared/models/item.model';


@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
  animations: [
    ToolbarAnimation
  ]
})
export class ProductsPage implements OnInit, OnDestroy {

  appUser$: AppUser;
  cart: Item[];
  selectedView$: string;
  curSize$: number;
  productList: Product[];
  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private wooService: WooCommerceService,
              private authService: AuthService, 
              private helperService: HelperService,
              private cartService: ShoppingCartService,
              public storage: Storage) {

    this.storage.get('cart').then((data: Item[]) => {
      this.cart = (data.length || data != null) ? data.slice() : [];
    }); 
  }

  async ngOnInit() {
    this.authService.appUser$.subscribe((user) => {
      if (!user) return;
      this.appUser$ = user;
    });

    this.helperService.selectedView.subscribe((view) => this.selectedView$ = view);
    this.helperService.gridSize.subscribe((size) => this.curSize$ = size);

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
