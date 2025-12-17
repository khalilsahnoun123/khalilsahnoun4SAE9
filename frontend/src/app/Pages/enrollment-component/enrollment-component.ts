import { Component, OnInit } from '@angular/core';
import { Enrollment } from '../../Core/Models/enrollment';
import { Student } from '../../Core/Models/student';
import { EnrollmentService } from '../../Core/Services/enrollment-service';
import { studentService } from '../../Core/Services/student';
import { Status } from '../../Core/Models/status';

@Component({
  selector: 'app-enrollment-component',
  standalone: false,
  templateUrl: './enrollment-component.html',
  styleUrl: './enrollment-component.css',
})
export class EnrollmentComponent implements OnInit {
  enrollments: Enrollment[] = [];
  students: Student[] = [];

  loading = false;
  errorMessage = '';
  successMessage = '';

  isFormOpen = false;
  isEditMode = false;
  currentEnrollment: Enrollment = this.getEmptyEnrollment();

  // if Status is a string enum on backend, list possible values here:
  statusOptions: String[] = ['DROPPED', 'ACTIVE', 'COMPLETED', 'FAILED','WITHDRAWN'];

  constructor(
    private enrollmentService: EnrollmentService,
    private studentServiceApi: studentService
  ) {}

  ngOnInit(): void {
    this.loadEnrollments();
    this.loadStudents();
  }

  getEmptyEnrollment(): Enrollment {
    return {
      enrollmentDate: '',
      grade: 0,
      status: 'ACTIVE' as any,
      student: undefined,
    };
  }

  loadEnrollments(): void {
    this.loading = true;
    this.errorMessage = '';

    this.enrollmentService.getAllEnrollments().subscribe({
      next: (data) => {
        this.enrollments = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load enrollments.';
        this.loading = false;
      },
    });
  }

  loadStudents(): void {
    this.studentServiceApi.getAllStudents().subscribe({
      next: (data) => {
        this.students = data;
      },
      error: () => {
        this.errorMessage = 'Failed to load students list.';
      },
    });
  }

  // --- Create ---
  openCreateForm(): void {
    this.isEditMode = false;
    this.currentEnrollment = this.getEmptyEnrollment();
    this.isFormOpen = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  // --- Edit ---
  openEditForm(e: Enrollment): void {
    this.isEditMode = true;
    this.currentEnrollment = { ...e };
    this.isFormOpen = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  // --- Delete ---
  deleteEnrollment(e: Enrollment): void {
    if (!e.idEnrollment) {
      return;
    }

    const confirmDelete = confirm(
      `Are you sure you want to delete enrollment #${e.idEnrollment}?`
    );
    if (!confirmDelete) {
      return;
    }

    this.enrollmentService.deleteEnrollment(e.idEnrollment).subscribe({
      next: () => {
        this.successMessage = 'Enrollment deleted successfully.';
        this.enrollments = this.enrollments.filter(
          (en) => en.idEnrollment !== e.idEnrollment
        );
      },
      error: () => {
        this.errorMessage = 'Failed to delete enrollment.';
      },
    });
  }

  // --- Submit Form (Create or Update) ---
  submitForm(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.currentEnrollment.enrollmentDate || !this.currentEnrollment.student) {
      this.errorMessage = 'Enrollment date and student are required.';
      return;
    }

    if (this.isEditMode) {
      this.enrollmentService.updateEnrollment(this.currentEnrollment).subscribe({
        next: (updated) => {
          this.successMessage = 'Enrollment updated successfully.';
          const index = this.enrollments.findIndex(
            (en) => en.idEnrollment === updated.idEnrollment
          );
          if (index !== -1) {
            this.enrollments[index] = updated;
          }
          this.isFormOpen = false;
        },
        error: () => {
          this.errorMessage = 'Failed to update enrollment.';
        },
      });
    } else {
      const { idEnrollment, ...dto } = this.currentEnrollment;

      this.enrollmentService.createEnrollment(dto as Enrollment).subscribe({
        next: (created) => {
          this.successMessage = 'Enrollment created successfully.';
          this.enrollments.push(created);
          this.isFormOpen = false;
        },
        error: () => {
          this.errorMessage = 'Failed to create enrollment.';
        },
      });
    }
  }

  cancelForm(): void {
    this.isFormOpen = false;
    this.currentEnrollment = this.getEmptyEnrollment();
  }
}