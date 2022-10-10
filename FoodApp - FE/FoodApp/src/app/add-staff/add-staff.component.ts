import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../Services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css'],
})
export class AddStaffComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  addStaff(form: NgForm) {
    console.log(form.value);
    form.value.password = 'newStaff';
    form.value.role = 'staff';
    console.log(form.value);

    this.userService.registerUser(form.value).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/showStaff']);
      alert('Staff Hired Successfully!');
    });
  }
}
