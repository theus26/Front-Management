import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-register-holiday',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-holiday.component.html',
  styleUrl: './register-holiday.component.css'
})

export class RegisterHolidayComponent {
   constructor(
      private router: Router
    ) {}
    back() {
      this.router.navigate(['/']);
    }
  onSubmit() {
    alert('Cadastro realizado com sucesso!');
  }
}
