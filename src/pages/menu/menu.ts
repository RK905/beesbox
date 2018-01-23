import { Component, 
         ViewChild, 
         OnInit }               from '@angular/core';

import { IonicPage, 
         Nav,
         NavController, 
         NavParams,
         AlertController,
         LoadingController,
         ToastController }      from 'ionic-angular';

import { UserAuthService }          from '../../app/shared/services/user-auth.service';
import { DataService }        from '../../app/shared/services/data.service';
import { HelperService }        from '../../app/shared/services/helper.service';
import { WooCommerceService }   from '../../app/shared/services/woocommerce.service';
import { AppUser }              from '../../app/shared/models/app-user.model';
import { Category } from '../../app/shared/models/category.model';

import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { LoginResponse } from '../../app/shared/models/login-response.model';


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage implements OnInit {

  @ViewChild(Nav) nav: Nav;
  menuRoot: string = 'TabsPage';

  curPage: string;
  appUser: AppUser;
  catList: Category[];

  categoryIcons: string[] = [
    'bug',
    'code',
    'browsers',
    'grid'
  ];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private authService: UserAuthService,
              private dataService: DataService,
              private helperService: HelperService,
              private wooService: WooCommerceService) { 
  }

  async ngOnInit() {
    this.authService.appUser$.subscribe((appUser: AppUser) => {
      this.appUser = appUser;
    });
    console.log(`appuser = ${this.appUser}`);
    /*this.authService.appUser$
        .subscribe((user: AppUser) => this.appUser = user);*/

    
    this.helperService.curPage$.subscribe((page) => this.curPage = page);
    this.getCategories();
  }

  ionViewCanEnter(): boolean {
    let bool: boolean;
    this.authService.getAuthenticatedUser()
      .subscribe((user: firebase.User) => {
        bool = (!user) ? false : true;
      });
      return bool;
  }

  

  async getCategories() {
    this.catList = await this.wooService.getAllCategories();
  }

  setRoot(page: string) {
    
    this.menuRoot = page;
    this.nav.setRoot(page);
  }

  doLogout() {
    let load = this.loadingCtrl.create({ content: 'Signing out...' });

    load.present();

    load.onDidDismiss(() => {
      let msg: string = !this.appUser ? 'Error: Logout failed' : 'Success: Logged out';
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
              load.dismiss();
              this.navCtrl.popToRoot()
                .then(() => this.navCtrl.setRoot('LoginPage'));
            });
          }
        }
      ]
    }).present();
    

    console.log('auth = ' + this.appUser.name);
  }

  navHome() {
    if (this.menuRoot === 'TabsPage') this.nav.getActiveChildNavs[0].select(0);
    else this.nav.setRoot('TabsPage', { selectedIndex: 0 });
    
    
  }

  showAllCategories() {
    this.nav.getActiveChildNavs()[0].select(1);
  }


  private handleToast(msg: string) {
    this.toastCtrl.create({
      message: msg,
      position: 'middle',
      duration: 500
    }).present();
  }

  private async logoutAlert() {
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
              this.navCtrl.popToRoot()
                .then(() => this.navCtrl.setRoot('LoginPage'));
            });
          }
        }
      ]
    }).present();
  }

}
