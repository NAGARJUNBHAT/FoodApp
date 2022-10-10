import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FoodApp';
  constructor(private router: Router) {}
  user: any;

  goDashboard() {
    try {
      this.user = JSON.parse(localStorage.getItem('user')!);
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
    } catch (error) {
      alert('Please Login First!');
      this.router.navigate(['login']);
    }
  }

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
  goEditProfile() {
    try {
      this.user = JSON.parse(localStorage.getItem('user')!);
      console.log(this.user.id);
      console.log(this.user);
      this.router.navigate(['editProfile', this.user.id]);
    } catch (error) {
      alert('Please Login First!');
      this.router.navigate(['login']);
    }
  }
}
