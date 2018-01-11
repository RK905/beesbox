import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthService } from '../../app/shared/services/auth.service';


@IonicPage()
@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html',
})
export class ShoppingCartPage implements OnInit {

  appUser$: any;
  cart: any[] = [];

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public authService: AuthService) {
  }

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      if (!user) return;
      this.appUser$ = this.authService.appUser$;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingCartPage');
  }

}
