import { Component, ViewChild } from '@angular/core';

import { IonicPage, 
         Nav,
         NavController, 
         NavParams,
         AlertController,
         LoadingController,
         ToastController }      from 'ionic-angular';

import { AuthService }          from '../../app/shared/services/auth.service';
import { HelperService }        from '../../app/shared/services/helper.service';
import { UserService }          from '../../app/shared/services/user.service';
import { WooCommerceService }   from '../../app/shared/services/woocommerce.service';


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  @ViewChild(Nav) nav: Nav;
  menuRoot: string = 'TabsPage';
  loginPage: string = 'LoginPage';
  appUser$: any;
  wooCom: any;
  catList$: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public authService: AuthService,
              public helperService: HelperService,
              public userService: UserService,
              private wooService: WooCommerceService) {

    this.authService.user$.subscribe( user => {
      if (!user) return;
      this.appUser$ = this.userService.getUser(user.uid);
    });
    this.wooCom = this.wooService.init();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');

    this.wooCom.getAsync('products/categories').then((categories) => {
      console.log(JSON.parse(categories.body).produc_categories);
      this.catList$ = JSON.parse(categories.toJSON().body);
      console.log(...this.catList$);
    }).catch((error) => {
      console.log(error);
    });
  }

  setRoot(page: string) {
    
    this.menuRoot = page;
    this.nav.setRoot(page);
  }

  doLogout() {
    let load = this.loadingCtrl.create({
      content: 'Signing out...'
    });

    load.present();

    load.onDidDismiss(() => {
      let msg: string = this.appUser$ != undefined ? 'Error: Logout failed' : 'Success: Logged out';
      this.handleToast(msg);
    });

    this.alertCtrl.create({
      title: 'Logout',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('logout cancelled');
          }
        }, {
          text: 'Logout',
          handler: () => {
            this.authService.logout().then(() => {
              this.appUser$ = null;
            });
            load.dismiss();
          }
        }
      ]
    }).present();

    console.log('auth = ' + this.appUser$.name);
  }

  navHome() {
    if (this.menuRoot === 'TabsPage') {
      let myRoot = this.nav.getActiveChildNavs()[0];

      if (this.nav.getActive().name !== 'FeaturedPage') {
        myRoot.select(0);
      }
    } else {
      this.nav.setRoot('TabsPage');
    }
    //console.log(this.nav.getActiveChildNavs()[0].getSelected().root);
    
    
  }


  private handleToast(msg: string) {
    this.toastCtrl.create({
      message: msg,
      position: 'middle',
      duration: 500
    }).present();
  }
}
