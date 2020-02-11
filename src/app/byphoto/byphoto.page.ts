import { Component, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormArray, Validators } from "@angular/forms";
import { NavController } from '@ionic/angular';
import {SharedService}from '../services/shared.service'
@Component({
  selector: 'app-byphoto',
  templateUrl: './byphoto.page.html',
  styleUrls: ['./byphoto.page.scss'],
})

export class ByphotoPage  {
  grandTotal:any
  Fname: any;
  FnameLength: any;
  Sname: any;
  SnameLength: any;
  Total: any;
  txtresult: any;
  loveTotal:number
  submitted: boolean;
  yourname:any;
  yourcrush:any;
firsturl:any;
scondurl:any;
yourage:any;
crushage:any;
difcount:any;
  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,
    public nav: NavController,
    public behaveService: SharedService,
  ) {}

  /*########################## File Upload ########################*/
  @ViewChild('fileInput', {static:true} ) el: ElementRef;
  imageUrl: any = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
   imageUrl1: any = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
  editFile: boolean = true;
  removeUpload: boolean = false;
  uploadFile1(event) {
    console.log(event)
    let reader = new FileReader(); 
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
        console.log( this.imageUrl," this.imageUrl")
        this.editFile = false;
        this.removeUpload = true;
      }
      
      this.cd.markForCheck();        
    }
  }

uploadFile2(event) {
    let reader = new FileReader(); 
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl1 = reader.result;
        console.log(this.imageUrl1,"this.imageUrl1")
        this.editFile = false;
        this.removeUpload = true;
      }
      this.cd.markForCheck();        
    }
  }
 
subbmitData(yourname,yourage,yourcrush,yourcrushage){
this.difcount=0;
console.log(yourname,yourage,yourcrush,yourcrushage)

let agedif=Math.abs(yourage-yourcrushage);
console.log(agedif)
if(agedif<5){this.difcount=10}
else if(agedif>5 ||agedif<8){this.difcount=7}
else if(agedif>10){this.difcount=3}

this.Fname = yourname.toUpperCase();
this.FnameLength = this.Fname.length;
this.Sname = yourcrush.toUpperCase();
this.SnameLength = this.Sname.length;
var lovecount = 0;
for (var i = 0; i < this.FnameLength; i++) {
  var L1 = this.Fname.substring(i, i + 1);
  if (L1 == 'A') lovecount += 3;
  if (L1 == 'E') lovecount += 3;
  if (L1 == 'I') lovecount += 3;
  if (L1 == 'O') lovecount += 3;
  if (L1 == 'U') lovecount += 4;
  if (L1 == 'L') lovecount += 1;
  if (L1 == 'V') lovecount += 4;
}

for (var count = 0; count < this.SnameLength; count++) {
  var L2 = this.Sname.substring(count, count + 1);
  if (L2 == 'A') lovecount += 3;
  if (L2 == 'E') lovecount += 3;
  if (L2 == 'I') lovecount += 3;
  if (L2 == 'L') lovecount += 3;
  if (L2 == 'O') lovecount += 4;
  if (L2 == 'V') lovecount += 1;
  if (L2 == 'E') lovecount += 4;
}
var Total = 0;

if (lovecount > 0) Total = 5 - ((this.FnameLength + this.SnameLength) / 2)
if (lovecount > 2) Total = 10 - ((this.FnameLength + this.SnameLength) / 2)
if (lovecount > 4) Total = 20 - ((this.FnameLength + this.SnameLength) / 2)
if (lovecount > 6) Total = 30 - ((this.FnameLength + this.SnameLength) / 2)
if (lovecount > 8) Total = 40 - ((this.FnameLength + this.SnameLength) / 2)
if (lovecount > 10) Total = 50 - ((this.FnameLength + this.SnameLength) / 2)
if (lovecount > 12) Total = 60 - ((this.FnameLength + this.SnameLength) / 2)
if (lovecount > 14) Total = 70 - ((this.FnameLength + this.SnameLength) / 2)
if (lovecount > 16) Total = 80 - ((this.FnameLength + this.SnameLength) / 2)
if (lovecount > 18) Total = 90 - ((this.FnameLength + this.SnameLength) / 2)
if (lovecount > 20) Total = 100 - ((this.FnameLength + this.SnameLength) / 2)
if (lovecount > 22) Total = 110 - ((this.FnameLength + this.SnameLength) / 2)
if (this.FnameLength == 0 || this.SnameLength == 0)
  this.Total = "Error";
if (Total < 0) Total = 0;
if (Total > 99) Total = 99;
    this.loveTotal= Math.floor(Total)
    this.grandTotal=this.difcount+ this.loveTotal;
    if(this.grandTotal>100){
      this.grandTotal=99
    }
  var data=new Object()
  data['Fname']= this.Fname
   data['Sname']=this.Sname
    data['Total']= this.grandTotal
    data['from']='calculate through photo name and age';
     this.behaveService.updatedDataSelection(data)
      setTimeout(()=>{
      
       },1000)
   this.nav.navigateRoot('/modal')
}  


}