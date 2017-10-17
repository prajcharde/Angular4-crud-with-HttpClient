import { Injectable } from '@angular/core';
import { Response, RequestOptions, Request, Headers } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable()
export class DataserviceService {

    constructor(private http: HttpClient) {
        //inject httpclient in constructor
        console.log('Data Service Connected...');
    }

    url = "http://localhost:64493/api/Default";//controller url

    //get method
    getAll():Observable<any> {
        return this.http.get<string[]>('http://localhost:64493/api/Default');
    }

    //post method 
    create(member: any):Observable<any> {
        return this.http.post('http://localhost:64493/api/Default', 
        JSON.stringify(member),
        {
             headers: new HttpHeaders().set('Content-Type', 'application/json')
        });
    }

//get the particular record for updation
  update(id: any,user: any):Observable<any>  {
        return this.http.put(this.url, 
        JSON.stringify(user), 
        {
        params: new HttpParams().set('id', id),
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Access-Control-Allow-Origin', 'http://localhost:64493')
          .set('Access-Control-Allow-Credentials', 'true')
      });      
    }
   
//record delete by id
    delete(id: any):Observable<any> {
        return this.http.delete(this.url,
        {
             params: new HttpParams().set('id', id),
             headers: new HttpHeaders().set('Content-Type', 'application/json'),
        });
    }
}