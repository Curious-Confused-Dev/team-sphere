import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService, Employee } from '../employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.css'
})
export class EmployeeDetail {
  @Input() employee?: Employee;
  @Input() mode: 'view' | 'edit' | 'add' = 'view';
  @Input() departments: string[] = [];
  @Input() domains: string[] = [];
  @Output() backToList = new EventEmitter<void>();
  @Output() employeeUpdated = new EventEmitter<Employee>();
  @Output() save = new EventEmitter<Employee>();

  editMode = false;
  editEmployee: Employee | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    if (this.mode === 'add') {
      this.editMode = true;
      this.editEmployee = {
        id: 0,
        name: '',
        department: '',
        domain: '',
        email: '',
        role: ''
      };
    } else if (!this.employee) {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.employee = this.employeeService.getEmployeeById(id);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['mode'] && this.mode === 'add') {
      this.editMode = true;
      this.editEmployee = {
        id: 0,
        name: '',
        department: '',
        domain: '',
        email: '',
        role: ''
      };
    }
  }

  backToListHandler() {
    this.backToList.emit();
  }

  startEdit() {
    this.editMode = true;
    this.editEmployee = { ...this.employee } as Employee;
  }

  cancelEdit() {
    this.editMode = false;
    this.editEmployee = null;
  }

  saveEdit() {
    if (this.editEmployee) {
      if (this.mode === 'add') {
        this.save.emit({ ...this.editEmployee });
      } else {
        this.employee = { ...this.editEmployee };
        this.employeeUpdated.emit(this.employee);
        this.editMode = false;
        this.editEmployee = null;
      }
    }
  }
}
