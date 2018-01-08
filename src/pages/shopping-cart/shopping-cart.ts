import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthService } from '../../app/shared/services/auth.service';

import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html',
})
export class ShoppingCartPage implements OnInit {

  curUser$: firebase.User;
  cartCount: number = 0;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public authService: AuthService) {
  }

  ngOnInit() {
    this.authService.user$.subscribe((user) => {

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingCartPage');
  }

}
