import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoreModule } from '../../app/core/core.module';
import { ShoppingCartPage } from './shopping-cart';

@NgModule({
  declarations: [
    ShoppingCartPage,
  ],
  imports: [
    CoreModule,
    IonicPageModule.forChild(ShoppingCartPage),
  ],
  exports: [
    ShoppingCartPage
  ]
})
export class ShoppingCartPageModule {}
