import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/shared/toast/toast.service';
import { HttpErrorResponse } from '@angular/common/http';

export function jwtInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastService);

  let tokenizeReq = req;

  if (authService.getToken() != null) {
    tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
  }

  return next(tokenizeReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        sessionStorage.removeItem('jwt');
        router.navigate(['home']);
        toastService.presentToast(
          'Error: No tienes permisos para acceder a esta página.',
          'danger'
        );
      }
      return throwError(() => err);
    })
  );
}
