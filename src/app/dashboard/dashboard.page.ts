import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user/user.service';
import { ToastService } from '../services/shared/toast/toast.service';
import { AuthService } from '../services/auth/auth.service';

import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  user!: User;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    // Get user logged information
    this.userService.getLoggedUser().subscribe({
      next: (user: User) => {
        this.user = user;
      },
      error: (err) => {
        console.error(err);
        this.toastService.presentToast(
          'Error al obtener la información del usuario',
          'warning'
        );
      },
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
