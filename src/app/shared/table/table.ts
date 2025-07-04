import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class Table {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Input() actions: any[] = [];
  @ContentChild('actionsTemplate', { static: false }) actionsTemplate?: TemplateRef<any>;
} 