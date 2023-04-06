import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post.component';


const routes: Routes = [
  {
    path: '',
    component: PostComponent
  }
];

@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,

    RouterModule.forChild(routes),
  ],
  providers: [],

})
export class PostModule { }
