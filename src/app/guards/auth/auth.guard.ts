import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/shared/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
class PermissionsService {
  constructor(
    private router: Router,
    private authService: AuthService,
    public toastService: ToastService
  ) {}

  canActivate(): boolean {
    if (this.authService.auth()) {
      return true;
    } else {
      this.toastService.presentToast(
        'Error: No tienes permisos para acceder a esta página.',
        'danger'
      );
      this.router.navigate(['login']);
      return false;
    }
  }
}

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(PermissionsService).canActivate();
};
