import { Component, ViewChild } from '@angular/core';

import { Platform, Nav }        from 'ionic-angular';
import { StatusBar }            from '@ionic-native/status-bar';
import { SplashScreen }         from '@ionic-native/splash-screen';

import { UserAuthService }      from '../app/shared/services/user-auth.service';

import * as firebase            from 'firebase';
import { DataService }          from './shared/services/data.service';
import { AppUser }              from './shared/models/app-user.model';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav)
  nav: Nav;

  appUser: AppUser;
  rootPage: string = 'LoginPage';

  constructor(private platform: Platform, 
              private statusBar: StatusBar, 
              private splashScreen: SplashScreen,
              private authService: UserAuthService,
              private dataService: DataService
            ) {

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.dataService.checkStorage('user')
      .then((appUser: AppUser) => {
        if (appUser.email) {
          this.appUser = appUser;
          this.nav.setRoot('MenuPage');
        }
        else this.nav.setRoot('LoginPage');
        
      })
      .catch((error) => {
        console.log(error);
        this.authService.getAuthenticatedUser().subscribe((user: firebase.User) => {
          if (!user) this.nav.setRoot('LoginPage');
      });

    
    });
  }
}

