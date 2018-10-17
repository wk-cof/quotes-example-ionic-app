import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

}
