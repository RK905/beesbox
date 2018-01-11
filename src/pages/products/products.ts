import { Component, OnInit }  from '@angular/core';

import { IonicPage, 
         NavController, 
         NavParams }          from 'ionic-angular';

import {ToolbarAnimation }    from '../../animations/toolbar.animation';
import { AuthService }        from '../../app/shared/services/auth.service';
import { HelperService }      from '../../app/shared/services/helper.service';
import { WooCommerceService }      from '../../app/shared/services/woocommerce.service';
import { AppUser } from '../../app/shared/models/app-user.model';


@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
  animations: [
    ToolbarAnimation
  ]
})
export class ProductsPage implements OnInit {

  wooCom: any;
  appUser$: any;
  selectedView: string = 'list';

  isXs: boolean;
  isSm: boolean;
  isLg: boolean;

  productList$: any;
  sampleProducts: any[] = [
    {
      title: 'Item 1',
      desc: 'This is item 1',
      img: 'book',
      price: '5.00'
    }, {
      title: 'Item 2',
      desc: 'This is item 2',
      img: 'book',
      price: '10.00'
    }, {
      title: 'Item 3',
      desc: 'This is item 3',
      img: 'book',
      price: '7.00'
    }, {
      title: 'Item 4',
      desc: 'This is item 4',
      img: 'book',
      price: '17.00'
    }, {
      title: 'Item 5',
      desc: 'This is item 5',
      img: 'book',
      price: '99.00'
    }
  ];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private wooService: WooCommerceService,
    private authService: AuthService, 
    public helperService: HelperService) {

      this.authService.user$.subscribe((user) => {
        if (!user) return;
        this.appUser$ = this.authService.appUser$;
        console.log('curUser = ' + this.appUser$.name);
      });

      this.wooCom = this.wooService.init();

      this.wooCom.getAsync('products').then((products) => {
        this.productList$ = JSON.parse(products.toJSON().body);
        console.log(...this.productList$);
      }).catch((error) => {
        console.log(error);
      });

      this.isSm = true;
      this.isLg = false;
      this.isXs = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
    
    
  }

  showProductDetails(product) {
    this.navCtrl.push('ProductDetailsPage', { product: product });
  }

  onReduceGrid() {

    if (this.isXs) return;
    else if (this.isSm) {
      this.isSm = !this.isSm;
      this.isXs = !this.isXs;
    }
    else {//this.isLg
      this.isLg = !this.isLg;
      this.isSm = !this.isSm;
    }
  }

  onIncreaseGrid() {
    if (this.isLg) return;
    else if (this.isSm) {
      this.isSm = !this.isSm;
      this.isLg = !this.isLg;
    }
    else { //this.isXs
      this.isXs = !this.isXs;
      this.isSm = !this.isSm
    }
  }


  ngOnInit() {
    

    
  }

}
