import { Component,Input,OnInit,ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormBuilder} from '@angular/forms';
import { ContactsService } from 'src/app/services/contacts.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
	selector: 'addContacts',
  styleUrls: ['./addContacts.scss'],
	templateUrl: './addContacts.html'
})

export class AddContacts implements OnInit {
  obj:any={};
  contact:any={};
  @Input() editId: string = "";
  contactForm:any;

	constructor(
    private contactService:ContactsService,
    private formBuilder: FormBuilder,
    private storage:StorageService,
    private activeModal: NgbActiveModal) {
	}


  ngOnInit() {
    this.contactForm=this.formBuilder.group({
      name: ['',Validators.required],
      email:['',Validators.email],
      phoneNo: ['',[Validators.required, Validators.pattern("[0-9]{10}")]],
      image:[''],
    });
    if(this.editId!="")
    {
      const data=this.contactService.getContact(this.editId);
      this.contactForm.patchValue({
        name:data.name,
        email:data.email,
        phoneNo:data.phoneNo,
        image:data.image
      })
    }
  }

  selectFile(event: any) { //Angular 11, for stricter type
		const reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		reader.onload = (_event) => {
			this.contactForm.value.image = reader.result;
		}
	}

  submit(){
    if(this.editId==""){
      this.obj['id']=Math.floor(100000 + Math.random() * 900000);
      this.obj['userId']=this.storage.getCookie();
      this.contact={...this.obj,...this.contactForm.value}
      this.contactService.register(this.contact);
    }else{
      this.contactService.editContact(this.editId,this.contactForm.value);
    }
    this.contactForm.reset();
    this.activeModal.close();
  }

  f(name:string) { return this.contactForm.get(name); }

  close(){
    this.activeModal.dismiss();
  }
}
