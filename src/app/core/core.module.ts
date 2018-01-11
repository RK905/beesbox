import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports: [
        IonicModule,
        CommonModule,
        SharedModule
    ],
    providers: [],
    exports: [
        NavbarComponent
    ]
})
export class CoreModule {}