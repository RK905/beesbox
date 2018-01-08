import { BrowserModule }           from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule }  from '@angular/core';
import { HttpClientModule }        from '@angular/common/http';
import { HttpModule }              from '@angular/http';
import { environment }             from '../environments/environment';

import { IonicApp, 
         IonicErrorHandler, 
         IonicModule }             from 'ionic-angular';

import { AngularFireModule }       from 'angularfire2';
import { CoreModule }              from './core/core.module';
import { SharedModule }            from './shared/shared.module';

/*import { AuthService }      from '../services/auth.service';
import { SearchService }    from '../services/search.service';
import { HelperService }    from '../services/helper.service';
import { CategoryService }  from '../services/category.service';
import { UserService }      from '../services/user.service';*/
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
    //WooApiModule.forRoot(environment.wooConfig),
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
    //AngularFireDatabase,
    //WooApiService,
    //WooCommerceApi,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
