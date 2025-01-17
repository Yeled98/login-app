import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth/auth.service';
import { User } from '../interfaces/user.interface';
import { ToastService } from '../services/shared/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastService,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[\\w.-]+@([a-zA-Z\\d-]+\\.)+[a-zA-Z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Getter for the email field
  private get email() {
    return this.loginForm.get('email');
  }

  // Getter for the password field
  private get password() {
    return this.loginForm.get('password');
  }

  // Login method to handle the form submission
  onLogin() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      const user: User = {
        name: '',
        email: formData.email,
        password: formData.password,
      };
      this.authService.login(user).subscribe({
        next: (session) => {
          this.authService.setSession(session);
          this.toastService.presentToast('Sesión iniciada', 'success');
          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          console.error(err);
          // Reset password field
          this.loginForm.get('password')?.reset();
          this.toastService.presentToast('Error al iniciar sesión', 'danger');
        },
      });
    }
  }

  getEmailErrorText(): string {
    if (this.email?.hasError('required')) return 'El email es obligatorio';

    if (this.email?.hasError('email') || this.email?.hasError('pattern'))
      return 'Email inválido';

    return '';
  }

  getPasswordErrorText(): string {
    if (this.password?.hasError('required'))
      return 'La contraseña es obligatoria';

    if (this.password?.hasError('minlength'))
      return 'La contraseña debe tener al menos 6 caracteres';

    return '';
  }
}
