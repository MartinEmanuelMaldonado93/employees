import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// CRUD
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseURL = 'https://localhost:8080/api/v1/employees';
  constructor(private httpClient: HttpClient) {}

  getEmployeesList(): Observable<I_Employee[]> {
    return this.httpClient.get<I_Employee[]>(`${this.baseURL}`);
  }
  createEmployee(employee: I_Employee): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, employee);
  }
  getEmployeeById(id: number): Observable<I_Employee> {
    return this.httpClient.get<I_Employee>(`${this.baseURL}/${id}`);
  }
  updateEmployee(id: number, employee: I_Employee): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, employee);
  }
  deleteEmployee(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
