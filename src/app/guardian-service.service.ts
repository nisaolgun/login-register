import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class GuardianServiceService {

  constructor(private jwtHelper: JwtHelperService, private authService: AuthService) { }

  public isUser(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.role === 'user';
    } else {
      return false;
    }
  }
  public isAdmin(): boolean {

    const token = this.authService.getToken();

    if (!token) {
      return false;
    }

    const decodedToken = this.jwtHelper.decodeToken(token);
    const isAdmin = decodedToken.role === 'Admin';
    console.log('isAdmin:', isAdmin);
    return isAdmin;
  }
}  