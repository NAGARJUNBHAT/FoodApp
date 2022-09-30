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
}
