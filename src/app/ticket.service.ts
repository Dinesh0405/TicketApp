import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http:HttpClient) { }
  httpGet(url: any) {
    return this.http.get(url);
      map(res => {
        return res;
      },
        err => {
          console.log(err);
        });
  }
  loadTicketServices(obj:any) {
        let Url='http://localhost:3000/'
          return this.httpGet(Url + obj);
        }
  
}
