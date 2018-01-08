import { Component } from '@angular/core';

import { SearchService } from '../../services/search.service';


@Component({
  selector: 'search-toolbar',
  templateUrl: 'search-toolbar.html'
})
export class SearchToolbarComponent {

  selectedView: string = 'list';
  myQuery: string;
  constructor(public searchService$: SearchService) {

  }

  onToggleView(event: Event) {
    this.searchService$.view.emit(this.selectedView);
  }

}
