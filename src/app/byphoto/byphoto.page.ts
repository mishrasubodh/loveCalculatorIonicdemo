import { Component, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormArray, Validators } from "@angular/forms";

@Component({
  selector: 'app-byphoto',
  templateUrl: './byphoto.page.html',
  styleUrls: ['./byphoto.page.scss'],
})

export class ByphotoPage  {
  submitted: boolean;
  yourname:any;
  yourcrush:any;
firsturl:any;
scondurl:any;
yourage:any;
crushage:any;
  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}

  /*##################### Registration Form #####################*/
  

  /*########################## File Upload ########################*/
  @ViewChild('fileInput', {static:true} ) el: ElementRef;
  imageUrl: any = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
   imageUrl1: any = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
  editFile: boolean = true;
  removeUpload: boolean = false;

  uploadFile1(event) {
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



  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editFile = true;
    this.removeUpload = false;
  }
  
subbmitData(a1,b2){
console.log(a1,b2)
}  


}