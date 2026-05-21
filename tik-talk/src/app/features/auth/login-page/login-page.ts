import { Component, inject } from '@angular/core';
import { Button } from '../../../shared/components/button/button';
import { AuthService } from '../auth-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  imports: [Button, ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  authService = inject(AuthService);
  router = inject(Router);

  form = new FormGroup({
    username: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required]
    }),
    password: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required]
    }),
  })

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.authService.login(this.form.getRawValue()).subscribe(() => {
      this.router.navigate([""]);
    });
  }
}
