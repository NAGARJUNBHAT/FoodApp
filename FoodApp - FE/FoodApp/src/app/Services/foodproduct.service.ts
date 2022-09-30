import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodproductService {

  constructor(private http : HttpClient) { }

  addFoodProduct(foodProduct:any, menuId:number){
    return this.http.post(`http://localhost:8080/foodproduct/${menuId}`,foodProduct)
   }
 
   getAllFoodProducts(){
     return this.http.get("http://localhost:8080/foodproduct")
   }

   deleteFoodProduct(foodProductId:number){
     return this.http.delete(`http://localhost:8080/foodproduct/${foodProductId}`)
   }

}
