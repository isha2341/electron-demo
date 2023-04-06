import { Injectable } from '@angular/core';
import { Router, CanActivate, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { ContactsService } from './contacts.service';
@Injectable({
	providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
	constructor(public auth: AuthService, public router: Router,public contactService:ContactsService) {}
	canActivate(route: ActivatedRouteSnapshot ): boolean {
    console.log('route-->', route.data?.roles);
    console.log('route test-->', route.data?.roles?.includes('admin'));

		if (this.auth.isAuthenticated()) {
      this.router.events.subscribe((event) => {
        event instanceof NavigationEnd ? this.admin(event.url): null     })
     			return true;
		}
		this.router.navigate(['login']);
		return false;
	}

  public admin(url:string):boolean{
    if(url==='/users'){
      if (this.contactService.currentUser().type!='admin') {
        this.router.navigate(['/']);
        return false;
      }
    }
    return true
  }

}

