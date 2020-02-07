import { Component, OnInit} from '@angular/core';
import { NavController } from '@ionic/angular';
import {SharedService} from '../services/shared.service'
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
  constructor(
  public NavCtrl: NavController,
  public behaveService :SharedService
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
   this.NavCtrl.back()
  }
  ngOnInit() {
  }

}
