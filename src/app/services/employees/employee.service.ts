import { Injectable } from '@angular/core';
import api from '../api/api';
import { Employees, CreateEmployee, UpdateEmployee, VacationRecord } from '../../interfaces/management';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employees: Employees[] = [];
  private employee: Employees = {} as Employees;

  async getEmployees(): Promise<Employees[]> {
    const response = await api.get('/Employees/GetAllEmployees');
    this.employees = response.data;
    return this.employees;
  }

  async getEmployeeById(employeeId: string | null): Promise<Employees> {
    const response = await api.get('/Employees/GetEmployeeById', { params: { employeeId } });
    this.employee = response.data;
    return this.employee;
  }

  async addEmployee(employee: CreateEmployee): Promise<Employees> {
    const response = await api.post('/Employees/CreateEmployee', employee);
    return response.data;
  }

  async addVacationRecord(vacationRecord: VacationRecord): Promise<Employees> {
    const response = await api.post('/Employees/CreateVacationRecords', vacationRecord);
    return response.data;
  }

  async updateEmployee(employeeId: string ,updatedEmployee: any): Promise<UpdateEmployee> {
    const response = await api.put('/Employees/UpdateEmployee', updatedEmployee, { params: { employeeId } });
    return response.data;
  }

  async getAverageSalary(): Promise<number> {
    const response = await api.get('/Employees/GetAverageSalary');
    return response.data;
  }

  async deleteEmployee(employeeId: string): Promise<void> {
     await api.delete('/Employees/DeleteEmployee', { params: { employeeId}});
  }
}
