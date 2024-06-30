import { Component, OnInit } from '@angular/core';
import { EmployeeFormComponent } from '../../components/employee-form/employee-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../models/Employees';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-edit',
    standalone: true,
    templateUrl: './edit.component.html',
    styleUrl: './edit.component.css',
    imports: [EmployeeFormComponent, CommonModule]
})
export class EditComponent implements OnInit {
    btnAction: string = 'Editar'
    btnTitle: string = 'Editar Funcionário'
    employee!: Employee;

    constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router){}

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));

        this.employeeService.GetEmployee(id).subscribe((response)=> {
            this.employee = response.data;
        })
    }

    editEmployee(employee:Employee){
        this.employeeService.EditEmployee(employee).subscribe((response)=> {
            this.router.navigate(['/'])
        })
    }

}
