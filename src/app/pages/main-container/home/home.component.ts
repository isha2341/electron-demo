import { Component } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  totalContacts:any=this.contactService.contactList.length;
  totalUsers:any=this.userService.getUsers().length;
  userType:boolean=(this.contactService.currentUser().type==='admin');
  constructor(private contactService:ContactsService,private userService:UsersService){
  }

}
