import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodorderService {

  constructor(private http : HttpClient) { }

  saveFoodOrder(staffId:number, foodOrder:any){
    return this.http.post(`http://localhost:8080/foodorder/${staffId}`, foodOrder)
  }

  getAllFoodOrdersByStaff(userId:any){
    return this.http.get(`http://localhost:8080/foodorder/${userId}`)
  }

  getFoodOrderByItsId(foodOrderId:any){
    return this.http.get(`http://localhost:8080/foodorderbyitsid/${foodOrderId}`)
  }

  updateStatus(foodOrder:any){
    return this.http.put("http://localhost:8080/foodorder",foodOrder)
  }

  sendMail(body:String, emailID: String){
    console.log(emailID);
    return this.http.post(`http://localhost:8080/foodorder/mail/${emailID}`,body)
  }
  
}
