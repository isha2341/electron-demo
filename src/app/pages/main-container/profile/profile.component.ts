import { Component } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import ConfirmedValidator from 'src/app/shared/confirmed.validator';
import PasswordValidator from 'src/app/shared/password.validator';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  changeName: FormGroup;
  changePassword: FormGroup;
  notMatch:boolean=false;
  username:string=this.contactService.currentUser().name;
  mail:string=this.contactService.currentUser().email;
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private contactService:ContactsService,
    private toast: ToastrService,
    private formBuilder: FormBuilder,
    private authService: AuthService)
    {
    this.changeName = this.formBuilder.group({
      name: ['',Validators.required],
    })
    this.changePassword=this.formBuilder.group({
      oldPassword:['',[Validators.required]],
      password: ['', [Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,12}$')]],
      confirmPassword: ['',[Validators.required]]
    }, {
      validators: [ConfirmedValidator.match('password', 'confirmPassword'),PasswordValidator.match(this.contactService.currentUser().password, 'oldPassword')]
    })

    this.authService.currentLoginUser.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((userObj:any)=>{
      console.log('profile userObj', userObj);
      if(userObj !== null){
        this.username = userObj.name
      }
    })
   }

   setName(){
    const userObj:any = this.contactService.changeName(this.changeName.value.name);
    this.toast.success('Name change Successfully!',);
    this.changeName.reset();
    this.authService.updateLoginUser(userObj);
   }

   setPassword(){
    this.contactService.changePassword(this.changePassword.value.password);
    this.toast.success('Password change Successfully!',);
    this.changePassword.reset();
   }

  f(name:string) { return this.changeName.get(name); }

  g(name:string){ return this.changePassword.get(name); }

  ngOnDestroy(){
    console.log('called');
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
