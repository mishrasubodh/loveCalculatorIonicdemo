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
    try {
      let savedScreenShot = await this.screenshot.save();
      let screenshot = savedScreenShot.filePath.slice(savedScreenShot.filePath.indexOf('screenshot'), savedScreenShot.filePath.length);
      let dir = await this.file.checkDir(this.file.externalRootDirectory, 'Pictures');
      if(dir && screenshot) {
        // let path = `${this.file.externalRootDirectory}/lovecalc`;
        // let filename = `${Date.now()}${screenshot}`;
        // let result = await this.file.moveFile(`${this.file.externalRootDirectory}/Pictures`, screenshot, path, filename)
        this.behaveService.updateImageData(screenshot)
        this.NavCtrl.navigateRoot('/social-shair')
      } else {
        throw new Error('Something went wrong')
      }
    } catch(e) {
      console.log(e)
    }
  }

  ngOnInit() {

  }
}
