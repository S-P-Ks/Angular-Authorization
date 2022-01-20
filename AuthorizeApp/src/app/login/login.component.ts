import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  LoginForm!: FormGroup;
  error?: string;
  constructor(
    private fb: FormBuilder,
    private LoginService: RegisterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  vanishError() {
    setTimeout(() => {
      this.error = '';
    }, 2000);
  }

  login() {
    this.LoginService.loginUser(this.LoginForm.value).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/special']);
      },
      (err) => ((this.error = err.error), this.vanishError()),
      () => console.log('Login Completed')
    );
  }
}
