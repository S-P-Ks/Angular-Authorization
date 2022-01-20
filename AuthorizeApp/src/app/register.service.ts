import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient, private router: Router) {}
  url = `http://localhost:3000/api/`;
  createUser(post: any) {
    return this.http.post<any>(`${this.url}/register`, post);
  }

  loginUser(post: any) {
    return this.http.post<any>(`${this.url}/login`, post);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/events']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
