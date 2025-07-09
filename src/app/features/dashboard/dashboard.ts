import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../employees/employee.service';
import { DepartmentService } from '../departments/department.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  employeeCount = 0;
  departmentCount = 0;
  domainCount = 0;

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit() {
    this.employeeCount = this.employeeService.getEmployees().length;
    this.departmentCount = this.departmentService.getDepartments().length;
    const domains = JSON.parse(localStorage.getItem('domains') || '[]');
    this.domainCount = Array.isArray(domains) ? domains.length : 0;
  }
}
