import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoreModule } from '../../app/core/core.module';
import { LoginPage } from './login';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    CoreModule,
    IonicPageModule.forChild(LoginPage),
  ],
})
export class LoginPageModule {}
