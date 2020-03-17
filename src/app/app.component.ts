import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Platform, AlertController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { File } from "@ionic-native/file/ngx";
import { NavController } from "@ionic/angular";
import * as firebase from 'firebase';
const config = {
  apiKey: "AIzaSyA0qXTFAWHRUKkP8kYjFSJcUW-KC0kLkis",
  authDomain: "buysell-f70a7.firebaseapp.com",
  databaseURL: "https://buysell-f70a7.firebaseio.com",
  projectId: "buysell-f70a7",
  storageBucket: "buysell-f70a7.appspot.com",
  messagingSenderId: "163363424062",
  appId: "1:163363424062:web:035651d5751428518d8e6f",
  measurementId: "G-FWCG1B9W4M"
};


@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  public appPages = [
    {
      title: "Home",
      url: "/home",
      icon: "home"
    },
    {
      title: "SMS",
      url: "/message",
      icon: "md-mail-open"
    },
    {
      title: "LoveQuize",
      url: "/list",
      icon: "list"
    },
    {
      title: "History",
      url: "/history",
      icon: "map"
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private file: File,
    private alertCtrl: AlertController,
    private router: Router,
    private navctrl: NavController
  ) {
    this.initializeApp();
    this.handleHardwareBackButton();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      this.checkDirectory();
    });
    firebase.initializeApp(config);
  }

  async checkDirectory() {
    try {
      await this.file.createDir(
        this.file.externalRootDirectory,
        "lovecalc",
        false
      );
    } catch (e) {
      if (e.code != 12) {
        console.log(e);
      }
    }
  }

  count: number = 0;
  private handleHardwareBackButton(): void {
    this.platform.backButton.subscribeWithPriority(9999, () => {
      console.log(this.router.url, "this.router.url");

      if (this.router.url == "/message") {
        this.navctrl.navigateRoot("/home");
      } else if (this.router.url == "/by-name") {
        this.navctrl.navigateRoot('/home')
      } else if (this.router.url == "/by-dob") {
        this.navctrl.back();
      } else if (this.router.url == "/byphoto") {
        this.navctrl.back();
      } else if (this.router.url == "/history") {
        this.navctrl.navigateRoot("/home");
      } else if (this.router.url == "/social-shair") {
        this.navctrl.back();
      } else if (this.router.url == "/modal") {
        this.navctrl.navigateRoot("/home");
      } else if (this.router.url == "/home") {
        this.count++;
        if (this.count === 1) {
          this.showConfirm("Do you want to exit ");
        }
      }
    });
  }
  async showConfirm(title) {
    const confirm = await this.alertCtrl.create({
      header: title,
      cssClass: "custom-alertDanger",
      buttons: [
        {
          text: "Cancel",
          handler: () => {
            this.count = 0;
            //console.log('Disagree clicked');
          }
        },
        {
          text: "ok",
          handler: () => {
            navigator["app"].exitApp();
          }
        }
      ]
    });
    await confirm.present();
  }
}
