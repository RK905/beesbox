import { NgModule } from '@angular/core';
import { CoreModule } from '../../app/core/core.module';
import { SharedModule } from '../../app/shared/shared.module';

import { IonicPageModule } from 'ionic-angular';

import { ProductsPage } from './products';


@NgModule({
  declarations: [
    ProductsPage
  ],
  imports: [
    CoreModule,
    SharedModule,
    IonicPageModule.forChild(ProductsPage)
  ],
  exports: [
    ProductsPage
  ]
})
export class ProductsPageModule {}
