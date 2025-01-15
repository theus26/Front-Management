import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employees/employee.service';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CreateEmployee, Employees } from '../../interfaces/management';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  employee: Employees = {
    id: '',
    name: '',
    position: '',
    admissionDate: '',
    wage: 0,
    isActive: true,
    vacationRecords: [],
  };
  createEmployee: CreateEmployee = {
    name: '',
    position: '',
    admissionDate: '',
    wage: 0,
    isActive: true,
  };
  isEditMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadEmployee(id);
    }
  }

  async loadEmployee(id: string) {
    const employee = await this.employeeService.getEmployeeById(id);
    if (employee) {
      this.employee = employee;
    }
  }

  async onSubmit(registerForm: NgForm) {
    const formValues = this.mapFormValues(registerForm.value);
    if (this.isEditMode) {
      await this.updateEmployee(formValues);
    } else {
      await this.addEmployee(formValues);
    }
  }

  private mapFormValues(formValues: any): any {
    return {
      ...formValues,
      admissionDate: new Date(formValues.admissionDate).toISOString()
    };
  }

  private async updateEmployee(formValues: any) {
    this.employee = { ...formValues, id: this.employee.id };
    try {
      await this.employeeService.updateEmployee(this.employee.id, this.employee);
      this.router.navigate(['/']);
    } catch (error: any) {
      alert(error.response.data.error);
    }
  }

  private async addEmployee(formValues: any) {
    this.createEmployee = { ...formValues };
    try {
      await this.employeeService.addEmployee(this.createEmployee);
      this.router.navigate(['/']);
    } catch (error: any) {
      alert(error.response.data.error);
    }
  }

  back() {
    this.router.navigate(['/']);
  }
}
