import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerServiceService } from '../Services/manager-service.service';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css'],
})
export class ManagerDashboardComponent implements OnInit {
  flag: boolean = false;
  result: any;

  manager = JSON.parse(localStorage.getItem('user')!);
  my_menu: any;
  value: number = 1;
  constructor(private menu: ManagerServiceService, private router: Router) {}

  ngOnInit(): void {
    this.menu.getMenu(this.value).subscribe((data) => {
      this.result = data;
      console.log(this.result);
      console.log(this.manager);
      localStorage.setItem('my_menu', this.result.data.id);
    });
  }
  reply: any;
  deletefp(id: number) {
    console.log('delete btn clicked. Id:' + id);
    this.reply = window.confirm('Are you sure you want to delete the product?');
    console.log(this.reply);
    if (this.reply == true) {
      this.menu.deleteFpData(id).subscribe((response) => {
        console.log(response);
        this.router.navigate(['manager']);
        this.menu.getMenu(this.manager).subscribe((data) => {
          this.result = data;
          console.log(this.result);
        });
      });
      location.reload();
    }
  }
}
