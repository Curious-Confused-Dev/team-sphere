import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css'
})
export class Modal {
  @Input() open = false;
  @Output() closed = new EventEmitter<void>();

  constructor(private el: ElementRef) {}

  @HostListener('document:keydown.escape', ['$event'])
  onEsc(event: Event) {
    if (this.open) {
      this.close();
    }
  }

  onOverlayClick(event: MouseEvent) {
    if (event.target === this.el.nativeElement.querySelector('.modal-overlay')) {
      this.close();
    }
  }

  close() {
    this.closed.emit();
  }
} 