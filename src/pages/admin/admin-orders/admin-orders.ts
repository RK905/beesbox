import { Component, 
         OnInit, 
         ViewChild } from '@angular/core';

import { IonicPage, 
         Navbar, 
         NavController, 
         NavParams } from 'ionic-angular';


@IonicPage()
@Component({
    selector: 'page-admin-orders',
    templateUrl: './admin-orders.html'
})
export class AdminOrdersPage implements OnInit {

    @ViewChild('navbar') navbar: Navbar;
    constructor(private navCtrl: NavController, private navParams: NavParams) {}

    ngOnInit() {
    }
}