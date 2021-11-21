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
      'Content-Type': 'application/json'
    })
  };

  private urlApi = 'http://localhost:8080/rest/products';

  getAllProduct(): Observable<any> {
    return this.http.get(this.urlApi, this.httpOptions);
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
