import { Component, OnInit} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AddContacts } from 'src/app/modals/addContacts';
import { ContactsService } from 'src/app/services/contacts.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})

export class ContactsComponent implements OnInit {
  contactList:any = "";
  selected:number=5;
  searchText:string='';

constructor(
  private contactService:ContactsService,
  private modalService: NgbModal,
  private route: ActivatedRoute,
  private router: Router
){}

totalContacts:any=this.contactService.contactList.length;
pages:number=1;
ngOnInit() {
  this.route.queryParams.subscribe(params => {
    this.pages = params?.page && params?.page !== 'NaN' ? params.page : 1;
    this.selected=params?.perPage && params?.perPage !== 'NaN' ? params.perPage : 5;
    this.searchText=params?.search && params?.search !== "" ? params.search : "";
    this.pageChangeEvent();
  });
}

  public addNewContact(){
    const modalRef:NgbModalRef = this.modalService.open(AddContacts);
    modalRef.componentInstance.editId = "";
    modalRef.result.then(
			(result) => {
        console.log('result');
        this.pageChangeEvent();
			},
			(reason) => {
        console.log('reason');
			},
		);
  }

   public delete(id:any){
    Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    )
    this.contactService.deleteContact(id);
    this.pageChangeEvent()
  }
})
   }

   public edit(id:string){
    const modalRef = this.modalService.open(AddContacts);
    modalRef.componentInstance.editId = id;
   }

   public pageChangeEvent(){
    let item=this.contactService.contactList;
    if(item!=undefined){
      if(this.searchText!=''){
      item = item.filter((items:any) => (items.name?.toLowerCase().includes(this.searchText?.toLowerCase())||items.email?.toLowerCase().includes(this.searchText?.toLowerCase())||items.phoneNo?.includes(this.searchText)));
    }
    this.totalContacts=item.length;
    this.contactList=item.slice((this.pages - 1) * this.selected,this.pages * this.selected);
    }
    const queryParams: Params = {page: this.pages, perPage: this.selected,search:this.searchText || null };
  this.router.navigate(
    [],
    {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
   }

   public onValueChange(event:any){
    if(event==""){
      this.pageChangeEvent()
    }
   }
}
