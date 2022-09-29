import { Component, OnInit } from '@angular/core';
import { ManagerServiceService } from '../Services/manager-service.service';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {

  result:any
  value:number=3
  constructor(private menu:ManagerServiceService) { }

  ngOnInit(): void {
    this.menu.getMenu(this.value).subscribe((data)=>{
      this.result=data
      console.log(this.result);
      
    })
  }

}
