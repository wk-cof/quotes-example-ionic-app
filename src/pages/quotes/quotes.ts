import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import _ from 'lodash';
import text1 from '../../assets/txt/sample-text-1';
import text2 from '../../assets/txt/sample-text-2';
import text3 from '../../assets/txt/sample-text-3';
import text4 from '../../assets/txt/sample-text-4';

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
    this.quotes.push(text1);
    this.quotes.push(text2);
    this.quotes.push(text3);
    this.quotes.push(text4);
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
    this.currentQuote ++;
    if (this.currentQuote >= this.quotes.length) {
      this.currentQuote = 0;
    }
  }

  prevQuote() {
    this.currentQuote --;
    if (this.currentQuote < 0) {
      this.currentQuote = 0;
    }
  }

  fullLinkBtnClick() {
    window.open(this.quotes[this.currentQuote].url, 'location=_blank');
  }

}
