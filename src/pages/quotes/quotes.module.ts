import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuotesPage } from './quotes';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    QuotesPage,
  ],
  imports: [
    IonicPageModule.forChild(QuotesPage),
    TranslateModule.forChild(),
  ],
})
export class QuotesPageModule {}
