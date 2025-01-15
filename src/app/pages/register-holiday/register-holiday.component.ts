import { VacationRecord } from './../../interfaces/management';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employees/employee.service';
import { Employees } from '../../interfaces/management';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-holiday',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register-holiday.component.html',
  styleUrl: './register-holiday.component.css'
})

export class RegisterHolidayComponent implements OnInit {
  employee: Employees = {
      id: '',
      name: '',
      position: '',
      admissionDate: '',
      wage: 0,
      isActive: true,
      vacationRecords: [],
    };

    vacationRecord: VacationRecord = {
      employeesId: '',
      vacationStartDate: new Date(),
      vacationeEndDate: new Date(),
      vacationStatus: 'Pending',
    };
    vacationStatus: string = '';
    statusMessage: string = '';

   constructor(
      private router: Router,
      private route: ActivatedRoute,
       private employeeService: EmployeeService,
    ) {}

    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadEmployee(id);
      }
    }

    async loadEmployee(id: string) {
      const employee = await this.employeeService.getEmployeeById(id);
      if (employee) {
        this.employee = employee;
        this.vacationStatus = this.employee.vacationRecords[0].vacationStatus;
        this.updateStatusMessage();
      }
    }

    back() {
      this.router.navigate(['/']);
    }

    updateStatusMessage(): void {
      if (this.vacationStatus === 'Pending') {
        this.statusMessage = 'O pedido de férias está pendente.';
      } else if (this.vacationStatus === 'InProgress') {
        this.statusMessage = 'O pedido de férias está em andamento.';
      }  else {
        this.statusMessage = '';
      }
    }

    async onSubmit(registerForm: NgForm) {
      this.mapFormValuesToVacationRecord(registerForm);
      await this.saveVacationRecord();
    }

    private mapFormValuesToVacationRecord(registerForm: NgForm): void {
      const { vacationStartDate, vacationeEndDate, vacationStatus } = registerForm.value;
      this.vacationRecord = {
      employeesId: this.employee.id,
      vacationStartDate: new Date(vacationStartDate),
      vacationeEndDate: new Date(vacationeEndDate),
      vacationStatus: vacationStatus,
      };

    this.vacationStatus = vacationStatus;
    this.updateStatusMessage();
    }

    private async saveVacationRecord(): Promise<void> {
      try {
        await this.employeeService.addVacationRecord(this.vacationRecord);
        alert('Registro de férias salvo com sucesso');
        this.router.navigate(['/']);
      } catch (error: any) {
        console.log(error.response.data.error);
        alert(error.response.data.error);
      }
    }
}
