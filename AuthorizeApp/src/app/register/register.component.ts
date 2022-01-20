import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  ErrorMessage?: String;
  RegisterForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.RegisterForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  Register() {
    console.log(this.RegisterForm.value);
    this.registerService.createUser(this.RegisterForm.value).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/events']);
      },
      (err) => (this.ErrorMessage = err.error),
      () => console.log('Completed')
    );
  }
}
