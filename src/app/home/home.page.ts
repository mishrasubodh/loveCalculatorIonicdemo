import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private router: Router
  ) {
    
  }
  goBypage(title){
    if(title==1){
this.router.navigateByUrl('/by-name');
    }
    else if(title==2){
this.router.navigateByUrl('/by-dob');
    }
    else if(title==3){
this.router.navigateByUrl('/byphoto');
    }
  }

}
