import { Component, OnInit } from '@angular/core';
import { Department } from '../../Core/Models/department';
import { DepartmentService } from '../../Core/Services/department-service';

@Component({
  selector: 'app-department-component',
  standalone: false,
  templateUrl: './department-component.html',
  styleUrl: './department-component.css',
})
export class DepartmentComponent implements OnInit {
  departments: Department[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';

  isFormOpen = false;
  isEditMode = false;
  currentDepartment: Department = this.getEmptyDepartment();

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  getEmptyDepartment(): Department {
    return {
      // no idDepartment here for new entity
      name: '',
      location: '',
      phone: '',
      head: '',
    };
  }

  loadDepartments(): void {
    this.loading = true;
    this.errorMessage = '';

    this.departmentService.getAllDepartments().subscribe({
      next: (data) => {
        this.departments = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load departments.';
        this.loading = false;
      },
    });
  }

  openCreateForm(): void {
    this.isEditMode = false;
    this.currentDepartment = this.getEmptyDepartment();
    this.isFormOpen = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  openEditForm(dept: Department): void {
    this.isEditMode = true;
    this.currentDepartment = { ...dept };
    this.isFormOpen = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  deleteDepartment(dept: Department): void {
    const confirmDelete = confirm(
      `Are you sure you want to delete department "${dept.name}" ?`
    );
    if (!confirmDelete) {
      return;
    }

    this.departmentService.deleteDepartment(dept.idDepartment!).subscribe({
      next: () => {
        this.successMessage = 'Department deleted successfully.';
        this.departments = this.departments.filter(
          (d) => d.idDepartment !== dept.idDepartment
        );
      },
      error: () => {
        this.errorMessage = 'Failed to delete department.';
      },
    });
  }

  submitForm(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.currentDepartment.name || !this.currentDepartment.location) {
      this.errorMessage = 'Name and location are required.';
      return;
    }

    if (this.isEditMode) {
      // UPDATE: idDepartment must be present
      this.departmentService.updateDepartment(this.currentDepartment).subscribe({
        next: (updated) => {
          this.successMessage = 'Department updated successfully.';
          const index = this.departments.findIndex(
            (d) => d.idDepartment === updated.idDepartment
          );
          if (index !== -1) {
            this.departments[index] = updated;
          }
          this.isFormOpen = false;
        },
        error: () => {
          this.errorMessage = 'Failed to update department.';
        },
      });
    } else {
      // CREATE: do NOT send idDepartment
      const { idDepartment, ...dto } = this.currentDepartment;

      this.departmentService.createDepartment(dto as Department).subscribe({
        next: (created) => {
          this.successMessage = 'Department created successfully.';
          this.departments.push(created);
          this.isFormOpen = false;
        },
        error: () => {
          this.errorMessage = 'Failed to create department.';
        },
      });
    }
  }

  cancelForm(): void {
    this.isFormOpen = false;
    this.currentDepartment = this.getEmptyDepartment();
  }
}