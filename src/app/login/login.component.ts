import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service.service';
import { GuardianServiceService } from '../guardian-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  emailOrPhoneNumber: string = '';
  password: string = '';
  token: string = '';
  hide: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private guardianService: GuardianServiceService,
    private toastr: ToastrService 
  ) {}

  onSubmit() {
    const credentials = {
      emailOrPhoneNumber: this.emailOrPhoneNumber,
      password: this.password,
      token: this.token
    };

    this.authService.login(credentials).subscribe({
      next: (response: any) => {
        console.log('Login successful', response);
        this.authService.setToken(response.token);

        const isAdmin = this.guardianService.isAdmin();
        console.log('isAdmin:', isAdmin);
        console.log('Token:', response.token);

        if (isAdmin) {
          this.router.navigate(['/adminpanel']);
        } else {
          this.router.navigate(['/categorypage']);
        }

        this.toastr.success('Login Successful', 'Success', {
          toastClass: 'ngx-toastr custom-toast'
        });
      },
      error: (error: any) => {
        console.error('Login failed', error);

        this.toastr.error('Login failed. Please try again.', 'Error');
      }
    });
  }
}
