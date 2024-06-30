import { Component } from '@angular/core';
import { EmployeeFormComponent } from '../../components/employee-form/employee-form.component';
import { Employee } from '../../models/Employees';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [EmployeeFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  btnAction = "Cadastrar"
  btnTitle = "Cadastrar Funcionário"

  constructor(private employeeService: EmployeeService, private router: Router) {

  }

  CreateEmployee(employee: Employee){
    this.employeeService.CreateEmployee(employee).subscribe((data: any) => {
      this.router.navigate(['/']);
    });
  }
}
