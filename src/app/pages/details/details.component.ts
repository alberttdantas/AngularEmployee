import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/Employees';
import { DepartamentEnumMapping } from '../../models/departament-enum.mapping';
import { ShiftEnumMapping } from '../../models/shift-enum.mapping';

// Angular Material
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterModule,
     MatButtonModule,
      MatCardModule,
       MatInputModule,
        MatSelectModule
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  
  translateDepartament(departament?: string): string {
    return departament ? DepartamentEnumMapping[departament] || departament : '';
  }

  translateShift(shift?: string): string {
    return shift ? ShiftEnumMapping[shift] || shift : '';
  }

  employee? : Employee
  id! : number;

  constructor(private employeeService: EmployeeService, private route:ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.employeeService.GetEmployee(this.id).subscribe((response) => {

      const value = response.data;

      value.creationDate = new Date(value.creationDate!).toLocaleDateString('pt-BR');
      value.modificationDate = new Date(value.modificationDate!).toLocaleDateString('pt-BR');

      this.employee = response.data;
    });
  }

  InactiveEmployee(event: Event){
    event.preventDefault();
    this.employeeService.InactiveEmployee(this.id).subscribe((response) => {
      this.router.navigate(['']);
    });
  }

}
