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

  curUser$: Observable<firebase.User>;
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
  }

  doLogin(form: NgForm) {
    let email: string = form.value.email;
    let password: string = form.value.password;

    let loader = this.loadingCtrl.create({
      content: 'Logging in'
    });

    loader.present();

    loader.onDidDismiss(() => {
      if (this.authService.user$) {
        console.log('a ' + this.authService.user$);
        let successMsg: string = 'Success: Logged in as ' + this.authService.user$;
        this.handleToast(successMsg);
      } else {
        let errMsg: string = 'Error: Login failed';
        this.handleToast(errMsg);
      }
    });
    this.authService.loginEmail(email, password)
      .then((data) => {
        //console.log(data);
        loader.dismiss();
        this.navCtrl.setRoot('TabsPage');
      })
      .catch((error) => {
        console.log(error.message);
        loader.dismiss();
      });
    /*this.authService.signinEmail(form.value.email, form.value.password)
      .then((data) => {
        //console.log(data);
        loader.dismiss();
        this.navCtrl.setRoot('TabsPage');
      })
      .catch((error) => {
        console.log(error.message);
        loader.dismiss();
      });*/
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
