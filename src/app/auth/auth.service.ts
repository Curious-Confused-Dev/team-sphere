import { Injectable } from '@angular/core';

export interface User {
  id: number;
  name: string;
  email: string;
  mobile: string;
  password: string;
  avatarUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users: User[] = [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@example.com',
      mobile: '9999999999',
      password: 'admin123',
      avatarUrl: ''
    }
  ];
  private otpMap: { [mobile: string]: string } = {};

  get currentUser(): User | null {
    const data = localStorage.getItem('currentUser');
    return data ? JSON.parse(data) : null;
  }

  loginWithEmail(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  sendOtp(mobile: string): string {
    const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
    this.otpMap[mobile] = otp;
    // In real app, send OTP via SMS API
    return otp; // For mock/testing, return OTP
  }

  verifyOtp(mobile: string, otp: string): boolean {
    const valid = this.otpMap[mobile] === otp;
    if (valid) {
      let user = this.users.find(u => u.mobile === mobile);
      if (!user) {
        user = {
          id: this.users.length + 1,
          name: 'User ' + mobile,
          email: '',
          mobile,
          password: '',
          avatarUrl: ''
        };
        this.users.push(user);
      }
      localStorage.setItem('currentUser', JSON.stringify(user));
      delete this.otpMap[mobile];
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  updateAvatar(url: string) {
    const user = this.currentUser;
    if (user) {
      user.avatarUrl = url;
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }
} 