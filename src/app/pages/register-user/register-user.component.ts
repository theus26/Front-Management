import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

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
    cargo: '',
    Date: '',
    salario: null,
    status: 'ativo'
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
      const newId = Number(id);
      this.loadEmployee(newId);
    }
  }

  loadEmployee(id: number) {
    const employee = this.employeeService.getEmployeeById(id);
    if (employee) {
      this.employee = employee;
    }
  }

  onSubmit(cadastroForm: NgForm) {
    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.employee);
    } else {
      this.employeeService.addEmployee(this.employee);
    }
    this.router.navigate(['/']);
  }

  back() {
    this.router.navigate(['/']);
  }
}
