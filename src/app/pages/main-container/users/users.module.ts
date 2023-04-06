import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  }
];
@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
        ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class UsersModule { }
