import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient) {}
  url: string = 'http://localhost:3000/api/events';
  getEvents() {
    return this.http.get(this.url);
  }
}
