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

  private previouslyFocused: HTMLElement | null = null;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    if (this.open) {
      this.previouslyFocused = document.activeElement as HTMLElement;
      setTimeout(() => {
        const modalContent = this.el.nativeElement.querySelector('.modal-content');
        if (modalContent) {
          (modalContent as HTMLElement).focus();
        }
      });
    } else if (this.previouslyFocused) {
      setTimeout(() => this.previouslyFocused?.focus(), 0);
    }
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.open) {
      this.close();
    }
  }

  @HostListener('document:keydown.tab', ['$event'])
  trapTab(event: any) {
    if (!this.open) return;
    const modal = this.el.nativeElement.querySelector('.modal-content');
    if (!modal) return;
    const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0] as HTMLElement;
    const last = focusable[focusable.length - 1] as HTMLElement;
    if (event.shiftKey) {
      if (document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
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