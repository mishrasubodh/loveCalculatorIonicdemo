import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
private dataSource = new BehaviorSubject({});
  data = this.dataSource.asObservable();
  constructor() { }
  updatedDataSelection(data){
    this.dataSource.next(data);
}
}