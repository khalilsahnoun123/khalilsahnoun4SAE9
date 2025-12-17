import { HttpClientModule } from '@angular/common/http';
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './Pages/header/header';
import { Home } from './Pages/home/home';
import { StudentComponent } from './Pages/student-component/student-component';
import { EnrollmentComponent } from './Pages/enrollment-component/enrollment-component';
import { DepartmentComponent } from './Pages/department-component/department-component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    App,
Home,
    Header,
    StudentComponent,
    EnrollmentComponent,
    DepartmentComponent,
    

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
