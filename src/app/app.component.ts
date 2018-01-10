import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthService } from '../app/shared/services/auth.service';
import { UserService } from '../app/shared/services/user.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: string = 'MenuPage';
  appUser$: any;

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              public authService: AuthService,
              public userService: UserService) {

    this.authService.user$.subscribe((user) => {
        if (!user) return;
        this.appUser$ = this.authService.appUser$;
        this.userService.saveUser(user);
      });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

