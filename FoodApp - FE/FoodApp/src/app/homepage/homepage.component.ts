import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  constructor(private router: Router) {}
  user: any;
  ngOnInit(): void {}
  checkIfLogin() {
    try {
      this.user = JSON.parse(localStorage.getItem('user')!);
      if (this.user.role != null) {
        alert('You are already Logged into your account!');
        if (this.user.role != null) {
          console.log(this.user);
          let role = this.user.role;
          if (role === 'staff') {
            console.log('Staff Dashboard');
            this.router.navigate(['staff']);
          } else if (role === 'BranchManager') {
            console.log('Manager Dashboard');
            this.router.navigate(['manager']);
          }
        }
      }
    } catch (error) {
      this.router.navigate(['login']);
    }
  }
}
