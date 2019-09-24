import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse,} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {logger} from 'codelyzer/util/logger';
import {log} from 'util';
import {ResourceList} from '../resource-page/ResourceList'
import { Resource } from '../Model/Resource';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions={
  headers: new HttpHeaders({'content-Type' : 'application/json'}),
  responseType: 'json' as 'json'
};

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private serviceUrl = 'http://192.168.1.247:8080';
  private Url = 'http://192.168.1.247:8080/Project1/res/addCSV';
  

  constructor(private httpClient: HttpClient) {

   }

   getResourceList(url: string):Observable<ResourceList[]>{
     return this.httpClient.get<ResourceList[]>(url);
   }

   importCSVFile(ResourceList):Observable<ResourceList[]>{
     return this.httpClient.post<ResourceList[]>(this.Url, ResourceList, httpOptions);
     }

   }