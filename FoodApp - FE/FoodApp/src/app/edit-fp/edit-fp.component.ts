import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ManagerServiceService } from '../Services/manager-service.service';

@Component({
  selector: 'app-edit-fp',
  templateUrl: './edit-fp.component.html',
  styleUrls: ['./edit-fp.component.css']
})
export class EditFpComponent implements OnInit {

  res:any
  manager = JSON.parse(localStorage.getItem("user")!);
  menu_id = JSON.parse(localStorage.getItem("my_menu")!);

  constructor(private service:ManagerServiceService, private route:Router) { }

  ngOnInit(): void {
  }

  OnSubmit(form:NgForm){
    console.log(form.value);
    console.log("Manager id: "+this.manager.id);
    console.log("Menu id: "+this.menu_id);

      // this.service.editFpData(form.value, this.menu_id).subscribe(r=>{
      //   this.res=r;
      //   console.log(this.res.message);
        
      //     alert(this.res.message);
      //     this.route.navigate(["/manager"])
        
      
      // })
    
  }
}
