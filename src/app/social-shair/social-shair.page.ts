import { Component, OnInit, AfterViewInit } from "@angular/core";
import { File } from "@ionic-native/file/ngx";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { SharedService } from "../services/shared.service";
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
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
  imgURL: string;
  count:number=0;
  constructor(
    private socialShaire: SocialSharing,
    private file: File,
    private services: SharedService,
    private nav :NavController,
    private platform:Platform,
   private alert:AlertController
  ) {

    this.services.screensortData.subscribe(imageName => {
      this.file
        .listDir(`${this.file.externalRootDirectory}`, "Pictures")
        .then(fileList => {
          console.log(imageName, "imageName");
          let file = fileList.forEach(element => {
            if (element.name === imageName) {
              this.imgURL = element.nativeURL;
              console.log(this.imgURL, "element");
            }
          });
        });
    });

  }

  ngOnInit() {}

  ngAfterViewInit() {
    
  }
  
  
  closefunction(){ 
    this.count++
    if(this.count === 1){
      this.showConfirm('Do you want to exit ');
    }
  }
  goback(){
this.nav.back()
  }
  ShareOnTwitter() {
    this.socialShaire
      .shareViaTwitter(null, this.imgURL)
      .then((res) => {
console.log(res,'res')
      })
      .catch(e => {
        console.log(e);
      });
  }

  async SharebyEmail() {
    this.socialShaire
      .shareViaEmail(
        "this is my  message",
        "my subject",
        ["subodh.shipgig@gmail.com"],
        null,
        null,
        this.imgURL
      )
      .then(res => {
        console.log(res, "res");
      })
      .catch(e => {
        console.log(e);
      });
  }
  async ShareOnFacebook() {
    this.socialShaire
      .shareViaFacebook(null, this.imgURL)
      .then(res => {
        console.log(res, "res");
      })
      .catch(e => {
        console.log(e);
      });
  }
  async SharewithWhatsApp() {
    this.socialShaire
      .shareViaWhatsApp(null, this.imgURL)
      .then(res => {
        console.log(res, "res");
      })
      .catch(e => console.log(e));
  }



  async showConfirm(title) { 
    //console.log('coming',title)
    const confirm = await this.alert.create({
      header: title,
       cssClass: 'custom-alertDanger',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            this.count=0;
            //console.log('Disagree clicked');
          }
        },
        {
          text: 'ok',
          handler: () => {
            this.count=0;
            navigator['app'].exitApp();
          }
        }
      ]
    });
    await confirm.present();
  }
}
