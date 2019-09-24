import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// const httpOptions = {headers: new HttpHeaders({'content-Type' : 'application/json'})}

@Injectable({
  providedIn: 'root'
})

export class GetRequestService {

  constructor(private http: HttpClient) { }

  getResponse(configUrl: string, id?: number) {
    if (id === undefined) {
      return this.http.get(configUrl);
    } else {
      return this.http.get(configUrl + id);
    }
  }
  
  private Url = 'http://192.168.1.247:8080/Project1/user/verify'
  verifyLogin(arr) {
    return this.http.post(this.Url, arr, {responseType: 'text'})
  }

}



