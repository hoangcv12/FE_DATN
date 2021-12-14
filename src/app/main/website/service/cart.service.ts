
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  errorMsg: string;
  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('tooken')
    })
  };
  private urlApi = 'http://localhost:8080/rest/cart';

  getAllByUserName(): Observable<any> {
    const httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('tooken')
      })
    };

    return this.http.get(this.urlApi, httpOptions1)
    // .pipe(
    //   catchError(error => {
    //     this.errorMsg = error.message;
    //     return of(this.errorMsg);
    //   })
    // );
  }



  addCart(data: any) {
    return this.http.post(this.urlApi, data, this.httpOptions)
  }

  updateCart(data: any) {
    return this.http.put(this.urlApi, data, this.httpOptions)
  }

  deleteCart(id: number) {
    return this.http.delete(`${this.urlApi}/id/${id}`, this.httpOptions)
  }

  findByProductId(idProduct: number) {
    return this.http.get(`${this.urlApi}/product?id=${idProduct}`, this.httpOptions)
  }
}
