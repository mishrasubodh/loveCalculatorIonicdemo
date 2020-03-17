import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'Firebase';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private dataSource = new BehaviorSubject({});
  data = this.dataSource.asObservable();
  screensortData = new BehaviorSubject(null);
  constructor() {
   }

  updatedDataSelection(data) {
    this.dataSource.next(data);
    this.SaveDataToLocalStorage(data)
    let newInfo = firebase.database().ref('lovecalcyData/').push();
    newInfo.set(data);
  }

 updateImageData(data) {
  this.screensortData.next(data);
  }


  SaveDataToLocalStorage(data) {
    var a = [];
    a = JSON.parse(localStorage.getItem('session')) || [];
    a.push(data);
    console.log('a', a)
    localStorage.setItem('session', JSON.stringify(a));
  }

}