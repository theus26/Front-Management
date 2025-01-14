import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CreateEmployee } from '../../interfaces/management';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  employee: any = {
    id: null,
    name: '',
    position: '',
    admissionDate: '',
    wage: null,
    isActive: true,
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

  loadEmployee(id: string) {
    const employee = this.employeeService.getEmployeeById(id);
    console.log(employee);
    if (employee) {
      this.employee = employee;
    }
  }

  onSubmit(cadastroForm: NgForm) {
    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.employee);
    } else {
      const formValues = cadastroForm.value;
      formValues.isActive = formValues.isActive === "ativo";
      this.createEmployee = {
        ...formValues,
        admissionDate: new Date(formValues.admissionDate).toISOString()
      };

      this.employeeService.addEmployee(this.createEmployee)
        .then(() => this.router.navigate(['/']))
        .catch(() => alert('Error registering user'));
    }
  }

  back() {
    this.router.navigate(['/']);
  }
}
