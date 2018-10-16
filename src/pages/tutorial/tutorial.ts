import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;
  dir: string = 'ltr';

  constructor(public navCtrl: NavController, public menu: MenuController, translate: TranslateService, public platform: Platform) {
    this.dir = platform.dir();
    // translate.get(["TUTORIAL_SLIDE1_TITLE",
    //   "TUTORIAL_SLIDE1_DESCRIPTION",
    //   "TUTORIAL_SLIDE2_TITLE",
    //   "TUTORIAL_SLIDE2_DESCRIPTION",
    //   "TUTORIAL_SLIDE3_TITLE",
    //   "TUTORIAL_SLIDE3_DESCRIPTION",
    // ]).subscribe(
    //   (values) => {
        // console.log('Loaded values', values);
    this.slides = [
      {
        title: 'Selecting the next book to read is difficult',
        description: '',
        image: 'assets/img/tutorial-slide-1.jpg',
      },
      {
        title: 'Naturally, here\'s a fucking app to fix that unique existensial problem',
        description: 'Oh, did you know that you can click on the link below to buy the book you liked and make me some money? ' +
          'You should totally do it! <a href="https://www.youtube.com/watch?v=GlKL_EpnSp8" target="_blank">Read a motherfucking book.</a>',
        image: 'assets/img/ica-slidebox-img-2.png',
      },
    ];
      // });
  }

  startApp() {
    this.navCtrl.setRoot('QuotesPage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
