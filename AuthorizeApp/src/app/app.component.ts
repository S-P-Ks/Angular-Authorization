import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnChanges {
  title = 'AuthorizeApp';
  loggedIn: boolean = false;
  constructor(private registerServcie: RegisterService) {}

  ngOnInit(): void {
    this.loggedIn = this.registerServcie.loggedIn();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  logOut() {
    this.registerServcie.logout();
    this.loggedIn = this.registerServcie.loggedIn();
  }
}
