import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartamentEnumMapping } from '../../models/departament-enum.mapping';
import { ShiftEnumMapping } from '../../models/shift-enum.mapping';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/Employees';
import { RouterModule } from '@angular/router';

// Angular Material
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';


@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule,
     ReactiveFormsModule,
     FormsModule,
      RouterModule,
       MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Employee>();
  @Input() btnAction!: string;
  @Input() btnTitle!: string;
  @Input() dataEmployee: Employee | null = null;

  departamentOptions = Object.entries(DepartamentEnumMapping).map(([enumKey, enumValue]) => ({
    key: enumKey,
    value: enumValue
  }));
  shiftOptions = Object.entries(ShiftEnumMapping).map(([enumKey, enumValue]) => ({
    key: enumKey,
    value: enumValue
  }));

  employeeForm!: FormGroup;

  constructor() {  }

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      id: new FormControl(this.dataEmployee ? this.dataEmployee.id : null),
      name: new FormControl(this.dataEmployee ? this.dataEmployee.name : '', [Validators.required]),
      lastName: new FormControl(this.dataEmployee ? this.dataEmployee.lastName : '', [Validators.required]),
      departament: new FormControl(this.dataEmployee ? this.dataEmployee.departament : '', [Validators.required]),
      shift: new FormControl(this.dataEmployee ? this.dataEmployee.shift : '', [Validators.required]),
      active: new FormControl(this.dataEmployee ? this.dataEmployee.active : true),
      creationDate: new FormControl({value: '', disabled: true}),
      modificationDate: new FormControl({value: '', disabled: true})
    });
  }

submit(){
  if (this.employeeForm.valid) {
  this.onSubmit.emit(this.employeeForm.value);
  }
}
  
}
