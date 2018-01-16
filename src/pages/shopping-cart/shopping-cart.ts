import { Component, 
         OnInit, 
         OnDestroy }           from '@angular/core';

import { IonicPage, 
         NavController, 
         NavParams,
         AlertController,
         ToastController }     from 'ionic-angular';
import { Storage }             from '@ionic/storage';

import { AuthService }         from '../../app/shared/services/auth.service';
import { ShoppingCartService } from '../../app/shared/services/shopping-cart.service';
import { AppUser }             from '../../app/shared/models/app-user.model';
import { Item }                from '../../app/shared/models/item.model';

import { Observable }          from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';


@IonicPage()
@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html',
})
export class ShoppingCartPage implements OnInit, OnDestroy {

  appUser$: AppUser;
  cart: Item[] = [];
  subscription: Subscription;

  constructor(
      public navCtrl: NavController, 
      private navParams: NavParams,
      private alertCtrl: AlertController,
      private toastCtrl: ToastController,
      private authService: AuthService,
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
    
  }

  ionViewDidEnter() {
    this.storage.get('cart').then((data: Item[]) => {
      this.cart = data;
    });
    console.log('cart loaded + ', ...this.cart);
  }

  removeFromCart(index: number) {
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
          this.cart.splice(index, 1);
          this.storage.set('cart', this.cart).then(() => console.log('item removed'))
            .then((error) => console.log(error));
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
          this.cart = [];
          this.storage.set('cart', this.cart).then(() => this.emptyCartToast());
        }
      }]
    }).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingCartPage');
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
