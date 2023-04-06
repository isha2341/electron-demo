import { Injectable} from '@angular/core';
import {StorageService} from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  getContacts:any=this.storage.getData().contact;
  contactList:any=this.getContacts.filter((data:any) =>
{
 return data.userId===this.storage.getCookie()
});

  constructor(private storage:StorageService) {}
  public register(data:any){
    const obj=this.storage.getData();
    obj.contact.push(data);
    this.contactList.push(data);
    this.storage.saveData(obj);
    // this.newItemEvent.emit(this.contactList);
  }

  public editContact(id:any,formData:any){
    const data = this.storage.getData();
    const i = data.contact.findIndex((e:any) => e.id===id);
    data.contact[i].name=formData.name;
    data.contact[i].email=formData.email;
    data.contact[i].image=formData.image;
    data.contact[i].phoneNo=formData.phoneNo;
    const index = this.contactList.findIndex((e:any) => e.id===id);
    this.contactList[index].name=formData.name;
    this.contactList[index].email=formData.email;
    this.contactList[index].image=formData.image;
    this.contactList[index].phoneNo=formData.phoneNo;
    this.storage.saveData(data);
  }

  currentUser(){
    const data = this.storage.getData();
    const i = data.user.findIndex((e:any) => e.uuid===this.storage.getCookie());
    return data.user[i];
  }

  public changeName(newName:string){
    const data = this.storage.getData();
    const i = data.user.findIndex((e:any) => e.uuid===this.storage.getCookie());
    data.user[i].name=newName;
    this.storage.saveData(data);
    return data.user[i];
  }

  public changePassword(newPw:string){
    const data = this.storage.getData();
    const i = data.user.findIndex((e:any) => e.uuid===this.storage.getCookie());
    data.user[i].password=newPw;
    this.storage.saveData(data);
  }

  public getContact(id:any){
    const data = this.storage.getData();
    const index = data.contact.findIndex((e:any) => e.id===id);
    return data.contact[index];
  }

  public deleteContact(id:any){
    const data = this.storage.getData();
    const i = data.contact.findIndex((e:any) => e.id===id);
    const index = this.contactList.findIndex((e:any) => e.id===id);
    data.contact.splice(i, 1);
    this.contactList.splice(index,1);
    this.storage.saveData(data);
  }
}
