import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FoodorderService } from '../Services/foodorder.service';
import { FoodproductService } from '../Services/foodproduct.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  res : any;
  orderItems : any;
  totalOrderPrice: number = 0;
  itemCountMap = new Map<number, number>();
  staff = JSON.parse(localStorage.getItem("user")!);

  constructor(private fPService : FoodproductService, private fOService : FoodorderService, private router : Router) { }

  allFoodProducts: any;

  ngOnInit(): void {

    this.fPService.getAllFoodProducts().subscribe((data) => {
      // console.log(data);
      this.allFoodProducts = data;
      this.allFoodProducts = this.allFoodProducts.data;
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

  updateOrder(form: NgForm) {
    const newDate = new Date();
    let updateOrder = {
      status: true,
      customerName: form.value.customerName,
      customerContact: form.value.contactNumber,
      totalPrice: this.totalOrderPrice,
      orderCreatedTime: newDate
    };
    console.log('Staff id: ' + this.staff.id);
    console.log('Food Order Update : ', updateOrder);
    this.reply = confirm('Do you want to update the order? ');
    if (this.reply == true) {
      this.fOService.updateStatus(updateOrder).subscribe((r) => {
        this.res = r;
        console.log(this.res.message);
        if (!this.res.error) {
          alert('Food Order Updated successfully!');
          this.router.navigate(['/staff']);
        }
      });
    }
  }

}
