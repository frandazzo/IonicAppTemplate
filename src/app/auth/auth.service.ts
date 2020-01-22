import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  get IsAuthenticated() {
    return this.isAuthenticated;
  }

  private isAuthenticated = false;

  logout() {
    this.isAuthenticated = false;
  }

  login() {
    this.isAuthenticated = true;
  }
}
