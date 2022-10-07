import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { StaffServiceService } from '../Services/staff-service.service';
import { ManagerServiceService } from '../Services/manager-service.service';
import { ItemService } from '../Services/item.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
})
export class CreateOrderComponent implements OnInit {
  res: any;
  staff = JSON.parse(localStorage.getItem('user')!);
  itemCountMap = new Map<number, number>();
  foodOrderId!: Number;
  orderItems: any;
  totalOrderPrice: number = 0;

  constructor(
    private fPservice: ManagerServiceService,
    private fOService: StaffServiceService,
    private route: Router,
    private item: ItemService
  ) {}

  allFoodProducts: any;
  ngOnInit(): void {
    this.fPservice.getAllFoodProducts().subscribe((data) => {
      // console.log(data);
      this.allFoodProducts = data;
      let cnt = Object.keys(this.allFoodProducts.data).length;
      console.log('Number of Food Products : ', cnt);
      if (cnt == 0) {
        window.alert('No Food Products Available! \nPlease Contact Manager');
        this.route.navigate(['/staff']);
      } else {
        let finalFoodProds = this.allFoodProducts.data;
        finalFoodProds = finalFoodProds.filter(function (v: {
          availability: boolean;
        }) {
          return v.availability === true;
        });
        this.allFoodProducts = finalFoodProds;
        let cnt = Object.keys(this.allFoodProducts).length;
        console.log('Number of Available Food Products: ', cnt);
        if (cnt == 0) {
          window.alert('No available Products! \nPlease Contact Manager');
          this.route.navigate(['/staff']);
        }
      }
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
      if (this.itemCountMap.get(itemId) === 1) {
        this.totalOrderPrice -= itemPrice;
        this.itemCountMap.delete(itemId);
      } else {
        this.itemCountMap.set(itemId, this.itemCountMap.get(itemId)! - 1);
        this.totalOrderPrice -= itemPrice;
      }
    }
    // console.log(this.totalOrderPrice);
  }
  reply: any;
  addNewOrder(form: NgForm) {
    const newDate = new Date();
    let newOrder = {
      status: 'confirmed',
      customerName: form.value.customerName,
      contactNumber: form.value.contactNumber,
      totalPrice: this.totalOrderPrice,
      orderCreatedTime: newDate,
    };
    console.log('Staff id: ' + this.staff.id);
    console.log('New Order Made : ', newOrder);
    this.reply = confirm('Do you want to place the order? ');
    if (this.reply == true) {
      this.fOService.saveFoodOrder(this.staff.id, newOrder).subscribe((r) => {
        console.log('Placed Order : ' + newOrder);
        this.res = r;
        this.foodOrderId = this.res.data.id;
        console.log(this.res.message);

        if (!this.res.error) {
          alert('Food Order made successfully!');
          //add foodProducts to items table
          this.itemCountMap.forEach((value, key) => {
            let data = { id: key, quantity: value };
            this.item.saveItem(data, this.foodOrderId).subscribe((p) => {
              console.log(p);
            });
          });

          this.route.navigate(['/staff']);
        }
      });
    }
  }
  resetTotalPrice() {
    this.totalOrderPrice = 0;
    console.log('Reset Working!');
  }
}
