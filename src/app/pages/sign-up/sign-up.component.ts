import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import ConfirmedValidator from 'src/app/shared/confirmed.validator'
import { StorageService } from 'src/app/services/storage.service';
import { UsersService } from 'src/app/services/users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{
  obj:any={};
  user:any={};
  registerForm: FormGroup;
  constructor(
    private router: Router,
    private toast: ToastrService,
    private formBuilder: FormBuilder,
    private storage:StorageService,
    private userService:UsersService)
    {
    this.registerForm = this.formBuilder.group({
      name: ['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,12}$')]],
      confirmPassword: ['',[Validators.required]]
    }, {
      validators: [ConfirmedValidator.match('password', 'confirmPassword')],
    })
   }

   ngOnInit() {}

   showEmailError(){
    this.toast.error('Email Already Registered!',);
   }

   showSuccess() {
    this.toast.success('Registration Successful!',);
  }

  onSubmit(){
    if(this.userService.duplicateEmail(this.registerForm.value.email)){
      this.registerForm.reset();
      this.showEmailError();
      return
    }
    this.obj['uuid']=this.create_UUID();
    this.obj['type']='user';
    delete this.registerForm.value.confirmPassword;
    this.user={...this.obj,...this.registerForm.value}
    this.userService.register(this.user);
    this.showSuccess();
    const navigationDetails: string[] = ['/login'];
    this.router.navigate(navigationDetails);
    this.registerForm.reset();
  }

  create_UUID(){
    let date = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (date + Math.random()*16)%16 | 0;
        date = Math.floor(date/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

  f(name:string) { return this.registerForm.get(name); }

}


