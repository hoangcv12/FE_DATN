import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getJwt(data: object): Observable<any> {
    const url = 'http://localhost:8080/authenticate';
    return this.http.post(url, data);
  }

  getAuthorities(jwt: any) {
    const url = 'http://localhost:8080/rest/authorities';
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwt}`
      })
    };
    return this.http.get(url, httpOptions)
  }

}
