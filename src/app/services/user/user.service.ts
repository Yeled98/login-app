import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { User } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // Get user logged information
  getLoggedUser(): Observable<User> {
    return this.http.get<User>(environment.api + 'users/me');
  }

  // Update user information
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(environment.api + 'users', user);
  }

  // Register a new user
  register(user: User): Observable<User> {
    return this.http.post<User>(environment.api + 'users', user);
  }
}
