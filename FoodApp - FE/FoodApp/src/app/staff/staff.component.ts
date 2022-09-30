import { Router } from '@angular/router';
import { StaffServiceService } from './../Services/staff-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
})
export class StaffComponent implements OnInit {
  constructor(private orders: StaffServiceService, private router: Router) {}

  allOrders: any;
  value: number = 2;
  ngOnInit(): void {
    // Load all the food Orders
    this.orders.getAllFoodOrder(this.value).subscribe((data) => {
      this.allOrders = data;
      console.log('List of all the Orders :', this.allOrders);
    });
  }

  deleteFoodOrder(orderID: number) {
    window.alert('Are you sure you want to delete the order?');
    console.log('delete btn clicked.Id:' + orderID);
    this.orders.deleteFoodOrder(orderID).subscribe((response) => {
      console.log(response);
      this.router.navigate(['staff']);
      this.orders.getAllFoodOrder(this.value).subscribe((data) => {
        this.allOrders = data;
        console.log(this.allOrders);
      });
    });
  }
}
