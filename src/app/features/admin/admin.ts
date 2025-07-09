import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {
  editMode = false;
  profile = {
    name: 'Admin User',
    email: 'admin.teamsphere.com',
    role: 'Administrator'
  };
  editProfile = { ...this.profile };

  startEdit() {
    this.editProfile = { ...this.profile };
    this.editMode = true;
  }

  saveEdit() {
    this.profile = { ...this.editProfile };
    this.editMode = false;
  }

  cancelEdit() {
    this.editMode = false;
  }
} 