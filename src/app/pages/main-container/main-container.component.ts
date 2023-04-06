import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { ContactsService } from 'src/app/services/contacts.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss'],

})
export class MainContainerComponent {
  user:string=this.contactService.currentUser().name;
  userType:boolean=(this.contactService.currentUser().type==='admin');
  constructor(
    private router: Router,
    private storage:StorageService,
    private contactService:ContactsService,
    private authService: AuthService){
      this.authService.loginUser.subscribe((userObj:any)=>{
        console.log('main userObj', userObj);
        if(userObj !== null){
          this.user = userObj.name
        }
      })
    }
  logout(){
    this.storage.removeCookie();
    const navigationDetails: string[] = ['/login'];
    this.router.navigate(navigationDetails);
    location.reload();
  }
}
