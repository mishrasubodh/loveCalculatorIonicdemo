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
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkDirectory();
    });
  }

  checkDirectory(){
    	this.file.checkDir(this.file.externalRootDirectory, 'lovecalc').then(response => {
			console.log('Directory exists'+response);
		}).catch(err => {
			console.log('Directory doesn\'t exist'+JSON.stringify(err));
			this.file.createDir(this.file.externalRootDirectory, 'lovecalc', false).then(response => {
				console.log('Directory create'+JSON.stringify(response));
        if(localStorage.getItem('dirPath')! == '' || localStorage.getItem('dirPath')! == null){
         localStorage.setItem('dirPath', JSON.stringify(response.nativeURL));
         console.log("folder path stored",localStorage.getItem('dirPath'));
        }
			}).catch(err => {
				console.log('Directory no create'+JSON.stringify(err));
			}); 
		});
  }
}
