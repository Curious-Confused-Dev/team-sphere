import { Injectable } from '@angular/core';

export interface Department {
  id: number;
  name: string;
  description: string;
  head: string;
  numEmployees: number;
  createdAt: Date;
}

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  private departments: Department[] = [
    {
      id: 1,
      name: 'HR',
      description: 'Handles recruitment and employee relations',
      head: 'Diana Prince',
      numEmployees: 8,
      createdAt: new Date('2022-01-10')
    },
    {
      id: 2,
      name: 'Finance',
      description: 'Manages company finances and payroll',
      head: 'Evan Wright',
      numEmployees: 6,
      createdAt: new Date('2022-02-15')
    },
    {
      id: 3,
      name: 'Accounts',
      description: 'Oversees accounts and billing',
      head: 'Charlie Lee',
      numEmployees: 5,
      createdAt: new Date('2022-03-20')
    }
  ];

  getDepartments(): Department[] {
    return [...this.departments];
  }

  getDepartmentById(id: number): Department | undefined {
    return this.departments.find(d => d.id === id);
  }

  addDepartment(dept: Omit<Department, 'id' | 'createdAt'>): Department {
    const newDept: Department = {
      ...dept,
      id: this.departments.length ? Math.max(...this.departments.map(d => d.id)) + 1 : 1,
      createdAt: new Date()
    };
    this.departments.push(newDept);
    return newDept;
  }

  updateDepartment(updated: Department): void {
    const idx = this.departments.findIndex(d => d.id === updated.id);
    if (idx !== -1) {
      this.departments[idx] = { ...updated };
    }
  }

  deleteDepartment(id: number): void {
    this.departments = this.departments.filter(d => d.id !== id);
  }
} 