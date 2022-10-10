import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerServiceService } from '../Services/manager-service.service';

@Component({
  selector: 'app-edit-fp',
  templateUrl: './edit-fp.component.html',
  styleUrls: ['./edit-fp.component.css'],
})
export class EditFpComponent implements OnInit {
  result: any;
  res: any;
  selectedProduct: any;
  manager = JSON.parse(localStorage.getItem('user')!);

  constructor(
    private service: ManagerServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    console.log(id);

    this.service.getMenu(this.manager.id).subscribe((data) => {
      this.result = data;
      console.log(this.result.data.foodProducts);

      for (let r of this.result.data.foodProducts) {
        if (r.id == id) {
          this.selectedProduct = r;
          console.log(this.selectedProduct.availability);
          break;
        }
      }
    });
  }

  OnSubmit(form: NgForm) {
    console.log(form.value);
    console.log('Manager id: ' + this.manager.id);

    this.service.editFpData(form.value).subscribe((r) => {
      this.res = r;
      console.log(this.res.message);
      console.log(this.selectedProduct);

      alert(this.res.message);
      this.router.navigate(['/manager']);
    });
  }
}
