import { Component, 
         OnInit, 
         OnDestroy }           from '@angular/core';

import { IonicPage, 
         NavController, 
         NavParams }           from 'ionic-angular';
import { Storage }             from '@ionic/storage';

import { AuthService }         from '../../app/shared/services/auth.service';
import { ShoppingCartService } from '../../app/shared/services/shopping-cart.service'
import { Product }             from '../../app/shared/models/product.model';
import { AppUser }             from '../../app/shared/models/app-user.model';
import { Item }                from '../../app/shared/models/item.model';


@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage implements OnInit, OnDestroy {

  appUser$: AppUser;
  product: Product;
  cart: Item[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private authService: AuthService, 
              private cartService: ShoppingCartService,
              public storage: Storage) {

    this.product = this.navParams.data.product;
    this.storage.get('cart').then((data: Item[]) => {
      this.cart = data;
    }); 
  }

  async ngOnInit() {
    this.authService.appUser$.subscribe((user) => {
      if (!user) return;
      this.appUser$ = user;
    });    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

  onAddToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  ngOnDestroy() {
  }



  private updateItemQuantity(product: Product, change: number) {
    this.storage.get('cart').then((cart: Item[]) => {

      //if cart is empty
      if ((this.cart == null || this.cart.length == 0)) {

        //add item quantity 1
        let newItem = new Item(product, 1);
        this.cart.push(newItem);
        this.storage.set('cart', this.cart).then(() => {
            console.log('new item added ' + this.cart);
        }).catch((error) => console.log(error));
        
      } else {
          //cart with items
          for (let i = 0; i < this.cart.length; i++) {
              let curItem = this.cart[i];
              //if item already exists in cart
              if (curItem.product.id === product.id) {
                  let q = curItem.quantity + change;
                  //if item.quantity is down to 0
                  if (q === 0) {
                      //remove item 
                      this.cart.splice(i, 1);
                      if (this.cart.length == 0) {
                          this.cart = [];
                          this.storage.set('cart', this.cart).then(() => console.log('cart is now empty'))
                            .catch((error) => console.log(error));
                      }
                      this.storage.set('cart', this.cart).then(() => console.log('item was removed', ...this.cart))
                      .catch((error) => console.log(error));
                  } 
                  //update existing item
                  else {
                      //let newItem = new Item(product, q);
                      let newItem = new Item(product, q);
                      this.cart[i] = newItem;
                      this.storage.set('cart', this.cart).then(() => console.log('item updated', ...this.cart))
                          .catch((error) => console.log(error));
                  }
              } else {
                let newItem = new Item(product, 1);
                this.cart.push(newItem);
                this.storage.set('cart', this.cart).then(() => {
                  console.log('new item added ' + this.cart);
                }).catch((error) => console.log(error));
              }
          }
      }
    });
    //cart but no items
    
}

}
