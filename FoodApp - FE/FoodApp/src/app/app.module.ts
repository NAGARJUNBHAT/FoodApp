import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import {HttpClientModule} from '@angular/common/http'
import { StaffComponent } from './staff/staff.component';
import { AddFpComponent } from './add-fp/add-fp.component';
import { HomepageComponent } from './homepage/homepage.component';
import { EditFpComponent } from './edit-fp/edit-fp.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomepageComponent,
    ManagerDashboardComponent,
    StaffComponent,
    AddFpComponent,
    EditFpComponent,
    CreateOrderComponent,
    EditOrderComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
