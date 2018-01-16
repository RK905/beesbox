import { Component, OnInit } from '@angular/core';

import { IonicPage, 
         NavController, 
         NavParams }         from 'ionic-angular';

import { AuthService }       from '../../app/shared/services/auth.service';
import { HelperService }     from '../../app/shared/services/helper.service';
import { AppUser }           from '../../app/shared/models/app-user.model';


@IonicPage()
@Component({
  selector: 'page-my-orders',
  templateUrl: 'my-orders.html',
})
export class MyOrdersPage implements OnInit {

  appUser$: AppUser;
  orderList: string[] = [
    'item 1',
    'item 2'
  ];

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
    this.authService.appUser$.subscribe((user) => {
      if (!user) return;
      this.appUser$ = user;
    });
  }

  ionViewDidLeave() {
  }

}
