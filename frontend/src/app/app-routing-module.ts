import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './Pages/home/home';
import { StudentComponent } from './Pages/student-component/student-component';
import { DepartmentComponent } from './Pages/department-component/department-component';
import { EnrollmentComponent } from './Pages/enrollment-component/enrollment-component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: Home },
  { path: 'students', component: StudentComponent },
  { path: 'departments', component: DepartmentComponent },
  { path: 'enrollments', component: EnrollmentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
