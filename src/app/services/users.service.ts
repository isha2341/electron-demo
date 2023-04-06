import { Injectable } from '@angular/core';
import {StorageService} from 'src/app/services/storage.service'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private storage:StorageService
  ){
    const obj=this.storage.getData();
    console.log('obj a--->', obj?.user?.length);
    if(obj?.user?.length < 1){
      this.register({uuid: 'admin', name:'Admin', email: 'admin@gmail.com', password: 'Admin@123', type: 'admin'})
    }

  }
  public register(data:any){
    const obj=this.storage.getData();
    obj.user.push(data)
    this.storage.saveData(obj);
  }
  public login(loginData:any){
    const obj=this.storage.getData();
    const arr=obj.user;
    const index=arr.findIndex((e:any) => (e.email === loginData.email && e.password===loginData.password))
    if(index>-1){
      this.storage.setCookie( arr[index].uuid);
      return true;
    }
    else{
      return false;
    }
  }

  public duplicateEmail(email:any){
    const obj=this.storage.getData();
    const arr=obj.user;
    let boolean;
    arr.forEach((element:any) => {
      if(email===element.email){
        boolean=true
      }
    });
    return boolean;
  }

  public getUsers(){
    const data = this.storage.getData();
    return data.user;
  }

}
