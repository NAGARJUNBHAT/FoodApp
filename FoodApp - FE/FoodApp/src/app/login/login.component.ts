import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private route: Router) { }

  res : any;

  ngOnInit(): void {
  }

  login(form: NgForm) {
    console.log(form.value);
    this.userService.loginUser(form.value).subscribe(data=>{
    this.res = data;
    console.log(this.res)
    if(this.res.error){
      console.log("Invalid credentials");
      // this.toast.error(this.res.message)
      alert(this.res.message);
    }else if(this.res.data.role === "Manager"){
      localStorage.setItem("user", JSON.stringify(this.res.data))
      // this.toast.success(this.res.message)
      alert(this.res.message);
      this.route.navigate(["/manager-dashboard"])
    }else if(this.res.data.role === "Staff"){
      localStorage.setItem("user", JSON.stringify(this.res.data))
      // this.toast.success(this.res.message)
      alert(this.res.message);
      this.route.navigate(["/staff"])
    }else if(this.res.data.role === "User"){
      // this.toast.success(this.res.message)
      alert(this.res.message);
      this.route.navigate(["/user-dashboard"])
    }
   })
  }

}
