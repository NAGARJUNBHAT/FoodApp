import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffServiceService } from '../Services/staff-service.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  res : any;
  result : any;
  selectedOrder : any;
  staff = JSON.parse(localStorage.getItem("user")!);
  orderId = JSON.parse(localStorage.getItem("")!);

  constructor(private service : StaffServiceService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {

    let id = this.route.snapshot.params['id'];
    console.log(id);

    this.service.getOrderById(this.staff.id).subscribe((data) => {
      this.result = data;
      console.log(this.result.data.foodOrder);

      for(let r of this.result.data.foodOrder) {
        console.log(r);

        if(r.id==id) {
          console.log(id,r.id);
          this.selectedOrder=r;
          console.log(this.selectedOrder);
          break;
        }
        
      } 
      
    })
    
  }

  OnSubmit(form:NgForm){
    console.log(form.value);
    console.log("Staff id: "+this.staff.id);
    console.log("Order id: "+this.orderId);

      this.service.editOrderData(form.value).subscribe(r=>{
        this.res=r;
        console.log(this.res.message);
        
          alert(this.res.message);
          this.router.navigate(["/staff"]);
        
      
      })
    
  }

}
