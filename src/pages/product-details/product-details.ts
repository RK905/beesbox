import { Component, 
         OnInit, 
         OnDestroy }           from '@angular/core';

import { IonicPage, 
         NavController, 
         NavParams,
         ToastController }     from 'ionic-angular';
import { Storage }             from '@ionic/storage';

import { UserAuthService }         from '../../app/shared/services/user-auth.service';
//import { ShoppingCartService } from '../../app/shared/services/shopping-cart.service';
import { HelperService }       from '../../app/shared/services/helper.service';
import { Product }             from '../../app/shared/models/product.model';
import { AppUser }             from '../../app/shared/models/app-user.model';
import { Cart }                from '../../app/shared/models/cart.model';
import { Item }                from '../../app/shared/models/item.model';


@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage implements OnInit, OnDestroy {

  appUser: AppUser;
  product: Product;
  cart: Cart;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private authService: UserAuthService, 
              //private cartService: ShoppingCartService,
              private helperService: HelperService,
              private toastCtrl: ToastController,
              public storage: Storage) {

    this.product = this.navParams.data.product;
  }

  async ngOnInit() {
    this.authService.appUser$.subscribe((user) => {
      if (!user) return;
      this.appUser = user;
    });    
    //this.cartService.getCart().then((cart: Cart) => this.cart = cart);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

  onAddToCart() {
    //this.cartService.incrementItem(this.product);
    this.navCtrl.pop();
  }

  /*removeFromCart() {
    this.updateItemQuantity(this.product, -1);
    let msg: string = 'Success ' + this.product.name + ' was removed';
    if (this.cart.items.length < 1 ) msg += ', cart empty';
      
    this.toastHandler(msg);
    this.navCtrl.pop();
  }*/

  ngOnDestroy() {
  }



  /*private updateItemQuantity(product: Product, change: number) {
    this.storage.get('cart').then((cart: Cart) => {
      //if cart is empty
      if ((this.cart.items == null || this.cart.items.length == 0)) {

        //add item quantity 1
        let newItem = new Item(product, 1);
        this.cart.items.push(newItem);
        this.storage.set('cart', this.cart).then(() => this.helperService.updateCart())
          .catch((error) => console.log(error));
        
      } else {
          //cart with items
          for (let i = 0; i < this.cart.items.length; i++) {
              let curItem = this.cart[i];
              //if item already exists in cart
              if (curItem.product.id === product.id) {
                  let q = curItem.quantity + change;
                  //if item.quantity is down to 0
                  if (q === 0) {
                      //remove item 
                      this.cart.items.splice(i, 1);
                      //if cart is now empty
                      if (this.cart.items.length == 0) {
                          this.cart.items = [];
                          this.storage.set('cart', this.cart).then(() => this.helperService.updateCart())
                            .catch((error) => console.log(error));
                      } else {
                        this.storage.set('cart', this.cart).then(() => this.helperService.updateCart())
                          .catch((error) => console.log(error));
                      }
                  } 
                  //update existing item
                  else {
                      //let newItem = new Item(product, q);
                      let newItem = new Item(product, q);
                      this.cart.items[i] = newItem;
                      this.storage.set('cart', this.cart).then(() => this.helperService.updateCart())
                          .catch((error) => console.log(error));
                  }
              } else {
                //add item to cart
                let newItem = new Item(product, 1);
                this.cart.items.push(newItem);
                this.storage.set('cart', this.cart).then(() => this.helperService.updateCart())
                  .catch((error) => console.log(error));
              }
          }
      }
      this.helperService.updateCart()
    });
    //cart but no items
    
  }*/

private toastHandler(msg: string) {
  this.toastCtrl.create({
    message: msg,
    position: 'middle',
    duration: 1000
  }).present();
}

}
