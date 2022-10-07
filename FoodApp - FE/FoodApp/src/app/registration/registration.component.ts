import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../Services/user.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  createUser : any;
  manager = "BranchManager";
  staff = "staff";

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  register(form: NgForm) {
    console.log(form);
    console.log(form.value);
    
    
    // form.value.role = this.route.snapshot.params['role'];
    this.userService.registerUser(form.value).subscribe(res=>{
      console.log(res);
      this.router.navigate(["/login"]);
      alert("Registration successful");
    })
  }

}
