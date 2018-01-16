import { Component, OnInit }   from '@angular/core';

import { Platform }            from 'ionic-angular';
import { Storage }             from '@ionic/storage';
import { StatusBar }           from '@ionic-native/status-bar';
import { SplashScreen }        from '@ionic-native/splash-screen';

import { AuthService }         from './shared/services/auth.service';
import { UserService }         from './shared/services/user.service';
import { ShoppingCartService } from './shared/services/shopping-cart.service';
import { AppUser }             from './shared/models/app-user.model';
import { Item } from './shared/models/item.model';
 
import { Observable }          from 'rxjs/Observable';


@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  rootPage: string = 'MenuPage';
  appUser$: AppUser;
  cart: Item[] = [];

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              private authService: AuthService,
              private cartService: ShoppingCartService,
              private userService: UserService,
              public storage: Storage) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.storage.get('cart').then((data: Item[]) => {
      this.cart = (data == undefined || data == null) ? [] : data;
    }); 

    
  }

  async ngOnInit() {
    this.authService.user$.subscribe((user) => {
      if (!user) return;
      this.authService.appUser$.subscribe((appUser) => this.appUser$ = appUser);
      this.userService.saveUser(user);
    });
  }
}

