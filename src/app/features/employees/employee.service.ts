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
  private employees: Employee[] = [];
  private storageKey = 'employees';

  constructor() {
    this.load();
  }

  private load() {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      this.employees = JSON.parse(data);
    } else {
      // Default data if nothing in storage
      this.employees = [
        { id: 1, name: 'Alice Johnson', department: 'HR', domain: 'HR', email: 'alice@company.com', role: 'HR Manager' },
        { id: 2, name: 'Bob Smith', department: 'Finance', domain: 'Finance', email: 'bob@company.com', role: 'Accountant' },
        { id: 3, name: 'Charlie Lee', department: 'Accounts', domain: 'Accounts', email: 'charlie@company.com', role: 'Accounts Executive' },
        { id: 4, name: 'Diana Prince', department: 'HR', domain: 'HR', email: 'diana@company.com', role: 'Recruiter' },
        { id: 5, name: 'Evan Wright', department: 'Finance', domain: 'Finance', email: 'evan@company.com', role: 'Finance Analyst' },
      ];
      this.save();
    }
  }

  private save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.employees));
  }

  getEmployees(): Employee[] {
    return [...this.employees];
  }

  getEmployeeById(id: number): Employee | undefined {
    return this.employees.find(e => e.id === id);
  }

  addEmployee(employee: Employee) {
    const newEmp = { ...employee, id: Date.now() };
    this.employees.push(newEmp);
    this.save();
  }

  updateEmployee(employee: Employee) {
    const idx = this.employees.findIndex(e => e.id === employee.id);
    if (idx > -1) {
      this.employees[idx] = { ...employee };
      this.save();
    }
  }

  deleteEmployee(id: number) {
    this.employees = this.employees.filter(e => e.id !== id);
    this.save();
  }
} 