import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { File } from "@ionic-native/file/ngx";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'SMS',
      url: '/message',
      icon: 'md-mail-open'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'History',
      url: '/history',
      icon: 'map'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private file: File
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      this.checkDirectory();
    });
  }

  async checkDirectory(){
    try {
      await this.file.createDir(this.file.externalRootDirectory, 'lovecalc', false)
    } catch(e) {
      if(e.code != 12)  {
        console.log(e)
      }
    }
  }
}
