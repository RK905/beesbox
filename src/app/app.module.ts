import { BrowserModule }           from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, 
         NgModule, 
         //isDevMode
         }               from '@angular/core';
import { HttpModule }              from '@angular/http';
import { IonicStorageModule }      from '@ionic/storage';
import { environment }             from '../environments/environment';


//import { NgRedux, NgReduxModule, DevToolsExtension } from 'ng2-redux';
//import { rootReducer, INITIAL_STATE, IAppState } from './store';
//import { fromJS, Map } from 'immutable';

import { IonicApp, 
         IonicErrorHandler, 
         IonicModule }             from 'ionic-angular';

import { AngularFireModule }       from 'angularfire2';
import { CoreModule }              from './core/core.module';
import { SharedModule }            from './shared/shared.module';

import { SplashScreen }     from '@ionic-native/splash-screen';
import { StatusBar }        from '@ionic-native/status-bar';
import { NativeStorage } from '@ionic-native/native-storage';
import { MyApp }            from './app.component';


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    //NgReduxModule,
    CoreModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    IonicStorageModule.forRoot(),
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
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
  /*constructor(ngRedux: NgRedux<IAppState>,
              devTools: DevToolsExtension) {

    const enhancers: any[] = isDevMode() ? [devTools.enhancer()] : [];

    ngRedux.configureStore(rootReducer, fromJS(INITIAL_STATE), [], enhancers);
  }*/
}
