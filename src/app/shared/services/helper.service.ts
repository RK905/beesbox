import { Injectable }      from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class HelperService {

    curPage: BehaviorSubject<string> = new BehaviorSubject<string>('FeaturedPage');

    changePage(page: string) {
        this.curPage.next(page);
    }
}