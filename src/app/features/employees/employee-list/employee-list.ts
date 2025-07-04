import { Component } from '@angular/core';
import { EmployeeService, Employee } from '../employee.service';
import { RouterLink } from '@angular/router';
import { Table } from '../../../shared/table/table';
import { Modal } from '../../../shared/modal/modal';
import { EmployeeDetail } from '../employee-detail/employee-detail';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employees = this.employeeService.getEmployees();
  }

  viewEmployee(employee: Employee) {
    this.selectedEmployee = employee;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedEmployee = null;
  }

  deleteEmployee(employee: Employee) {
    // TODO: Implement delete logic
    alert('Delete: ' + employee.name);
  }

  updateEmployee(updated: Employee) {
    const idx = this.employees.findIndex(e => e.id === updated.id);
    if (idx !== -1) {
      this.employees[idx] = { ...updated };
      this.selectedEmployee = { ...updated };
    }
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
    // Placeholder for future edit functionality
    this.viewEmployee(employee); // For now, just open the modal in view mode
  }
}
