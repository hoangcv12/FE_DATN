import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private http: HttpClient) { }

  private urlApi = 'http://localhost:8080/rest/orderchange';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('tooken')
    })
  };
  getAll() {
    return this.http.get(this.urlApi)
  }

  getByOrderId(id: any) {
    return this.http.get(`${this.urlApi}/${id}`);
  }

  create(data: any) {
    return this.http.post(this.urlApi, data, this.httpOptions)
  }
}
