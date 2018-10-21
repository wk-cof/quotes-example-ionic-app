import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import _ from 'lodash';
import firebase from 'firebase';
import { SupportedLanguage } from '../../constants/language';
import { Settings } from '../../providers';

/**
 * Generated class for the QuotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage {
  public quotes;
  public currentQuote = 0;
  private dbLanguage: SupportedLanguage = 'en';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService,
    private settings: Settings,
  ) {
    this.quotes = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuotesPage');
    this.resetQuotes();
    this.settings.getValue('LANGUAGE')
      .then(language => {
        this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
          this.resetQuotes();
        });
      });

  }

  private resetQuotes() {
    this.settings.load()
    .then(() => {
      return this.translate.get(['DATABASE_NAME']). subscribe(values => {
        return firebase.database().ref(`/${values.DATABASE_NAME}`).once('value')
          .then((snapshot) => {
            this.quotes = _.values(snapshot.val());
          });
      });
    });
  }

  processQuotesText(quotes) {
    _.map(quotes, quote => {
      return quote.text;
    });
  }

  nextQuote() {
    this.currentQuote++;
    if (this.currentQuote >= this.quotes.length) {
      this.currentQuote = 0;
    }
  }

  prevQuote() {
    this.currentQuote--;
    if (this.currentQuote < 0) {
      this.currentQuote = 0;
    }
  }

  addQuote() {
    this.navCtrl.setRoot('AddQuotePage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  fullLinkBtnClick() {
    window.open(this.quotes[this.currentQuote].url, 'location=_blank');
  }

}
