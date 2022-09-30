import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManagerServiceService {

  constructor(private http:HttpClient) { }

  getMenu(value:number){
    return this.http.get(`http://localhost:8080/menu/manager/${value}`);
  }

  editFpData(value:number){
    
  }

  deleteFpData(value:number){
    return this.http.delete(`http://localhost:8080/foodproduct/${value}`);
  }

  addfpData(value:number){

  }
  
}
