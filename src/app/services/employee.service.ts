import { Injectable } from '@angular/core';
import api from './api/api';
import { Employees, CreateEmployee, UpdateEmployee, VacationRecord } from '../interfaces/management';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employees: Employees[] = [];

  async getEmployees(): Promise<Employees[]> {
    const response = await api.get('/Employees/GetAllEmployees');
    this.employees = response.data;
    return this.employees;
  }

  getEmployeeById(id: string | null) {
    return this.employees.find((employee) => employee.id === id);
  }

  async addEmployee(employee: CreateEmployee) {
    const response = await api.post('/Employees/CreateEmployee', employee);
    return response.data;
  }

  updateEmployee(updatedEmployee: any) {
    const index = this.employees.findIndex((employee) => employee.id === updatedEmployee.id);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
    }
  }

  async deleteEmployee(employeeId: string): Promise<void> {
     await api.delete('/Employees/DeleteEmployee', { params: { employeeId}});
  }
}
