import { Component, OnInit } from "@angular/core";
import { File } from "@ionic-native/file/ngx";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
@Component({
  selector: "app-social-shair",
  templateUrl: "./social-shair.page.html",
  styleUrls: ["./social-shair.page.scss"]
})
export class SocialShairPage implements OnInit {
  text = "check the social share";
  constructor(private socialShaire: SocialSharing, private file: File) {}

  ngOnInit() {}
  ShareOnTwitter() {
    this.socialShaire
      .shareViaTwitter(
        null,
        `${this.file.applicationDirectory}www/assets/imgs/friends.jpg`
      )
      .then(() => {})
      .catch(e => {});
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
      .catch(e => {console.log(e)});
  }
  async ShareOnFacebook() {
    let file = await this.resolveLocalFile();
    console.log("coming in facebook",file);
    this.socialShaire
      .shareViaFacebook(null, file.nativeURL)
      .then(() => {
        this.removeTempfile(file.name);
      })
      .catch(e => {console.log(e)});
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
