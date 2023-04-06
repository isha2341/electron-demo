import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddContactsModule } from 'src/app/modals/add-contacts.module';
const routes: Routes = [
  {
    path: '',
    component: ContactsComponent
  }
];

@NgModule({
  declarations: [
    ContactsComponent,
  ],
  imports: [
  CommonModule,
  NgbModule,
  FormsModule,
  RouterModule.forChild(routes),
  ReactiveFormsModule,
  AddContactsModule
  ]
})
export class ContactsModule { }
