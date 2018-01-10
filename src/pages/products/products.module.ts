import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoreModule } from '../../app/core/core.module';
import { ProductsPage } from './products';

@NgModule({
  declarations: [
    ProductsPage,
  ],
  imports: [
    CoreModule,
    IonicPageModule.forChild(ProductsPage),
  ],
  exports: [
    ProductsPage
  ]
})
export class ProductsPageModule {}
