import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HelperService } from '../../app/shared/services/helper.service';


export interface Page {
  rootPage: string;
  title: string;
  icon: string;
}


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tabList: Page[] = [{
    rootPage: 'FeaturedPage',
    title: 'Featured',
    icon: 'star'
  }, {
    rootPage: 'ProductsPage',
    title: 'Browse',
    icon: 'search'
  }, {
    rootPage: 'HomePage',
    title: 'Account',
    icon: 'person'
  }];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public helperService: HelperService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

  onPageChange(event: Event) {
    let newPage: string = this.navCtrl.getActiveChildNavs()[0].getSelected().root;
    this.helperService.changePage(newPage);
  }

}
