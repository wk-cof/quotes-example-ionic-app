import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import _ from 'lodash';
import firebase from 'firebase';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.quotes = [];
    firebase.database().ref('/quotes_ru').once('value')
      .then((snapshot) => {
        this.quotes = _.values(snapshot.val());
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuotesPage');
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
