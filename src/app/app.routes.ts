import { Routes } from '@angular/router';
 import { EmployeeListComponent } from './components/employee-list/employee-list.component';
 import { EmployeeDetailsComponent } from './pages/employee-details/employee-details.component';
 import { RegisterUserComponent } from './pages/register-user/register-user.component';

export const routes: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: 'register', component: RegisterUserComponent},
  { path: 'edit/:id', component: RegisterUserComponent},
  { path: 'employee/:id', component: EmployeeDetailsComponent },
];
