import { Component, 
         OnInit, 
         OnDestroy }           from '@angular/core';

import { IonicPage, 
         NavController, 
         NavParams,
         AlertController,
         ToastController }     from 'ionic-angular';
import { Storage }             from '@ionic/storage';

import { UserAuthService }         from '../../app/shared/services/user-auth.service';
//import { ShoppingCartService } from '../../app/shared/services/shopping-cart.service';
import { AppUser }             from '../../app/shared/models/app-user.model';
import { Item }                from '../../app/shared/models/item.model';

import { Observable }          from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Cart } from '../../app/shared/models/cart.model';


@IonicPage()
@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html',
})
export class ShoppingCartPage implements OnInit, OnDestroy {

  appUser: AppUser;
  cart: Cart;
  subscription: Subscription;

  constructor(
      public navCtrl: NavController, 
      private navParams: NavParams,
      private alertCtrl: AlertController,
      private toastCtrl: ToastController,
      private authService: UserAuthService,
      //private cartService: ShoppingCartService,
      public storage: Storage) {    
        
        
  }

  async ngOnInit() {
    this.authService.appUser$.subscribe((user) => {
      if (!user) return;
      this.appUser = user;
    });

    /*this.cartService.getCart()
      .then((cart: Cart) => this.cart = cart)
      .catch(() => console.log('could not bind to cart'));*/
    
  }

  ionViewDidEnter() {
    /*this.cartService.getCart()
      .then((cart: Cart) => this.cart = cart)
      .catch(() => console.log('could not bind to cart'));*/
  }

  removeFromCart() {
    this.alertCtrl.create({
      title: 'Remove Cart Item',
      message: 'Are you sure you want to remove all of these?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('cancel remove cart item');
        }
      }, {
        text: 'Remove Item',
        handler: () => {
        }
      }]
    }).present();
  }

  onClearCart() {
    this.alertCtrl.create({
      title: 'Empty Cart',
      message: 'Are you sure you want to remove all items?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('cancelled cartEmpty');
        }
      }, {
        text: 'Empty Cart',
        handler: () => {
          console.log('emptied');
          //this.cartService.emptyCart();
          //this.cartService.getCart()
            //.then((cart: Cart) => this.cart = cart)
            //.catch(() => console.log('error'));
        }
      }]
    }).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingCartPage');
  }

  onShowCheckout() {
    if (this.appUser == null || this.appUser == undefined) this.navCtrl.setRoot('LoginPage', { returnPage: 'OrderSummaryPage' });
    else this.navCtrl.push('OrderSummaryPage');
  }

  private emptyCartToast(type?: number) {
    let msg: string = !type ? 'Cart is empty' : 'Cart is already empty';
    this.toastCtrl.create({
      message: msg,
      position: 'middle',
      duration: 2000
    }).present();
  }

  ngOnDestroy() {
  }


  

}
