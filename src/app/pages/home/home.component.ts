import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/Employees';
import { CommonModule } from '@angular/common';
import { DepartamentEnumMapping } from '../../models/departament-enum.mapping';

// Angular Material
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DeleteComponent } from '../../components/delete/delete.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
     RouterModule, 
      MatButtonModule,
      MatCardModule,
       MatInputModule,
        MatSelectModule,
         MatTableModule, 
          MatIconModule, 
           MatDialogModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  employees: Employee[] = [];
  generalEmployee: Employee[] = [];

  columnsToDisplay  = ['situation', 'name', 'lastName', 'departament', 'action', 'delete'];

  constructor( private employeeService: EmployeeService, public dialog: MatDialog){}

  ngOnInit(): void {
    
    this.employeeService.GetEmployees().subscribe(response => {
      const data = response.data;
      data.map((item) => {
        item.creationDate = this.formatarData(item.creationDate!);
        item.modificationDate = this.formatarData(item.modificationDate!);
      })
      this.employees = response.data;
      this.generalEmployee = response.data;

    });

  }

  private formatarData(dataISO: string): string {
    const data = new Date(dataISO);
    if (!isNaN(data.getTime())) {
      return data.toLocaleDateString('pt-BR');
    } else {
      return 'Data Inválida';
    }


  }

  public search(event : Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value.toLocaleLowerCase();

    this.employees = this.generalEmployee.filter(employee => {
      return employee.name.toLowerCase().includes(value);
    })
  }

  OpenDialog(id: number){
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '450px',
      height: '450px',
      autoFocus: false,
      data: {
        id: id
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      const button = document.querySelector('.close-modal');
      if (button instanceof HTMLElement) {
        button.blur();
      }
    });
  }

  

  translateDepartament(departament: string): string {
    const mapping = DepartamentEnumMapping as { [key: string]: string };
    return mapping[departament] || departament;
  }
}
