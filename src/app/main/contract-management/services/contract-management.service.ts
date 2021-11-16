import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractManagementService {
  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private urlApi = 'http://localhost:8083/contract';

  getAllContract(): Observable<any> {
    return this.http.get(this.urlApi, this.httpOptions);
  }
}
