import {  Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enrollment } from '../Models/enrollment';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {

  constructor(
    private http: HttpClient
  ){}
  private baseUrl = environment.apiUrl +'/Enrollment';

  getAllEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.baseUrl}/getAllEnrollment`);
  }

  getEnrollment(id: number): Observable<Enrollment> {
    return this.http.get<Enrollment>(`${this.baseUrl}/getEnrollment/${id}`);
  }

  createEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    return this.http.post<Enrollment>(`${this.baseUrl}/createEnrollment`, enrollment);
  }

  updateEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    return this.http.put<Enrollment>(`${this.baseUrl}/updateEnrollment`, enrollment);
  }

  deleteEnrollment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteEnrollment/${id}`);
  }
}
