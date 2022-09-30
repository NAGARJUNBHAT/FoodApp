import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StaffServiceService {
  constructor(private http: HttpClient) {}

  getAllFoodOrder(value: number) {
    return this.http.get(`http://localhost:8080/foodorder/${value}`);
  }

  deleteFoodOrder(value: number) {
    return this.http.delete(`http://localhost:8080/foodorder/${value}`);
  }

  getOrderById(value: number) {
    return this.http.get(`http://localhost:8080/foodorderbyid/${value}`);
  }
}
