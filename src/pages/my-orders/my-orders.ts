import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthService } from '../../app/shared/services/auth.service';
import { HelperService } from '../../app/shared/services/helper.service';

import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-my-orders',
  templateUrl: 'my-orders.html',
})
export class MyOrdersPage implements OnInit {

  curUser$: firebase.User;
  orderList: string[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public authService: AuthService,
    public helperService: HelperService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyOrdersPage');
  }

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.curUser$ = user;
    });
    
    this.orderList = [
      'item 1',
      'item 2'
    ];
  }

  ionViewDidLeave() {
  }

}
