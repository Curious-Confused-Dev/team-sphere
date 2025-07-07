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
  modalMode: 'view' | 'edit' | 'add' = 'view';
  selectedDepartment: Department | null = null;
  showAddModal = false;
  newDepartment: Department = {
    id: 0,
    name: '',
    description: '',
    head: '',
    numEmployees: 0,
    createdAt: new Date()
  };
  sortColumn: keyof Department | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private departmentService: DepartmentService) {}

  ngOnInit() {
    this.departments = this.loadDepartments();
  }

  loadDepartments(): Department[] {
    const data = localStorage.getItem('departments');
    if (data) {
      const parsed = JSON.parse(data);
      // Convert createdAt back to Date
      return parsed.map((d: any) => ({ ...d, createdAt: new Date(d.createdAt) }));
    }
    // Fallback to service's mock data
    const depts = this.departmentService.getDepartments();
    localStorage.setItem('departments', JSON.stringify(depts));
    return depts;
  }

  saveDepartments() {
    localStorage.setItem('departments', JSON.stringify(this.departments));
  }

  addDepartment(dept: Omit<Department, 'id' | 'createdAt'>) {
    const newDept = this.departmentService.addDepartment(dept);
    this.departments = this.departmentService.getDepartments();
    this.saveDepartments();
    return newDept;
  }

  updateDepartment(updated: Department) {
    this.departmentService.updateDepartment(updated);
    this.departments = this.departmentService.getDepartments();
    this.saveDepartments();
  }

  deleteDepartmentById(id: number) {
    this.departmentService.deleteDepartment(id);
    this.departments = this.departmentService.getDepartments();
    this.saveDepartments();
  }

  saveNewDepartment(dept: Department) {
    this.addDepartment({
      name: dept.name,
      description: dept.description,
      head: dept.head,
      numEmployees: dept.numEmployees
    });
    this.departments = this.loadDepartments();
    this.closeAddModal();
  }

  saveDepartment(updated: Department) {
    this.updateDepartment(updated);
    this.departments = this.loadDepartments();
    this.selectedDepartment = { ...updated };
    this.modalMode = 'view';
  }

  deleteDepartment(dept: Department) {
    if (confirm(`Are you sure you want to delete the department "${dept.name}"?`)) {
      this.deleteDepartmentById(dept.id);
      this.departments = this.loadDepartments();
      this.closeModal();
    }
  }

  // Sorting logic
  setSort(column: keyof Department) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  get sortedDepartments(): Department[] {
    if (!this.sortColumn) return this.filteredDepartments;
    const column = this.sortColumn;
    return [...this.filteredDepartments].sort((a, b) => {
      const valA = a[column];
      const valB = b[column];
      if (typeof valA === 'string' && typeof valB === 'string') {
        return this.sortDirection === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
      if (typeof valA === 'number' && typeof valB === 'number') {
        return this.sortDirection === 'asc' ? valA - valB : valB - valA;
      }
      if (valA instanceof Date && valB instanceof Date) {
        return this.sortDirection === 'asc'
          ? valA.getTime() - valB.getTime()
          : valB.getTime() - valA.getTime();
      }
      return 0;
    });
  }

  get pagedDepartments(): Department[] {
    const start = (this.page - 1) * this.pageSize;
    return this.sortedDepartments.slice(start, start + this.pageSize);
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

  openAddModal() {
    this.showAddModal = true;
    this.modalMode = 'add';
    this.selectedDepartment = null;
    this.newDepartment = {
      id: 0,
      name: '',
      description: '',
      head: '',
      numEmployees: 1,
      createdAt: new Date()
    };
  }

  closeAddModal() {
    this.showAddModal = false;
  }
}
