import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('tooken')
    })
  };

  private apiOrder = 'http://localhost:8080/rest/orders';
  private apiOrderDetail = 'http://localhost:8080/rest/orderdetails';
  creatOrder(data: any) {
    return this.http.post(this.apiOrder, data, this.httpOptions)
  }

  createOrderDetail(data: any) {
    return this.http.post(this.apiOrderDetail, data, this.httpOptions)
  }
}
