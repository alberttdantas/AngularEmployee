import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../../models/Employees';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { DepartamentEnumMapping } from '../../models/departament-enum.mapping';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCard],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent implements OnInit{

  inputdata: any;
  employee!: Employee;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref:MatDialogRef<DeleteComponent>
  ){}

  ngOnInit(): void {
    this.inputdata = this.data;

    this.employeeService.GetEmployee(this.inputdata.id).subscribe((response) => {
      this.employee = response.data;
    });
  }

  Delete(){
    this.employeeService.DeleteEmployee(this.inputdata.id).subscribe((response) => {
      this.ref.close();
      window.location.reload();
    });
  }

  Return(){
    this.ref.close();
  }
  
  translateDepartament(departament: string): string {
    const mapping = DepartamentEnumMapping as { [key: string]: string };
    return mapping[departament] || departament;
  }

}
