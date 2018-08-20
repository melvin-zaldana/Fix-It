import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, App, ToastController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Observable } from 'rxjs/Observable';

import { TabsNavigationPage } from '../pages/tabs-navigation/tabs-navigation';
import { FormsPage } from '../pages/forms/forms';
import { LayoutsPage } from '../pages/layouts/layouts';
import { WalkthroughPage } from '../pages/walkthrough/walkthrough';
import { SettingsPage } from '../pages/settings/settings';
import { FunctionalitiesPage } from '../pages/functionalities/functionalities';
import { FirebaseLoginPage } from '../pages/firebase-integration/firebase-login/firebase-login';
import { WordpressMenuPage } from '../pages/wordpress-integration/wordpress-menu/wordpress-menu';
import { AgendaPage } from '../pages/agenda/agenda';
import { EstatusPage } from '../pages/estatus/estatus';
import { TermsOfServicePage } from '../pages/terms-of-service/terms-of-service';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { Events } from 'ionic-angular';

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
    public events: Events
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
          /*this.translate.get('HOME'),
          this.translate.get('FORMS'),
          this.translate.get('FUNCTIONALITIES'),
          this.translate.get('LAYOUTS'),
          this.translate.get('SETTINGS'),
          this.translate.get('WORDPRESS_INTEGRATION'),
          this.translate.get('FIREBASE_INTEGRATION'),*/
          this.translate.get('Estatus de servicio'),
          this.translate.get('Agenda'),
          this.translate.get('Ayuda'),
          this.translate.get('TERMS_OF_USE')
        ).subscribe(data => {
          /*this.pages = [
            { title: data[0], icon: 'home', component: TabsNavigationPage },
            { title: data[1], icon: 'create', component: FormsPage },
            { title: data[2], icon: 'code', component: FunctionalitiesPage }
          ];

          this.pushPages = [
            { title: data[3], icon: 'grid', component: LayoutsPage },
            { title: data[4], icon: 'settings', component: SettingsPage },
            { title: data[5], icon: 'logo-wordpress', component: WordpressMenuPage },
            { title: data[6], icon: 'flame', component: FirebaseLoginPage },
            { title: data[7], icon: '', component: EstatusPage },
            { title: data[8], icon: '', component: AgendaPage },
            { title: data[9], icon: '', component: FirebaseLoginPage },
            { title: data[10], icon: '', component: TermsOfServicePage }
          ];*/
          this.pushPages = [
          
            { title: data[0], icon: '', component: EstatusPage },
            { title: data[1], icon: '', component: AgendaPage },
            { title: data[2], icon: '', component: FirebaseLoginPage },
            { title: data[3], icon: '', component: TermsOfServicePage }
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

  setName(name){
    this.nombre="Guillermo";
    console.log("se cambio nombre" +name);
  }


}
