import { Component } from '@angular/core';
import { Modal } from '../../shared/modal/modal';
import { DomainDetail } from './domain-detail';
import { ToastService } from '../../shared/toast/toast.service';
// TODO: import DomainDetail when created

@Component({
  selector: 'app-domain-list',
  standalone: true,
  imports: [Modal, DomainDetail],
  templateUrl: './domain-list.html',
  styleUrl: './domain-list.css'
})
export class DomainList {
  showModal = false;
  modalMode: 'view' | 'edit' | 'add' = 'view';
  selectedDomain: any = null;
  domains: any[] = [];

  constructor(private toast: ToastService) {
    this.loadDomains();
  }

  loadDomains() {
    const data = localStorage.getItem('domains');
    if (data) {
      this.domains = JSON.parse(data);
    } else {
      this.domains = [
        { name: 'HR', type: 'Human Resources' },
        { name: 'Finance', type: 'Finance' },
        { name: 'Accounts', type: 'Accounts' }
      ];
      this.saveDomains();
    }
  }

  saveDomains() {
    localStorage.setItem('domains', JSON.stringify(this.domains));
  }

  openView(domain: any) {
    this.selectedDomain = domain;
    this.modalMode = 'view';
    this.showModal = true;
  }

  openEdit(domain: any) {
    this.selectedDomain = { ...domain };
    this.modalMode = 'edit';
    this.showModal = true;
  }

  openAdd() {
    this.selectedDomain = { name: '', type: '' };
    this.modalMode = 'add';
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedDomain = null;
  }

  saveDomain(updated: any) {
    if (this.modalMode === 'edit') {
      const idx = this.domains.findIndex(d => d.name === updated.name);
      if (idx !== -1) {
        this.domains[idx] = { ...updated };
        this.saveDomains();
        this.toast.show('Domain updated successfully', 'success');
      }
    }
    this.closeModal();
  }

  saveNewDomain(newDomain: any) {
    this.domains.push({ ...newDomain });
    this.saveDomains();
    this.toast.show('Domain added successfully', 'success');
    this.closeModal();
  }

  deleteDomain(domain: any) {
    this.domains = this.domains.filter(d => d !== domain);
    this.saveDomains();
    this.toast.show('Domain deleted successfully', 'success');
  }
} 