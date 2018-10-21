import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { FirstRunPage, MainPage, WelcomePage } from '../pages';
import { Settings } from '../providers';

@Component({
  template: `<ion-menu [content]="content">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{'LANGUAGE_SELECTION_TITLE' | translate}}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let l of languages" (click)="changeLanguage(l)">
          {{l.title}}
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  // tslint:disable-next-line:no-unused-variable
  private rootPage: any;

  @ViewChild(Nav) nav: Nav;
  languages = [
    { title: 'English', shortVersion: 'gb' },
    { title: 'Russian', shortVersion: 'ru' },
  ]

  constructor(private translate: TranslateService,
    platform: Platform,
    private settings: Settings,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen) {
    settings.load()
      .then(() => settings.getValue('SEEN_TUTORIAL'))
      .then(value => {
        // this.rootPage = value ? WelcomePage : FirstRunPage;
        this.rootPage = value ? MainPage : FirstRunPage;
        settings.setValue('SEEN_TUTORIAL', true);
        platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
          this.statusBar.styleDefault();
          this.splashScreen.hide();
        });
        this.initTranslate();
      });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    this.settings.getValue('LANGUAGE')
      .catch(() => {
        return this.translate.getBrowserLang();
      })
      .then(twoLetterLang => {
        if (twoLetterLang) {
          this.translate.use(twoLetterLang);
        } else {
          this.translate.use('en'); // Set your language here
        }

        this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
          this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
        });
      });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  changeLanguage(lang) {
    this.settings.setValue('LANGUAGE', lang.shortVersion);
    this.initTranslate();
  }
}
