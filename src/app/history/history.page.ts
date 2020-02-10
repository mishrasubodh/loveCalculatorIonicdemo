import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  historydata=[]
  constructor() {
 this.historydata = JSON.parse(localStorage.getItem('session'));
    console.log(this.historydata,'onsearchpage')
   }
   deletedata(curentdata){
      console.log(this.historydata,'onsearchpage')
     console.log(curentdata)
     let forremoveData= this.historydata.splice(curentdata,1)
     console.log('forremoveData',forremoveData)
	 localStorage.removeItem('session')
		 console.log('historydata',this.historydata)
	this.SaveDataToLocalStorage(this.historydata)
	
	
  
   }
  ngOnInit() {
  }
       SaveDataToLocalStorage(data) { debugger
		    console.log(data)
		   if(data.length!==0){
			   var c = [];
			   
    c = JSON.parse(localStorage.getItem('session')) || [];
  var a=[...data,...c];
    console.log('a', a)
    localStorage.setItem('session', JSON.stringify(a));  
			   
		   }
  }
}
