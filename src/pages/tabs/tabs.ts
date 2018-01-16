import { Component, 
        OnInit, 
        OnDestroy }            from '@angular/core';

import { IonicPage, 
         NavController, 
         NavParams }           from 'ionic-angular';
import { Storage }             from '@ionic/storage';

import { AuthService }         from '../../app/shared/services/auth.service';
import { HelperService }       from '../../app/shared/services/helper.service';
import { ShoppingCartService } from '../../app/shared/services/shopping-cart.service';
import { AppUser }             from '../../app/shared/models/app-user.model';
import { Item }                from '../../app/shared/models/item.model';


export interface Page {
  rootPage: string;
  title: string;
  icon: string;
}


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage implements OnInit, OnDestroy {

  appUser$: AppUser;
  cart: Item[] = [];
  selectedIndex: number = 0;
  cartCount: number = 0;
  tabList: Page[] = [
    {
      rootPage: 'FeaturedPage',
      title: 'Featured',
      icon: 'star'
    }, {
      rootPage: 'ProductsPage',
      title: 'Browse',
      icon: 'search'
    }, {
      rootPage: 'ShoppingCartPage',
      title: 'Cart',
      icon: 'cart'
    }, {
      rootPage: 'HomePage',
      title: 'Account',
      icon: 'person'
    }
  ];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private authService: AuthService,
              private helperService: HelperService,
              private cartService: ShoppingCartService,
              public storage: Storage) {
    this.storage.get('cart').then((data: Item[]) => {
      this.cart = (data.length || data != null) ? data.slice() : [];
    });
    //this.cart = this.cartService.getCart();
    //this.cartCount = this.cart.length || 0;
  }

  async ngOnInit() {
    if (this.navParams.data) {
      this.selectedIndex = this.navParams.data.selectedIndex;
    }
    this.authService.appUser$.subscribe((user) => {
      if (!user) return;
      this.appUser$ = user;
    });
    
    

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

  onPageChange(event: Event) {
    let newPage: string = this.navCtrl.getActiveChildNavs()[0].getSelected().root;
    this.helperService.changePage(newPage);
  }

  ngOnDestroy() {
  }

}
