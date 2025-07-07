import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Department } from '../department.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-department-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './department-detail.html',
  styleUrl: './department-detail.css'
})
export class DepartmentDetail {
  @Input() department?: Department;
  @Input() mode: 'view' | 'edit' | 'add' = 'view';
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Department>();

  editDepartment: Department | null = null;

  ngOnInit() {
    if ((this.mode === 'edit' || this.mode === 'add') && this.department) {
      this.editDepartment = {
        id: this.department.id ?? 0,
        name: this.department.name ?? '',
        description: this.department.description ?? '',
        head: this.department.head ?? '',
        numEmployees: this.department.numEmployees ?? 1,
        createdAt: this.department.createdAt ?? new Date()
      };
    }
  }

  startEdit() {
    this.mode = 'edit';
    if (this.department) {
      this.editDepartment = {
        id: this.department.id ?? 0,
        name: this.department.name ?? '',
        description: this.department.description ?? '',
        head: this.department.head ?? '',
        numEmployees: this.department.numEmployees ?? 1,
        createdAt: this.department.createdAt ?? new Date()
      };
    }
  }

  cancelEdit() {
    this.mode = 'view';
    this.editDepartment = null;
  }

  saveEdit() {
    if (this.editDepartment) {
      this.save.emit({ ...this.editDepartment });
      if (this.mode === 'edit') {
        this.mode = 'view';
      }
      this.editDepartment = null;
    }
  }
} 