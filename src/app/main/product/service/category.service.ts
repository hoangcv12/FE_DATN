import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private urlApi = 'http://localhost:8080/rest/categories';

  constructor(private http: HttpClient) { }

  getAllCategory(): Observable<any> {
    return this.http.get(this.urlApi, this.httpOptions)
  }

  addCategory(data: any) {
    return this.http.post(this.urlApi, data, this.httpOptions)
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.urlApi}/${id}`, this.httpOptions)
  }

}
