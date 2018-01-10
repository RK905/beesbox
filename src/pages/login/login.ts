import { Component } from '@angular/core';
import { NgForm }    from '@angular/forms';

import { IonicPage, 
         NavController, 
         NavParams, 
         LoadingController, 
         ToastController } from 'ionic-angular';

import { AuthService }     from '../../app/shared/services/auth.service';
import { Observable }      from 'rxjs/Observable';

import * as firebase       from 'firebase';
import { User }            from '../../models/user.model';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  appUser$: any;
  status: string = 'signin';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private authService: AuthService) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.authService.user$.subscribe((user) => {
      if (!user) return;
      this.appUser$ = this.authService.appUser$;
      console.log('user = ' + this.appUser$.name);
    })
  }

  doLogin(method: string, form?: NgForm) {
    
    let loader = this.loadingCtrl.create({
      content: 'Logging in'
    });

    loader.present();

    loader.onDidDismiss((data) => {
      if (data && data.user) {
        let successMsg: string = 'Success: Logged in as ' + this.appUser$.name;
        //console.log(data.user.displayName);
        /*console.log('a ' + this.appUser$.name);
        let successMsg: string = 'Success: Logged in as ' + this.appUser$.name;*/
        this.handleToast(successMsg);
      } else {
        let errMsg: string = 'Error: Login failed';
        this.handleToast(errMsg);
      }
    });

    /** EMAIL LOGIN */
    if (method === 'email' && form.valid) {
      const email: string = form.value.email;
      const password: string = form.value.password;

      this.authService.loginEmail(email, password)
        .then((data) => {
          //console.log(data);
          loader.dismiss();
          this.navCtrl.setRoot('TabsPage');
        })
        .catch((error) => {
          //console.log(error.message);
          loader.dismiss();
        });
    }
    /** GOOGLE LOGIN */
    else if (method === 'google') {
      this.authService.loginGoogle()
        .then((data) => {
          //console.log(data);
          loader.dismiss(data);
          this.navCtrl.setRoot('TabsPage');
        })
        .catch((error) => {
          //console.log(error.message);
          loader.dismiss();
        });
      }
  }

  doRegister(form: NgForm) {
    let loader = this.loadingCtrl.create({
      content: 'Logging in'
    });

    loader.present();

    loader.onDidDismiss(() => {
      /*if (this.authService.user$) {
        console.log('a ' + this.authService.user$);
        //let userMap = this.authService.curUser.map((user) => {

        //})
        let successMsg: string = 'Success: Logged in as ' + this.authService.user$;
        this.handleToast(successMsg);
      } else {
        let errMsg: string = 'Error: Login failed';
        this.handleToast(errMsg);
      }*/
    });


    /*this.authService.registerEmail(form.value.email, form.value.password)
      .then((data) => {
        //console.log(data)
        this.authService.signinEmail(form.value.email, form.value.password)
          .then((d) => {
            loader.dismiss();
            this.navCtrl.setRoot('TabsPage');
          })
          .catch((err) => {
            console.log(err.message);
            loader.dismiss();
          });
      })
      .catch((error) => {
        console.log(error.message);
        loader.dismiss();
      });*/
  }



  private handleToast(msg: string) {
    this.toastCtrl.create({
      message: msg,
      position: 'middle',
      duration: 500
    }).present();
  }
}
