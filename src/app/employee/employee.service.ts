import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl = environment.apiUrl;

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
    return this.httpClient.patch(`${this.baseUrl}/${id}`, employee);
  }
  deleteEmployee(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}