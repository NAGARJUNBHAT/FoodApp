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
  OnSubmit(form: NgForm) {
    form.value.id = this.selectedUser.id;
    form.value.role = this.selectedUser.role;

    console.log(form.value);
    this.service.updateUser(form.value).subscribe((r) => {
      this.res = r;
      console.log(this.res.message);
      console.log(this.selectedUser);

      alert(this.res.message);
      this.router.navigate(['/login']);
    });
  }
}
