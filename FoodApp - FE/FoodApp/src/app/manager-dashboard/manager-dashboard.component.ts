import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerServiceService } from '../Services/manager-service.service';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {

  flag:boolean=false
  result:any
  
  value:number=3
  constructor(private menu:ManagerServiceService, private router:Router) { }

  ngOnInit(): void {
    this.menu.getMenu(this.value).subscribe((data)=>{
      this.result=data;
      console.log(this.result);
      
    })
  }

  deletefp(id:number){
    console.log("delete btn clicked. Id:"+id);
    
    this.menu.deleteFpData(id).subscribe((response)=>{
      console.log(response);
      this.router.navigate(['manager']);
      this.menu.getMenu(this.value).subscribe((data)=>{
        this.result=data;
        console.log(this.result);
      })

    })

  }
  editfp(id:number){
    console.log("edit byn clicked"+ id);
  }

}
