import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// CRUD
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl = 'http://localhost:8000/employee';
  constructor(private httpClient: HttpClient) {}

  getEmployeesList(): Observable<I_Employee[]> {
    return this.httpClient.get<I_Employee[]>(`${this.baseUrl}`);
  }
  createEmployee(employee: I_Employee): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}`, employee);
  }
  getEmployeeById(id: number): Observable<I_Employee> {
    return this.httpClient.get<I_Employee>(`${this.baseUrl}/${id}`);
  }
  updateEmployee(id: number, employee: I_Employee): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, employee);
  }
  deleteEmployee(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}
