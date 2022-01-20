import { Component, Input, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  @Input('loggedin') loggedIn!: any;
  constructor(private registerServcie: RegisterService) {}

  ngOnInit(): void {
    this.loggedIn = this.registerServcie.loggedIn();
  }

  logOut() {
    this.registerServcie.logout();
    this.loggedIn = this.registerServcie.loggedIn();
  }
}
