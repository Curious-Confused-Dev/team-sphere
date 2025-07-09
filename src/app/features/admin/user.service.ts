import { Injectable } from '@angular/core';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'editor' | 'viewer';
  active: boolean;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private users: User[] = [];
  private storageKey = 'users';

  constructor() {
    this.load();
  }

  private load() {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      this.users = JSON.parse(data);
    } else {
      // Default admin user
      this.users = [
        { id: 1, name: 'Admin User', email: 'admin@teamsphere.com', password: 'admin123', role: 'admin', active: true }
      ];
      this.save();
    }
  }

  private save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.users));
  }

  getUsers(): User[] {
    return [...this.users];
  }

  getUserByEmail(email: string): User | undefined {
    return this.users.find(u => u.email === email);
  }

  addUser(user: Omit<User, 'id'>): User {
    const newUser: User = { ...user, id: Date.now() };
    this.users.push(newUser);
    this.save();
    return newUser;
  }

  updateUser(updated: User) {
    const idx = this.users.findIndex(u => u.id === updated.id);
    if (idx !== -1) {
      this.users[idx] = { ...updated };
      this.save();
    }
  }

  deleteUser(id: number) {
    this.users = this.users.filter(u => u.id !== id);
    this.save();
  }
} 