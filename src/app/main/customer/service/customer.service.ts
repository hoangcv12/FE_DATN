import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  private urlApi = 'http://localhost:8080/rest/customers';
  private apiOrder = 'http://localhost:8080/rest/orders'
  getAll(): Observable<any> {
    const url = `${this.urlApi}`
    return this.http.get(url);
  }

  create(data: any) {
    return this.http.post(this.urlApi, data)
  }

  delete(id: any) {
    const url = `${this.urlApi}/${id}`
    return this.http.delete(url);
  }

  getById(id: any): Observable<any> {
    const url = `${this.urlApi}/${id}`
    return this.http.get(url);
  }

  getBySdt(id: any): Observable<any> {
    const url = `${this.apiOrder}/sdt/${id}`
    return this.http.get(url);
  }
}
