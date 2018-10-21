import { Component } from '@angular/core';
import firebase from 'firebase';
import uuidv1 from 'uuid/v1';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ToastController } from 'ionic-angular';

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
  public uploading: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private translate: TranslateService, private toastCtrl: ToastController) {
    this.newTask = {
      title: '',
      text: '',
      url: '',
    };
  }

  submitNewQuote() {
    this.uploading = true;
    return this.translate.get(['DATABASE_NAME']). subscribe(values => {
      let {title, text, url} = this.newTask;
      firebase.database().ref(`${values.DATABASE_NAME}/${uuidv1(title + text + url)}`).set({
        title,
        text,
        url
      }).then(() => {
        this.uploading = false;
        const toast = this.toastCtrl.create({
          message: 'Entry was added successfully',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      })
      .catch(error => {
        const toast = this.toastCtrl.create({
          message: 'Error adding an entry' + error,
          duration: 3000,
          position: 'top'
        });
        toast.present();
        this.uploading = false;
      });
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddQuotePage');
  }

}
