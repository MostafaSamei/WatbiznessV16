import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../../ui/logo/logo.component';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [LogoComponent, ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPageComponent {
  showPassword = true;
  constructor(private _formBuilder: FormBuilder) {}
  SignUpForm = this._formBuilder.group({
    fName: ['', [Validators.required, Validators.minLength(3)]],
    lName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phNumber: ['', [Validators.required, Validators.minLength(10)]],
    cName: ['', [Validators.required, Validators.minLength(3)]],
    cWebsite: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', Validators.required],
  });
  login() {}
}
