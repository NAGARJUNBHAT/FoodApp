import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { MangStaffComponent } from './mang-staff/mang-staff.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { StaffComponent } from './staff/staff.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AddFpComponent } from './add-fp/add-fp.component';
import { EditFpComponent } from './edit-fp/edit-fp.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { BillComponent } from './bill/bill.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'manager', component: ManagerDashboardComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'add-fp', component: AddFpComponent },
  { path: 'edit-fp/:id', component: EditFpComponent },
  { path: 'create-order', component: CreateOrderComponent },
  { path: 'edit-order/:id', component: EditOrderComponent },
  { path: 'bill/:id', component: BillComponent },
  { path: 'showStaff', component: MangStaffComponent },
  { path: 'addStaff', component: AddStaffComponent },
  { path: 'editStaff/:id', component: EditStaffComponent },
  { path: 'editProfile/:id', component: EditProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
