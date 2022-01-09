import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  getAll(): Observable<any> {
    return this.http.get(this.apiOrder);
  }

  getOrderById(id: number): Observable<any> {
    return this.http.get(`${this.apiOrder}/${id}`);
  }

  creatOrder(data: any) {
    return this.http.post(this.apiOrder, data, this.httpOptions)
  }

  update(data: any) {
    return this.http.put(this.apiOrder, data, this.httpOptions)
  }
  createOrderDetail(data: any) {
    return this.http.post(this.apiOrderDetail, data, this.httpOptions)
  }

  getByOrderId(id: number): Observable<any> {
    return this.http.get(`${this.apiOrderDetail}/order-id/${id}`);
  }

}
