import { Component } from '@angular/core';
import { DepartmentService, Department } from '../department.service';
import { Table } from '../../../shared/table/table';
import { Modal } from '../../../shared/modal/modal';
import { DepartmentDetail } from './department-detail';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [CommonModule, FormsModule, Table, Modal, DepartmentDetail],
  templateUrl: './department-list.html',
  styleUrl: './department-list.css'
})
export class DepartmentList {
  departments: Department[] = [];
  searchTerm = '';
  page = 1;
  pageSize = 5;
  showModal = false;
  modalMode: 'view' | 'edit' = 'view';
  selectedDepartment: Department | null = null;

  constructor(private departmentService: DepartmentService) {}

  ngOnInit() {
    this.departments = this.departmentService.getDepartments();
  }

  get filteredDepartments(): Department[] {
    const term = this.searchTerm.trim().toLowerCase();
    let filtered = this.departments;
    if (term) {
      filtered = filtered.filter(d =>
        d.name.toLowerCase().includes(term) ||
        d.description.toLowerCase().includes(term) ||
        d.head.toLowerCase().includes(term)
      );
    }
    return filtered;
  }

  get pagedDepartments(): Department[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredDepartments.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredDepartments.length / this.pageSize) || 1;
  }

  setPage(p: number) {
    if (p >= 1 && p <= this.totalPages) {
      this.page = p;
    }
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.page = 1;
  }

  openView(dept: Department) {
    this.selectedDepartment = dept;
    this.modalMode = 'view';
    this.showModal = true;
  }

  openEdit(dept: Department) {
    this.selectedDepartment = { ...dept };
    this.modalMode = 'edit';
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedDepartment = null;
  }

  deleteDepartment(dept: Department) {
    if (confirm(`Are you sure you want to delete the department "${dept.name}"?`)) {
      this.departmentService.deleteDepartment(dept.id);
      this.departments = this.departmentService.getDepartments();
      this.closeModal();
    }
  }

  saveDepartment(updated: Department) {
    this.departmentService.updateDepartment(updated);
    this.departments = this.departmentService.getDepartments();
    this.selectedDepartment = { ...updated };
    this.modalMode = 'view';
  }
}
