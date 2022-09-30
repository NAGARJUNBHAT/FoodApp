import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  saveItem(item : any, foodOrderId : any) {
    console.log(item);
    console.log(foodOrderId);
    
    return this.http.post(`http://localhost:8080/item/${foodOrderId}`,item);
  }
}
