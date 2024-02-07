import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, skipWhile, tap} from 'rxjs/operators'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
 
export class MyserviceService {
 
  constructor(private http : HttpClient) { }

  // getData(){
  //   return this.http.get('https://jsonplaceholder.typicode.com/users')
  //     .pipe(
  //       map((response:[]) => response.map(item => item['name']))
  //     )
  // }

  getSymptoms(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/symptoms');
  }

  getAllergies(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/allergies');
  }

}