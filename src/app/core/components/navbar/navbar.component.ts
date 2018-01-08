import { Component, Input, OnInit } from '@angular/core';

import { NavController, 
         ActionSheetController, 
         AlertController, 
         LoadingController, 
         ToastController } from 'ionic-angular';

import { AuthService } from '../../../shared/services/auth.service';
import { HelperService } from '../../../shared/services/helper.service';

import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';



@Component({
  selector: 'nav-bar',
  templateUrl: 'navbar.html'
})
export class NavbarComponent implements OnInit{

  curUser$: firebase.User;
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  headerSize: string ='48px';
  currentPage: string;
  
  constructor(
    public navCtrl: NavController, 
    public actionCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public authService: AuthService,
    public helperService: HelperService
  ) {
    
  }

  ngOnInit() {

    this.authService.user$.subscribe((u) => {
      this.curUser$ = u;
      //this.isAdmin = (this.curUser$) ? this.curUser$.isAdmin : false;
      console.log('curUser = ' + this.curUser$);
    });
    this.helperService.curPage.subscribe((page: string) => {
      this.currentPage = page;
      console.log('page = ' + this.currentPage);
    })
    //console.log('page ' + this.navCtrl.parent.parent.getActiveChildNavs()[0].root === undefined ? 0 : this.navCtrl.parent.parent.getActiveChildNavs()[0]);
  }

  onLogin() {
    let loader = this.loadingCtrl.create({
      content: 'Logging in'
    });

    loader.present();

    loader.onDidDismiss(() => {
      /*if (this.authService.) {
        let successMsg: string = 'Logged in as ' + this.curUser.displayName;
        this.toastHandler(successMsg);
        //this.navCtrl.parent.parent.getActiveChildNavs()[0].select(2);
      } else {

        let errMsg: string = 'Login failed';
        this.toastHandler(errMsg);
      }*/
    });

    /*this.authService.signinEmail('test@test.com', 'test123').then((data) => {
      console.log(data);
      loader.dismiss();
    }, (error) => {
      loader.dismiss();
      this.alertCtrl.create({
        title: 'Signin failed',
        message: error.message,
        buttons: ['OK']
      }).present();
    });
    //this.authService.setUser(new User('Joel J', 'test@test.com', true, 1, []));
    //loader.dismiss();*/
    
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
            /**DUMMY LOGOUT */
            /*this.authService.setUser();
            if (this.curUser === null) {
              let successMsg: string = 'Logged out';
              this.toastHandler(successMsg);
              //this.navCtrl.parent.parent.getActiveChildNavs()[0].select(0);
            } else {
              let errMsg: string = 'Logout error'
              this.toastHandler(errMsg);
            }*/
            /** END DUMMY LOGOUT */
          }
        }
      ]
    }).present();
    this.navCtrl.popToRoot();
  }

  onShowCart() {
    this.navCtrl.push('ShoppingCartPage');
  }

  onShowAdminOptions() {
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
  }

  onAnonClick() {
    let msg: string = 'You are not logged in';
    this.toastHandler(msg);
  }

  private toastHandler(msg: string) {
    this.toastCtrl.create({
      message: msg,
      position: 'middle',
      duration: 1500
    }).present();
  }

  doLogin() {
    this.navCtrl.push('LoginPage');
  }

}
