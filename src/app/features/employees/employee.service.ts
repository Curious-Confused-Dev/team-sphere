import { Injectable } from '@angular/core';

export interface Employee {
  id: number;
  name: string;
  department: string;
  domain: string;
  email: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private employees: Employee[] = [
    { id: 1, name: 'Alice Johnson', department: 'HR', domain: 'HR', email: 'alice@company.com', role: 'HR Manager' },
    { id: 2, name: 'Bob Smith', department: 'Finance', domain: 'Finance', email: 'bob@company.com', role: 'Accountant' },
    { id: 3, name: 'Charlie Lee', department: 'Accounts', domain: 'Accounts', email: 'charlie@company.com', role: 'Accounts Executive' },
    { id: 4, name: 'Diana Prince', department: 'HR', domain: 'HR', email: 'diana@company.com', role: 'Recruiter' },
    { id: 5, name: 'Evan Wright', department: 'Finance', domain: 'Finance', email: 'evan@company.com', role: 'Finance Analyst' },
  ];

  getEmployees(): Employee[] {
    return [...this.employees];
  }

  getEmployeeById(id: number): Employee | undefined {
    return this.employees.find(e => e.id === id);
  }

  addEmployee(employee: Employee) {
    this.employees.push({ ...employee, id: Date.now() });
  }

  updateEmployee(employee: Employee) {
    const idx = this.employees.findIndex(e => e.id === employee.id);
    if (idx > -1) this.employees[idx] = { ...employee };
  }

  deleteEmployee(id: number) {
    this.employees = this.employees.filter(e => e.id !== id);
  }
} 