import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit() {
    this.employees = this.employeeService.getEmployees();
  }
  viewDetails(id: number) {
    this.router.navigate(['/employee', id]);
  }
  registerEmployee() {
    this.router.navigate(['/register']);
  }
  editUser(employ: any) {
    this.router.navigate(['/edit',employ.id]);
  }

  deleteUser(id: number) {
    if (confirm('Tem certeza que deseja excluir este funcionário?')) {
      this.employeeService.deleteEmployee(id);
      this.employees = this.employeeService.getEmployees();
      alert('Funcionário deletado com sucesso!');
    }
  }
}
