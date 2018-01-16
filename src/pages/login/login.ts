import { Component, OnInit } from '@angular/core';
import { NgForm }            from '@angular/forms';

import { IonicPage, 
         NavController, 
         NavParams, 
         LoadingController, 
         ToastController }   from 'ionic-angular';

import { AuthService }       from '../../app/shared/services/auth.service';
import { AppUser }           from '../../app/shared/models/app-user.model';

import { Observable }        from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {

  appUser$: AppUser;
  status: string = 'signin';
  returnPage: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private authService: AuthService) {
    this.returnPage = (this.navParams.data) ? this.navParams.data.returnPage : null;
  }

  ngOnInit() {
    this.authService.appUser$.subscribe((user) => {
      if (!user) return;
      this.appUser$ = user;
    });
  }

  ionViewCanEnter(): boolean {
    return (!this.appUser$) ? true : false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    
  }

  doLoginEmail(form: NgForm) {
    let loader = this.loadingCtrl.create({
      content: 'Logging in'
    });

    loader.present();

    loader.onDidDismiss((data) => {
      console.log(data); 

      const successMsg: string = 'Success: Logged in as ';
      const errMsg: string = 'Error: Login failed ';

      if (this.appUser$ != null || this.appUser$ != undefined) {
        this.handleToast(successMsg + this.appUser$.name);
        this.handleLoginRedirect(this.returnPage);
      } else {
        this.handleToast(errMsg + data.message);
      }
    });

    const email: string = form.value.lEmail;
    const password: string = form.value.lPassword;

    this.authService.loginEmail(email, password)
      .then((data) => {
        //console.log(data);
        loader.dismiss(data);
      })
      .catch((error) => {
        console.log(error.message);
        loader.dismiss(error);
      });
    
  }

  doLogin(method: string, form?: NgForm) {
    
    let loader = this.loadingCtrl.create({
      content: 'Logging in'
    });

    loader.present();

    loader.onDidDismiss((data) => {
      console.log(data); 
      const successMsg: string = 'Success: Logged in as ';
      const errMsg: string = 'Error: Login failed ';
      if (this.appUser$ != null || this.appUser$ != undefined) {
        this.handleToast(successMsg + this.appUser$.name);
        this.handleLoginRedirect(this.returnPage);
      } else {
        this.handleToast(errMsg + data.message);
      }
    });

    /** EMAIL LOGIN */
    if (method === 'email' && form.valid) {
      const email: string = form.value.lEmail;
      const password: string = form.value.lPassword;

      this.authService.loginEmail(email, password)
        .then((data) => {
          //console.log(data);
          loader.dismiss(data);
        })
        .catch((error) => {
          console.log(error.message);
          loader.dismiss(error);
        });
    }
    /** GOOGLE LOGIN */
    else if (method === 'google') {
      this.authService.loginGoogle()
        .then((data) => {
          //console.log(data);
          loader.dismiss(data);
        })
        .catch((error) => {
          console.log(error.message);
          loader.dismiss(error);
        });
      }
  }

  doRegister(form: NgForm) {
    let loader = this.loadingCtrl.create({
      content: 'Logging in'
    });

    loader.present();

    loader.onDidDismiss((data) => {
      const successMsg: string = 'Success: Reigstered as ';
      const errMsg: string = 'Error: Registration failed ';
      if(this.appUser$ && this.appUser$.name) {
        this.handleToast(successMsg + this.appUser$.name);
        this.handleLoginRedirect(this.returnPage);
      } else {
        this.handleToast(errMsg + data.message);
      }
    });

    this.authService.register(form.value.rEmail, form.value.rPassword).then((data) => {
      loader.dismiss(data);
    }).catch((error) => {
      loader.dismiss(error.message);
      console.log(error.message);
    });
    
  }

  private handleToast(msg: string) {
    this.toastCtrl.create({
      message: msg,
      position: 'middle',
      duration: 500
    }).present();
  }

  private handleLoginRedirect(page: string) {
    let tabs: string[] = [
      'FeaturedPage',
      'ProductsPage',
      'ShoppingCartPage',
      'HomePage'
    ];
    if (page == null || page == undefined || page == '') {
      this.navCtrl.setRoot('TabsPage', { selectedIndex: 0 });
    }
    
    if (tabs.indexOf(page) !== -1) {
      for (let page of tabs) {
        if (page === page) {
          this.navCtrl.setRoot('TabsPage', {selectedIndex: tabs.indexOf(page) });
        }
      }
    }
    else if (page === 'CheckoutPage') {
      this.navCtrl.setRoot('TabsPage', { selectedIndex: 2 }).then(() => {
        this.navCtrl.push(page);
      }).catch((error) => console.log(error));
    }
    else {
      this.navCtrl.setRoot('TabsPage', { selectedIndex: 2 });
    }
    
    
  }
}
