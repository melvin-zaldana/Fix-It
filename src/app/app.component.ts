import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, App, ToastController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Observable } from 'rxjs/Observable';

import { TabsNavigationPage } from '../pages/tabs-navigation/tabs-navigation';

import { WalkthroughPage } from '../pages/walkthrough/walkthrough';
import { SettingsPage } from '../pages/settings/settings';
import { FirebaseLoginPage } from '../pages/firebase-integration/firebase-login/firebase-login';
import { AgendaPage } from '../pages/agenda/agenda';
import { EstatusPage } from '../pages/estatus/estatus';
import { TermsOfServicePage } from '../pages/terms-of-service/terms-of-service';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { Events } from 'ionic-angular';

//Push notification - active app
import { FcmProvider } from '../providers/fcm/fcm';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';

import { Firebase } from '@ionic-native/firebase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  // make WalkthroughPage the root (or first) page
  rootPage: any = WalkthroughPage;
  // rootPage: any = TabsNavigationPage;
  textDir: string = "ltr";
  nombre: string;
  photoURL: string;

  pages: Array<{title: any, icon: string, component: any}>;
  pushPages: Array<{title: any, icon: string, component: any}>;

 
  constructor(
    platform: Platform,
    public menu: MenuController,
    public app: App,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public translate: TranslateService,
    public toastCtrl: ToastController,
    public events: Events,
    public firebase: Firebase,
    fcm: FcmProvider
  ) {

    //----escucha el evento en login y signup para mostrar nombre y foto
    events.subscribe('user:created', (user, photo) => {
    // user and time are the same arguments passed in `events.publish(user, time)`
    this.nombre = user;
    this.photoURL = photo;
    
  });

    translate.setDefaultLang('es');
    translate.use('es');
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.splashScreen.hide();
      this.statusBar.styleDefault();
      
      // Push notification - Get a FCM token
      //fcm.getToken();

       // Listen to incoming messages
        fcm.listenToNotifications().pipe(
          tap(msg => {
            // show a toast
            const toast = toastCtrl.create({
              message: msg.body,
              duration: 3000
            });
            toast.present();
          })
        ).subscribe()

    });

    

    

    this.translate.onLangChange.subscribe((event: LangChangeEvent) =>
      {
        if(event.lang == 'ar')
        {
          platform.setDir('rtl', true);
        }
        else
        {
          platform.setDir('ltr', true);
        }
        Observable.forkJoin(
          this.translate.get('Estatus de servicio'),
          this.translate.get('Agenda'),
          this.translate.get('TERMS_OF_USE')
        ).subscribe(data => {
          this.pushPages = [
          
            { title: data[0], icon: '', component: EstatusPage },
            { title: data[1], icon: '', component: AgendaPage },
            { title: data[2], icon: '', component: TermsOfServicePage }
          ];
        });
      });

  }


 
  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  pushPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // rootNav is now deprecated (since beta 11) (https://forum.ionicframework.com/t/cant-access-rootnav-after-upgrade-to-beta-11/59889)
    this.app.getRootNav().push(page.component);
  }

  goToSettings() {
    // close the menu when clicking a link from the menu
    this.menu.close();
    this.app.getRootNav().push(SettingsPage);
  }

  Token(){
    this.firebase.getToken()
    .then(token => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
    .catch(error => console.error('Error getting token', error));
  }


}
