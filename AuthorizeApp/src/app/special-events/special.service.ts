import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpecialService {
  constructor(private http: HttpClient) {}
  url: string = 'http://localhost:3000/api/special';

  getSpecial() {
    return this.http.get(this.url);
  }
}
