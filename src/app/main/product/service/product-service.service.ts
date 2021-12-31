import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('tooken')
    })
  };

  private urlApi = 'http://localhost:8080/rest/products';

  getAllProduct(): Observable<any> {
    const url = `${this.urlApi}/list/user`
    return this.http.get(url);
  }

  getAllProduct1(): Observable<any> {
    const url = `${this.urlApi}/list`
    return this.http.get(url, this.httpOptions);
  }

  addProduct(data: any) {
    return this.http.post(this.urlApi, data, this.httpOptions);
  }

  deleteProduct(id: number) {
    const url = `${this.urlApi}/${id}`
    return this.http.delete(url, this.httpOptions);
  }

  getProductById(id: number) {
    const url = `${this.urlApi}/${id}`
    return this.http.get(url, this.httpOptions);
  }

  updateProduct(data: any) {
    return this.http.put(this.urlApi, data, this.httpOptions);
  }

}
