import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-domain-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './domain-detail.html',
  //tyleUrl: './domain-detail.css',
})
export class DomainDetail {
  @Input() domain: any;
  @Input() mode: 'view' | 'edit' | 'add' = 'view';
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  editDomain: any = {};

  ngOnInit() {
    if (this.mode === 'edit' || this.mode === 'add') {
      this.editDomain = { ...this.domain };
    }
  }

  startEdit() {
    this.mode = 'edit';
    this.editDomain = { ...this.domain };
  }

  saveEdit() {
    this.save.emit(this.editDomain);
  }
} 