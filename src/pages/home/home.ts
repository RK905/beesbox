import { Component, OnInit } from '@angular/core';
import { IonicPage,
         NavController, 
         NavParams, 
         ModalController }   from 'ionic-angular';

import { AuthService }       from '../../app/shared/services/auth.service';
import { HelperService }     from '../../app/shared/services/helper.service';
import { AppUser }           from '../../app/shared/models/app-user.model';
//import { Setting }           from '../../models/user.model';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {

  appUser$: AppUser;
  newSettings;

  cartPage: string = 'ShoppingCartPage';
  ordersPage: string = 'MyOrdersPage';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private authService: AuthService,
    public helperService: HelperService) {

      
  }

  ngOnInit() {
    this.authService.appUser$.subscribe((user) => this.appUser$ = user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }  

  onShowQuizPage() {
    let quizModal = this.modalCtrl.create('QuizPage')
    quizModal.onDidDismiss((data) => {
      this.newSettings = data;

      console.log(this.newSettings);
    });
    
    quizModal.present();
    //this.curUser$.userSettings = this.newSettings;
  }



  
}
