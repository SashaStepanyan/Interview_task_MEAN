import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public getUsersList(): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/users/`);
  }

  public getUserById(id: any): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/users/${id}`);
  }

  public createUser(body: any): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/users`, body, this.httpOptions);
  }
  
  public updateUser(body: any, id: any): Observable<any> {
    return this.http.put<any>(`${environment.api_url}/users/${id}`, body, this.httpOptions);
  }

  public deleteUser(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.api_url}/users/${id}`, this.httpOptions);
  }


}
