import { Component, Input, OnInit } from '@angular/core';

import { NavController, 
         ActionSheetController, 
         AlertController, 
         LoadingController, 
         ToastController } from 'ionic-angular';

import { AuthService } from '../../../shared/services/auth.service';
import { AppUser } from '../../../shared/models/app-user.model';
import { HelperService } from '../../../shared/services/helper.service';
import { UserService } from '../../../shared/services/user.service';

import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';



@Component({
  selector: 'nav-bar',
  templateUrl: 'navbar.html'
})
export class NavbarComponent implements OnInit{

  curUser$: firebase.User;
  appUser$: any;
  headerSize: string ='48px';
  currentPage: string;
  
  constructor(
    public navCtrl: NavController, 
    public actionCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public authService: AuthService,
    public helperService: HelperService,
    public userService: UserService
  ) {

    this.authService.user$.subscribe((u) => {
      if (!u) return;
      this.appUser$ = this.authService.appUser$;
    });
    this.helperService.curPage.subscribe((page: string) => {
      this.currentPage = page;
      console.log('page = ' + this.currentPage);
    });
  }

  ngOnInit() {

    /*this.authService.user$.subscribe((u) => {
      if (!u) return;
      this.curUser$ = u;
      this.appUser$ = this.userService.getUser(u.uid);
      this.isAdmin
      //this.isAdmin = (this.curUser$) ? this.curUser$.isAdmin : false;
      console.log('curUser = ' + this.curUser$.toJSON());
    });
    this.helperService.curPage.subscribe((page: string) => {
      this.currentPage = page;
      console.log('page = ' + this.currentPage);
    });
    console.log()
    //console.log('page ' + this.navCtrl.parent.parent.getActiveChildNavs()[0].root === undefined ? 0 : this.navCtrl.parent.parent.getActiveChildNavs()[0]);*/
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
    if (this.navCtrl.parent.getActiveChildNavs())
    this.navCtrl.push('ShoppingCartPage');
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
