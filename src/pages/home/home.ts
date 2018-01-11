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

  appUser$: any;
  newSettings: Setting;

  cartPage: string = 'ShoppingCartPage';
  ordersPage: string = 'MyOrdersPage';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private authService: AuthService,
    public helperService: HelperService) {

      this.authService.user$.subscribe((user) => {
        if (!user) return;
        this.appUser$ = this.authService.appUser$;
        console.log('curUser = ' + this.appUser$.name);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }  

  onShowQuizPage() {
    let quizModal = this.modalCtrl.create('QuizPage')
    quizModal.onDidDismiss((data: Setting) => {
      this.newSettings = <Setting>data;

      console.log(this.newSettings);
    });
    
    quizModal.present();
    //this.curUser$.userSettings = this.newSettings;
  }



  
}
