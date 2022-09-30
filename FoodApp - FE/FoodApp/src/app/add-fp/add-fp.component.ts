import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ManagerServiceService } from '../Services/manager-service.service';

@Component({
  selector: 'app-add-fp',
  templateUrl: './add-fp.component.html',
  styleUrls: ['./add-fp.component.css']
})
export class AddFpComponent implements OnInit {

  constructor(private service:ManagerServiceService, route:ActivatedRoute) { }

  ngOnInit(): void {
  }
  OnSubmit(form:NgForm){
    console.log(form.value);
    console.log(form);
    
  }

}
