import { Injectable } from '@angular/core';
import {StorageService} from 'src/app/services/storage.service'
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loginUser: Subject<any> = new BehaviorSubject<any>(null);
  public currentLoginUser:Observable<any> = this.loginUser.asObservable();
  constructor(private storage:StorageService) {
    const token:any = this.storage.getCookie();
    const data = this.storage.getData();
    const i = data.user.find((e:any) => e.uuid===token);
    if(i){
      this.loginUser.next(i);
    } else{
      this.loginUser.next(null);
    }
  }
  // ...
  public isAuthenticated(): boolean {
    const token:any = this.storage.getCookie();
    // Check whether the token is expired and return
    // true or false
    return (token?true:false);
  }

  public updateLoginUser(userObj:any){
    this.loginUser.next(userObj);
  }
}
