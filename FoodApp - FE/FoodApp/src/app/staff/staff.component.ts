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
  value: number = 1;
  ngOnInit(): void {
    // Load all the food Orders
    this.orders.getAllFoodOrder(this.value).subscribe((data) => {
      this.allOrders = data;
      console.log('List of all the Orders :', this.allOrders);
    });
  }
}
