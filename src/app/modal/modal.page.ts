import { Component, OnInit} from '@angular/core';
import { NavController } from '@ionic/angular';
import {SharedService} from '../services/shared.service'
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { File } from "@ionic-native/file/ngx";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  yname: any;
  cname: any;
  lcount: any;
  less30: boolean = false;
  eqall50: boolean = false;
  more90: boolean = false;
  equel30: boolean = false;
  state :boolean = false;
  screen: any;
  dirResponse: any;
  constructor(
  public NavCtrl: NavController,
  public behaveService :SharedService,
  private screenshot:Screenshot,
  private file: File,
  private transfer: FileTransfer
  
  ) {
this.behaveService.data.subscribe(data=>{
  console.log(data)
  this.yname=data['Fname'],
  this.cname=data['Sname']
  this.lcount=data['Total']
})


    if (this.lcount > 90) {
      this.less30 = false;
      this.eqall50 = false;
      this.equel30 = false
      this.more90 = true;
    }
    else if (this.lcount > 50 && this.lcount < 90) {
      this.less30 = false;
      this.more90 = false;
      this.equel30 = false
      this.eqall50 = true;
    }
    else if (this.lcount > 30 && this.lcount < 50) {
      this.less30 = false;
      this.eqall50 = false;
      this.more90 = false
      this.equel30 = true;
    }
    else {
      this.eqall50 = false;
      this.more90 = false;
      this.equel30 = false;
      this.less30 = true;
    }
  }

dismiss() {
  this.NavCtrl.navigateRoot('/home')
  }
   reset() {
    var self = this;
    setTimeout(function(){ 
      self.state = false;
    }, 1000);
  }
   async shair(){ 
	

    this.screenshot.save().then(reso=>{ debugger
  let path = JSON.parse(localStorage.getItem("dirPath"));
   console.log("path",path);
let filename= Date.now() +'loveCalc.png'
  this.file.moveFile('/storage/emulated/0/Pictures', 'screenshot_1581610310149.png', path, filename).then((res) => {
 console.log("res",res);
  });
//    this.file.writeFile(path, filename,'').then((res) => {
//         console.log('File has been downloaded. Please check your downloads folder.',res);
//     }, (err) => {
//         console.log("Sorry. An error occurred downloading the file: " + err);
//     }
// );

//const saveData =  this.transfer.create().download(reso, path +  filename)
//console.log(saveData,"")
    // this.file.createFile(path,Date.now() +'loveCalc.png',true).then(responce=>{
    //   console.log(responce,"res123");
    // });

      //this.screen = res.filePath;
      //this.behaveService.updateImageData(this.screen)
     // this.state = true;
      //this.reset();
      //this.NavCtrl.navigateRoot('/social-shair')
    },error=>{
      console.log(error)
    }); 
  }

  ngOnInit() {

  }
}
