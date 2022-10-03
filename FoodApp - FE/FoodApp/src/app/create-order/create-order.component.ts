import { FoodproductService } from './../Services/foodproduct.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
})
export class CreateOrderComponent implements OnInit {
  constructor(private fPservice: FoodproductService) {}

  allFoodProducts: any;
  ngOnInit(): void {
    this.fPservice.getAllFoodProducts().subscribe((data) => {
      // console.log(data);
      this.allFoodProducts = data;
      this.allFoodProducts = this.allFoodProducts.data;
      console.log('First Food Product : ', this.allFoodProducts[0]);
    });
  }
}
