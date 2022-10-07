import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  saveItem(item : any, foodOrderId : Number) {
    console.log(item);
    console.log(foodOrderId);
    
    return this.http.post(`http://localhost:8080/item/${foodOrderId}`,item);
  }


  getItem(foodOrderId: Number){
    return this.http.get(`http://localhost:8080/item/${foodOrderId}`);
  }

  editItem(item: any){
    return this.http.put("http://localhost:8080/item",item);
  }
}
