import { UserService } from './../Services/user.service';
import { Router } from '@angular/router';
import { ManagerServiceService } from './../Services/manager-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mang-staff',
  templateUrl: './mang-staff.component.html',
  styleUrls: ['./mang-staff.component.css'],
})
export class MangStaffComponent implements OnInit {
  manager = JSON.parse(localStorage.getItem('user')!);
  allStaff: any;
  staffFlag = false;
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllStaffs().subscribe((data) => {
      console.log(data);
      this.allStaff = data;
      this.allStaff = this.allStaff.data;
      console.log(this.allStaff);
      if (this.allStaff.length == 0) {
        this.staffFlag = true;
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  reply: any;
  deleteStaff(id: any) {
    console.log('delete btn clicked. Id:' + id);
    this.reply = window.confirm(
      'Are you sure you want to Fire the Staff Member?'
    );
    console.log(this.reply);
    if (this.reply == true) {
      this.userService.deleteUser(id).subscribe((response) => {
        console.log(response);
        this.router.navigate(['showStaff']);
        this.userService.getAllStaffs().subscribe((data) => {
          console.log(data);
          this.allStaff = data;
          this.allStaff = this.allStaff.data;
          console.log(this.allStaff);
          if (this.allStaff.length == 0) {
            this.staffFlag = true;
          }
        });
      });
      location.reload();
    }
  }
}
