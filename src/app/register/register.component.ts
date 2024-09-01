import { Component } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  companyname: string = '';
  name: string = '';
  surname: string = '';
  email: string = '';
  phonenumber: string = '';
  password: string = '';
  confirmPassword: string = '';
  description: string = '';
  country: string = '';
  passwordMismatchError: boolean = false;
  registrationError: string | null = null;
  registrationSuccess: boolean = false;

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.passwordMismatchError = true;
      return;
    }
    this.passwordMismatchError = false;

    this.authService.register({
      companyname: this.companyname,
      name: this.name,
      surname: this.surname,
      email: this.email,
      phonenumber: this.phonenumber,
      password: this.password,
      description: this.description,
      country: this.country
    }).subscribe(
      response => {
        console.log('Registration successful', response);
        this.registrationSuccess = true;
        this.registrationError = null;
      },
      error => {
        console.error('Registration failed', error);
        this.registrationSuccess = false;
        this.registrationError = 'Registration failed. Please try again.';
      }
    );
  }
}
