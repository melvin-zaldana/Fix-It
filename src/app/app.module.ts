import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../environment/environment';

import { NgCalendarModule  } from 'ionic2-calendar';
import { LOCALE_ID } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);

//pages
import { ListingPage } from '../pages/listing/listing';
import { HomePage } from '../pages/home/home';
import { AgendaPage } from '../pages/agenda/agenda';
import { EstatusPage } from '../pages/estatus/estatus';
import { ConstruccionPage } from '../pages/construccion/construccion';
import { RemodelacionPage } from '../pages/remodelacion/remodelacion';
import { ReparacionPage } from '../pages/reparacion/reparacion';
import { MantenimientoPage } from '../pages/mantenimiento/mantenimiento';
import { LoginPage } from '../pages/login/login';
import { NotificationsPage } from '../pages/notifications/notifications';
import { ProfilePage } from '../pages/profile/profile';
import { TabsNavigationPage } from '../pages/tabs-navigation/tabs-navigation';
import { WalkthroughPage } from '../pages/walkthrough/walkthrough';
import { SettingsPage } from '../pages/settings/settings';
import { SignupPage } from '../pages/signup/signup';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';


import { FormLayoutPage } from '../pages/form-layout/form-layout';

import { TermsOfServicePage } from '../pages/terms-of-service/terms-of-service';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { FormValidationsPage } from '../pages/form-validations/form-validations';
import { FacebookLoginPage } from '../pages/facebook-login/facebook-login';


//firebase integration
import { FirebaseFeedPage } from '../pages/firebase-integration/firebase-feed/firebase-feed';
import { FirebaseNewUserModalPage } from '../pages/firebase-integration/firebase-new-user-modal/firebase-new-user-modal';
import { FirebaseDetailsPage } from '../pages/firebase-integration/firebase-details/firebase-details';
import { FirebaseAvatarSelect } from '../pages/firebase-integration/firebase-avatar-select/firebase-avatar-select';
import { FirebaseProfilePage } from '../pages/firebase-integration/firebase-profile/firebase-profile';
import { FirebaseSignupPage } from '../pages/firebase-integration/firebase-signup/firebase-signup';
import { FirebaseLoginPage } from '../pages/firebase-integration/firebase-login/firebase-login';
import { FirebaseTabsNavigationPage } from '../pages/firebase-integration/firebase-tabs-navigation/firebase-tabs-navigation';


//custom components
import { PreloadImage } from '../components/preload-image/preload-image';
import { BackgroundImage } from '../components/background-image/background-image';
import { ShowHideContainer } from '../components/show-hide-password/show-hide-container';
import { ShowHideInput } from '../components/show-hide-password/show-hide-input';
import { ColorRadio } from '../components/color-radio/color-radio';
import { CounterInput } from '../components/counter-input/counter-input';
import { Rating } from '../components/rating/rating';
import { GoogleMap } from '../components/google-map/google-map';
import { VideoPlayerModule } from '../components/video-player/video-player.module';
import { ValidatorsModule } from '../components/validators/validators.module';

//services
import { ListingService } from '../pages/listing/listing.service';
import { ProfileService } from '../pages/profile/profile.service';
import { NotificationsService } from '../pages/notifications/notifications.service';
import { FacebookLoginService } from '../pages/facebook-login/facebook-login.service';
import { FirebaseService } from '../pages/firebase-integration/firebase-integration.service';
import { FirebaseAuthService } from '../pages/firebase-integration/firebase-auth.service';
import { LanguageService } from '../providers/language/language.service';

// Ionic Native Plugins
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NativeStorage } from '@ionic-native/native-storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Keyboard } from '@ionic-native/keyboard';
import { Geolocation } from '@ionic-native/geolocation';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { AdMobFree } from '@ionic-native/admob-free';
import { AppRate } from '@ionic-native/app-rate';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { EmailComposer } from '@ionic-native/email-composer';
import { Camera } from '@ionic-native/camera';

//Angular Fire
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FcmProvider } from '../providers/fcm/fcm';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    MyApp,
    ListingPage,
    HomePage,
    AgendaPage,
    EstatusPage,
    ConstruccionPage,
    RemodelacionPage,
    ReparacionPage,
    MantenimientoPage,
    LoginPage,
    NotificationsPage,
    ProfilePage,
    TabsNavigationPage,
    WalkthroughPage,
    SettingsPage,
    SignupPage,
    ForgotPasswordPage,
    FormLayoutPage,
    TermsOfServicePage,
    PrivacyPolicyPage,

    //functionalities
    FacebookLoginPage,
		FormValidationsPage,

    //firebase integration
    FirebaseFeedPage,
    FirebaseNewUserModalPage,
		FirebaseDetailsPage,
		FirebaseAvatarSelect,
    FirebaseLoginPage,
    FirebaseProfilePage,
		FirebaseSignupPage,
    FirebaseTabsNavigationPage,

    //custom components
    PreloadImage,
    BackgroundImage,
    ShowHideContainer,
    ShowHideInput,
    ColorRadio,
    CounterInput,
    Rating,
    GoogleMap
  ],
  imports: [
    BrowserModule,
    NgCalendarModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
			modalEnter: 'modal-slide-in',
			modalLeave: 'modal-slide-out',
			pageTransition: 'ios-transition',
			swipeBackEnabled: false
		}),
		TranslateModule.forRoot({
    loader: {
				provide: TranslateLoader,
				useFactory: (createTranslateLoader),
				deps: [HttpClient]
			}
		}),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
		VideoPlayerModule,
		ValidatorsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListingPage,
    HomePage,
    AgendaPage,
    ConstruccionPage,
    RemodelacionPage,
    ReparacionPage,
    MantenimientoPage,
    EstatusPage,
    LoginPage,
    NotificationsPage,
    ProfilePage,
    TabsNavigationPage,
    WalkthroughPage,
    SettingsPage,
    ForgotPasswordPage,
    SignupPage,
    FormLayoutPage,
    TermsOfServicePage,
    PrivacyPolicyPage,
    FacebookLoginPage,
		FormValidationsPage,

    //firebase integration
    FirebaseFeedPage,
    FirebaseNewUserModalPage,
		FirebaseDetailsPage,
		FirebaseAvatarSelect,
    FirebaseLoginPage,
		FirebaseSignupPage,
    FirebaseTabsNavigationPage,
    FirebaseProfilePage,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-SV' },
    ListingService,
    ProfileService,
    NotificationsService,
    //functionalities
    FacebookLoginService,
		LanguageService,
    FirebaseAuthService,
		FirebaseService,
    //ionic native plugins
	  SplashScreen,
	  StatusBar,
      Camera,
    SocialSharing,
    NativeStorage,
    InAppBrowser,
    Facebook,
    GooglePlus,
    Keyboard,
    Geolocation,
    TwitterConnect,
		AdMobFree,
		AppRate,
		ImagePicker,
		Crop,
		EmailComposer,
    FcmProvider
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
