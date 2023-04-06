import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContainerComponent } from './main-container.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: MainContainerComponent,
    children: [
      { path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        data: {
          roles: ['admin', 'user']
        }
      },
      { path: 'contacts', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule)},
      { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)},
      { path: 'post', loadChildren: () => import('./post/post.module').then(m => m.PostModule)},
      { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule),canActivate: [AuthGuardService],
      data: {
        roles: ['admin']
      }}
    ]
  }
];

@NgModule({
  declarations: [
    MainContainerComponent,
  ],
  imports: [

  CommonModule,
    RouterModule.forChild(routes),
    NgbDropdownModule,
  ]
})
export class MainContainerModule { }
