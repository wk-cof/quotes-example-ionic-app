import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
// set up firebase
import app from './firebase';
console.log(app);

platformBrowserDynamic().bootstrapModule(AppModule);
