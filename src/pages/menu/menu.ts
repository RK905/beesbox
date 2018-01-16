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

import { AuthService }          from '../../app/shared/services/auth.service';
import { HelperService }        from '../../app/shared/services/helper.service';
import { WooCommerceService }   from '../../app/shared/services/woocommerce.service';
import { AppUser }              from '../../app/shared/models/app-user.model';


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage implements OnInit {

  @ViewChild(Nav) nav: Nav;
  menuRoot: string = 'TabsPage';
  loginPage: string = 'LoginPage';

  curPage$: string;
  appUser$: AppUser;
  catList: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private authService: AuthService,
              private helperService: HelperService,
              private wooService: WooCommerceService) { 
  }

  async ngOnInit() {
    this.authService.appUser$.subscribe((user) => {
      if (!user) return;
      this.appUser$ = user;
    });

    this.helperService.curPage.subscribe((page) => this.curPage$ = page);
    this.getCategories();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');

    
  }

  async getCategories() {
    this. catList = await this.wooService.getAllCategories();
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
    if (this.menuRoot === 'TabsPage') return;
    this.nav.setRoot('TabsPage', { selectedIndex: 0 });
    
    
  }


  private handleToast(msg: string) {
    this.toastCtrl.create({
      message: msg,
      position: 'middle',
      duration: 500
    }).present();
  }
}
