import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../Services/user.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  constructor(
    private service: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  selectedUser: any;
  result: any;
  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    console.log('Id of user ', id);
    this.service.getAllUsers().subscribe((data) => {
      this.result = data;
      console.log(this.result.data);

      for (let r of this.result.data) {
        if (r.id == id) {
          this.selectedUser = r;
          console.log(this.selectedUser.name);
          break;
        }
      }
    });
  }
  res: any;
  user: any;
  OnSubmit(form: NgForm) {
    form.value.id = this.selectedUser.id;
    form.value.role = this.selectedUser.role;

    console.log(form.value);
    this.service.updateUser(form.value).subscribe((r) => {
      this.res = r;
      console.log(this.res.message);
      console.log(this.selectedUser);

      alert(this.res.message);
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
    });
  }
}
