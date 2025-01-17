import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastService } from '../services/shared/toast/toast.service';
import { UserService } from '../services/user/user.service';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastService,
    private userService: UserService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
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
    return this.registerForm.get('email');
  }

  // Getter for the password field
  private get password() {
    return this.registerForm.get('password');
  }

  // Register method to handle the form submission
  onRegister() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      const user: User = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      this.userService.register(user).subscribe({
        next: () => {
          this.toastService.presentToast(
            'Usuario registrado correctamente',
            'success'
          );
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error(error);
          this.registerForm.get('password')?.reset();
          this.toastService.presentToast(
            'Error al registrar el usuario',
            'danger'
          );
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

  getNameErrorText(): string {
    if (this.registerForm.get('name')?.hasError('required'))
      return 'El nombre es obligatorio';

    if (this.registerForm.get('name')?.hasError('minlength'))
      return 'El nombre debe tener al menos 3 caracteres';

    return '';
  }
}
