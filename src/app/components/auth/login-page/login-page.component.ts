import { AuthService } from '../../../core/services/auth.service';
import { Component } from '@angular/core';
import { LogoComponent } from '../../ui/logo/logo.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginResponse, loginUserData } from '../../../core/models/login';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    LogoComponent,
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    NgxSpinnerModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  showPassword = true;
  userData!: loginUserData;

  constructor(
    private _formBuilder: FormBuilder,
    private loginservice: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
  }
  loginForm: FormGroup = this._formBuilder.group({
    emailAddress: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  login() {
    // this.spinner.show('loading');
    if (this.loginForm.invalid) {
      return;
    } else if (this.loginForm.valid) {
      this.userData = this.loginForm.value;
      this.loginservice.login(this.userData).subscribe({
        next: (response: LoginResponse) => {
          sessionStorage.setItem('currentUser', JSON.stringify(response));
          // sessionStorage.setItem('toast', 'true');
          // this.loginservice.setCurrentUser(response);
          this.spinner.hide('loading');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log(err);
          // this.toastService.show(data.data, { classname: 'bg-danger text-white', delay: 15000 });
          // this.error = err;
        },
        complete: () => {
          this.spinner.show('login');
          setTimeout(() => {
            this.spinner.hide('login');
          }, 750);
        },
      });
    }
  }
}
