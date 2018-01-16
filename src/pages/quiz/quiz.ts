import { Component, ViewChild } from '@angular/core';

import { IonicPage, 
         ViewController, 
         NavParams, 
         Button, 
         Slides }               from 'ionic-angular';

//import { Question, SurveyOpt }  from '../../models/question.model';
//import { Setting }              from '../../models/user.model';


@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {

  @ViewChild('quiz') quiz: Slides;
  @ViewChild('prevSlide') prevSlide: Button;
  @ViewChild('nextSlide') nextSlide: Button;
  curSlide: number;    
  isLastSlide: boolean = false;
  isFirstSlide: boolean = true;

  myGender: string;
  myBirthdate: string;
  myStatus: boolean = false;

  genderOpts: string[] = [
    'female',
    'male',
    'transgender'
  ];
  selectedDate: string;



  constructor(public viewCtrl: ViewController, 
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizPage');
  }

  onSetGender(g: string) {
    this.myGender = g;
    this.onNextSlide();
  }  

  onPrevSlide() {
    setTimeout(() =>{
      if (!this.isFirstSlide) {
        this.quiz.slidePrev();
        this.isFirstSlide = this.quiz.isBeginning();
        this.isLastSlide = this.quiz.isEnd();
      }
    }, 300);
  }
  
  onNextSlide() {
    setTimeout(()=> {
      this.quiz.slideNext();
      this.isFirstSlide = this.quiz.isBeginning();
      this.isLastSlide = this.quiz.isEnd();
    }, 300);
  }

  dismiss() {
    const data = {
      gender: this.myGender,
      birthdate: this.myBirthdate,
      status: this.myStatus
    };

    this.viewCtrl.dismiss(data);
  }


  private updateSlideControls() {
    
  }

}
