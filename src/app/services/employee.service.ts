import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Employee } from '../models/Employees';
import { Response } from '../models/Response';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = `${environment.ApiUrl}/employees`

  constructor(private http: HttpClient) { }

  GetEmployees(): Observable<Response<Employee[]>> {
    return this.http.get<Response<Employee[]>>(this.apiUrl);
  }

  GetEmployee(id: number): Observable<Response<Employee>> {
    return this.http.get<Response<Employee>>(`${this.apiUrl}/${id}`);
  }

  CreateEmployee(employee: Employee): Observable<Response<Employee[]>> {
    return this.http.post<Response<Employee[]>>(`${this.apiUrl}`, employee);
  }

  EditEmployee(employee: Employee): Observable<any> {
    return this.http.put(`${this.apiUrl}/${employee.id}`, employee);
  }

  InactiveEmployee(id: number) : Observable<Response<Employee[]>> {
    return this.http.put<Response<Employee[]>>(`${this.apiUrl}/Inactivate/${id}`, id);
  }

  DeleteEmployee(id: number) : Observable<Response<Employee[]>> {
    return this.http.delete<Response<Employee[]>>(`${this.apiUrl}/${id}`);
  }
  
}
