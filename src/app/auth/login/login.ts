import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  mode: 'email' | 'mobile' = 'email';
  email = '';
  password = '';
  showPassword = false;
  emailError = '';
  passwordError = '';
  loginError = '';

  mobile = '';
  otpSent = false;
  otp = '';
  otpError = '';
  otpValue = '';
  otpTimer = 0;
  otpTimerInterval: any;
  mobileError = '';
  otpLoginError = '';

  constructor(private auth: AuthService, private router: Router) {}

  switchMode(mode: 'email' | 'mobile') {
    this.mode = mode;
    this.clearErrors();
  }

  clearErrors() {
    this.emailError = '';
    this.passwordError = '';
    this.loginError = '';
    this.mobileError = '';
    this.otpError = '';
    this.otpLoginError = '';
  }

  validateEmail(): boolean {
    if (!this.email) {
      this.emailError = 'Email is required.';
      return false;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(this.email)) {
      this.emailError = 'Invalid email format.';
      return false;
    }
    this.emailError = '';
    return true;
  }

  validatePassword(): boolean {
    if (!this.password) {
      this.passwordError = 'Password is required.';
      return false;
    }
    if (this.password.length < 6) {
      this.passwordError = 'Password must be at least 6 characters.';
      return false;
    }
    this.passwordError = '';
    return true;
  }

  loginWithEmail() {
    this.clearErrors();
    if (!this.validateEmail() || !this.validatePassword()) return;
    if (!this.auth.loginWithEmail(this.email, this.password)) {
      this.loginError = 'Invalid email or password.';
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }

  validateMobile(): boolean {
    if (!this.mobile) {
      this.mobileError = 'Mobile number is required.';
      return false;
    }
    if (!/^\d{10}$/.test(this.mobile)) {
      this.mobileError = 'Enter a valid 10-digit mobile number.';
      return false;
    }
    this.mobileError = '';
    return true;
  }

  sendOtp() {
    this.clearErrors();
    if (!this.validateMobile()) return;
    this.otpValue = this.auth.sendOtp(this.mobile);
    this.otpSent = true;
    this.otp = '';
    this.otpTimer = 30;
    this.otpTimerInterval = setInterval(() => {
      this.otpTimer--;
      if (this.otpTimer <= 0) {
        clearInterval(this.otpTimerInterval);
      }
    }, 1000);
  }

  verifyOtp() {
    this.otpError = '';
    if (!this.otp || this.otp.length !== 6) {
      this.otpError = 'Enter the 6-digit OTP.';
      return;
    }
    if (!this.auth.verifyOtp(this.mobile, this.otp)) {
      this.otpLoginError = 'Invalid OTP.';
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }

  showHidePassword() {
    this.showPassword = !this.showPassword;
  }
} 