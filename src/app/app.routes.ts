import { Routes } from '@angular/router';
 import { EmployeeListComponent } from './components/employee-list/employee-list.component';
 import { EmployeeDetailsComponent } from './pages/employee-details/employee-details.component';
 import { RegisterUserComponent } from './pages/register-user/register-user.component';
 import { RegisterHolidayComponent } from './pages/register-holiday/register-holiday.component';

export const routes: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: 'register', component: RegisterUserComponent},
  { path: 'registerHoliday/user/:id', component: RegisterHolidayComponent},
  { path: 'edit/:id', component: RegisterUserComponent},
  { path: 'employee/:id', component: EmployeeDetailsComponent },
];
