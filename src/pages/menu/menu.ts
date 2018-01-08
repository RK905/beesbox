import { Component }       from '@angular/core';
import { IonicPage, 
         NavController, 
         NavParams,
         LoadingController,
         ToastController } from 'ionic-angular';

import { AuthService }     from '../../app/shared/services/auth.service';
import { HelperService }   from '../../app/shared/services/helper.service';
import { UserService }     from '../../app/shared/services/user.service';

import { Observable }      from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  menuRoot: string = 'TabsPage';
  isAuthenticated: Observable<boolean>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public authService: AuthService,
              public helperService: HelperService,
              public userService: UserService) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  setRoot(page: string) {
    
    this.menuRoot = page;
  }

  doLogout() {
    let load = this.loadingCtrl.create({
      content: 'Signing out...'
    });

    load.present();

    load.onDidDismiss(() => {
      let msg: string = this.isAuthenticated ? 'Success: Logged out' : 'Error: Logut failed';
      this.handleToast(msg);
    });


    this.authService.logout();
    load.dismiss();
    console.log('auth = ' + this.isAuthenticated);
  }


  private handleToast(msg: string) {
    this.toastCtrl.create({
      message: msg,
      position: 'middle',
      duration: 500
    }).present();
  }

}
