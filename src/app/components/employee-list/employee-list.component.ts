import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employees/employee.service';
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
  averageSalary = 0;
  showAverageModal = false;

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

  viewDetails(employeeId: string): void {
    this.router.navigate(['/employee', employeeId]);
  }

  registerHoliday(employeeId: string): void {
    this.router.navigate(['/registerHoliday/user', employeeId]);
  }

  registerEmployee(): void {
    this.router.navigate(['/register']);
  }

  editUser(employee: Employees): void {
    this.router.navigate(['/edit', employee.id]);
  }

  closeModal(): void {
    this.showAverageModal = false;
  }

  async showAverageSalaryModal(): Promise<void> {
    this.averageSalary = await this.employeeService.getAverageSalary();
    this.showAverageModal = true;
  }

  async deleteUser(employeeId: string): Promise<void> {
    const confirmed = confirm('Tem certeza que deseja excluir este funcionário?');
    if (confirmed) {
      await this.employeeService.deleteEmployee(employeeId);
      await this.loadEmployees();
      alert('Funcionário deletado com sucesso!');
    }
  }
}
