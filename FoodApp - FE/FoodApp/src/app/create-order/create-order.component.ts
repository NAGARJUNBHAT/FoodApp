import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FoodorderService } from './../Services/foodorder.service';
import { FoodproductService } from './../Services/foodproduct.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
})
export class CreateOrderComponent implements OnInit {
  res: any;
  staff = JSON.parse(localStorage.getItem('user')!);
  itemCountMap = new Map<number, number>();
  orderItems: any;
  totalOrderPrice: number = 0;

  constructor(
    private fPservice: FoodproductService,
    private fOService: FoodorderService,
    private route: Router
  ) {}

  allFoodProducts: any;
  ngOnInit(): void {
    this.fPservice.getAllFoodProducts().subscribe((data) => {
      // console.log(data);
      this.allFoodProducts = data;
      this.allFoodProducts = this.allFoodProducts.data;
      console.log('First Food Product : ', this.allFoodProducts[0]);
    });
  }

  addNewItem(itemId: any, itemPrice: any) {
    // console.log(itemId, itemPrice);
    // If item has been added previously (just the quantity is changed)
    if (this.itemCountMap.has(itemId)) {
      // Increase count and totalPrice
      this.itemCountMap.set(itemId, this.itemCountMap.get(itemId)! + 1);
      this.totalOrderPrice += itemPrice;
    }
    // If chosen for the first time
    else {
      // Set count and increase orderPrice
      this.itemCountMap.set(itemId, 1);
      this.totalOrderPrice += itemPrice;
    }
    // console.log(this.totalOrderPrice);
  }

  removeItem(itemId: any, itemPrice: any) {
    // console.log(itemId, itemPrice);
    if (this.itemCountMap.has(itemId)) {
      if (this.itemCountMap.get(itemId) === 0) {
      } else {
        this.itemCountMap.set(itemId, this.itemCountMap.get(itemId)! - 1);
        this.totalOrderPrice -= itemPrice;
      }
    }
    // console.log(this.totalOrderPrice);
  }
  reply: any;
  addNewOrder(form: NgForm) {
    let newOrder = {
      status: true,
      customerName: form.value.customerName,
      customerContact: form.value.contactNumber,
      totalPrice: this.totalOrderPrice,
      orderCreatedTime: new Date().toString(),
    };
    console.log('Staff id: ' + this.staff.id);
    console.log('New Order Made : ', newOrder);
    this.reply = confirm('Do you want to place the order? ');
    if (this.reply == true) {
      this.fOService.saveFoodOrder(this.staff.id, newOrder).subscribe((r) => {
        this.res = r;
        console.log(this.res.message);
        if (!this.res.error) {
          alert('Food Order made successfully!');
          this.route.navigate(['/staff']);
        }
      });
    }
  }
}
