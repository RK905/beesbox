import { Component, OnInit } from '@angular/core';

import { NavController, 
         ActionSheetController, 
         AlertController, 
         LoadingController, 
         ToastController }   from 'ionic-angular';

import { AuthService }       from '../../../shared/services/auth.service';
import { AppUser }           from '../../../shared/models/app-user.model';
import { HelperService }     from '../../../shared/services/helper.service';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { UserService }       from '../../../shared/services/user.service';
import { Item } from '../../../shared/models/item.model';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'nav-bar',
  templateUrl: 'navbar.html'
})
export class NavbarComponent implements OnInit{

  appUser$: AppUser;
  headerSize: string ='48px';
  currentPage: string;
  cart: Item[] = [];

  cartCount: number;
  
  constructor(public navCtrl: NavController, 
              public actionCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public authService: AuthService,
              public helperService: HelperService,
              public cartService: ShoppingCartService,
              public userService: UserService,
              public storage: Storage) { 

    this.storage.get('cart').then((data: Item[]) => {
      this.cart = (data.length || data != null) ? data.slice() : [];
    });
  }

  ngOnInit() {
    this.authService.appUser$.subscribe((user) => this.appUser$ = user);
    this.helperService.curPage.subscribe((page: string) => this.currentPage = page);
  }

  getCartCount() {
    let counter: number = 0;
    if (!this.cart) return;
    for (let item of this.cart) {
      counter += item.quantity;
    }
    this.cartCount = counter;
  }

  onLogout() {
    this.alertCtrl.create({
      title: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('cancel clicked');
          }
        }, {
          text: 'Logout',
          handler: () => {
            this.authService.logout();
          }
        }
      ]
    }).present();
    this.navCtrl.popToRoot();
  }

  onShowCart() {
    this.navCtrl.setRoot('TabsPage', { selectedIndex: 2 });
    //if (this.navCtrl.parent.getActiveChildNavs())
    //this.navCtrl.push('ShoppingCartPage');
  }

  onShowAdminOptions() {
    if (this.appUser$.isAdmin) {

      this.actionCtrl.create({
        title: 'Admin Controls',
        buttons: [
          {
            text: 'Manage Orders',
            handler: () => {
              this.navCtrl.push('AdminOrdersPage');
            }
          }, {
            text: 'Manage Products',
            handler: () => {
             this.navCtrl.push('AdminProductsPage');
            }
          }, {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      }).present();

    } else {
      return;
    }
    
  }

  onAnonClick() {
    let msg: string = 'You are not logged in/not admin';
    this.toastHandler(msg);
  }

  private toastHandler(msg: string) {
    this.toastCtrl.create({
      message: msg,
      position: 'middle',
      duration: 1500
    }).present();
  }
}
