import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { Observable } from 'rxjs';

import { ToastService } from 'src/app/services/shared/toast/toast.service';

import { environment } from 'src/environments/environment';

import { User } from 'src/app/interfaces/user.interface';
import { Session } from 'src/app/interfaces/session.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login$: Observable<boolean> = new Observable<boolean>((observer) => {
    const jwt = sessionStorage.getItem('jwt');
    observer.next(jwt !== null);
  });

  constructor(
    private alertCtrl: AlertController,
    private http: HttpClient,
    private router: Router,
    public toastService: ToastService
  ) {}

  login(user: User): Observable<Session> {
    return this.http.post<Session>(environment.api + 'users/login', user);
  }

  // create a setSession method
  setSession(session: Session) {
    sessionStorage.setItem('jwt', session.jwt);
    this.login$ = new Observable<boolean>((observer) => {
      observer.next(true);
    });
  }

  auth(): boolean {
    if (sessionStorage.getItem('jwt')) return true;
    else return false;
  }

  getToken(): string | null {
    return sessionStorage.getItem('jwt');
  }

  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar sesión',
      message: '¿Está seguro de cerrar sesión?',
      mode: 'md',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Cerrar sesión',
          handler: () => {
            this.toastService.presentToast(
              'Sesión cerrada correctamente',
              'success'
            );
            this.closeSession();
          },
        },
      ],
    });
    await alert.present();
  }

  closeSession() {
    sessionStorage.removeItem('jwt');
    this.login$ = new Observable<boolean>((observer) => {
      observer.next(false);
    });
    this.router.navigate(['login']);
  }
}
