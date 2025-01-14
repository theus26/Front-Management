import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employees = [
    { id: 1, name: 'João', position: 'Desenvolvedor', Date: '2022-01-01', salario: 3000, status: 'ativo' },
    { id: 2, name: 'Maria', position: 'Desenvolvedor', Date: '2022-01-01', salario: 3000, status: 'ativo' },];

  getEmployees() {
    return this.employees.filter((employee) => employee.status === 'ativo');
  }

  getEmployeeById(id: number) {
    return this.employees.find((employee) => employee.id === id);
  }

  addEmployee(employee: any) {
    const newId = (this.employees.length + 1).toString();
    this.employees.push({ ...employee, id: newId });
  }

  updateEmployee(updatedEmployee: any) {
    const index = this.employees.findIndex((employee) => employee.id === updatedEmployee.id);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
    }
  }

  deleteEmployee(id: number): void {
    this.employees = this.employees.filter(employee => employee.id !== id);
  }
}
