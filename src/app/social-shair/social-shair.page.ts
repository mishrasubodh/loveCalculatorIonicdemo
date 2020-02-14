import { Component, OnInit, AfterViewInit } from "@angular/core";
import { File } from "@ionic-native/file/ngx";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { SharedService } from "../services/shared.service";
// import { Filesystem } from '@ionic-enterprise/filesystem/ngx';
// import { Directories } from '@ionic-enterprise/filesystem';

@Component({
  selector: "app-social-shair",
  templateUrl: "./social-shair.page.html",
  styleUrls: ["./social-shair.page.scss"]
})
export class SocialShairPage implements OnInit, AfterViewInit {
  text = "check the social share";
  imgData: {};
  constructor(
    private socialShaire: SocialSharing,
    private file: File,
    private services: SharedService
  ) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.services.screensortData.subscribe(imageName => { 
      this.file.listDir(`${this.file.externalRootDirectory}`, 'Pictures')
      .then(fileList => {
        let file = fileList.filter(file => file.name === imageName);
        console.log(file)
      })
    }); 
      // this.file.checkFile(`${this.file.externalRootDirectory}/Pictures`, imageName)
      // .then(isExists => console.log(isExists))
      // .catch(e => console.log(e))

  }

  ShareOnTwitter() {
    this.socialShaire
      .shareViaTwitter(
        null,
        `${this.file.applicationDirectory}www/assets/imgs/friends.jpg`
      )
      .then(() => {})
      .catch(e => {console.log(e)});
  }

  async resolveLocalFile() {
    return this.file.copyFile(
      `${this.file.applicationDirectory}www/assets/imgs`,
      "friends.jpg",
      this.file.cacheDirectory,
      `${new Date().getTime()}.jpg`
    );
  }

  removeTempfile(file) {
    file.removeFile(file.cacheDirectory, name);
  }

  async SharebyEmail() {
    let file = await this.resolveLocalFile();
    this.socialShaire

      .shareViaEmail(
        "this is my  message",
        "my subject",
        ["subodh.shipgig@gmail.com"],
        null,
        null,
        file.nativeURL
      )
      .then(() => {
        this.removeTempfile(file.name);
      })
      .catch(e => {
        console.log(e);
      });
  }
  async ShareOnFacebook() {
    let file = await this.resolveLocalFile();
    console.log("coming in facebook", file);
    this.socialShaire
      .shareViaFacebook(null, file.nativeURL)
      .then(() => {
        this.removeTempfile(file.name);
      })
      .catch(e => {
        console.log(e);
      });
  }
  async SharewithWhatsApp() {
    let file = await this.resolveLocalFile();
    this.socialShaire
      .shareViaWhatsApp(null, file.nativeURL)
      .then(() => {
        this.removeTempfile(file.name);
      })
      .catch(e => console.log(e));
  }
}
