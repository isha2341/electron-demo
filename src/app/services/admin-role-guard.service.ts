import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ContactsService } from './contacts.service';

@Injectable({
  providedIn: 'root'
})
export class AdminRoleGuardService implements CanActivate{

  constructor(public router: Router,public contactService:ContactsService) {}
  canActivate(): boolean {
    if (this.contactService.currentUser().type!='admin') {
          // role not authorized so redirect to home page
          this.router.navigate(['home']);
          return false;
      }
      return true;
    }
}
