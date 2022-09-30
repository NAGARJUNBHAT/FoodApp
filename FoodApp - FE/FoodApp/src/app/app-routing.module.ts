import { StaffComponent } from './staff/staff.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AddFpComponent } from './add-fp/add-fp.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },

  { path: 'manager', component:ManagerDashboardComponent},
  { path: 'staff', component: StaffComponent },
  { path: 'add-fp',component:AddFpComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
