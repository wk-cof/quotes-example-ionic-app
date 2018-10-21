import { Component } from '@angular/core';
import firebase from 'firebase';
import uuidv1 from 'uuid/v1';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddQuotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-quote',
  templateUrl: 'add-quote.html',
})
export class AddQuotePage {
  public newTask: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.newTask = {
      title: '',
      text: '',
      url: '',
    };
  }

  submitNewQuote() {
    let {title, text, url} = this.newTask;
    const uuid = uuidv1(title + text + url);
    firebase.database().ref('quotes_ru/' + uuid).set({
      title,
      text,
      url
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddQuotePage');
  }

}