import { Component } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';


@Component({
  selector: 'new-product',
  templateUrl: 'new-product.html'
})
export class NewProductComponent {

  categories$;

  constructor(catService: CategoryService) {
    this.categories$ = catService.getAll();
  }

}
