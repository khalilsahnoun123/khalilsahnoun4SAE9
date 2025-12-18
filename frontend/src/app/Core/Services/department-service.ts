import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../Models/department';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  constructor(
    private http: HttpClient,
  ) {}
    private baseUrl = environment.apiUrl +'/Depatment';

  getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.baseUrl}/getAllDepartment`);
  }

  getDepartment(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.baseUrl}/getDepartment/${id}`);
  }

  createDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(`${this.baseUrl}/createDepartment`, department);
  }

  updateDepartment(department: Department): Observable<Department> {
    return this.http.put<Department>(`${this.baseUrl}/updateDepartment`, department);
  }

  deleteDepartment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteDepartment/${id}`);
  }
}
