import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employees/employee.service';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-details.component.html',
})
export class EmployeeDetailsComponent implements OnInit {
  employee: any;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    this.employee = await this.employeeService.getEmployeeById(id);
    console.log(this.employee);

  }
  generateReport() {
    const doc = new jsPDF();
    const headers = ['Nome', 'Cargo', 'Data de Admissão', 'Salário', 'Status'];
    const rows = [[
      this.employee.name,
      this.employee.position,
      this.employee.admissionDate.split('T')[0],
      this.employee.wage,
      this.employee.isActive
    ]];

    autoTable(doc, {
    head: [headers],
    body: rows,
    });

    doc.save('relatorio_funcionarios.pdf');
    alert('Relatório gerado com sucesso!!');
  }
  goBack() {
    this.router.navigate(['/']);
  }
}
