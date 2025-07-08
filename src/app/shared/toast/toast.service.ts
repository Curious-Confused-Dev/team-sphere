import { Injectable } from '@angular/core';

export interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
  id: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toasts: Toast[] = [];
  private nextId = 1;

  getToasts() {
    return this.toasts;
  }

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const toast: Toast = { message, type, id: this.nextId++ };
    this.toasts.push(toast);
    setTimeout(() => this.dismiss(toast.id), 3500);
  }

  dismiss(id: number) {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }
} 