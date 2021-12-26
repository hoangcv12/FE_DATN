import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NodeServiceService {

  constructor() { }
  onGetData: EventEmitter = new EventEmitter();

  getData() {
    this.http.post(...params).map(res => {
      this.onGetData.emit(res.json());
    })
  }
