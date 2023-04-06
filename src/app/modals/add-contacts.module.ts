import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddContacts } from './addContacts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [AddContacts],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModalModule
  ],
  providers: [],
  exports: [
    AddContacts
  ]
})
export class AddContactsModule { }
