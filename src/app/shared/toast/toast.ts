import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from './toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-8 right-8 z-50 flex flex-col gap-3 items-end pointer-events-none">
      <div *ngFor="let toast of toasts" [ngClass]="toastClass(toast)" class="px-5 py-3 rounded-xl shadow-lg min-w-[220px] max-w-xs text-sm font-medium animate-fadeIn pointer-events-auto flex items-center gap-2">
        <span>{{ toast.message }}</span>
      </div>
    </div>
  `,
  styles: [`
    .animate-fadeIn { animation: fadeIn 0.4s cubic-bezier(0.4,0,0.2,1); }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: none; } }
  `]
})
export class ToastComponent {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {}

  ngDoCheck() {
    this.toasts = this.toastService.getToasts();
  }

  toastClass(toast: Toast) {
    return {
      'bg-emerald-50 text-emerald-900 border border-emerald-200': toast.type === 'success',
      'bg-rose-50 text-rose-900 border border-rose-200': toast.type === 'error',
      'bg-slate-50 text-slate-900 border border-slate-200': toast.type === 'info',
      'shadow': true,
      'rounded-xl': true
    };
  }
} 