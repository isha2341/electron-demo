import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private cookieService: CookieService) { }
  key= "contactApp";
  public saveData( value: string) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  public getData() {
    const data:any=localStorage.getItem(this.key);
    return JSON.parse(data)|| {user:[],contact:[]};
  }
  public removeData() {
    localStorage.removeItem(this.key);
  }

  public setCookie(id:any){
    this.cookieService.set('Token', id);
  }

  public removeCookie(){
    this.cookieService.delete('Token');
  }

  public getCookie(){
    return this.cookieService.get('Token')
  }

}
