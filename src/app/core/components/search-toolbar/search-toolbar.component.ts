import { Component }     from '@angular/core';

import { HelperService } from '../../../shared/services/helper.service';


@Component({
  selector: 'search-toolbar',
  templateUrl: 'search-toolbar.html'
})
export class SearchToolbarComponent {

  selectedView$: string;
  curSize$: number;
  
  constructor(private helperService: HelperService) {
    this.helperService.gridSize.subscribe((size) => this.curSize$ = size);

    this.helperService.selectedView.subscribe((view) => this.selectedView$ = view);
    console.log('selectedView$ = ' + this.selectedView$);
  }

  onIncreaseGrid() {
    this.helperService.changeGrid('up');
    console.log('curSize$ = ' + this.curSize$);
  }

  onDecreaseGrid() {
    this.helperService.changeGrid('down');
    console.log('curSize$ = ' + this.curSize$);
  }

  onViewChange() {
    let newView: string = this.selectedView$ === 'list' ? 'grid' : 'list';
    this.helperService.setView(newView);
    //console.log('currentView = ' + this.selectedView$);
    //console.log('newView = ' + newView);
    //this.helperService.setView(newView);
  }




}
