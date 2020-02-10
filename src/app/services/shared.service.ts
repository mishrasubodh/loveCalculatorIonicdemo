import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private dataSource = new BehaviorSubject({});
  data = this.dataSource.asObservable();
  constructor() { }
  updatedDataSelection(data) {
    this.dataSource.next(data);
    this.SaveDataToLocalStorage(data)
  }

  SaveDataToLocalStorage(data) {
    var a = [];
    a = JSON.parse(localStorage.getItem('session')) || [];
    a.push(data);
    console.log('a', a)
    localStorage.setItem('session', JSON.stringify(a));



  }

}