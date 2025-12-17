import { Component, OnInit } from '@angular/core';
import { Student } from '../../Core/Models/student';
import { studentService } from '../../Core/Services/student';
import { Department } from '../../Core/Models/department';
import { DepartmentService } from '../../Core/Services/department-service';

@Component({
  selector: 'app-student-component',
  standalone: false,
  templateUrl: './student-component.html',
  styleUrl: './student-component.css',
})
export class StudentComponent implements OnInit {
  students: Student[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';
  departments: Department[] = [];   // <== for select

  isFormOpen = false;
  isEditMode = false;
  currentStudent: Student = this.getEmptyStudent();

  constructor(private studentService: studentService,
        private departmentService: DepartmentService

  ) {}

  ngOnInit(): void {
    this.loadStudents();
        this.loadDepartments();
  }
  loadDepartments(): void {
    this.departmentService.getAllDepartments().subscribe({
      next: (data) => (this.departments = data),
      error: () => (this.errorMessage = 'Failed to load departments list.'),
    });
  }
  getEmptyStudent(): Student {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      department: undefined,
    };
  }

  loadStudents(): void {
    this.loading = true;
    this.errorMessage = '';

    this.studentService.getAllStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load students.';
        this.loading = false;
      },
    });
  }

  // --- Create ---
  openCreateForm(): void {
    this.isEditMode = false;
    this.currentStudent = this.getEmptyStudent();
    this.isFormOpen = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  // --- Edit ---
  openEditForm(st: Student): void {
    this.isEditMode = true;
    this.currentStudent = { ...st };
    this.isFormOpen = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  // --- Delete ---
  deleteStudent(st: Student): void {
    const confirmDelete = confirm(
      `Are you sure you want to delete student "${st.firstName} ${st.lastName}" ?`
    );
    if (!confirmDelete || !st.idStudent) {
      return;
    }

    this.studentService.deleteStudent(st.idStudent).subscribe({
      next: () => {
        this.successMessage = 'Student deleted successfully.';
        this.students = this.students.filter(
          (s) => s.idStudent !== st.idStudent
        );
      },
      error: () => {
        this.errorMessage = 'Failed to delete student.';
      },
    });
  }

  // --- Submit Form (Create or Update) ---
  submitForm(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (
      !this.currentStudent.firstName ||
      !this.currentStudent.lastName ||
      !this.currentStudent.email
    ) {
      this.errorMessage = 'First name, last name and email are required.';
      return;
    }

    if (this.isEditMode) {
      this.studentService.updateStudent(this.currentStudent).subscribe({
        next: (updated) => {
          this.successMessage = 'Student updated successfully.';
          const index = this.students.findIndex(
            (s) => s.idStudent === updated.idStudent
          );
          if (index !== -1) {
            this.students[index] = updated;
          }
          this.isFormOpen = false;
        },
        error: () => {
          this.errorMessage = 'Failed to update student.';
        },
      });
    } else {
      // CREATE: do not send idStudent
      const { idStudent, ...dto } = this.currentStudent;

      this.studentService.createStudent(dto as Student).subscribe({
        next: (created) => {
          this.successMessage = 'Student created successfully.';
          this.students.push(created);
          this.isFormOpen = false;
        },
        error: () => {
          this.errorMessage = 'Failed to create student.';
        },
      });
    }
  }

  cancelForm(): void {
    this.isFormOpen = false;
    this.currentStudent = this.getEmptyStudent();
  }
}