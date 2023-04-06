import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // providers: [CookieService]
})
export class LoginComponent implements OnInit{
  loginForm:any;
  constructor(
    private router: Router,
    private toast: ToastrService,
    private userService:UsersService){}

  ngOnInit(){
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',Validators.required),
    });
  }

  showError() {
    this.toast.error('Invalid Credentials!',);
  }

  onSubmit(){
    console.log(this.loginForm.value);
    if(this.userService.login(this.loginForm.value)){
      console.log("Valid Login");
      const navigationDetails: string[] = ['/maincontainer'];
      this.router.navigate(navigationDetails);
    }else{
      this.showError();
    }
    this.loginForm.reset();
  }

  get f() { return this.loginForm.controls; }

}
