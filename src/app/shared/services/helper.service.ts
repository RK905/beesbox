import { Injectable }      from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class HelperService {

    curPage: BehaviorSubject<string>      = new BehaviorSubject<string>('FeaturedPage');
    selectedView: BehaviorSubject<string> = new BehaviorSubject<string>('list');

    gridSize: BehaviorSubject<number> = new BehaviorSubject<number>(1);

    isXs: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isSm: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    isLg: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    changePage(page: string) {
        this.curPage.next(page);
    }

    changeGrid(method: string) {
        let curVal: number = this.gridSize.getValue();

        if (method === 'up') {
            if (curVal < 2) {
                this.gridSize.next(curVal + 1);
            }

            /*if (this.isLg.getValue() === true) return;

            if (this.isXs.getValue() === true) {
                this.isXs.next(false);
                this.isSm.next(true);
                this.isLg.next(false);
            }
            if (this.isSm.getValue() === true) {
                this.isXs.next(false);
                this.isSm.next(false);
                this.isLg.next(true);
            }*/
        }

        else if (method === 'down') {
            if (curVal > 0) {
                this.gridSize.next(curVal - 1);
            }
            /*if (this.isXs.getValue() === true) return;

            if (this.isLg.getValue() === true) {
                this.isLg.next(false);
                this.isSm.next(true);
                this.isXs.next(false);
            }
            if (this.isSm.getValue() === true) {
                this.isLg.next(false);
                this.isSm.next(false);
                this.isXs.next(true);
            }*/
        }
    }

    setView(newView: string) {
        this.selectedView.next(newView);
    }
}