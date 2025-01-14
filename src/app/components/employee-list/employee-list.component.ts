import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { Employees } from '../../interfaces/management';


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employees[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.loadEmployees();
  }

  private async loadEmployees(): Promise<void> {
    this.employees = await this.employeeService.getEmployees();
  }

  viewDetails(id: string): void {
    this.router.navigate(['/employee', id]);
  }

  registerHoliday(id: string): void {
    this.router.navigate(['/registerHoliday/user', id]);
  }

  registerEmployee(): void {
    this.router.navigate(['/register']);
  }

  editUser(employee: Employees): void {
    this.router.navigate(['/edit', employee.id]);
  }

  async deleteUser(id: string): Promise<void> {
    const confirmed = confirm('Tem certeza que deseja excluir este funcionário?');
    if (confirmed) {
      await this.employeeService.deleteEmployee(id);
      await this.loadEmployees();
      alert('Funcionário deletado com sucesso!');
    }
  }
}
