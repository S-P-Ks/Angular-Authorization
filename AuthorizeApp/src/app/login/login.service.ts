import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  url!: `http://localhost:3000/api/login`;

  loginUser(post: any) {
    console.log(post);
    return this.http.post<any>(this.url, post);
  }
}
