import { Component, OnInit } from "@angular/core";
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
export class SocialShairPage implements OnInit {
  text = "check the social share";
  imgData: {};
  constructor(
    private socialShaire: SocialSharing,
    private file: File,
    private services: SharedService
  ) {
    this.services.screensort.subscribe(
      img => {
        this.imgData = img;
        console.log(this.imgData,'image on social share');
      },
      err => {
        console.log(err);
      }
    );

  this.file.listDir(this.file.externalRootDirectory, '').then(result => {
       console.log(result,'result on first page');
        /*result will have an array of file objects with 
        file details or if its a directory*/
        for (let file of result) {
          if (file.isDirectory == true && file.name != '.' && file.name != '..') {
            console.log("This is a folder");
            if(file.name=='Pictures'){
              console.log(file.nativeURL)
              file.getMetadata(function (metadata) {
                console.log(metadata,"metadata")
              let size = metadata.size; // Get file size
          this.file.listDir(file.nativeURL, '').then(res=>{
console.log(res,"res")
              })
            })
            }
            // Code if its a folder
            
          } else if (file.isFile == true) {
            // Code if its a file
            console.log("This is a file");
            let name = file.name // File name
            console.log("file name: " + name);
           // let path = file.path // File path
            // file.getMetadata(function (metadata) {
            //   let size = metadata.size; // Get file size
            // })
          }
        }
     });
  }

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
