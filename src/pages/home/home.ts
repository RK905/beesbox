import { Component }       from '@angular/core';
import { IonicPage,
         NavController, 
         NavParams, 
         ModalController } from 'ionic-angular';

import { AuthService }     from '../../app/shared/services/auth.service';
import { HelperService }   from '../../app/shared/services/helper.service';
import { User, Setting }   from '../../models/user.model';

import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  curUser$: firebase.User;
  newSettings: Setting;
  isAuthenticated: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private authService: AuthService,
    public helperService: HelperService) {
  }

  ionViewDidLoad() {
    /*this.authService.curUser$.subscribe((user: User) => {
      this.curUser$ = user;
      console.log('curUser = ' + this.curUser$);
    });*/
    

    console.log('ionViewDidLoad HomePage');
  }

  onNavHome() {
    this.navCtrl.popToRoot();
  }

  onShowCartPage() {
    this.navCtrl.push('ShoppingCartPage');
  }

  onShowOrdersPage() {
    this.navCtrl.push('MyOrdersPage');
  }

  onShowQuizPage() {
    let quizModal = this.modalCtrl.create('QuizPage')
    quizModal.onDidDismiss((data: Setting) => {
      this.newSettings = <Setting>data;

      console.log(this.newSettings);
    });
    
    quizModal.present();
    this.curUser$.userSettings = this.newSettings;
  }



  
}
