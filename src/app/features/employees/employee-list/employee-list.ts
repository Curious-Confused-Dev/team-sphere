import { Component } from '@angular/core';
import { EmployeeService, Employee } from '../employee.service';
import { RouterLink } from '@angular/router';
import { Table } from '../../../shared/table/table';
import { Modal } from '../../../shared/modal/modal';
import { EmployeeDetail } from '../employee-detail/employee-detail';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Table, Modal, EmployeeDetail],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeList {
  employees: Employee[] = [];
  showModal = false;
  selectedEmployee: Employee | null = null;
  searchTerm = '';
  page = 1;
  pageSize = 5;
  showAddModal = false;
  modalMode: 'view' | 'edit' | 'add' = 'view';

  constructor(private employeeService: EmployeeService, private toast: ToastService) {}

  ngOnInit() {
    this.employees = this.employeeService.getEmployees();
  }

  viewEmployee(employee: Employee) {
    this.selectedEmployee = employee;
    this.modalMode = 'view';
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedEmployee = null;
  }

  deleteEmployee(employee: Employee) {
    this.employeeService.deleteEmployee(employee.id);
    this.employees = this.employeeService.getEmployees();
    this.toast.show('Employee deleted successfully', 'error');
    this.closeModal();
  }

  updateEmployee(updated: Employee) {
    this.employeeService.updateEmployee(updated);
    this.employees = this.employeeService.getEmployees();
    this.selectedEmployee = null;
    this.showModal = false;
    this.toast.show('Employee updated successfully', 'success');
  }

  get filteredEmployees(): Employee[] {
    const term = this.searchTerm.trim().toLowerCase();
    let filtered = this.employees;
    if (term) {
      filtered = filtered.filter(e =>
        e.name.toLowerCase().includes(term) ||
        e.department.toLowerCase().includes(term) ||
        e.domain.toLowerCase().includes(term) ||
        e.email.toLowerCase().includes(term) ||
        e.role.toLowerCase().includes(term)
      );
    }
    return filtered;
  }

  get pagedEmployees(): Employee[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredEmployees.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredEmployees.length / this.pageSize) || 1;
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

  editEmployee(employee: Employee) {
    this.selectedEmployee = employee;
    this.modalMode = 'edit';
    this.showModal = true;
  }

  openAddModal() {
    this.modalMode = 'add';
    this.selectedEmployee = null;
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  addEmployee(newEmployee: Employee) {
    this.employeeService.addEmployee(newEmployee);
    this.employees = this.employeeService.getEmployees();
    this.toast.show('Employee added successfully', 'success');
    this.closeAddModal();
  }
}
