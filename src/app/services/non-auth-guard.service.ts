import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
// import { ContactsService } from './contacts.service';

@Injectable({
  providedIn: 'root'
})
export class NonAuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['home']);
    return false;
  }
}
