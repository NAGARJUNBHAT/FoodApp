import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../Services/item.service';
import { ManagerServiceService } from '../Services/manager-service.service';
import { StaffServiceService} from './../Services/staff-service.service'

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  id:number = 0;
  selectedProduct:any;
  res : any;
  orderItems : any;
  totalOrderPrice: number = 0;
  itemCountMap = new Map<number, number>();
  staff = JSON.parse(localStorage.getItem("user")!);
  allItems : any;

  constructor( private orders : StaffServiceService, private item:ItemService, private router : Router, private route:ActivatedRoute ) { }

  allFoodOrders: any;

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    console.log(this.id);

    this.orders.getAllFoodOrder(this.staff.id).subscribe((data) => {
      this.allFoodOrders = data;
      console.log('List of all the Orders :', this.allFoodOrders);

      for(let r of this.allFoodOrders.data){
        console.log(r);
        
        if(r.id==this.id){
          this.selectedProduct=r;
          this.totalOrderPrice = r.totalPrice;
                    
          break;
        }
      }
    });
   
     this.item.getItem(this.id).subscribe((data)=>{
       this.allItems=data;
       console.log(this.allItems.data);
       for(let i of this.allItems.data){
        this.itemCountMap.set(i.id,i.quantity);
       }
       console.log(this.itemCountMap);
       
     })

    
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
    console.log(this.itemCountMap);
    if (this.itemCountMap.has(itemId)) {
      if (this.itemCountMap.get(itemId) === 0) {        
      } else {
        this.itemCountMap.set(itemId, this.itemCountMap.get(itemId)! - 1);
        this.totalOrderPrice -= itemPrice;
      }
    }
  }

  reply: any;

  updateOrder(form: NgForm) {
    const newDate = new Date();
    let updateOrder = {
      id:this.id,
      status: "confirmed",
      customerName: form.value.customerName,
      contactNumber: form.value.contactNumber,
      totalPrice: this.totalOrderPrice,
      orderCreatedTime: newDate
    };
    console.log('Staff id: ' + this.staff.id);
    console.log('Food Order Update : ', updateOrder);
    this.reply = confirm('Do you want to update the order? ');
    if (this.reply == true) {
      this.orders.updateStatus(updateOrder).subscribe((r) => {
        this.res = r;
        console.log(this.res.message);
        if (!this.res.error) {
          alert('Food Order Updated successfully!');
          this.itemCountMap.forEach((value, key) => {
            let data={"id":key,"quantity":value};
            this.item.editItem(data).subscribe((p)=>{
              console.log(p);
            })
        });
          this.router.navigate(['/staff']);
        }
      });
      
    }
  }

  resetTotalPrice() {
    this.totalOrderPrice = 0;
    console.log('Reset Working!');
  }
}
