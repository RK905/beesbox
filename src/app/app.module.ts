import { BrowserModule }           from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule }  from '@angular/core';
import { HttpModule }              from '@angular/http';
import { environment }             from '../environments/environment';

import { IonicApp, 
         IonicErrorHandler, 
         IonicModule }             from 'ionic-angular';

import { AngularFireModule }       from 'angularfire2';
import { CoreModule }              from './core/core.module';
import { SharedModule }            from './shared/shared.module';

import { SplashScreen }     from '@ionic-native/splash-screen';
import { StatusBar }        from '@ionic-native/status-bar';
import { MyApp }            from './app.component';


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    CoreModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    IonicModule.forRoot(MyApp, {
      backButtonText: ''
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
